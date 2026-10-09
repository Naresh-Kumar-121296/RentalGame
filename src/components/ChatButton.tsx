export default function ChatButton() {
  return (
    <button
      aria-label="Chat with us"
      className="fixed bottom-[76px] right-2 z-40 h-[76px] w-[76px] origin-bottom-right scale-[0.6] transition-transform active:scale-90 md:bottom-24 md:right-6 md:scale-100 md:hover:scale-105 lg:bottom-6"
    >
      <span className="absolute right-0 top-0 h-12 w-12 rounded-full bg-brand" />
      <span className="absolute right-1 top-9 h-4 w-4 rotate-45 bg-brand" />
      <span className="absolute bottom-1 left-0 flex h-[52px] w-[60px] items-center justify-center gap-1 rounded-full bg-[#7CE000]">
        {[0, 1, 2].map((k) => <span key={k} className="h-2.5 w-2.5 rounded-full bg-white" />)}
      </span>
    </button>
  );
}
