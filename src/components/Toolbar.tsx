import type { SortKey } from "../types";

type Props = {
  q: string; sort: SortKey; inStock: boolean;
  onQ: (v: string) => void; onSort: (v: SortKey) => void; onInStock: (v: boolean) => void;
};

export default function Toolbar(p: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 py-3 md:gap-3 md:py-4">
      <label className="min-w-[200px] flex-1 md:max-w-sm">
        <span className="sr-only">Search gaming gadgets</span>
        <input id="search" type="search" value={p.q} onChange={(e) => p.onQ(e.target.value)} placeholder="Search PS5, FC26, God of War..."
          className="w-full rounded-full border border-ink-line bg-white px-4 py-2 text-sm outline-none focus:border-theme" />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <span className="text-ink-soft">Sort</span>
        <select value={p.sort} onChange={(e) => p.onSort(e.target.value as SortKey)} className="rounded-full border border-ink-line bg-white px-3 py-2 text-sm">
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Rating</option>
        </select>
      </label>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <input type="checkbox" checked={p.inStock} onChange={(e) => p.onInStock(e.target.checked)} className="h-4 w-4 accent-theme" />
        Available only
      </label>
    </div>
  );
}
