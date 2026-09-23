# Ideas ranked, best to worst

Eleven projects, judged on one question: how fast can this produce real money?
Each repo has its own `VERDICT.md` with the detail. The full research is in
`portfolio-10k-analysis.md`.

**Headline:** no single app here reaches $10,000/month in twelve months. Stacking the Mac
utilities gets you to **$2,000–5,000/month**, because they share one payment and signing rail.
The rest of $10K comes from client work or from the brokerage in #4.

---

## The table

| # | Idea | Done | Model | Realistic yr-1 | Verdict |
|---|---|---|---|---|---|
| 1 | **BackupMaster** | 45% | $45 once | $900–2,250/mo | **Build it** |
| 2 | **MenuMate** | 55% | 799 TND/yr | $500–1,300/mo | Sell to the leads you have |
| 3 | **PromptStream** | 52% | needs repricing | $0–150/mo as-is | Reposition or shelve |
| 4 | **AlloPro as a brokerage** | 22% | 20–50 TND/lead | untested | **Test it this week** |
| 5 | **Clockleaf** | 35% | $39 once | $300–600/mo | Ship second |
| 6 | **Nightwarm** | 70% | $19–23 once | $200–600/mo | Rehearsal only |
| 7 | **Stagi as a recruiter** | 35% | 500–1,000 TND/hire | untested | Maybe, as a service |
| 8 | **Agenda** | 35% | 50 TND/mo | $200–800/mo | Shelve |
| 9 | **LeBonBureau** | 25% | physical goods | unknowable | Build one desk first |
| 10 | **Soundstack** | 35% | — | $25–95/mo | Give it away |
| 11 | **Corrector AI** | 32% | — | ~$0 | Stop |

---

## 1. BackupMaster — build it

**Pros**
- The only dated, unfilled gap you own: **iMazing killed perpetual licences in June 2025**, in a
  category where everyone else still charges once ($40–70).
- Highest price of anything here ($45), so it needs the fewest customers.
- The angry buyers are already gathered and findable: MacRumors thread 2477208, four Apple Support
  threads on the broken iOS 26 / Tahoe import (one with 101 "Me Too").
- Second tailwind: Apple's own import path is broken right now.
- The hard engineering is done, and it is a genuine Show HN story.

**Cons**
- The Mac App Store is structurally closed to it (App Sandbox blocks the usbmuxd socket).
- Apple keeps breaking AFC — iOS 26 already did. This is permanent maintenance, not a one-off.
- Half the opening closes when Apple fixes Photos import.
- arm64-only, so every Intel Mac is excluded — and Intel skews toward your exact buyer.
- $10K/mo would need 222 sales *every month, forever*.

---

## 2. MenuMate — sell to the customers you already have

**Pros**
- The only thing you have that is **live**, with delivered client work and named prospects.
- A referral partner already offering to bring clients for 10%.
- Highest revenue per customer of the local products, and it recurs.
- Being in Tunisia is a real advantage over every foreign competitor here.

**Cons**
- Built on Stripe, which does not work for Tunisian sellers. Needs a move to Konnect.
- Checkout returns HTTP 410 today; no subscription schema, no trial clock, no plan enforcement.
- $10K/mo = 303 restaurants, against **1,456 active merchant sites in all of Tunisia**.
- Caissa.tn sells a fuller product at 365 TND/year — your 1,188 TND/yr ask is 3.25× that.
- Restaurant churn is savage, and every sale costs you an evening visit.

---

## 3. PromptStream — reposition or shelve

**Pros**
- Best-built thing in the folder, and your active focus (54 commits in three weeks).
- The backend genuinely works, metering included.
- Subscriptions compound in a way one-time sales never do.
- One real edge nobody is competing for: **accessibility and RSI users**.

**Cons**
- **Apple shipped SpeechAnalyzer on-device in macOS 26** — free, local, better than the Whisper you
  pay Groq for.
- **Apple rejected WhisperPad in April 2026 under Guideline 2.4.5** for the exact text-injection
  mechanism `inject.ts` uses. Appeal denied. The App Store is closed to you.
