# Action plan — seekolabs.tech and the Ludo Apex launch

Sequenced by what unblocks what, not by what is most interesting. **Owner** is either
**you** (I cannot do it) or **me** (I can, and will ask before anything that touches your
live site or git).

The critical path to a Play Store release runs through phases 0, 1 and 3 only. Phase 2 can
happen whenever, and phase 5 is all after launch.

---

## Phase 0 — Four answers, today

Nothing below can be verified until these are settled. None of them takes long, and three
of the four are just checking something.

| # | Do | Why it blocks |
|---|---|---|
| 0.1 | **Confirm which GitHub repo Vercel is connected to.** Your local `origin` is `indrajit-10/Seekolabs-Act`; you sent me `alphabir/Seekolabs-Act`. Check the Vercel project's Git settings. | Push to the wrong one and nothing deploys, with no error. Everything in phase 1 depends on this. |
| 0.2 | **Make `support@seekolabs.tech` and `growth@seekolabs.tech` real, monitored mailboxes.** | Google Play publishes the developer contact and requires it to work. It is already written into two privacy policies. |
| 0.3 | **Find out whether the 14-day closed test applies to you.** It applies to personal developer accounts created after 13 November 2023. Check the SeekoLabs account for existing published apps and its creation date. | This is the difference between roughly **one week** and roughly **three weeks** to live. It changes the whole shape of phase 3. |
| 0.4 | **Confirm governing law.** The Terms name India, with Kolkata jurisdiction. | One line to change if wrong; awkward to change after someone signs against it. |

---

## Phase 1 — Ship what is already built

Everything here exists and is verified locally. It is sitting uncommitted in your working
tree.

**What is waiting:** the Ludo Apex page, its privacy policy, SeekoLabs' Privacy Policy and
Terms, the Google Analytics tag on all three documents, the Search Console meta tag, the
auto-generating sitemap, the `connect@` → `growth@` swap, and the footer legal links.

| # | Do | Owner |
|---|---|---|
| 1.1 | **Merge PR #1.** It is three commits of cleanup and site metadata, already reviewed by you. Vercel deploys `main`, so this is also what puts the newer homepage metadata live. | you |
| 1.2 | **Commit the static pages and the analytics work as a second PR.** Kept separate so PR #1 stays reviewable. | me, on your word |
| 1.3 | **Merge it and let Vercel deploy.** | you |
| 1.4 | **Verify live**, in this order: `/ludo-apex/privacy.html` first because it is the Play blocker, then `/ludo-apex/`, `/privacy.html`, `/terms.html`, `/sitemap.xml`, and that GA registers a hit in real-time. | me |
| 1.5 | **Verify the domain in Search Console.** Add the TXT record `google-site-verification=gL_tASx…` at your DNS provider for a Domain property. Or try the Google Analytics method first, since GA is now live under the same account — it may verify instantly with no DNS at all. | you |
| 1.6 | **Submit `https://www.seekolabs.tech/sitemap.xml`** in Search Console. | you |

**Done when:** the privacy policy URL loads on the real domain. That is the single item
the Play submission cannot proceed without.

---

## Phase 2 — Homepage rewrite

Independent of the launch. Do it whenever; it does not block phase 3.

Needs your go-ahead because it changes your live homepage.

| # | Do | Owner |
|---|---|---|
| 2.1 | **Fix the ribbon line.** It currently reads *"Publishing House Model — Not an Agency."* You do both now, so it is false as written. | me |
| 2.2 | **Split the page by audience, not by offering.** Two paths under the hero: *See our apps* and *Build with us*. This is the structural fix for the publisher-versus-studio tension; copy alone cannot resolve it. | me |
| 2.3 | **Rewrite Hero, Offerings and Contact** to the corrected brief. Tagline: value-oriented in the hero, *"Vibecoding the future of mobile experiences"* saved for Who We Are, where it describes the team rather than what a client is buying. | me |
| 2.4 | **Ludo spotlight using the live 3D board**, not a phone mockup. Lazy-loaded when the section scrolls into view, desktop only; mobile links through to `/ludo-apex/` so the 2MB never lands on a phone. Unblocks the section without waiting for screenshots, and it is the thing no competitor has. | me |
| 2.5 | **Replace the three placeholder cards** with one honest line and one client card pointing at `growth@`. | me |
| 2.6 | **Re-run the contrast audit** across both themes after the rewrite. | me |

