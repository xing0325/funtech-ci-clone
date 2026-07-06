import type { Slide } from "@/data/deck";

/** Typographic slides: home title card, big statements, the three WAY values, the ending letter, and WE ARE / FIN closers. */
export function TextSlide({ slide }: { slide: Slide }) {
  const { kind, kicker, headline = "", body = [] } = slide;

  if (kind === "home") {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <h1
          className="text-noise-edge font-key font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-foreground"
          style={{ fontSize: "10cqw" }}
        >
          {headline.split("\n").map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>
        {body[0] && (
          <p className="mt-[3cqh] font-key uppercase tracking-[0.3em] text-foreground/60" style={{ fontSize: "1.3cqw" }}>
            {body[0]}
          </p>
        )}
      </div>
    );
  }

  if (kind === "weAre" || kind === "fin") {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <h1
          className="text-noise-edge font-key font-extrabold uppercase leading-[0.86] tracking-[-0.01em] text-key"
          style={{ fontSize: kind === "fin" ? "18cqw" : "11cqw" }}
        >
          {headline.split("\n").map((l, i) => (
            <span key={i} className="block">{l}</span>
          ))}
        </h1>
      </div>
    );
  }

  if (kind === "ending") {
    return (
      <div className="absolute inset-0 flex flex-col px-[2cqw] py-[1cqw]">
        <h2 className="text-noise-edge font-bold leading-none text-foreground" style={{ fontSize: "5cqw", marginTop: "4cqh" }}>
          {headline}
        </h2>
        <div className="mt-[4cqh] grid flex-1 grid-cols-3 gap-[2cqw] pr-[1cqw]">
          {body.map((para, i) => (
            <p key={i} className="whitespace-pre-line text-foreground/85" style={{ fontSize: "1.15cqw", lineHeight: 1.7 }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    );
  }

  // statement (02/03) + way (06/07/08): eyebrow + huge headline + body
  const big = kind === "statement";
  return (
    <div className="absolute inset-0 flex flex-col justify-center px-[3cqw]">
      {kicker && (
        <p className="mb-[1.4cqh] font-key uppercase tracking-[0.14em] text-key" style={{ fontSize: big ? "2cqw" : "1.6cqw" }}>
          {kicker}
        </p>
      )}
      <h1
        className="text-noise-edge font-extrabold uppercase leading-[0.92] tracking-[-0.01em] text-foreground"
        style={{ fontSize: big ? "8.5cqw" : "6.5cqw" }}
      >
        {headline.split("\n").map((l, i) => (
          <span key={i} className="block">{l}</span>
        ))}
      </h1>
      <div className="mt-[3cqh] max-w-[46cqw]">
        {body.map((para, i) => (
          <p key={i} className="whitespace-pre-line text-foreground/85" style={{ fontSize: "1.35cqw", lineHeight: 1.7 }}>
            {para}
          </p>
        ))}
      </div>
    </div>
  );
}
