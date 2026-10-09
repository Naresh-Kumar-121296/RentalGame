import { useState } from "react";

// Answers are placeholders. Replace them with the original page's text.
const FAQS = [
  ["How can I rent from SharePal?", "Choose your products, pick delivery and pickup dates, complete verification and pay. We deliver to your doorstep."],
  ["If I rent multiple products, do I need to extend the rental duration for all or partial extension is possible?", "Placeholder answer. Copy the exact policy from the original page."],
  ["When does the rental start?", "Placeholder answer. Copy the exact policy from the original page."],
  ["What will be the condition of the products at the time of delivery?", "Placeholder answer. Copy the exact policy from the original page."],
  ["Why is verification required?", "Placeholder answer. Copy the exact policy from the original page."],
];
const MORE = [
  ["How do I return a product?", "Placeholder answer."],
  ["What if the product gets damaged?", "Placeholder answer."],
  ["Is there a security deposit?", "Placeholder answer."],
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-transparent">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-2 py-4 text-left text-base font-semibold md:px-5 md:py-5 md:text-lg"
      >
        {q}
        <svg viewBox="0 0 24 24" className={"h-5 w-5 shrink-0 transition-transform duration-200 " + (open ? "rotate-180" : "")} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div className={"grid transition-all duration-300 " + (open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <p className="overflow-hidden px-2 text-ink-soft md:px-5"><span className={open ? "block pb-5" : "block"}>{a}</span></p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [more, setMore] = useState(false);
  const list = more ? [...FAQS, ...MORE] : FAQS;
  return (
    <section id="faq" className="mx-auto max-w-[1520px] px-4 pb-10 md:px-6">
      <div className="rounded-[28px] bg-white p-6 md:p-12">
        <h2 className="text-xl font-bold md:text-3xl">Frequently Asked Questions (FAQs)</h2>
        <div className="mt-6">{list.map(([q, a]) => <Item key={q} q={q} a={a} />)}</div>
        {!more && (
          <button onClick={() => setMore(true)} className="mt-3 w-full rounded-full bg-surface py-4 text-lg font-semibold transition-colors hover:bg-ink-line">
            View more FAQ's
          </button>
        )}
      </div>
    </section>
  );
}
