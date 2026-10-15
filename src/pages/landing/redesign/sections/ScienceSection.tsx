/**
 * BUILT ON SCIENCE — Figma node 8755:326
 * Full-width dark band: display headline + body + research link (left),
 * three hairline-divided stat rows (right, cols 6–7).
 */
const stats = [
  { value: '3X', label: 'Bigger effect when progress is shared' },
  { value: '94 Studies', label: 'specific when-and-where plans boost follow-through' },
  { value: '95%', label: 'Finished when they joined with friends' },
]

export function ScienceSection() {
  return (
    <section className="relative w-full overflow-hidden border-t-2 border-b-2 border-hairline bg-night min-h-[min(763px,44.16vw)]">
      <div className="grid7 pt-[clamp(56px,5.38vw,93px)] max-md:pt-24 max-md:pb-16">
        {/* Left — headline, body, link. Both columns are pinned to row 1: the
            headline box and the stat column overlap at column 6 in the design,
            so without an explicit row the stats get auto-placed onto row 2. */}
        <div className="col-start-1 col-span-6 row-start-1">
          <h2 className="t-display text-white max-w-[min(1284px,74.31vw)]">
            Built on science thats
            <br className="max-md:hidden" /> been around forever
          </h2>
          <p className="t-label text-copy-dim leading-[1.25] max-w-[min(700px,40.51vw)] max-md:max-w-none mt-[clamp(20px,1.39vw,24px)]">
            Decades of research say the same thing. People follow through when
            they plan specifically, track honestly, and share progress with
            people who care. Kindred turns that into three rings and a small
            group of friends who notice when you finish.
          </p>
          <a
            href="#"
            className="t-link text-copy-dim inline-block mt-[clamp(28px,2.89vw,50px)]"
          >
            See the research
          </a>
        </div>

        {/* Right — stat rows, cols 6–7, first hairline 89px from section top */}
        <div className="col-start-6 col-span-2 row-start-1 max-md:mt-14 -mt-[min(4px,0.23vw)]">
          {stats.map((stat, i) => (
            <div
              key={stat.value}
              className={`border-b border-white/40 pt-[clamp(28px,2.6vw,45px)] pb-[clamp(20px,1.74vw,30px)] ${
                i === 0 ? 'border-t border-white/40' : ''
              }`}
            >
              <p className="t-stat text-white max-md:text-[52px]">{stat.value}</p>
              <p className="t-label text-copy-dim leading-[1.25] mt-[clamp(4px,0.35vw,6px)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
