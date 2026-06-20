import { useEffect, useRef, useState } from 'react'
import { useLenis } from 'lenis/react'
import TopNav from '@/components/topnav'
import { Footer } from '@/pages/landing/sections/Footer'
import { useMobile } from '@/contexts/MobileContext'
import type { Block, LegalDoc } from './content'

const NAV_OFFSET = 120 // clears the fixed TopNav pill when jumping to a section

function BlockView({ block }: { block: Block }) {
  if (typeof block === 'string') {
    return (
      <p className="font-outfit text-[#2a2a35] text-[17px] font-light leading-[1.7] tracking-[-0.01em]">
        {block}
      </p>
    )
  }
  return (
    <ul className="flex flex-col gap-2 pl-5">
      {block.bullets.map((item) => (
        <li
          key={item}
          className="font-outfit text-[#2a2a35] text-[17px] font-light leading-[1.7] tracking-[-0.01em] list-disc marker:text-primary"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

function TableOfContents({
  sections,
  activeId,
  onJump,
  isHidden,
}: {
  sections: LegalDoc['sections']
  activeId: string
  onJump: (id: string) => void
  isHidden: boolean
}) {
  return (
    <nav
      aria-label="Table of contents"
      className={[
        'hidden xl:flex fixed top-1/2 -translate-y-1/2 flex-col gap-1 border-l border-black/10 transition-opacity duration-300',
        isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
      style={{ left: 'calc((100vw - 720px) / 2 - 240px)', width: 208, maxHeight: '70vh', overflowY: 'auto' }}
    >
      <p className="font-outfit text-[11px] uppercase tracking-[0.12em] text-[#a8a8b0] pl-4 mb-2">
        Contents
      </p>
      {sections.map((s) => {
        const active = s.id === activeId
        return (
          <button
            key={s.id}
            onClick={() => onJump(s.id)}
            className={[
              'text-left font-outfit text-[14px] leading-[1.35] tracking-[-0.01em] py-1.5 pl-4 -ml-px border-l-2 transition-colors',
              active
                ? 'border-primary text-primary font-normal'
                : 'border-transparent text-[#838383] font-light hover:text-[#13121f]',
            ].join(' ')}
          >
            {s.heading}
          </button>
        )
      })}
    </nav>
  )
}

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const { isMobile } = useMobile()
  const lenis = useLenis()
  const [activeId, setActiveId] = useState(doc.sections[0]?.id ?? '')
  const [tocHidden, setTocHidden] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = `${doc.title} · Kindred`
  }, [doc.title])

  // Scroll-spy: highlight the section currently sitting near the top of the
  // viewport. The asymmetric rootMargin makes the "active band" a thin strip
  // ~20% down the page so exactly one section reads as active at a time.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        )
        setActiveId(topmost.target.id)
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
    )
    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [doc.sections])

  // The TOC is position:fixed and vertically centered, so it would float over
  // the dark footer at the bottom of the page. Fade it out once the footer
  // starts entering the viewport.
  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setTocHidden(entry.isIntersecting),
      { rootMargin: '0px 0px -25% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const jump = (id: string) => {
    const el = document.getElementById(id)
    if (el) lenis?.scrollTo(el, { offset: -NAV_OFFSET })
  }

  return (
    <div className="relative min-h-screen w-full bg-white">
      <TopNav />
      {!isMobile && (
        <TableOfContents
          sections={doc.sections}
          activeId={activeId}
          onJump={jump}
          isHidden={tocHidden}
        />
      )}

      <main
        className="mx-auto w-full max-w-[720px]"
        style={{ paddingLeft: 24, paddingRight: 24, paddingTop: 200, paddingBottom: 120 }}
      >
        <header className="border-b border-black/10 pb-8">
          <h1 className="font-outfit font-normal text-[#13121f] text-[40px] md:text-[48px] leading-[1.05] tracking-[-0.03em]">
            {doc.title}
          </h1>
          <p className="font-outfit text-[#a8a8b0] text-[14px] font-light mt-3">
            Last updated {doc.lastUpdated}
          </p>
        </header>

        <p className="font-outfit text-[#525252] text-[19px] font-light leading-[1.6] tracking-[-0.01em] mt-8">
          {doc.intro}
        </p>

        <div className="flex flex-col mt-4">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-[120px] pt-14">
              <h2 className="font-outfit font-medium text-[#13121f] text-[24px] leading-[1.25] tracking-[-0.02em] mb-4">
                {s.heading}
              </h2>
              <div className="flex flex-col gap-4">
                {s.body.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <div ref={footerRef}>
        <Footer />
      </div>
    </div>
  )
}
