export type ArtId = "01" | "02" | "03";

export interface DetailCardData {
  art: ArtId;
  label: string;
  title: string;
  body: string[]; // paragraphs / lines
  /** art-box position within the 16:9 stage, in cqw units */
  left: number;
  top: number;
}

export const CARDS: DetailCardData[] = [
  {
    art: "01",
    label: "DETAILS_01",
    title: "Play Technology\nAll In",
    body: [
      "Boyish in impulse, street in style. A playful, boundary-breaking spirit in a cartoon-inspired look with charm and a hint of edge. Unbound by convention, it goes all in on playing with creativity.",
    ],
    left: 2,
    top: 14,
  },
  {
    art: "02",
    label: "DETAILS_02",
    title: "Star Creators",
    body: [
      "We are a collective of star creators who shine with originality.",
      "The stars woven into the “U” and “C” continue to illuminate the kind of organization FunTech strives to be.",
    ],
    left: 35,
    top: 9,
  },
  {
    art: "03",
    label: "DETAILS_03",
    title: "Ever-Evolving",
    body: [
      "Its ever-shifting form is a style built to play boldly through an unpredictable era.",
      "No matter how technology or the environment changes, we ride those waves with a sense of play.",
    ],
    left: 68,
    top: 2,
  },
];

export interface SectionNav {
  n: string;
  title: string;
  slug: string;
  thumb: string;
}

/** All 14 deck sections for the left filmstrip. */
export const SECTIONS: SectionNav[] = [
  { n: "01", title: "HOME", slug: "/en", thumb: "home" },
  { n: "02", title: "BRAND MESSAGE", slug: "/en/brand-message", thumb: "brand-message" },
  { n: "03", title: "CI UPDATE", slug: "/en/ci-update", thumb: "ci-update" },
  { n: "04", title: "VISION VISUAL", slug: "/en/vision-visual", thumb: "vision-visual" },
  { n: "05", title: "FUNTECH WAY", slug: "/en/funtech-way", thumb: "funtech-way" },
  { n: "06", title: "A MILLION-VOLT CREATIVE", slug: "/en/megavolt-creative", thumb: "megavolt-creative" },
  { n: "07", title: "BREAKERS OF VICTORY", slug: "/en/breakers-of-victory", thumb: "breakers-of-victory" },
  { n: "08", title: "ALL FOR FUN", slug: "/en/all-for-fun", thumb: "all-for-fun" },
  { n: "09", title: "LOGO DETAILS", slug: "/en/logo-details", thumb: "logo-details" },
  { n: "10", title: "LOGO VARIATION", slug: "/en/logo-variation", thumb: "logo-variation" },
  { n: "11", title: "10th SPECIAL ITEM", slug: "/en/10th-special-item", thumb: "10th-special-item" },
  { n: "12", title: "ENDING MESSAGE", slug: "/en/ending-message", thumb: "ending-message" },
  { n: "13", title: "WE ARE FUNTECH", slug: "/en/we-are-funtech", thumb: "we-are-funtech" },
  { n: "14", title: "FIN", slug: "/en/fin", thumb: "fin" },
];

export const ACTIVE_INDEX = 8; // 09 LOGO DETAILS