---

## Phase 3 — The Play Store release

This is the long pole. **Screenshots gate the whole phase**, and only you can capture them.

| # | Do | Owner |
|---|---|---|
| 3.1 | **Capture 4–6 screenshots** from the current build, 1080×1920. The `_*.png` files at the repo root predate the August restyle and show a UI the app no longer has. Play rejects mockups, so these must be real. | you |
| 3.2 | **Enter the keystore passwords** in Unity's Publishing Settings. They are at `D:\CLAUDE\ludo\release\keystore\KEYSTORE-CREDENTIALS.txt`. Unity does not persist them between sessions. | you |
| 3.3 | **Set Debug Symbols to SymbolTable.** It lives in gitignored settings, so it does not survive a fresh clone and must be checked before every release build. | you |
| 3.4 | **Build the AAB** (App Bundle, not APK). Verify it is release-signed, not "Android Debug". | you |
| 3.5 | **Smoke-test on a real phone: one complete match, start to finish.** Check the four things the Unity Editor physically cannot show you — safe area around the notch and gesture bar, ASTC banding on the gold gradients, the Settings screen not overlapping EXIT, and the splash colours. | you |
| 3.6 | **Create the app and the store listing.** Copy is written in `store/listing.md`; the icon and feature graphic already exist. | you |
| 3.7 | **Complete the App Content forms.** All of them block rollout. Answers are pre-worked in `store/submission-guide.md`, including the gambling question, which is now unambiguously No since the coin economy was removed. | you |
| 3.8 | **Release.** If 0.3 said you are exempt, go straight to production. If not, closed testing with **15–16 recruited testers** to hold 12 opted-in for 14 continuous days, and chase every one until they have actually installed. | you |

---

## Phase 4 — Launch day, about fifteen minutes

| # | Do | Owner |
|---|---|---|
| 4.1 | **Swap the Play link.** In `public/ludo-apex/index.html`, point `#cta` at the store URL and delete the two `cta-note` lines. Never leave a live-looking button that goes nowhere. | me |
| 4.2 | **Update the homepage spotlight CTA** to the official Google Play badge. | me |
| 4.3 | **Set up Play pre-registration if you launch it before the app is public.** Google runs the waitlist, notifies everyone on launch day, and it counts toward early installs. This replaces the "beta waitlist form" in the original brief, which you have no backend to receive. | you |

---

## Phase 5 — After launch

Ordered by value, not urgency.

- **Founder section with LinkedIn profiles.** The cheapest trust on the page, and it matters
  most to the client audience. You said not now; revisit before you chase client work.
- **A 1200×630 share image.** Your link previews currently use a small square card because
  the only image available is a 256×256 icon.
- **Decide on the cookie consent banner.** Google Analytics sets cookies before asking, which
  needs prior consent from EU visitors. Three options: geo-gate the tag, add a banner, or
  accept the exposure knowingly. It is a decision, not an oversight.
- **Move the Express bundle out of `dist/`.** `/server.cjs` and `/server.cjs.map` are
  publicly downloadable from the live site, and the map contains the full `server.ts`
  source. No credentials in it, so this is low severity. Drop `--sourcemap` and point
  `--outfile` outside `dist/`.
- **Put real numbers in the hero ribbon** once there are any. It currently shows labels
  where a visitor expects metrics.
- **Real screenshots into the spotlight**, replacing or joining the 3D board.

---

## Known risks, carried

| Risk | Where it bites |
|------|----------------|
| **The 14-day gate.** Unresolved until 0.3. | Three weeks versus one. Plan the launch date after you know. |
| **Testers dropping below 12** resets the counter to zero. | Recruit 15–16, not 12. |
| **A crash in the first test build** makes testers uninstall, which drops the count. | That is what 3.5 is for. |
| **GA without consent** in the EU. | Legal exposure, not a bug. Phase 5. |
| **Changing the developer email after submission** means editing the listing and the hosted policy together; a mismatch is a rejection reason. | Settle it in 0.2 and never touch it. |

---

## What I am waiting on

Say the word and I start:

1. **"Commit and PR"** → phase 1.2.
2. **"Do the homepage"** → phase 2, all of it.

I will not commit, push or open a PR without you saying so.
