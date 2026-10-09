import { CATEGORY_ICON, type Category } from "../lib/categories";

type Item = { label: Category; image?: string };

export default function Sidebar({ items, active, onSelect }: { items: Item[]; active: Category; onSelect: (v: Category) => void }) {
  return (
    <aside aria-label="Sub categories" className="sticky top-[56px] self-start">
      <ul className="no-scrollbar flex max-h-[calc(100vh-150px)] flex-col items-center gap-3 overflow-y-auto rounded-2xl bg-white p-2 md:gap-4 md:p-3 lg:max-h-[calc(100vh-76px)] lg:gap-5 lg:rounded-card lg:p-4">
        {items.map((it) => {
          const on = it.label === active;
          return (
            <li key={it.label} className="w-full">
              <button onClick={() => onSelect(it.label)} aria-pressed={on} className="flex w-full flex-col items-center gap-1.5 text-center lg:gap-2">
                <span className={"flex h-[52px] w-[52px] items-center justify-center overflow-hidden rounded-xl border-2 bg-surface transition-colors sm:h-[60px] sm:w-[60px] md:h-[70px] md:w-[70px] lg:h-20 lg:w-20 lg:rounded-2xl " + (on ? "border-brand" : "border-ink-line hover:border-brand/50")}>
                  {it.image ? <img src={it.image} alt="" loading="lazy" className="h-full w-full object-contain p-1" /> : <span className="text-2xl lg:text-3xl" aria-hidden>{CATEGORY_ICON[it.label]}</span>}
                </span>
                <span className={"text-[11px] font-semibold leading-tight md:text-sm lg:text-[15px] " + (on ? "border-b-2 border-brand text-brand" : "")}>{it.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
