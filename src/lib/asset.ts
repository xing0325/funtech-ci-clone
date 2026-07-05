/**
 * Prefixes raw public asset URLs (img src, audio src, CSS url()) with the deploy
 * basePath so they resolve on GitHub Pages sub-paths.
 * BASE is "" in local dev and "/funtech-ci-clone" in the Pages build (set via env).
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string): string => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
