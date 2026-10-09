const ordinal = (d: number) => {
  const s = ["th", "st", "nd", "rd"], v = d % 100;
  return d + (s[(v - 20) % 10] || s[v] || s[0]);
};
const fmt = (d: Date) => `${ordinal(d.getDate())} ${d.toLocaleString("en-US", { month: "short" })}`;
const addDays = (n: number) => { const d = new Date(); d.setDate(d.getDate() + n); return d; };

export const Icon = ({ d, className = "h-6 w-6" }: { d: string; className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);
const PIN = "M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z";
const CAL = "M7 3v3M17 3v3M4 8h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z";
const USER = "M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0";

export default function Header({ cartCount }: { cartCount: number }) {
  const delivery = fmt(addDays(1));
  const pickup = fmt(addDays(7));
  return (
    <header className="bg-header text-white">
      <div className="mx-auto flex max-w-[1520px] items-center gap-3 px-3 md:px-6 lg:h-[104px] lg:gap-4">
        {/* Replace with the official logo asset */}
        <a href="/" aria-label="SharePal home" className="self-start rounded-b-xl bg-brand px-4 pb-2.5 pt-3 font-display text-xl font-bold italic tracking-tight lg:rounded-b-2xl lg:px-8 lg:pb-4 lg:pt-5 lg:text-3xl">
          Share<span className="text-lime">Pal</span>
        </a>

        {/* < 1024px: compact city pill */}
        <button className="flex items-center gap-1.5 rounded-full bg-[#8B2FE0] px-3 py-1.5 text-sm font-semibold lg:hidden" aria-label="Change city">
          <Icon d={PIN} className="h-4 w-4" /> Bangalore <span aria-hidden>⌄</span>
        </button>

        {/* >= 1024px: full pill */}
        <div className="mx-auto hidden items-stretch overflow-hidden rounded-full border-2 border-white/70 bg-white text-ink lg:flex">
          <button className="flex items-center gap-2 px-4 font-semibold text-header" aria-label="Change city">
            <Icon d={PIN} /> Bangalore <span aria-hidden>⌄</span>
          </button>
          <div className="flex items-center gap-6 bg-surface px-5 py-2.5 text-[15px] font-medium text-ink/80">
            <span>Delivery Date: {delivery}</span>
            <span>Pickup Date: {pickup}</span>
          </div>
          <button className="bg-navy px-5 font-semibold text-white transition-colors hover:bg-black">Edit</button>
        </div>

        <div className="ml-auto flex items-center gap-3 py-2 lg:ml-0 lg:gap-6 lg:py-0">
          <button aria-label="Search" className="hidden lg:block"><Icon d="M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3" /></button>
          <button aria-label={`Cart, ${cartCount} items`} className="relative hidden lg:block">
            <Icon d="M3 4h2l2.4 11h10.2L20 7H6.2M9 20a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-lime px-1 text-xs font-bold text-ink">{cartCount}</span>
            )}
          </button>
          <button className="flex items-center gap-3 font-semibold" aria-label="Login">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-ink text-white lg:h-12 lg:w-12 lg:bg-white lg:text-header">
              <Icon d={USER} />
            </span>
            <span className="hidden text-lg lg:inline">Hi, Login</span>
          </button>
        </div>
      </div>

      {/* < 1024px: second row with the rental dates */}
      <div className="px-3 pb-3 md:px-6 lg:hidden">
        <div className="mx-auto flex max-w-[1520px] items-center gap-2 overflow-hidden rounded-full border-2 border-white/80 bg-white pl-3 text-ink">
          <Icon d={CAL} className="h-5 w-5 shrink-0" />
          <p className="flex-1 py-1.5 text-sm font-medium leading-tight text-ink/70">
            Rent For: <span className="text-ink">{delivery} • {pickup}</span>
          </p>
          <button className="m-0.5 shrink-0 self-stretch rounded-full bg-navy px-4 text-sm font-semibold text-white">Edit</button>
        </div>
      </div>
    </header>
  );
}
