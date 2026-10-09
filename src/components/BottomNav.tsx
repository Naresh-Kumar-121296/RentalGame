import { Icon } from "./Header";

const ITEMS = [
  { label: "Home", href: "/", d: "M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10" },
  { label: "Category", href: "#products", d: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" },
  { label: "Search", href: "#search", d: "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3" },
  { label: "Cart", href: "#", d: "M3 4h2l2.4 11h10.2L20 7H6.2M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" },
];

export default function BottomNav({ cartCount }: { cartCount: number }) {
  return (
    <nav aria-label="Quick navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-line bg-gray-100 px-1.5 pb-[env(safe-area-inset-bottom)] lg:hidden">
      <ul className="mx-auto flex max-w-xl justify-around">
        {ITEMS.map((i) => (
          <li key={i.label}>
            <a
              href={i.href}
              onClick={i.label === "Search" ? (e) => { e.preventDefault(); document.getElementById("search")?.focus(); } : undefined}
              className="relative flex flex-col items-center gap-0.5 px-4 py-2 text-[11px] text-ink-soft"
            >
              <Icon d={i.d} className="h-6 w-6 text-ink" />
              {i.label}
              {i.label === "Cart" && cartCount > 0 && (
                <span className="absolute right-2 top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-lime px-1 text-[10px] font-bold text-ink">{cartCount}</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
