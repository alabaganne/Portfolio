# Which app gets to $10K/month fastest

Analysis of the product projects in `~/Desktop/Projects/`, August 2026.
Method: a code-level read of all 12 repos, market research per category (several got a second
independent study), plus payment-rail research for a Tunisia-based seller.

---

## The verdict

**BackupMaster.** It is the only product here sitting on a dated, unfilled, evidenced market
opening — iMazing killed perpetual licences in June 2025 and went subscription-only, in a category
where every other seller still charges $40–70 once — and it carries the highest price of anything
you own, so it needs the fewest customers.

**But nothing in this folder reaches $10,000/month within 12 months.** Not one. The rest of this
document shows the arithmetic. If $10K/mo is a real deadline rather than a direction, read
section 7 — the answer there is not a product.

---

## 1. Ranking

| # | App | What it is | Model | Realistic yr-1 | Ceiling | Odds of $10K/mo in 12mo |
|---|---|---|---|---|---|---|
| 1 | **BackupMaster** | iPhone photos to your Mac, over USB | $45 one-time | $750–2,250/mo | ~$4K/mo | 5% |
| 2 | **MenuMate** | QR menus + ordering for restaurants | 99 TND/mo | $500–1,300/mo | ~$3K/mo | 3% |
| 3 | **PromptStream** | Hold a key, speak, text appears | needs repricing | $0–150/mo as-is | ~$3K/mo repositioned | 2% |
| 4 | **Nightwarm** | Night Shift on every display | $19 one-time | $200–600/mo | ~$1K/mo | 1% |
| 5 | **Agenda** | Booking for Tunisian practices | 50 TND/mo | $200–800/mo | ~$2K/mo | 1% |
| 6 | **Clockleaf** | Offline time tracker, pay once | $39 one-time | $150–500/mo | ~$700/mo | <1% |
| 7 | **Soundstack** | Audio device priority list | $19 one-time | $25–95/mo | ~$150/mo | 0% |
| 8 | **Corrector AI** | AI exam grading for teachers | $9/mo | ~$0 | ~$300/mo | 0% |
| 9 | **Stagi** | Internship board for Tunisia | 99 TND/mo | $0–330/mo | ~$500/mo | 0% |
| 10 | **LeBonBureau** | Desks, cash on delivery | physical goods | unknowable | — | 0% |
| 11 | **AlloPro** | Plumbers/electricians marketplace | commission | $0 | — | 0% |

**I moved Nightwarm down from 1st to 4th during this analysis.** The first market study liked it.
A second, better-sourced study killed it — see section 4.

---

## 2. The money rail — solved

**Stripe does not support Tunisia.** 46 supported countries; UAE is the only one in MENA.
No preview, no timeline.

| Platform | Tunisia seller? | Payout | Notes |
|---|---|---|---|
| **Polar** | **Confirmed — Tunisia explicitly listed** | Stripe Connect Express | **Use this** |
| Paddle | Probably — not on their prohibited list | SWIFT/IBAN, $100 min | Verify by applying |
| Gumroad | Likely — named in their Nov 2024 payout post | Local bank deposit | 10% flat fee |
| Lemon Squeezy | Unverified, **and folding into Stripe Managed Payments** | Bank or PayPal | **Stop building on it** |
| FastSpring | Unknown | Payoneer explicitly NOT supported | Must email them |
| Ko-fi | No | Needs Stripe Connect or PayPal | Both broken here |

**Nightwarm, PromptStream and BackupMaster all have Lemon Squeezy code. Move them to Polar.**

Other facts that matter:
- PayPal is send-only in practice for Tunisia. Payoneer works and is the freelancer default.
- Auto-entrepreneur status: 75,000 TND/yr cap, 0.5% tax on revenue, ~600 TND/yr CNSS.
- **Finance Law 2026 (in force since 1 Jan): any Tunisian resident may open a foreign-currency
  account without BCT authorization.** This is new and it is what makes selling globally clean.
- A US LLC does not remove the resident's repatriation obligation. Legal question, not a workaround.

### The number that caps every local product

