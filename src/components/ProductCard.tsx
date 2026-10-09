import { useState } from "react";
import type { Product } from "../types";
import { formatRent } from "../lib/format";

type Props = { product: Product; inCart: boolean; onToggleCart: (id: number) => void };

// Outlined pill, as on the original cards
const TAG_STYLE: Record<string, string> = {
  Trending: "border-accent text-accent",
  New: "border-sky-600 text-sky-700",
  "Vote to Launch": "border-lime bg-[#F4FFD6] text-[#2F5D00]",
};

// Waitlist numbers are not in the product JSON, so they live here
const WAITLIST_JOINED = 15;
const WAITLIST_GOAL = 1000;

// Exact price when provided, otherwise an estimate (per day x 5 + 18% GST)
const price5Days = (p: Product) => p.rent_5_days ?? Math.round(p.per_day_rent * 5 * 1.18);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  </svg>
);

export default function ProductCard({ product: p, inCart, onToggleCart }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [liked, setLiked] = useState(false);
  const [joined, setJoined] = useState(false);
  const voteOnly = p.tag === "Vote to Launch";
  const joinedCount = WAITLIST_JOINED + (joined ? 1 : 0);

  return (
    // WHOLE-CARD HOVER (image, title, price AND the add-to-cart button).
    // Phones: always a white card. From 768px: transparent card that turns white, lifts and gets a shadow + ring on hover.
    // Tweak the look with: md:hover:-translate-y-1  md:hover:bg-white  md:hover:shadow-lift  md:hover:ring-1
    <article className="group flex flex-col rounded-2xl bg-white p-2 transition-all duration-200 ease-out md:rounded-[24px] md:bg-transparent md:p-3 md:hover:-translate-y-1 md:hover:bg-white md:hover:shadow-lift md:hover:ring-1 md:hover:ring-ink-line md:focus-within:bg-white md:focus-within:shadow-lift">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-white transition-colors duration-200 md:rounded-2xl md:group-hover:bg-surface">
        {!loaded && !failed && <div className="skeleton absolute inset-0" />}
        {failed ? (
          <div className="flex h-full items-center justify-center text-sm text-ink-soft">Image unavailable</div>
        ) : (
          <img
            src={p.image}
            alt={p.name + " on rent"}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={"h-full w-full object-contain p-4 transition duration-300 md:p-6 md:group-hover:scale-105 " + (loaded ? "opacity-100" : "opacity-0")}
          />
        )}
        {p.tag && (
          <span className={"absolute left-1.5 top-1.5 rounded-md border px-1.5 py-0.5 text-[11px] font-semibold md:left-3.5 md:top-3.5 md:rounded-lg md:px-3 md:text-sm " + (p.tag === "Vote to Launch" ? "" : "bg-white ") + TAG_STYLE[p.tag]}>
            {p.tag}
          </span>
        )}

        {/* heart: always visible on phones, fades in on hover from 768px */}
        <button
          type="button"
          onClick={() => setLiked((l) => !l)}
          aria-pressed={liked}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
          className={"absolute right-1.5 top-1.5 transition-opacity duration-200 md:right-3 md:top-3 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100 " + (liked ? "text-red-500 md:opacity-100" : "text-ink-soft/60 md:text-ink-soft")}
        >
          <HeartIcon filled={liked} />
        </button>
        {/* quick view: 768px+ on hover */}
        <a
          href={p.image}
          target="_blank"
          rel="noreferrer"
          aria-label={`Quick view ${p.name}`}
          className="absolute right-3 top-12 hidden h-9 w-9 items-center justify-center rounded-full bg-white text-sky-600 opacity-0 shadow-card transition-opacity duration-200 hover:bg-sky-50 focus-visible:opacity-100 md:flex md:group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" /><circle cx="12" cy="12" r="2.5" />
          </svg>
        </a>

        {p.out_of_stock && (
          <div className="absolute inset-x-0 bottom-0 bg-ink-line/90 py-1.5 text-center text-[10px] font-semibold text-ink/70 md:py-2 md:text-sm">
            Unavailable for these dates
          </div>
        )}
      </div>

      {/* "Vote to Launch" items: waitlist message + progress instead of a price */}
      {voteOnly && (
        <div className="mt-2">
          <p className="flex gap-2 rounded-xl bg-[#E9F8D9] p-2.5 text-[11px] font-medium leading-snug text-[#1E7B34] md:p-3 md:text-sm">
            <span aria-hidden className="shrink-0">✦</span>
            <span>We launch if 1k people join the waitlist. Get notified first!</span>
          </p>
          <button
            type="button"
            onClick={() => setJoined((j) => !j)}
            aria-pressed={joined}
            className="relative mt-2 w-full overflow-hidden rounded-full bg-ink-line/70 py-1.5 text-center text-[11px] font-semibold text-ink/60 transition-colors hover:bg-ink-line md:text-sm"
          >
            <span aria-hidden className="absolute inset-y-0 left-0 bg-theme/50 transition-all duration-300" style={{ width: `${Math.max((joinedCount / WAITLIST_GOAL) * 100, 4)}%` }} />
            <span className="relative">{joined ? `You joined ✓  ${joinedCount}/${WAITLIST_GOAL}` : `${joinedCount}/${WAITLIST_GOAL} Joined`}</span>
          </button>
        </div>
      )}

      <div className="px-1 pt-2.5 md:px-1.5 md:pt-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-[13px] font-bold leading-tight md:min-h-[3.5rem] md:text-lg md:leading-[1.65]">{p.name}</h3>

        {voteOnly ? null : p.out_of_stock ? (
          <>
            <hr className="mt-1.5 border-ink-line md:mt-2" />
            <div className="pt-2.5 md:pt-3">
              <p className="flex items-center gap-2 text-xs text-ink-soft md:text-base">
                <span aria-hidden className="flex h-4 w-4 items-center justify-center rounded-full border border-ink-soft text-[10px] md:h-5 md:w-5 md:text-xs">i</span>
                <span className="font-medium">Unavailable</span>
              </p>
              <button className="mt-2 w-full rounded-full border border-navy py-2 text-xs font-semibold transition-colors hover:bg-navy hover:text-white md:mt-3 md:py-2.5 md:text-base">
                Check Availability
              </button>
            </div>
          </>
        ) : (
          <>
            <hr className="mt-1.5 border-ink-line md:mt-2" />
            <div className="pt-2.5 md:flex md:items-end md:justify-between md:gap-2 md:pt-3">
              <div className="min-w-0">
                <p className="text-[11px] text-ink-soft md:text-base">Rent for <span className="font-semibold text-ink">5</span> days</p>
                <p className="text-lg font-bold leading-tight md:text-2xl">{formatRent(price5Days(p))}</p>
                <span className="mt-1 inline-block rounded bg-lime px-1.5 py-0.5 text-[10px] font-semibold md:px-2 md:text-sm">Incl. of GST</span>
              </div>

              {/* phones: full-width text button */}
              <button
                type="button"
                onClick={() => onToggleCart(p.id)}
                aria-pressed={inCart}
                className={"mt-2 w-full rounded-full border border-navy py-2 text-xs font-semibold transition-colors md:hidden " + (inCart ? "bg-navy text-white" : "")}
              >
                {inCart ? "Added ✓" : "Add to Cart"}
              </button>

              {/* 768px+: round + button */}
              <button
                type="button"
                onClick={() => onToggleCart(p.id)}
                aria-pressed={inCart}
                aria-label={inCart ? `Remove ${p.name} from cart` : `Add ${p.name} to cart`}
                className={
                  "hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy text-3xl leading-none transition-all duration-200 active:scale-90 md:flex lg:h-14 lg:w-14 " +
                  (inCart ? "bg-navy text-white" : "hover:bg-navy hover:text-white")
                }
              >
                {inCart ? "✓" : "+"}
              </button>
            </div>
          </>
        )}
      </div>
    </article>
  );
}
