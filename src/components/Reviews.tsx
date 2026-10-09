import { useEffect, useRef, useState } from "react";

const REVIEWS = [
  { i: "AS", name: "Afrana", meta: "Bangalore • Gaming Console", text: "Have used their services twice now. They never disappoint. Quick responses, polite, transparent, hassle free, great products as well. Rented trekking gear and a console." },
  { i: "KK", name: "Kanthikiran", meta: "Bangalore • Riding Gear", text: "It's an amazing service, starting from the quality of the gear provided to the pickup and drop at doorstep facility. The staff is extremely helpful and supportive." },
  { i: "AA", name: "Amal", meta: "Bangalore • Gaming Console", text: "I am a regular customer and order ps4. It's very affordable and booking an order is super easy and user friendly website and polite staff." },
  { i: "PS", name: "Pankaj", meta: "Mumbai • Action Camera", text: "The experience with SharePal is awesome. The camera gear provided is good. Overall a great experience renting camera gear." },
  { i: "RN", name: "Riya", meta: "Bangalore • Trekking Gear", text: "Placeholder review. Replace with the original testimonial text." },
];

const Star = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-amber-400" aria-hidden><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18l-6.5 4 1.7-7.4-5.7-5 7.5-.7z" /></svg>
);

const Card = ({ r }: { r: (typeof REVIEWS)[number] }) => (
  <article className="w-[280px] shrink-0 sm:w-[330px] rounded-3xl border border-ink-line bg-[#FAFAFA] p-5 md:w-[450px]">
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-[#4285F4]" aria-label="Google">G</span>
      <div className="flex" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, k) => <Star key={k} />)}</div>
    </div>
    <p className="mt-3 line-clamp-4 min-h-[6.5rem] text-lg font-semibold leading-[1.65]">“ {r.text}</p>
    <div className="mt-4 flex items-center gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DDE3FF] font-bold text-brand">{r.i}</span>
      <div>
        <p className="font-medium text-ink/70">{r.name}</p>
        <p className="text-ink-soft">{r.meta}</p>
      </div>
    </div>
  </article>
);

function CountUp({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setV(to); return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1200, 1);
        setV(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toFixed(decimals)}{suffix}</span>;
}

export default function Reviews() {
  return (
    <section className="bg-white py-12 md:py-16" aria-labelledby="orders-heading">
      <h2 id="orders-heading" className="px-4 text-center font-display text-3xl font-bold md:text-5xl xl:text-6xl">
        Served more than <span className="text-accent">1 Lakh Orders</span>
      </h2>

      <div className="mt-10 overflow-hidden md:mt-14">
        <div className="marquee flex w-max gap-5 pl-5">
          {[...REVIEWS, ...REVIEWS].map((r, k) => <Card key={k} r={r} />)}
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-[1520px] border-y border-ink-line px-4 py-10 md:px-6">
        <dl className="grid gap-10 text-center md:grid-cols-3">
          {[
            { v: <CountUp to={250} suffix="Cr+" />, l: "Saved Together" },
            { v: <CountUp to={4.5} decimals={1} suffix="M Kg" />, l: "CO₂E Emissions Saved" },
            { v: <CountUp to={100} suffix="K+" />, l: "Products In Circulation" },
          ].map((s) => (
            <div key={s.l}>
              <dd className="grad-text font-display text-5xl font-bold md:text-5xl xl:text-7xl">{s.v}</dd>
              <dt className="mt-2 text-lg text-ink/70 md:mt-3 md:text-xl xl:text-2xl">{s.l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