**Tunisia had 1,456 active merchant sites in H1 2026** (BCT) — every business in the country,
across every sector, that accepts an online card payment. 10.3M transactions, 771.4M TND,
~75 TND average ticket.

So: $10,000/mo = ~30,000 TND/mo = 303 customers at 99 TND. **That would be 21% of every
online-paying business in Tunisia, on one niche tool.** This single fact caps MenuMate, Agenda,
Stagi, Corrector and AlloPro.

Gateways: **Konnect** 1.3% local / 2.9% intl, 2 TND per transfer, no monthly fee — the pick.
Flouci 1.3%/3%. **Paymee is a live regulatory casualty** — funds frozen after a CTAF report, BCT
reclassified it. Do not build on Paymee.

**Recurring billing on Tunisian rails is doubtful.** Sources conflict; Konnect's own site does not
mention it. Confirm directly before planning any local subscription.

---

## 3. What the code actually says

**Not one of the 12 can take a payment today.**

| App | Really done | Weeks to sellable | Site live | Payment state |
|---|---|---|---|---|
| Nightwarm | **70%** | **2.5** | yes | Every line coded — no Lemon Squeezy account exists |
| MenuMate | 55% | 7 | **yes, menumate.net** | Checkout returns HTTP 410, and it is on Stripe |
| PromptStream | 52% | 6 | yes (old build) | Returns 503; `ALLOW_MANUAL_PRO=1` gives Pro away free |
| BackupMaster | 45% | 8 | yes | None. `lib/license.ts` can mint keys, has zero callers |
| Soundstack | 35% | 6 | yes | Buy buttons are dead anchors (`href="#"`) |
| Clockleaf | 35% | 7 | no | None. **Not in git at all** |
| Agenda | 35% | 12 | no | None |
| Stagi | 35% | 14 | no | None. 43KB of strategy docs, zero payment code |
| Corrector AI | 32% | 10 | no | None |
| LeBonBureau | 25% | 10 | no | COD only, UI-only, nobody is notified of an order |
| AlloPro | 22% | 18 | no | Zero implementation |

**Every Mac app is ad-hoc signed and `spctl` rejects all four.** A stranger who downloads any of
them gets "damaged and can't be opened." One $99/yr Apple Developer account plus a notarize step
unblocks Nightwarm, Soundstack, BackupMaster and PromptStream at once.

Three things to fix tonight, regardless of what you pick:
1. **Clockleaf is not in version control.** It exists only on this laptop. `git init` and push.
2. **Corrector accepts `role` from the signup body** — anyone can register as an admin, and admin
   bypasses every ownership check.
3. **LeBonBureau prints demo credentials on `/admin/login`.**

---

## 4. Go-to-market, per app

### 1. BackupMaster — the pick

**What it is.** A native macOS app (~5,150 lines Swift/SwiftUI) that copies photos and videos off
an iPhone to a local folder over USB. The hard part is real and done: vendored, @rpath-relocated
libimobiledevice with a 271-line Objective-C AFC bridge, a from-scratch mobilebackup2
implementation, and iOS keybag decryption. Site live at backupmaster.alabaganne.com. **45% done,
8 weeks to sellable.**

**Positioning.** "iMazing made you rent it. Buy this once." Not a feature pitch — a refugee pitch.

**Price.** **$45 one-time, 2 Macs.** Do not price at $19. One-time competitors sit at $39.99–$69.98
(iExplorer, DearMob, AnyTrans, TouchCopy). $45 undercuts them all while reading as serious, and it
beats iMazing on year two by definition.

**The three channels that matter** — all of them are places where angry buyers are sitting *right now*:
1. **r/macapps** (246k members, +41.6%/yr). "Lifetime" is the dominant post flair and the community
   is actively hostile to subscription apps. The post writes itself.
2. **The two live MacRumors threads.** "Unacceptable iMazing license policy"
   (forums.macrumors.com/threads/2477208, started 4 Feb 2026) is people shopping for an escape right
   now, naming TouchCopy at ~$70 as the alternative. Answer as a participant, not an advertiser.
