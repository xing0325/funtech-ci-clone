/** The "09. LOGO DETAILS 📝" pill at the top-left of the stage. */
export function SectionBadge() {
  return (
    <div className="absolute left-0 top-0 z-20 inline-flex items-center gap-[0.6cqw] rounded-full border border-foreground/40 px-[1.1cqw] py-[0.5cqw]">
      <span className="font-key text-[0.95cqw] leading-none tracking-[0.06em] text-foreground">
        09. LOGO DETAILS
      </span>
      <span className="text-[0.95cqw] leading-none" aria-hidden="true">
        📝
      </span>
    </div>
  );
}