- The $7 wedge does not exist: Superwhisper's free tier is unlimited, DictaFlow charges $7 with a
  better product, and Handy (30,683 stars, MIT) is free on all three platforms.
- Wispr raised $280M twelve days before this analysis.
- $10K/mo = 1,656 concurrent subs, i.e. 85–130 net new every month forever.
- You maintain two full implementations of the same app.

---

## 4. AlloPro as a brokerage — test it this week

Not the platform. You find the deal, the pro pays you.

**Pros**
- Testable for under 200 TND, with no code at all.
- Solves the two-sided cold start the only way it can be solved: be the marketplace by hand first.
- The **1,456 merchant sites** ceiling does not apply — tradesmen pay cash, in person.
- If it works, the existing schema becomes the tool for a business you already have.
- High-ticket jobs carry real commissions: a bathroom renovation at 3,000–15,000 TND pays
  300–1,500 TND per deal.

**Cons**
- **Commission on completion will never get paid.** Cash economy; the pro simply won't tell you.
  Charge per lead up front, or a monthly retainer for exclusive area and category.
- Low-ticket trades are arithmetically hopeless: 10% of an 80 TND tap repair is 8 TND.
- It is a job — phone calls, coordination, quality complaints — not an asset that compounds.
- Demand costs money: you pay for every homeowner you find.
- Send one bad pro and you own the reputation damage.

---

## 5. Clockleaf — ship it second

**Pros**
- Cheapest possible reuse of the rail you build for BackupMaster: a week, not two months.
- The code genuinely works and is cleanly structured.
- **Setapp** solves your real constraint — it puts you in front of paying subscribers without an
  audience. 24-hour review, 75/25 split.
- Show HN demonstrably rewards this niche (Qbserve 429 points, Time Cop 334).

**Cons**
- **Not in version control.** One disk failure ends it. Fix tonight.
- Your landing pitch is word for word the description of **ActivityWatch** — 18,757 stars, free,
  all platforms.
- Toggl is free forever for exactly your user.
- Qbserve, the best comparable ever, peaked near $2,000/mo and is dormant. Tim has 32 App Store
  ratings in seven years.
- Priced at $19 it is under the $39 band for no benefit.

---

## 6. Nightwarm — a rehearsal, not a business

**Pros**
- **70% done, 2.5 weeks** — by far the closest to sellable.
- Payment plumbing is complete and correct; only the store account is missing.
- Perfect low-cost way to build the Apple + Polar + notarization pipeline once and reuse it.

**Cons**
- **The core claim is partly false.** Apple's doc says performance *depends on the display*; Night
  Shift works on most natively-connected externals. Only DisplayLink and Sidecar truly break.
- You are aiming at the small category: BetterDisplay 89,795 installs/yr vs **Shifty's 205/yr**.
  A 440:1 ratio.
- f.lux is free, 15 years old, same mechanism, and documents the DisplayLink workaround itself.
- Iris sells nearly the same pitch at $15 with 1M+ users.
- Even Lunar — the category king — only reached ~$108K gross in a year.

---

## 7. Stagi as a recruiter — maybe, as a service

**Pros**
- A placement fee (500–1,000 TND per hire) matches how companies actually behave: burst hiring at
  PFE season, paid once, at the moment of value.
- 30 placements a month at 800 TND is 24,000 TND.
- University 4C career centres own the *convention de stage* workflow — an institutional choke point.

**Cons**
- Every Tunisian competitor is a corpse: stage-tunisie.tn dead, stagebook.tn "under construction",
  stage.tn ("la plateforme n°1") shows **3 offers**.
- **hi-interns.com inverted the model** — companies free, students pay €14.99/mo — after concluding
  companies will not pay.
- The SaaS version needs 303 paying companies for $10K: 21% of every online-paying business in Tunisia.
- 14 weeks of work and zero payment code, against 43KB of strategy prose.
- It is a recruitment agency, not software.

---

## 8. Agenda — shelve

