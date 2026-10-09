import { useEffect, useRef } from "react";

const TABS = ["Photography", "Gaming", "Outdoor", "Entertainment"];

export default function CategoryTabs({ active = "Gaming" }: { active?: string }) {
  const box = useRef<HTMLDivElement>(null);

  // centre the active tab on small screens
  useEffect(() => {
    const c = box.current;
    const el = c?.querySelector<HTMLElement>('[aria-current="page"]');
    if (c && el) c.scrollLeft = el.offsetLeft - (c.clientWidth - el.clientWidth) / 2;
  }, []);

  const scroll = (dir: number) => box.current?.scrollBy({ left: dir * 140, behavior: "smooth" });

  return (
    // phones: sits inside the purple header block (white text). 768px+: grey bar with dark text
    <nav aria-label="Categories" className="relative bg-header text-white md:bg-surface md:text-ink">
      <button onClick={() => scroll(-1)} aria-label="Scroll tabs left" className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-header px-2 text-2xl text-white/70 md:hidden">‹</button>
      <div ref={box} className="no-scrollbar relative mx-auto flex max-w-[1520px] gap-2 overflow-x-auto px-8 md:justify-center md:gap-14 md:px-4">
        {TABS.map((t) => (
          <a
            key={t}
            href="#"
            aria-current={t === active ? "page" : undefined}
            className={
              "shrink-0 border-b-2 px-4 py-3 text-base font-semibold transition-colors md:px-5 md:py-3.5 md:text-[17px] " +
              (t === active
                ? "border-[#B98CFF] text-white md:border-theme md:text-ink"
                : "border-transparent text-white/80 hover:text-white md:text-ink/70 md:hover:text-ink")
            }
          >
            {t}
          </a>
        ))}
      </div>
      <button onClick={() => scroll(1)} aria-label="Scroll tabs right" className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-header px-2 text-2xl text-white/70 md:hidden">›</button>
    </nav>
  );
}
