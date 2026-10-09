import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import data from "./data/products.json";
import type { Product, SortKey } from "./types";
import { CATEGORIES, CATEGORY_MATCH, type Category } from "./lib/categories";
import { useColumns } from "./lib/useColumns";
import Header from "./components/Header";
import CategoryTabs from "./components/CategoryTabs";
import Sidebar from "./components/Sidebar";
import Banner from "./components/Banner";
import Toolbar from "./components/Toolbar";
import ProductCard from "./components/ProductCard";
import { AssetPartnerBanner, RentOutBanner } from "./components/PromoBanners";
import FAQ from "./components/FAQ";
import Breadcrumb from "./components/Breadcrumb";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import ChatButton from "./components/ChatButton";
import BottomNav from "./components/BottomNav";

const PRODUCTS = data.products as Product[];

// Default ("Recommended") order, as on the original: Vote to Launch first, then New, then everything else.
const rank = (p: Product) => (p.tag === "Vote to Launch" ? 0 : p.tag === "New" ? 1 : 2);
const recommended = (a: Product, b: Product) => rank(a) - rank(b) || (rank(a) === 1 ? a.id - b.id : 0);

function readUrl() {
  const s = new URLSearchParams(window.location.search);
  const cat = s.get("cat") as Category;
  return {
    q: s.get("q") ?? "",
    sort: (s.get("sort") as SortKey) || "recommended",
    inStock: s.get("stock") === "1",
    cat: CATEGORIES.includes(cat) ? cat : ("All" as Category),
  };
}

// Promo banners go after roughly two rows, so they never leave a half-empty row.
// group = items per slot: 4 on desktop and phones, 6 on tablet.
const promoAfter = (index: number, cols: number) => {
  const group = cols === 3 ? 6 : 4;
  if (index === group - 1) return <AssetPartnerBanner />;
  if (index === group * 2 - 1) return <RentOutBanner />;
  if (index > group * 2 - 1 && (index + 1) % (group * 4) === 0) {
    return ((index + 1) / (group * 4)) % 2 ? <AssetPartnerBanner /> : <RentOutBanner />;
  }
  return null;
};

export default function App() {
  const cols = useColumns();
  const init = useMemo(readUrl, []);
  const [q, setQ] = useState(init.q);
  const [sort, setSort] = useState<SortKey>(init.sort);
  const [inStock, setInStock] = useState(init.inStock);
  const [cat, setCat] = useState<Category>(init.cat);
  const [cart, setCart] = useState<number[]>([]);

  // Header + tabs are one sticky block. The header part slides away while scrolling down
  // and comes back when scrolling up on phones/tablets. On desktop only the tabs stay.
  const headRef = useRef<HTMLDivElement>(null);
  const [stickyTop, setStickyTop] = useState(0);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      const h = headRef.current?.offsetHeight ?? 0;
      const small = window.innerWidth < 1024;
      setStickyTop(y <= 0 || (small && y < last) ? 0 : -h);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // keep filters in the URL so a filtered view can be shared
  useEffect(() => {
    const s = new URLSearchParams();
    if (q) s.set("q", q);
    if (sort !== "recommended") s.set("sort", sort);
    if (inStock) s.set("stock", "1");
    if (cat !== "All") s.set("cat", cat);
    const qs = s.toString();
    window.history.replaceState(null, "", qs ? "?" + qs : window.location.pathname);
  }, [q, sort, inStock, cat]);

  const visible = useMemo(() => {
    const term = q.trim().toLowerCase();
    let list = PRODUCTS.filter(
      (p) => (!term || p.name.toLowerCase().includes(term)) && (!inStock || !p.out_of_stock) && CATEGORY_MATCH[cat](p)
    );
    if (sort === "recommended") list = [...list].sort(recommended);
    if (sort === "price-asc") list = [...list].sort((a, b) => a.per_day_rent - b.per_day_rent);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.per_day_rent - a.per_day_rent);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [q, sort, inStock, cat]);

  const toggleCart = (id: number) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));
  const reset = () => { setQ(""); setSort("recommended"); setInStock(false); setCat("All"); };

  const sidebarItems = CATEGORIES.map((label) => ({
    label,
    image: label === "All" ? undefined : PRODUCTS.find(CATEGORY_MATCH[label])?.image,
  }));

  return (
    <div className="pb-16 lg:pb-0">
      <div className="sticky z-40 transition-[top] duration-300" style={{ top: stickyTop }}>
        <div ref={headRef}><Header cartCount={cart.length} /></div>
        <CategoryTabs active="Gaming" />
      </div>

      {/* Sidebar stays a vertical column at every size (76 / 100 / 125 / 150px wide) */}
      <div className="mx-auto grid max-w-[1520px] grid-cols-[76px_minmax(0,1fr)] gap-x-2 gap-y-3 px-2 pb-10 sm:grid-cols-[100px_minmax(0,1fr)] md:grid-cols-[125px_minmax(0,1fr)] md:gap-x-6 md:px-3 md:pb-14 md:pt-3 lg:grid-cols-[150px_minmax(0,1fr)] lg:gap-x-10 2xl:px-0">
        {/* Phones: banner sits full-width inside the purple header block. 768px+: top of the right column */}
        <div className="-mx-2 col-span-2 bg-header px-3 pb-3 md:col-span-1 md:col-start-2 md:row-start-1 md:mx-0 md:bg-transparent md:p-0">
          <Banner />
        </div>
        <div className="md:col-start-1 md:row-start-1 md:row-span-2">
          <Sidebar items={sidebarItems} active={cat} onSelect={setCat} />
        </div>

        <main id="products" className="min-w-0 md:col-start-2 md:row-start-2">
          <div className="flex items-start justify-between gap-2 border-b border-ink-line pb-3 md:items-end md:pb-4">
            <h2 className="text-base font-extrabold leading-tight md:text-3xl">Gaming Gadgets On Rent</h2>
            <p className="shrink-0 text-sm text-ink-soft md:text-base" aria-live="polite">
              <span className="hidden md:inline">Total items: </span>
              <span className="font-semibold md:text-ink/80">{visible.length} items</span>
            </p>
          </div>
          <Toolbar q={q} sort={sort} inStock={inStock} onQ={setQ} onSort={setSort} onInStock={setInStock} />
          {visible.length === 0 ? (
            <div className="rounded-card border border-dashed border-ink-line bg-white px-4 py-12 text-center">
              <p className="font-semibold">No gadgets match these filters</p>
              <p className="mt-1 text-sm text-ink-soft">Try a different search or clear the filters.</p>
              <button onClick={reset} className="mt-4 rounded-full bg-navy px-6 py-2 text-sm font-bold text-white hover:bg-black">Clear filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-2 gap-y-3 md:grid-cols-3 md:gap-x-3 md:gap-y-6 lg:grid-cols-4 lg:gap-x-3 xl:gap-x-6 2xl:gap-x-10">
              {visible.map((p, i) => (
                <Fragment key={p.id}>
                  <ProductCard product={p} inCart={cart.includes(p.id)} onToggleCart={toggleCart} />
                  {promoAfter(i, cols)}
                </Fragment>
              ))}
            </div>
          )}
        </main>
      </div>

      <FAQ />
      <Breadcrumb />
      <Reviews />
      <Footer />
      <ChatButton />
      <BottomNav cartCount={cart.length} />
    </div>
  );
}
