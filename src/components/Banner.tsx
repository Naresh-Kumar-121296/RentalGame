// Character/console artwork from the original is not included. Add the images to each side if you have the assets.
export default function Banner() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#5E1AA6] via-[#7A2BC4] to-[#5E1AA6] px-4 py-5 text-left text-white md:rounded-card md:px-6 md:py-9 md:text-center">
      <h1 className="font-display text-2xl font-bold md:text-5xl lg:text-6xl">Gaming Consoles</h1>
      <p className="mt-2 max-w-[75%] text-xs font-bold md:mx-auto md:mt-3 md:max-w-2xl md:text-xl lg:text-2xl">
        Rent the latest gaming gadgets from <span className="font-display italic">SharePal</span> PS5, Xbox, Oculus VR, Racing Wheel on rent.
      </p>
      <ul className="mt-3 flex items-center gap-3 text-sm font-bold md:mt-5 md:justify-center md:gap-6 md:text-2xl lg:text-3xl" aria-label="Brands">
        <li>XBOX</li>
        <li aria-hidden className="h-4 w-px bg-white/40 md:h-7" />
        <li>PS5</li>
        <li aria-hidden className="h-4 w-px bg-white/40 md:h-7" />
        <li>Meta</li>
      </ul>
    </section>
  );
}
