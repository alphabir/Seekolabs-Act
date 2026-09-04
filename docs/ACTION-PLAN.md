# Action plan — seekolabs.tech and the Ludo Apex launch

Sequenced by what unblocks what. **Owner** is either **you** (I cannot do it) or **me**.

Last updated after the homepage rewrite. Phase 1 has shipped and is live; phase 2 is built
and waiting to be pushed.

---

## Phase 0 — Decisions

| # | Do | State |
|---|---|---|
| 0.1 | **Which repo does Vercel deploy?** | **Answered.** `alphabir/Seekolabs-Act`, production branch `main`. Confirmed from the deployments list, which shows it building `indrajit-10:` fork PRs — only possible when the base repo is the connected one. |
| 0.2 | **Email routing.** | **Decided.** `support@` for users and the Play listing, `growth@` for business. `connect@` is gone from the codebase. **Still to do: make both mailboxes real and monitored.** Google publishes the developer contact and requires it to work. |
| 0.3 | **Does the 14-day closed test apply?** It applies to personal developer accounts created after 13 November 2023. Check the account for existing published apps and its creation date. | **OPEN.** This is one week versus three, and it shapes all of phase 3. |
| 0.4 | **Governing law** — the Terms name India, Kolkata jurisdiction. | **OPEN.** One line to change if wrong. |

---

## Phase 1 — Static pages, analytics, SEO — **SHIPPED**

Live on `main` as of 4 September. `/ludo-apex/`, `/ludo-apex/privacy.html`, `/privacy.html`,
`/terms.html`, GA4 on every document, the Search Console tag, the generated sitemap, the
`connect@` → `growth@` rename, and the footer legal links.

Two follow-ups still yours:

- **Finish Search Console verification** — the tag is live, the verification is not done.
  Try the Google Analytics method first, since GA is live under the same account.
- **Submit `https://www.seekolabs.tech/sitemap.xml`** in Search Console.

---

## Phase 2 — Homepage rewrite — **BUILT, NOT PUSHED**

Positioning fixed in all three places that denied the client work. Offerings rewritten.
The live 3D board moved into the hero so it is above the fold. Ludo Apex spotlight section.
A real FAQ, breadcrumbs, `llms.txt`, a 404 page and security headers.

Waiting on your word to commit and push.

---

## Phase 3 — The Play Store release

**Screenshots gate this entire phase**, and only you can take them.

| # | Do | Owner |
|---|---|---|
| 3.1 | **Capture 4–6 screenshots** from the current build, 1080×1920. The `_*.png` files at the repo root predate the August restyle and show a UI the app no longer has. Play rejects mockups. | you |
| 3.2 | **Enter the keystore passwords** in Unity. They are at `D:\CLAUDE\ludo\release\keystore\KEYSTORE-CREDENTIALS.txt`; Unity does not persist them between sessions. | you |
| 3.3 | **Set Debug Symbols to SymbolTable.** Machine-local, so check it before every release build. | you |
| 3.4 | **Build the AAB.** Verify it is release-signed, not "Android Debug". | you |
| 3.5 | **Play one complete match on a real phone.** Check the four things the Editor cannot show: safe area, ASTC banding on the gold gradients, the Settings screen not overlapping EXIT, and the splash colours. | you |
| 3.6 | **Create the app and store listing.** Copy is in `store/listing.md`; icon and feature graphic already exist. | you |
| 3.7 | **Complete the App Content forms.** All block rollout. Answers pre-worked in `store/submission-guide.md`. | you |
| 3.8 | **Release.** Straight to production if 0.3 says you are exempt; otherwise closed testing with 15–16 recruited testers to hold 12 for 14 continuous days. | you |

---

## Phase 4 — Launch day

| # | Do | Owner |
|---|---|---|
| 4.1 | **Swap the Play link** in `public/ludo-apex/index.html` and the homepage spotlight, and delete the "Coming soon" notes. Never leave a store button that goes nowhere. | me |
| 4.2 | **Update `llms.txt`** — it currently states the app is unreleased. | me |
| 4.3 | **Set up Play pre-registration** if you want a waitlist before launch. Google runs it, notifies everyone on launch day, and it counts toward early installs. No form and no backend needed. | you |

---

## Phase 5 — Next website phase

Everything deferred, with the reason it was deferred.

### Carried over from the pre-push review

- **Content-Security-Policy.** Not added because the pre-paint theme scripts and the GA
  snippet are inline, so a CSP would need `unsafe-inline` and give up most of its value.
  Doing it properly needs nonces, which needs a server, and Vercel serves this as static
  files. **Revisit when there is a serverless layer** — which the contact form would bring.
- **`sameAs` on the Organization schema.** Where LinkedIn and company profiles go, and one
  of the stronger signals for a Google knowledge panel. **Blocked on the founder profiles**,
  so it lands with the Who We Are section.
- **Open Graph images on the legal pages.** A shared link to the privacy policy currently
  gets no preview card. Low value, but trivial once a share image exists.

### Also outstanding

- **Who We Are section** with founder names, roles and LinkedIn links. The cheapest trust on
  the page and it matters most to the client audience. Unblocks `sameAs` above.
- **A 1200×630 share image for Ludo Apex.** The current one is a 256×256 icon, which is why
  that page declares the `summary` card rather than `summary_large_image`.
- **Cookie consent banner.** GA sets cookies before asking, which needs prior consent from
  EU visitors. Geo-gate the tag, add a banner, or accept the exposure knowingly. A decision,
  not an oversight.
- **Core Web Vitals on the live site.** The board loads after first paint so it should not
  affect LCP, but that is reasoning rather than measurement. Speed Insights is already
  enabled on the Vercel project.
- **A real contact form.** Currently mailto and copy-to-clipboard, which works. A form needs
  a Vercel serverless function, since Express never runs in production. That would also
  unlock the CSP work above.
- **Real screenshots into the spotlight**, replacing or joining the 3D board.
- **The Hobby plan question.** Vercel's Hobby tier is for personal, non-commercial use, and
  this site advertises client services. Worth checking their terms before selling off it.

---

## Known risks, carried

| Risk | Where it bites |
|------|----------------|
| **The 14-day gate**, unresolved until 0.3. | Three weeks versus one. Do not plan a launch date before you know. |
| **Testers dropping below 12** resets the counter to zero. | Recruit 15–16, not 12. |
| **A crash in the first test build** makes testers uninstall, which drops the count. | That is what 3.5 is for. |
| **GA without consent** in the EU. | Legal exposure, not a bug. Phase 5. |
| **Changing the developer email after submission** means editing the listing and the hosted policy together; a mismatch is a rejection reason. | Settle it in 0.2 and never touch it. |
| **Promoting a preview to production** decouples what is live from what is in git. | It caused exactly that on 4 September. Push to `main` and let Vercel deploy. |
