import { details01, details02, details03 } from "./artwork";

const ART: Record<"01" | "02" | "03", string> = {
  "01": details01, // FunTech logo mark (faint) + orange fills
  "02": details02, // star geometric construction
  "03": details03, // organic blob pattern
};

/** Inlines the exact vector artwork extracted from the live site.
 *  Inlined (not <img>) so the paths' `var(--color-key)` resolves to the active theme. */
export function CardArt({ id, className = "" }: { id: "01" | "02" | "03"; className?: string }) {
  return <div className={`absolute inset-0 ${className}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: ART[id] }} />;
}