3. **Apple Support threads on the iOS 26 / macOS Tahoe 26 import failures** —
   discussions.apple.com/thread/256150744 has 101 "Me Too" and 40+ replies. These people are
   mid-problem with Apple's own tool today.

Bonus: **Show HN on the engineering**, not the product. "Vendoring libimobiledevice so the user
installs nothing, plus a from-scratch mobilebackup2 and iOS keybag decryption" is a real HN story.
Nobody upvotes "photo backup app."

**Revenue math.** $10,000/mo ÷ $45 = **222 new sales every month, forever.** At a 2% visitor→buyer
rate that is 11,100 visits/month from Reddit, forums and long-tail SEO with no App Store and no ad
budget. Not achievable. Realistic: a good r/macapps post plus sustained thread participation yields
20–50 sales/month → **$900–2,250/mo**, building over a year.

**Strongest argument against.** The Mac App Store is structurally closed to this — libimobiledevice
talks to usbmuxd over a unix socket the App Sandbox blocks, and no entitlement opens it. That kills
the one discovery engine an unknown vendor can use. (Mitigating: every competitor is direct-download
for the same reason, so it is not a disadvantage against them.) Worse: **Apple keeps breaking the
substrate** — iOS 26 already broke Apple's own Photos import, and AFC/mobilebackup2 are undocumented
private protocols. DigiDNA cited exactly this maintenance burden when justifying their move to
subscription. And the Tahoe import bug — half your opening — closes when Apple ships a fix.

---

### 2. MenuMate — the only thing with real customers

