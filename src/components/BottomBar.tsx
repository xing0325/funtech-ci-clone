import { SoundToggle } from "@/components/sound/SoundToggle";

const Arrow = ({ dir = "left" }: { dir?: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    {dir === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
  </svg>
);

function SideLink({ n, title, slug, dir }: { n: string; title: string; slug: string; dir: "left" | "right" }) {
  const square = (
    <span className="flex size-11 shrink-0 items-center justify-center rounded bg-key text-background">
      <Arrow dir={dir} />
    </span>
  );
  return (
    <a href={slug} className="group flex items-center gap-3">
      {dir === "left" && square}
      <span className="hidden font-key text-[15px] leading-none tracking-[0.04em] sm:inline">
        <span className="text-key">{n}.</span> <span className="text-foreground">{title}</span>
      </span>
      {dir === "right" && square}
    </a>
  );
}

export function BottomBar() {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 h-16 px-2">
      <div className="relative flex h-full items-center justify-between">
        <SideLink n="08" title="ALL FOR FUN" slug="/en/all-for-fun" dir="left" />
        <SideLink n="10" title="LOGO VARIATION" slug="/en/logo-variation" dir="right" />
      </div>

      {/* centered control cluster */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2">
        <button className="pointer-events-auto flex h-11 items-center gap-2 rounded bg-foreground/10 px-4 text-[15px] font-semibold text-foreground transition hover:bg-foreground/15">
          PDF
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
          </svg>
        </button>

        <button className="group pointer-events-auto flex h-11 w-40 items-center justify-center gap-2 rounded bg-key text-[15px] font-semibold tracking-[0.05em] text-background transition group-hover:scale-95">
          MENU
          <span className="inline-flex transition-transform duration-300 group-hover:rotate-90" aria-hidden="true">
            <svg viewBox="0 0 9 9" width="9" height="9" fill="currentColor">
              <circle cx="2" cy="2" r="1.3" /><circle cx="7" cy="2" r="1.3" /><circle cx="2" cy="7" r="1.3" /><circle cx="7" cy="7" r="1.3" />
            </svg>
          </span>
        </button>

        <SoundToggle />

        <div className="pointer-events-auto flex overflow-hidden rounded border border-foreground/20 text-[13px] font-semibold">
          <span className="px-3 py-2 leading-none text-foreground/45">JP</span>
          <span className="bg-foreground px-3 py-2 leading-none text-background">EN</span>
        </div>
      </div>
    </div>
  );
}
