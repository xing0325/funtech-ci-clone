/**
 * The full 14-section FunTech brand-identity deck.
 * Content + asset paths reverse-engineered from ci.funtech.inc's RSC payloads and
 * downloaded assets (see docs/research/original/). Copy is placeholder-grade — swap
 * for your own once the layout is locked.
 */

export type SlideKind =
  | "home"
  | "statement"
  | "visionVisual"
  | "wayIndex"
  | "way"
  | "logoDetails"
  | "logoVariation"
  | "tenthItem"
  | "ending"
  | "weAre"
  | "fin";

export interface Slide {
  n: string; // "01".."14"
  slug: string; // route-ish key, e.g. "logo-details"
  title: string; // sidebar label (UPPERCASE)
  thumb: string; // /thumbnails/en/<thumb>.webp
  kind: SlideKind;
  kicker?: string; // small eyebrow label, e.g. "WAY_01"
  headline?: string; // big display text (may contain \n)
  body?: string[]; // paragraphs (each may contain \n)
  theme?: "fun" | "volt" | "breaker"; // some slides pin an accent
}

export const SLIDES: Slide[] = [
  {
    n: "01", slug: "home", title: "HOME", thumb: "home", kind: "home",
    headline: "FUNTECH\nBRAND\nIDENTITY",
    body: ["UPDATED ON MAY 2026"],
  },
  {
    n: "02", slug: "brand-message", title: "BRAND MESSAGE", thumb: "brand-message", kind: "statement",
    kicker: "CREATIVITY IS", headline: "“ROMAN”",
    body: [
      "We enjoy creativity as a team.\nWe share the journey with our clients.\nWe chase “ROMAN”, together.\nTen years behind us.\nA new decade to evolve.",
    ],
  },
  {
    n: "03", slug: "ci-update", title: "CI UPDATE", thumb: "ci-update", kind: "statement",
    kicker: "FUNTECH CI", headline: "FOR\nNEXT\nYEARS",
    body: ["A renewal of who we are — the corporate identity that carries FunTech into its next ten years."],
  },
  {
    n: "04", slug: "vision-visual", title: "VISION VISUAL", thumb: "vision-visual", kind: "visionVisual",
    headline: "A Team of\nSuperstar-Creators",
    body: [
      "Each individual shines in their own way, coming together to create overwhelming, electrifying creativity that sends a jolt straight to the heart.",
      "Our CI expresses FunTech as a playful container where our Superstar-Creators gather, collide, and spark.",
    ],
  },
  {
    n: "05", slug: "funtech-way", title: "FUNTECH WAY", thumb: "funtech-way", kind: "wayIndex",
    headline: "A shared language\nfor the next 10 years",
    body: [
      "To guide our next decade, we defined a core set of shared values that will shape how FunTech thinks, creates, and moves forward.",
    ],
  },
  {
    n: "06", slug: "megavolt-creative", title: "A MILLION-VOLT CREATIVE", thumb: "megavolt-creative", kind: "way",
    kicker: "WAY_01", headline: "Million-Volt\nCreativity", theme: "volt",
    body: [
      "A powerful Creativity as if you get an electric shock to the heart. By riding the accelerating evolution of technology, we continue to break through moments of “creative saturation” and deliver million-volt-level craftsmanship to the world.",
    ],
  },
  {
    n: "07", slug: "breakers-of-victory", title: "BREAKERS OF VICTORY", thumb: "breakers-of-victory", kind: "way",
    kicker: "WAY_02", headline: "Victory\nBreaker", theme: "breaker",
    body: [
      "Not only through craft, but through strategy. We build brands that break through our clients’ barriers, creating sources of energy that drive victory and transformation. We stand beside our clients as “Breakers” who initiate change.",
    ],
  },
  {
    n: "08", slug: "all-for-fun", title: "ALL FOR FUN", thumb: "all-for-fun", kind: "way",
    kicker: "WAY_03", headline: "All for Fun", theme: "fun",
    body: [
      "We fully enjoy technology and take joy in craftsmanship. That spirit of fun overflows into our creative work, sets users’ hearts in motion, and crosses borders around the world. For us, enjoyment is everything.",
    ],
  },
  {
    n: "09", slug: "logo-details", title: "LOGO DETAILS", thumb: "logo-details", kind: "logoDetails",
    headline: "Logo Details",
  },
  {
    n: "10", slug: "logo-variation", title: "LOGO VARIATION", thumb: "logo-variation", kind: "logoVariation",
    headline: "Logo Variation",
    body: ["The logo flexes across dimensions and materials while staying unmistakably FunTech."],
  },
  {
    n: "11", slug: "10th-special-item", title: "10th SPECIAL ITEM", thumb: "10th-special-item", kind: "tenthItem",
    kicker: "10th", headline: "Item",
    body: [
      "To celebrate our 10th anniversary and CI renewal, we created a lively collection of festival-inspired items under the theme “Million Volt Ennichi.” They will be given away through a lottery, so be sure to check out the details.",
    ],
  },
  {
    n: "12", slug: "ending-message", title: "ENDING MESSAGE", thumb: "ending-message", kind: "ending",
    headline: "Dear all,",
    body: [
      "In May 2026, FunTech will celebrate its 10th anniversary. When we started, we were almost a student-led company. None of us came from major advertising agencies or fine art universities. Yet we were able to grow, through sheer effort, into the creative company we are proud of today.",
      "Over the next decade, we will step into a broader field: creative branding, on a larger stage than ever before. As the starting point of that challenge, we renewed our own CI.",
      "We will continue to fully explore every emerging technology of the moment and relentlessly pursue creativity that sends a jolt of electricity through you. Please look forward to what’s next.",
    ],
  },
  {
    n: "13", slug: "we-are-funtech", title: "WE ARE FUNTECH", thumb: "we-are-funtech", kind: "weAre",
    headline: "WE ARE\nFUNTECH",
  },
  {
    n: "14", slug: "fin", title: "FIN", thumb: "fin", kind: "fin",
    headline: "FIN",
  },
];

export const slideByIndex = (i: number) => SLIDES[(i + SLIDES.length) % SLIDES.length];