**What it is.** QR menus and table ordering, Next.js 15 + React 19 on Supabase, deployed on Vercel,
**live at menumate.net**. Owner signs up, builds a menu, generates per-table QR codes; guests order
from the table; staff move orders through pending → preparing → served. **55% done, 7 weeks.**
On disk: two finished client menus (Verdi's, Biscottinos), named leads, and a referral partner
offering to bring clients for 10% of monthly revenue.

**Positioning.** "Your menu, your orders, on the table — 99 TND a month, no printing."

**Price.** Keep 99 TND/mo Solo, but **sell it annually at 799 TND up front.** Recurring card billing
probably does not exist on Tunisian rails, so a yearly cash or bank-transfer collection is not a
compromise — it is the only shape that works, and it kills the monthly collection treadmill.
Watch the anchor: **Caissa.tn sells a fuller product at 365 TND/year**, so 1,188 TND/yr is a hard sell.

**The three channels:**
1. **Walk into restaurants.** This is the only proven channel for Tunisian SMB software and the only
   place your location is an advantage over every foreign competitor. Target Lac, La Marsa, Gammarth.
2. **Work the referral partner you already have.** 10% of revenue for a delivered client is cheap.
   Formalize it and find three more like them.
3. **Publish the client menus as proof.** Verdi's and Biscottinos are real, delivered work. A page
   showing them beats any amount of copy.

**Revenue math.** $10,000/mo ≈ 30,000 TND ÷ 99 = **303 restaurants.** That is 21% of every
online-paying business in Tunisia. Not happening. Realistic: 15–40 venues in year one →
**1,485–3,960 TND/mo ($500–1,300)**, and every one of them costs you an evening visit.

**Strongest argument against.** It turns you into a field salesman with a laptop. And restaurant
churn is savage — venues close constantly. It is real money, but it is a job, not a compounding asset.

---

### 3. PromptStream — do not launch it as it stands

**What it is.** A Wispr Flow clone: hold a hotkey, speak, Groq Whisper transcribes, an LLM cleans it,
it pastes into the focused app. Electron app (~2,000 LOC in main) plus a 3,193-line Swift rewrite of
the same thing. Live metered backend that genuinely works. **52% done, 6 weeks.** Your most active
project — 54 commits in three weeks.

**The market moved under it between April and August 2026, three times:**
1. **Apple shipped SpeechAnalyzer on-device in macOS 26.** Free, local, no API key. An independent
   benchmark hit 570 points on HN: "the speech engine built into macOS 26 nearly ties Nvidia's best
   on-device model." It is better than the Whisper you pay Groq for.
2. **Apple rejected WhisperPad in April 2026 under Guideline 2.4.5** for using the Accessibility API
   to inject transcribed text into other apps — **the exact mechanism your `inject.ts` uses.**
   Appeal denied 21 May 2026. The App Store is closed to you.
3. **The $7 wedge does not exist.** Superwhisper's *free* tier already gives unlimited system-wide
   dictation. DictaFlow charges exactly $7/mo with a better product. Handy (30,683 stars, MIT,
   offline, all three platforms) and Whispering (4,779 stars, supports Groq natively) let anyone run
   your exact pipeline for free.

**As designed, the honest estimate is 2 to 15 paying customers in year one.** At $7/mo with Polar's
~13.7% load on a small ticket you net ~$6.04. $10,000/mo needs **1,656 concurrent subscribers**, and
at 5–8% monthly churn that means adding 85–130 *new* paying subscribers every month forever. For
scale: MacWhisper accumulated 2,503 Gumroad ratings over three years as an established brand.

**If you keep it, the only positioning with measured demand:** open-source core, local-first
processing, **one-time $39.** That is the VoiceInk template — 6,181 GitHub stars converting at
$29–69 one-time — and the repo is the marketing engine. Channels: GitHub, Show HN framed as
open-source local-first, AlternativeTo listings on the Wispr/Superwhisper/MacWhisper pages, and the
**accessibility and RSI communities**, which are the one place you have a real edge and nobody is
competing.

**Also fix now, whatever you decide:** the free tier is set to 20,000 words per *week* against an
advertised 5,000 per *month* — 16× what the site promises, running on your Groq key.

---

### 4. Nightwarm — the one I demoted

**What it is.** Warms every connected display through CoreGraphics gamma, reaching externals,
docks and DisplayLink adapters. **70% done, 2.5 weeks — the closest thing you have to shippable.**
Payment plumbing is complete and correct: hosted checkout, HMAC webhook, idempotent key issuance,
Resend delivery, device-bound 2-seat activation. The only missing piece is the store account.

**Why I moved it from 1st to 4th.** A second market study found three things the first missed:

1. **The core claim is partly false.** Apple's own doc says Night Shift performance on external
   displays "depends on the characteristics of the display" — not that it fails. BetterDisplay's wiki
   pins the real failure set: DisplayLink and Sidecar only. **Night Shift works on most
   natively-connected external monitors.** You would be selling against a premise that is mostly untrue.
2. **You are aiming at the small category.** "Fix my external display" is enormous — BetterDisplay
   pulls 89,795 Homebrew installs a year. "Fix my screen warmth" is tiny — Shifty, the only dedicated
   macOS Night Shift utility ever built, gets **205 installs a year** and was abandoned in 2022.
   A 440:1 ratio, measured on the same instrument.
3. **Three products already occupy the wedge.** f.lux is free, 15 years old, uses the same gamma
   mechanism, and already documents a DisplayLink workaround in its own FAQ. BetterDisplay sells
   colour-temperature control at $21.99 and gives the TV fix away free. Iris sells nearly your exact
   pitch at $15 with 1M+ users and a decade of SEO. There is no answer to "why not just use f.lux?"

**If you ship it anyway**, price at **$19–23** (Lunar $23, BetterDisplay $21.99, Vivid $24.99 — $14
is under the band and buys you nothing), target the long-tail failure queries that are actually true
("night shift not working displaylink mac", "night shift greyed out external monitor"), and post to
r/macapps only after the DMG is notarized.

**Its real use: a two-and-a-half-week rehearsal.** Apple account, Polar store, notarized build,
first sale. Do it once here and every other Mac app becomes a day of work.

---

### 5. Agenda — good code, brutal market

Multi-tenant booking for Tunisian practices. NestJS 11 + Prisma 7, 24 working endpoints,
~3,500 lines of Next.js. **35% done, 12 weeks.** No booking notifications, no password reset,
services are write-once.

**Price:** 49–50 TND/mo is the established clearing price — Doktori.tn charges 49 DT and Olycab
50 DT, arrived at independently. **Channels:** door-to-door field sales (how Medwin reached 3,000
doctors), Facebook groups, WhatsApp (3.3M Tunisian users, 95% open rate).

**Math:** $10K/mo = 600 doctors at 50 TND, against a national denominator of 9,202 private-practice
doctors. **Medwin has been running since 1996 and reaches 3,000 doctors after 30 years.** DabaDoc is
majority-owned by Orange and AXA. Vezeeta needed $63M.

**Against it:** doctors pay for records, e-prescriptions and CNAM billing — not for booking. Booking
is the free feature the incumbents bundle.

---

### 6. Clockleaf — free owns the exact position

Local-first SQLite time tracker, genuinely working, clean four-layer architecture. **35% done,
7 weeks. Not in git.**

Its landing page pitch — "cross-platform, privacy-focused, your data stays local" — is verbatim the
description of **ActivityWatch**: 18,757 stars, MPL-2.0, free, all platforms, pushed yesterday. Toggl
is free forever for individuals and is the default Reddit recommendation. Product Hunt lists 673
time-tracking products.

If you ship it, price at **$39**, not $19 — one-time trackers cluster there (Timemator $39, Taim $39)
and $19 reads as under-priced in a niche where the objection is trust, not price. Best channel is
Show HN (Qbserve 429 pts, Time Cop 334), then Setapp. Ceiling: Qbserve, the best comparable, peaked
around $2,000/mo and then decayed; Tim ($20 lifetime) has 32 App Store ratings in seven years.

---

### 7. Soundstack — dead, and it died while the repo sat idle

CoreAudio device-priority switching, ~1,632 lines, handles clamshell state properly. Site and
download live; **the Buy buttons are `href="#"`.**

Two things happened while this sat untouched:
- **Dec 2025: Rogue Amoeba shipped SoundSource 6 with "Preferred Device Order"** — the incumbent now
  has your feature natively.
- **30 Dec 2025: Tobias Lütke (Shopify's CEO) open-sourced AudioPriorityBar under MIT.** Product Hunt
  #4, 823 stars.

The market clears at **$0–8.99** (SoundAnchor $2.99, AudioSwitcher $1.99, three free options).
Lütke's launch — the loudest possible in this category — produced ~1,444 downloads. The closest paid
competitor moves ~121 Homebrew installs a year.
**Realistic year one: 15–60 sales, $285–1,140 total.** Stop.

---

### 8. Corrector AI — the model vendors ate it this month

FastAPI + Next.js exam grading, 12 tables, French/Tunisian seed data. **32% done, 10 weeks.**

- **OpenAI launched "ChatGPT for Teachers" in August 2026** — the month of this analysis.
- **Google shipped Gemini rubric generation free into Google Classroom.**
- Brisk Teaching has 1,000,000 Chrome installs and is free to teachers; MagicSchool is free forever;
  Gradescope Basic is free. VC money has priced the individual teacher at zero.
- **EssayGrader.ai was listed on acquire.com at ~$5K MRR.** That is the ceiling for the whole shape.
- GradeWiz (YC-backed) pivoted out of the category entirely.

Locally: Tunisia has ~500–700 private collèges and lycées, GNI per capita $3,880, minimum wage
20.32 TND/day. Stop.

---

### 9. Stagi — a graveyard, verified corpse by corpse

Laravel 8 + Inertia + Vue 3 internship board, rebranded three times. **35% done, 14 weeks, zero
payment code, 43KB of strategy docs.**

The market study checked every competitor: stage-tunisie.tn no longer resolves. stagebook.tn says
"under construction." stage.tn calls itself "la plateforme n°1" and shows **3 active offers**.
stagi-edu.com is live and already using your name. And **hi-interns.com now redirects to
hi-talents.com** — the closest real competitor renamed away from interns and *inverted the model*:
companies post free, students pay €14.99/mo.

Billing shape is also wrong — job boards sell per-post, not monthly, because companies hire in
bursts. $10K/mo would need 303 paying companies: 21% of every online-paying business in Tunisia.
Stop.

---

### 10. LeBonBureau — not a software problem

Office and gaming desks, cash on delivery, Tunisia. Next.js storefront, a launch plan, ~21
generated images, a sales calculator. **25% done.**

**No desk exists.** No prototype, no supplier contract, not even a quote. Everything else is
downstream of that. Business pricing (899/999/1299 TND retail against 400–700 production) does not
match the site's prices (539/1529). Orders currently vanish into a laptop database with nobody
notified, and demo credentials are printed on `/admin/login`.

This is a furniture business with a website attached, and it needs inventory capital, storage and
delivery. Judge it as that, not as an app.

---

### 11. AlloPro — the hardest business in the folder

Two-sided marketplace for plumbers and electricians. 11 migrations of genuinely good schema
(~1,700 lines, RLS on, platform-fee calculation). **22% done, 18 weeks.** Untouched since Dec 2025.

`/services` is a placeholder, so the primary customer journey dead-ends. The payment route accepts
`amount` and `platformFee` from the client. All three pricing tiers link to the same signup page.

Two-sided marketplaces are the hardest thing to bootstrap solo — you need supply and demand in the
same neighbourhood in the same week, and the fee only arrives after a job completes. Stop.

---

## 5. The arithmetic, in one table

One-time revenue of $10,000/month means **$10,000 of brand-new sales every month, forever.**

| App | Price | Sales or subs needed monthly | Best comparable ever measured | Realistic ceiling |
|---|---|---|---|---|
| BackupMaster | $45 | **222 sales** | iMazing gap is real, 14 months old | $4K/mo |
| Nightwarm | $19 | 526 sales | Shifty: **205 installs a year** | $1K/mo |
| Clockleaf | $39 | 256 sales | Qbserve peaked ~$2K/mo, then decayed | $700/mo |
| Soundstack | $19 | 526 sales | Lütke's free launch: 1,444 downloads | $150/mo |
| PromptStream | $7/mo | **1,656 subs** (5–8% churn → 85–130 new/mo) | MacWhisper: 2,503 ratings in 3 years | $3K/mo |
| MenuMate | 99 TND/mo | **303 restaurants** | 1,456 merchant sites in all Tunisia | $3K/mo |
| Agenda | 50 TND/mo | **600 doctors** | Medwin: 3,000 doctors in 30 years | $2K/mo |
| Stagi | 99 TND/mo | 303 companies | stage.tn, the "n°1", shows 3 offers | $500/mo |

---

## 6. Ninety days on BackupMaster

**Weeks 1–2 — make it sellable to a stranger.**
Buy the Apple Developer account ($99). Developer ID signing, hardened runtime, notarize, staple.
Ship a real `.dmg`, not a `zip -r` archive (the current one carries AppleDouble junk that can
invalidate the signature). Open a Polar account and create one $45 product.

**Weeks 3–4 — connect the money.**
Wire `lib/license.ts` (it can already mint Ed25519 keys and has zero callers) to a Polar webhook.
Add the licenses table, `POST /api/activate` and `/api/deactivate` with machine binding, 2 seats.
Rewrite the landing page around one sentence: *iMazing made you rent it. Buy this once.*
Ship a 14-day trial with no feature caps.

**→ First dollar target: day 30.** If no money has moved by day 45, stop and go to section 7.

**Weeks 5–8 — go where the angry people are.**
Post to r/macapps. Answer, as a participant, in MacRumors thread 2477208 and in the four Apple
Support threads on the iOS 26 import failures. Publish one comparison page: "iMazing alternative
that isn't a subscription." Submit to AlternativeTo against iMazing, AnyTrans, iExplorer and
DearMob.

**Weeks 9–12 — the engineering story, then compound.**
Show HN on vendoring libimobiledevice, the from-scratch mobilebackup2 and the keybag decryption —
not on the product. Then write the long-tail pages: "iPhone photos not importing macOS Tahoe",
"Image Capture delete after import not working", one page per real failure.

**Kill criteria — be strict:**
- **Fewer than 5 sales by day 60** → the wedge is not real, stop.
- **Under $500/mo by day 90** → cap it as a side earner and go to section 7.
- **Apple fixes Photos import on Tahoe** → half the opening closes; reassess immediately.

---

## 7. The honest answer to the actual question

$10,000/month is roughly 30,000 TND. **No product in this folder gets there in twelve months**, and
the best of them lands somewhere between $750 and $2,250 a month after a year of work.

What does reach $10K/mo, for someone who builds a full stack — landing page, API, desktop app, blog
— in a matter of weeks: **two or three retainer clients at $3–5K/month.** You already do client
work (Wequity, DaleDigital, Strivehawk). It is not glamorous and it does not compound, but it clears
$10K/mo in months rather than years, and it funds the products instead of competing with them.

The realistic shape: **client work pays the bills, BackupMaster is the one product bet, everything
else gets archived.**

---

## 8. The pattern that costs the most

**30+ project folders. One deployed site that cannot take money. Zero paying customers.**

Every product here is 22–70% finished and stops at the identical wall: payment, code signing,
deployment. Building is not your constraint — you are fast and the code is genuinely good
(the libimobiledevice work in BackupMaster and the CoreAudio work in Soundstack are real
engineering). The constraint is that nothing is ever carried to the point where a stranger can pay.

The cost is measurable. **Soundstack lost its market while the repo sat idle** — SoundSource shipped
the feature in December 2025 and Shopify's CEO open-sourced a clone two weeks later.
**PromptStream's thesis broke between April and August 2026** while it was being rewritten in Swift
for the second time. Markets close while code gets polished.

Two rules worth adopting:

1. **One product at a time, carried all the way to a stranger's payment.** Not to "done" — to paid.
2. **Buy the Apple Developer account this week.** $99 is currently blocking four finished apps from
   being installable by anyone at all.


---

## 9. Addendum: stacking several apps instead of one

The goal does not have to come from one product. That changes the plan, but not by as much as
it looks.

**What stacks:** the Mac utilities. One $99 Apple account, one Polar account, one notarization
pipeline and one license server serve all of them. Build it for BackupMaster and app #2 costs a
week instead of eight. Buyers of app 1 are the launch list for app 2.

**What does not stack:** the Tunisian apps. MenuMate and Agenda each need their own restaurant-by-
restaurant, cabinet-by-cabinet field sales. Running two is two jobs, not leverage.

Realistic Mac utility house at 18–24 months:

| App | Price | Sales/mo | Monthly |
|---|---|---|---|
| BackupMaster | $45 | 20–50 | $900–2,250 |
| PromptStream, repositioned one-time | $39 | 15–40 | $600–1,600 |
| Clockleaf | $39 | 8–15 | $300–600 |
| Nightwarm | $19 | 10–30 | $200–600 |
| Soundstack | free / open source | — | $0 — use it as a funnel |
| | | | **$2,000–5,050/mo** |

**Stacking reaches $2–5K/mo, not $10K.** Getting to $10K this way needs 8–12 shipped apps. The
workable combination is product income plus client work, where the product half compounds.

**Revised order:** BackupMaster (build the rail) → Clockleaf (cheapest reuse of it) → Nightwarm →
PromptStream repositioned as open-source one-time. Soundstack becomes free and open source as a
funnel rather than a product.

**Clockleaf gets promoted under this framing.** Its only problem is size — ActivityWatch is its
landing-page pitch word for word, and Qbserve, the best comparable, peaked near $2K/mo. That fails
as a solo bet on $10K and is perfectly fine as one shelf among several, at $39 rather than $19.

**Corrector, Stagi and AlloPro stay archived.** Stacking cannot fix these:
- **Corrector** — the market price is zero. OpenAI's ChatGPT for Teachers (Aug 2026), free Gemini
  rubric grading in Google Classroom, Brisk free with 1M Chrome installs. EssayGrader.ai, a real
  business here, sold at ~$5K MRR. It also carries AI cost per use, so free users cost money.
- **Stagi** — every Tunisian competitor is already dead, and hi-interns inverted the model to charge
  students instead, having found companies will not pay. Monthly billing also mismatches burst hiring.
- **AlloPro** — two-sided cold start plus structural leakage: the tradesman gives out his phone
  number on job one and the second fee never arrives. 18 weeks of work, main journey still a stub.
