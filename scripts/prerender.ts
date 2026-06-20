// Post-build prerender. The site is a client-rendered SPA, so the served HTML
// body is empty until JS runs — which Google's OAuth brand verifier (no JS)
// reads as "home page doesn't explain the app / name doesn't match". This
// injects a real, VISIBLE content fallback into #app for each page so the
// served HTML names the app and states its purpose without JS. React replaces
// it on mount (see src/main.tsx — the no-innerHTML guard was removed).
//
// No headless browser: the content is static and lives in the content module,
// so we render it directly — runs natively in the Bun builder.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { privacyDoc, termsDoc } from '../src/pages/legal/content'
import type { Block, LegalDoc } from '../src/pages/legal/content'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const shell = readFileSync(resolve(dist, 'index.html'), 'utf8') // vite shell, empty #app
const ORIGIN = 'https://kindredtodo.com'
const APP_STORE = 'https://apps.apple.com/us/app/kindred-todo/id6744142764'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s: string) => esc(s).replace(/"/g, '&quot;')

const blockHtml = (b: Block): string =>
  typeof b === 'string'
    ? `<p>${esc(b)}</p>`
    : `<ul>${b.bullets.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`

const docBody = (doc: LegalDoc): string =>
  `<p>Last updated ${esc(doc.lastUpdated)}</p><p>${esc(doc.intro)}</p>` +
  doc.sections
    .map((s) => `<h2>${esc(s.heading)}</h2>${s.body.map(blockHtml).join('')}`)
    .join('')

// Visible dark splash. Inline styles so it renders before the app's CSS; React
// replaces the whole block on mount, so the flash is brief and dark-on-dark.
const page = (heading: string, inner: string): string =>
  `<div style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;gap:16px;max-width:760px;margin:0 auto;padding:48px;background:#13121f;color:#fff;font-family:'Outfit',sans-serif;font-weight:300;line-height:1.5;">` +
  `<h1 style="margin:0;font-size:44px;font-weight:400;letter-spacing:-0.03em;">${esc(heading)}</h1>` +
  inner +
  `<p style="margin-top:8px;font-size:14px;"><a href="/privacy" style="color:#a98bff;">Privacy Policy</a> · <a href="/terms" style="color:#a98bff;">Terms of Service</a> · <a href="${APP_STORE}" style="color:#a98bff;">Download on the App Store</a></p>` +
  `</div>`

const injectBody = (html: string, content: string) =>
  html.replace('<div id="app"></div>', `<div id="app">${content}</div>`)

const homeInner =
  `<p style="margin:0;max-width:640px;font-size:20px;">Kindred is a social productivity app that makes your goals and everyday tasks feel motivating, fun, and accountable with friends. Inspired by Strava, BeReal, and Apple Health, it helps you actually follow through — and build lasting habits with the people who want it for you too.</p>`

// Home: keep the shell's title/meta/JSON-LD, just inject visible content.
writeFileSync(resolve(dist, 'index.html'), injectBody(shell, page('Kindred', homeInner)))
console.log('prerendered /')

// Legal pages: inject content + retarget title/description/canonical, and drop
// the homepage-specific JSON-LD graph.
function emit(route: string, doc: LegalDoc) {
  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(doc.title)} · Kindred</title>`)
    .replace(/(<meta name="description" content=")[\s\S]*?(")/, `$1${escAttr(doc.intro)}$2`)
    .replaceAll(`${ORIGIN}/"`, `${ORIGIN}/${route}"`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    .replace('<div id="app"></div>', `<div id="app">${page(doc.title, docBody(doc))}</div>`)
  const outDir = resolve(dist, route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  console.log(`prerendered /${route}`)
}

emit('privacy', privacyDoc)
emit('terms', termsDoc)

const routes = ['', 'team', 'privacy', 'terms']
writeFileSync(
  resolve(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    routes.map((r) => `  <url><loc>${ORIGIN}/${r}</loc></url>`).join('\n') +
    `\n</urlset>\n`,
)
console.log('wrote sitemap.xml')
