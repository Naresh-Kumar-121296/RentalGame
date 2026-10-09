import { FOOTER_COLUMNS } from "../lib/footerLinks";

export default function Footer() {
  return (
    <footer className="bg-night text-white">
      <div className="mx-auto max-w-[1520px] px-4 py-10 md:px-6 md:py-12 md:pl-[40px]">
        <div className="grid gap-x-8 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {FOOTER_COLUMNS.map((c) => (
            <section key={c.title} aria-labelledby={"f-" + c.title}>
              <h3 id={"f-" + c.title} className="text-lg font-bold leading-snug md:text-2xl">{c.title}</h3>
              <ul className="mt-4 space-y-3">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="text-white/80 transition-colors hover:text-white hover:underline">{l}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-lg font-bold underline">Renting from SharePal in Bangalore</h3>
          <p className="mt-2 leading-relaxed text-white/80">
            SharePal makes renting simple across Bangalore, from Koramangala and Indiranagar to Whitefield. Rent cameras, action cameras, gaming
            consoles, projectors, speakers, trekking gear, riding gear and creator gear with free home delivery and pickup, flexible tenures and an
            easy-to-use platform. Rent what you need, when you need it, without the commitment of buying.
          </p>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold">Categories on Rent</h3>
          <p className="mt-2 leading-loose text-white/80">
            {FOOTER_COLUMNS.flatMap((c) => c.links).filter((v, i, a) => a.indexOf(v) === i).map((l, i) => (
              <span key={l}>{i > 0 && <span className="mx-2 text-white/30">|</span>}<a href="#" className="hover:text-white hover:underline">{l}</a></span>
            ))}
          </p>
        </div>

        <p className="mt-10 border-t border-white/10 pt-6 text-sm text-white/50">
          Recreation built for an assignment. Not affiliated with SharePal.
        </p>
      </div>
    </footer>
  );
}
