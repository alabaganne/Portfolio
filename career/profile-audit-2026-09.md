# Profile Audit: Upwork vs alabaganne.com vs Freelancer.com

Date: 7 September 2026

---

## 1. The core difference

The three profiles are written for three different readers, and only one of them is doing its job.

| | Reader | Message | State |
|---|---|---|---|
| **Upwork** | A client with a budget | "Here is what I build for you, here is how I work" | Strong. Best asset you have. |
| **alabaganne.com** | A recruiter or hiring manager | "Here is my career, here are my roles" | Well built, but it is a resume, not an offer. |
| **Freelancer.com** | Nobody, until today | 2020 student bio, $10/hr, PHP/iPhone/Android skills | Was dead. Rebuilt (section 4). |

**Upwork is client-facing and specific.** It opens with what you do, lists concrete deliverables, names real projects (NORA, MenuMate, the 25k-user health platform), states a stack, and closes with an invitation. That is a sales page.

**The website is employer-facing and generic.** The hero says "Full-Stack engineer building production web apps & AI systems", then it lists experience, projects, skills, education. It reads like a CV rendered in Tailwind. There is no "here is what I can build for you", no pricing signal, no testimonials, no case studies. A client who lands there has nothing to act on except an email address.

That is the gap. The site is your most controlled surface, and it is the least persuasive of the three.

---

## 2. Factual inconsistencies across your materials

These matter because clients and recruiters cross-check. Every one of these is a small credibility leak.

1. **Socialura's stack contradicts itself.** `career/resume.md` describes Socialura as "an e-commerce platform with Stripe payment integration" under a *Next.js, React, Node, Tailwind, Supabase, Stripe, Square* tech line. The website's projects section says it is **WordPress, CSS, Stripe, Custom UI**. Upwork calls it "a full WordPress site clone with checkout". WordPress is correct. Fix the resume.

2. **Freelance start date.** The resume says "Upwork — Oct 2024 – Present". Your earliest Upwork job started **27 August 2024**. Use Aug 2024 (I used Aug 2024 on Freelancer.com).

3. **"3+ projects" undersells you badly.** The resume says "Delivered 3+ full-stack projects". Upwork shows **9 jobs, 7 completed, 382 hours, $4K+ earned, 100% JSS, every job 5 stars**. Say 9.

4. **Retain Health start date.** `resume.md` and the site say Aug 2021. `application-info.md` says Jul 2021. Pick one and fix the other.

5. **French proficiency.** Resume says *Intermediate*. Upwork says *Conversational*. The site just says "EN · FR · AR". Pick one wording and use it everywhere.

6. **Wequity is written in present tense on the site.** The About section says "In parallel I work on NORA at Wequity". That role ended in **May 2026**, four months ago. Anyone who checks LinkedIn sees the mismatch. Fix the tense and the framing ("Most recently I architected NORA at Wequity...").

7. **Experience count.** Resume summary says "5+ years of professional experience"; the hero stat says "5+". Retain Health started Aug 2021, so five years is right. Just keep it consistent, and note the summary also says "5+" while `application-info.md` says exactly 5.

---

## 3. Portfolio site review (alabaganne.com)

### What is good
- Clean, modern, fast, well-structured Next.js 15 build. The design holds up.
- Real live demos on real subdomains, not just GitHub links. That is genuinely rare and it is your edge.
- SEO is done properly: `metadataBase`, canonical, keywords, OG/Twitter tags, JSON-LD `Person` + `WebSite`, generated sitemap. Better than most developer portfolios.
- Blog exists with a hand-rolled MDX pipeline. Two posts is a start.

### Priority fixes

**1. No testimonials. This is the biggest miss.**
You have seven 5-star reviews with real client quotes sitting on Upwork ("Working with Ala was an absolute pleasure from start to finish", "He is skilled, professional, and reliable", "exceeded my expectations again"). Three of those on the homepage, with the client's first name and project type, would do more for conversion than any other change on this list. Cost: one component, one afternoon.