**Pros**
- The best-engineered of your Tunisian projects: 24 working endpoints, NestJS 11 + Prisma 7.
- The clearing price is established and known (49–50 TND/mo).
- Real pain: phone-based booking genuinely wastes practice time.

**Cons**
- **Medwin has run since 1996 and reaches 3,000 doctors after 30 years.** $10K/mo needs 600.
- Doctors pay for records, e-prescriptions and CNAM billing — booking is the free bundled feature.
- Demand is already owned: med.tn (2M+ monthly searches), DabaDoc (Orange + AXA since 2021),
  Vezeeta ($63M raised).
- Only 9,202 private-practice doctors exist in the country.
- Needs door-to-door field sales, and a doctor will want a company and a fiscal invoice first.
- Missing basics: no booking notifications, no password reset, services are write-once.

---

## 9. LeBonBureau — build one desk before another line of code

**Pros**
- Real, physical, local demand — people do buy desks.
- Marketing assets and a launch plan already exist.
- COD suits Tunisian buying habits, and the plan's Phase 1 (Messenger DMs) is correct.

**Cons**
- **No desk exists** — no prototype, no supplier, not even a quote. Everything is downstream of that.
- Needs inventory capital, storage and delivery for a bulky item; COD means you front every unit
  and eat the refusals.
- **The prices contradict themselves**: plan says 899/999/1299 retail on 400–700 production; the
  site shows 539 and 1529. The margin is the whole business and it is undecided.
- Orders vanish into a laptop database with nobody notified.
- Demo credentials are printed on `/admin/login`.

---

## 10. Soundstack — give it away

**Pros**
- Genuinely good code — proper CoreAudio work, handles clamshell state correctly.
- Free and open source it makes a fine funnel and portfolio piece at zero maintenance cost.

**Cons**
- **December 2025: SoundSource 6 shipped "Preferred Device Order."** The incumbent has your feature.
- **30 December 2025: Shopify's CEO open-sourced AudioPriorityBar under MIT.** PH #4, 823 stars.
- The category clears at $0–8.99, clustered at $2–4, with three free options.
- The loudest possible launch in this niche produced ~1,444 downloads; the closest paid rival moves
  ~121 Homebrew installs a year.
- **Realistic year one: 15–60 sales, $285–1,140 total.**
- The Buy buttons on the live site are `href="#"`.

---

## 11. Corrector AI — stop

**Pros**
- Real, proven demand — the category is large and funded.
- The scanned-handwriting path (French/Arabic Tunisian bac, /20 barème) is a genuine gap neither
  OpenAI nor Google fills.

**Cons**
- **OpenAI launched "ChatGPT for Teachers" in August 2026** and **Google put Gemini rubric grading
  free into Classroom** — this month.
- Brisk (1M Chrome installs, free), MagicSchool (free forever), Gradescope Basic (free): VC money
  priced the individual teacher at zero.
- **EssayGrader.ai — a real business here — sold at ~$5K MRR.** That is the ceiling of the shape.
- GradeWiz (Y Combinator) pivoted out of the category entirely.
- The only product here with **AI cost per use** — free users actively lose you money.
- **Security hole: `role` is accepted from the signup body**, so anyone can register as admin.
- Tunisia has ~500–700 private lycées, GNI per capita $3,880.

---

## What to actually do

1. **This week** — buy the Apple Developer account ($99). It blocks four finished apps.
   `git init` Clockleaf. Run the 200 TND AlloPro brokerage test.
2. **Next 8 weeks** — BackupMaster to a first paid sale. Notarize, wire Polar, then r/macapps and
   the MacRumors and Apple Support threads.
3. **After that** — Clockleaf at $39 on the same rail, then Nightwarm, then PromptStream only if
   repositioned to open-source one-time.
4. **Archive** — Corrector, Stagi (as software), Agenda, Soundstack as a paid product.
5. **Keep in mind** — products here top out around $2–5K/mo combined. Client work or the brokerage
   covers the rest of $10K, and it does so faster.
