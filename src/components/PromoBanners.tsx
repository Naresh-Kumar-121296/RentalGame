const Benefit = ({ title, text, sub }: { title: string; text: string; sub: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <p className="font-display text-xl font-bold text-lime md:text-2xl">{title}</p>
    <p className="mt-1 text-sm text-white/80">{text}</p>
    <p className="text-sm text-white/80">{sub}</p>
  </div>
);

export function AssetPartnerBanner() {
  return (
    <>
      {/* phones: compact */}
      <section className="col-span-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0A1450] to-[#101E6B] p-4 text-white md:hidden" aria-label="Become an asset partner">
        <h2 className="font-display text-base font-bold leading-tight">
          Become an <span className="text-lime">Asset Partner.</span> Earn Monthly.
        </h2>
        <p className="mt-1 text-xs text-white/80">Turn unused cameras &amp; electronics into passive income</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <a href="#" className="rounded-full bg-lime px-3 py-1.5 text-[10px] font-bold uppercase text-ink">Get earning &amp; rental benefits</a>
          <a href="#" className="rounded-full bg-lime px-3 py-1.5 text-[10px] font-bold uppercase text-ink">Know more ↗</a>
        </div>
      </section>

      {/* tablet / desktop: full */}
      <section className="col-span-full hidden overflow-hidden rounded-card bg-gradient-to-r from-[#0A1450] to-[#101E6B] p-8 text-white md:block" aria-label="Become an asset partner">
        <h2 className="font-display text-3xl font-bold lg:text-4xl xl:text-5xl">
          Become an <span className="text-lime">Asset Partner.</span> Earn Monthly.
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_auto]">
          <div>
            <p className="mb-2 text-sm font-bold tracking-wide">EARNING BENEFITS</p>
            <div className="grid gap-3 lg:grid-cols-2">
              <Benefit title="Monthly Earnings" text="From rental assets" sub="" />
              <Benefit title="Upto ₹10,000" text="Instant Wallet" sub="credits" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-bold tracking-wide">RENTAL BENEFITS</p>
            <div className="grid gap-3 lg:grid-cols-2">
              <Benefit title="10% Off" text="Exclusive discount" sub="when you rent" />
              <Benefit title="Get 10% Cashback" text="On every order" sub="" />
            </div>
          </div>
          <a href="#" className="self-end justify-self-start rounded-full bg-lime px-8 py-3 text-lg font-bold text-ink transition-transform hover:scale-105 md:col-span-2 xl:col-span-1 xl:justify-self-end">
            Know More ↗
          </a>
        </div>
      </section>
    </>
  );
}

export function RentOutBanner() {
  return (
    <section className="col-span-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#2A48D6] via-[#4A6AEA] to-[#2A48D6] px-4 py-6 text-center text-white md:rounded-card md:px-6 md:py-10" aria-label="Rent out your gear">
      <p className="text-sm md:text-3xl">Got gear you don't use anymore?</p>
      <h2 className="mt-1 font-display text-xl font-bold md:mt-2 md:text-4xl xl:text-5xl">Rent Out Your Gear on SharePal</h2>
      <a href="#" className="mt-4 inline-block rounded-full bg-lime px-6 py-2 text-sm font-bold text-ink transition-transform hover:scale-105 md:mt-6 md:px-8 md:py-3 md:text-lg">
        Earn With Us ↗
      </a>
    </section>
  );
}