**2. No case studies.**
Every project is a card with a three-line description. Both clients and hiring managers convert on depth. Write two: **MenuMate** (you founded it, so you can tell the whole story: problem, decisions, tradeoffs, what you'd do differently) and **NORA** (RAG with citations, DSPy transformation learning, GCP async pipeline — that is genuinely interesting engineering and it is currently one bullet point). Structure: problem → constraints → what I built → what it cost/took → outcome.

**3. Broken security posture on live demos.**
Several "live" links are plain `http://`: `internly.alabaganne.com`, `hr-management.alabaganne.com`, `socialura.alabaganne.com`, `jitsi.alabaganne.com`, `ecommerce.alabaganne.com`. Chrome shows "Not secure". A demo that triggers a browser warning is worse than no demo. Get certbot on the Hostinger VPS and switch them all to https.

**4. Novelty pages sit on your professional domain.**
`/hey`, `/coffee`, `/movie`, `/study`, `/birthday`, `/sorry`, `/eya` are personal pages, and several POST to API routes that email you. Only `/eya` and `/sorry` are disabled in `src/lib/disabled-pages.js`. If a client or recruiter stumbles onto `/hey` it costs you more than it gains. Either add them all to `disabled-pages.js` in production, or move them to a separate domain.

**5. Two components are exported but never rendered.**
`ServicesSection` and `LanguagesSection` are exported from `components/home/index.js` but not used in `app/page.jsx`. Worse, `ServicesSection` is styled for a **dark** background (`bg-white/[0.04]`, `text-white`, `text-slate-300`) while the page body is white — dropping it in as-is would render near-invisible text. Either delete both or restyle and use them. A services section is exactly what the site is missing (see section 1), so I'd restyle and ship it.

**6. No OG image.**
`layout.jsx` declares `twitter.card: "summary_large_image"` and an `openGraph` block, but never sets an image. Links to alabaganne.com shared on LinkedIn, X, or Slack render as a blank grey card. Add a 1200×630 image and reference it in both `openGraph.images` and `twitter.images`. Fifteen minutes, visible everywhere.

**7. Stat mismatch.**
Hero says "10+ production projects"; the projects section renders 8 cards (one, Global Deals, is commented out in `projects-section.jsx`). Either publish Global Deals or say 8+.

**8. Verify the resume PDF.**
The hero downloads `/Ala_Baganne_Resume.pdf`. Your source of truth is `career/resume-2026.pdf`. Confirm the public file matches the current export.

**9. No contact form.**
`mailto:` only. Clients convert better on a form (you already have Resend wired up for the novelty pages, so the plumbing exists).

---

## 4. Upwork profile review

Genuinely strong. The overview is one of the better freelancer overviews I have read: specific, non-generic, ends with an honest invitation instead of "let's discuss". Keep it.

Fixes, in order of value:

1. **Add the video introduction.** The slot is empty. Your own `career/freelance-gig-ideas.txt` already lists this as a TODO. 60 seconds: 30s on you, 30s screen-recording MenuMate and NORA. Upwork weights this in search, and clients watch it.
2. **Use specialized profiles.** Upwork allows up to two in addition to your general profile. You are currently competing in one bucket. Create "AI & LLM Application Development" and "E-commerce & Next.js Development" — each gets its own headline, rate, and portfolio, and each surfaces separately in client search.
3. **Fill the portfolio out.** Page 1 shows MenuMate, ATS Resume Builder, Socialura. Add LeBonBureau, Martinez Auto Detail booking, and NORA (screenshots only, no client data).
4. **Rate trajectory.** You are asking $32/hr with a work history showing $10–$14/hr contracts. Clients see both. Keep raising in steps after each 5-star close so the gap narrows rather than widens.
5. **Reconcile French** (see section 2, item 5).

---

## 5. Freelancer.com — what I changed

The profile was untouched since 2020: headline "Full Stack Web Developer", rate $10/hr, bio "I'm 20 years old computer science student and an intermediate web developer", skills tagged PHP / Mobile App Development / iPhone / Android / MySQL.

Rebuilt as a full-stack generalist (your call), at $25/hr:

- **Rate:** $10 → **$25/hr**
- **Headline:** "Full-Stack Web Developer | React, Next.js, Node.js"
- **Skills:** replaced iPhone / Android / Mobile App Development / Laravel / Vue.js with **React.js, Next.js, Node.js, JavaScript, Website Design, eCommerce, WordPress, PHP** (matching jobs went from 1,713 → 2,086)
- **Summary:** full rewrite — what you build, stack, track record, how you work, portfolio link
- **Portfolio:** 4 items published with screenshots, descriptions, tags and skills — MenuMate, LeBonBureau, Martinez booking system, Socialura. Ordered MenuMate first.
- **Experience:** 3 entries — Retain Health (Aug 2021–present), Wequity (Oct 2025–May 2026), Freelance/Self-employed (Aug 2024–present)
- **Education:** Engineer's Degree and Bachelor's, Université de Sousse (ISSAT)
- **Qualifications:** Cisco CCNA, and the four Microsoft MTA certs as one entry

**One deliberate wording choice:** I removed every mention of "Upwork" from the Freelancer.com profile and replaced it with "9 completed freelance projects for international clients, every single one rated 5 stars". Naming a competing platform on Freelancer.com risks moderation, and the claim is just as strong without it.

### Still to do there (needs you)
- **Profile photo** is from ~2020 and does not match the one on your site/LinkedIn. Swap it.
- **Cover photo** is a Freelancer stock blueprint image. Replace with something of your own.
- **Verifications:** payment and identity badges are not all green. Complete them — Freelancer.com surfaces verified profiles higher.
- **Exams:** Freelancer's own skill tests are weighted in their search ranking. Two or three (JavaScript, PHP, HTML5) are cheap ranking points on a 0-review profile.

---

## 6. Website changes applied

In `portfolio/alabaganne.com/`, commented out (not deleted) the job-seeking signals:

- `hero-section.jsx` — "Available for new opportunities · Remote-first" badge wrapped in a JSX comment
- `about-section.jsx` — the `["Status", "● Available"]` row commented out
- `contact-section.jsx` — "I'm open to senior full-stack roles, AI-product work, and select freelance engagements" commented out, replaced with a services-oriented line

Nothing was committed. Review the diff and commit when you're happy.

---

## 7. Ranked next actions

1. Add three client testimonials to the homepage — highest conversion return of anything here
2. Record the Upwork video introduction
3. Fix the factual inconsistencies in section 2 (30 minutes, protects credibility everywhere)
4. Add HTTPS to the VPS demo subdomains
5. Add an OG image
6. Create the two Upwork specialized profiles
7. Write the MenuMate and NORA case studies
8. Update the Freelancer.com photo, cover, and verifications
9. Restyle and ship the Services section on the site
10. Disable the novelty pages in production
