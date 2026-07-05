import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NoiseEdgeFilter } from "@/components/NoiseEdgeFilter";
import { SoundProvider } from "@/components/sound/SoundProvider";
import { BASE } from "@/lib/asset";

const noiseVars = `
[data-theme="fun"]{--noise-h:url(${BASE}/noise-border/fun-h.png);--noise-v:url(${BASE}/noise-border/fun-v.png);}
[data-theme="volt"]{--noise-h:url(${BASE}/noise-border/volt-h.png);--noise-v:url(${BASE}/noise-border/volt-v.png);}
[data-theme="breaker"]{--noise-h:url(${BASE}/noise-border/breaker-h.png);--noise-v:url(${BASE}/noise-border/breaker-v.png);}`;

const elevon = localFont({
  variable: "--font-elevon",
  display: "swap",
  src: [
    { path: "../../public/fonts/elevon-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/elevon-800.woff2", weight: "800", style: "normal" },
  ],
});

const proxima = localFont({
  variable: "--font-proxima",
  display: "swap",
  src: [
    { path: "../../public/fonts/proxima-nova-600.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/proxima-nova-700.woff2", weight: "700", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "FUNTECH BRAND IDENTITY",
  description: "FunTech brand identity — Logo Details. A million-volt creative studio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="fun" className={`${elevon.variable} ${proxima.variable}`}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: noiseVars }} />
        <NoiseEdgeFilter />
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
