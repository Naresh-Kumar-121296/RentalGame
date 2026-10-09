export default function Breadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="bg-surface">
      <div className="mx-auto max-w-[1520px] px-4 py-5 text-base md:py-8 md:text-lg md:px-6 md:pl-[40px]">
        <a href="#" className="font-medium text-ink/70 hover:text-ink">Bangalore</a>
        <span className="mx-3 text-ink-soft" aria-hidden>›</span>
        <span className="font-semibold" aria-current="page">Gaming gadgets on rent</span>
      </div>
    </nav>
  );
}
