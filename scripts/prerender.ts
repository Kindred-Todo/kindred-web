// Post-build prerender for the legal routes. `serve -s dist` hands the same
// index.html to every URL, so a crawler that doesn't run JS sees no content on
// /privacy or /terms. This writes dist/<route>/index.html with the policy text
// in a <noscript> block + correct title/description/canonical. Real users still
// get the full React app. Run by `bun scripts/prerender.ts` after `vite build`.
//
// No headless browser on purpose: the content is fully static and lives in the
// content module, so we render it directly — runs natively in the Bun builder.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { privacyDoc, termsDoc } from '../src/pages/legal/content'
import type { Block, LegalDoc } from '../src/pages/legal/content'

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '../dist')
const shell = readFileSync(resolve(dist, 'index.html'), 'utf8')
const ORIGIN = 'https://kindredtodo.com'

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s: string) => esc(s).replace(/"/g, '&quot;')

const blockHtml = (b: Block): string =>
  typeof b === 'string'
    ? `<p>${esc(b)}</p>`
    : `<ul>${b.bullets.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`

const docHtml = (doc: LegalDoc): string =>
  `<h1>${esc(doc.title)}</h1><p>Last updated ${esc(doc.lastUpdated)}</p><p>${esc(doc.intro)}</p>` +
  doc.sections
    .map((s) => `<section><h2>${esc(s.heading)}</h2>${s.body.map(blockHtml).join('')}</section>`)
    .join('')

function emit(route: string, doc: LegalDoc) {
  const title = `${doc.title} · Kindred`
  const url = `${ORIGIN}/${route}`
  const html = shell
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/(<meta name="description" content=")[\s\S]*?(")/, `$1${escAttr(doc.intro)}$2`)
    // canonical + og:url both point at the home origin in the shell; retarget.
    .replaceAll(`${ORIGIN}/"`, `${url}"`)
    // FAQ/app structured data is homepage-specific — drop it from legal pages.
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
    // swap the homepage no-JS fallback for this page's text.
    .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${docHtml(doc)}</noscript>`)

  const outDir = resolve(dist, route)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(resolve(outDir, 'index.html'), html)
  console.log(`prerendered /${route}`)
}

emit('privacy', privacyDoc)
emit('terms', termsDoc)

// Minimal sitemap for the three indexable routes.
const routes = ['', 'team', 'privacy', 'terms']
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  routes.map((r) => `  <url><loc>${ORIGIN}/${r}</loc></url>`).join('\n') +
  `\n</urlset>\n`
writeFileSync(resolve(dist, 'sitemap.xml'), sitemap)
console.log('wrote sitemap.xml')
