/**
 * Pujo Passport, our Durga Puja 2026 web app, served from this site at /pujo-passport
 * (a rewrite in vercel.json to its own Vercel project).
 *
 * Its season has a hard end: stamps close at 5 am IST on Thursday 22 October 2026. The
 * banner and hero card read SEASON_CLOSES at render time, so they stop saying "live" on
 * their own. Nothing here has to be redeployed for that, which matters because the app
 * is under a deploy freeze from 16 to 22 October.
 *
 * Every number below comes from Pujo Passport's own data (data/pandals.csv and
 * data/routes.csv in that repo, 388 and 36 rows on 15 Oct 2026). Change them only from there.
 */
export const PUJO_URL = '/pujo-passport';

export const PUJO_FACTS = {
  pandals: 388,
  trails: 36,
} as const;

/** Stamps close at 5 am IST on 22 Oct 2026, the morning after Dashami. */
const SEASON_CLOSES = Date.parse('2026-10-22T05:00:00+05:30');

export function isPujoSeasonLive(now: number = Date.now()): boolean {
  return now < SEASON_CLOSES;
}

/** Pujo Passport's own palette, so the promo reads as that app rather than as ours. */
export const PUJO_INK = {
  sindoor: '#D7182A',
  gold: '#E09400',
  paper: '#FDFCFA',
  ink: '#1C1917',
} as const;
