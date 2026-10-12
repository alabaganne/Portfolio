// Work history, listed in this order in the home page's Experience section.
// Keep facts in line with the resume (public/Ala_Baganne_Resume.pdf) and keep part-time roles labelled as such.
export const experiences = [
  {
    company: "Retain Health",
    role: "Software Engineer",
    period: "Aug 2021 – today",
    engagement: "Part-time contract",
    place: "remote (Boston, US)",
    summary:
      "I contribute full-stack features to RetainYourBrain, a healthcare platform focused on Alzheimer’s prevention that serves 30,000+ users.",
    points: [
      "Built the dynamic form engine, with complex conditional logic, behind its personalized routines and topic recommendations.",
      "Over the past year, worked extensively with AWS and React Native on the platform’s cloud and mobile apps.",
      "Wrote reusable front-end services that cut redundant API calls.",
      "Introduced automated tests (Jest, Cypress, Mocha, Supertest, Karma, Protractor) and worked with the QA and UX/UI teams on production releases.",
    ],
    tech: ["AngularJS", "Next.js", "TypeScript", "Node.js", "Express.js", "MySQL", "AWS", "React Native"],
    links: [{ label: "retainyourbrain.com", href: "https://retainyourbrain.com" }],
  },
  {
    company: "Upwork",
    role: "Freelance Web Developer",
    period: "Aug 2024 – today",
    engagement: "Self-employed",
    place: "remote",
    summary:
      "Top Rated with a 100% Job Success Score and a 5.0 rating across seven reviews. I build web apps, booking systems, custom Shopify themes and online stores for international clients, including repeat clients, and own the front end, back end, integrations and delivery.",
    points: [
      "Martinez Auto Detail’s booking system: dynamic pricing, custom scheduling rules, card storage with Square and an owner dashboard.",
      "Socialura, a WordPress store with Stripe checkout for digital services.",
    ],
    tech: ["Next.js", "React", "Node.js", "Supabase", "Shopify", "WordPress", "Stripe", "Square"],
    links: [{ label: "Upwork profile", href: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce" }],
  },
  {
    company: "Wequity",
    role: "Full-Stack & AI Engineer, Team Lead",
    period: "Oct 2025 – May 2026",
    engagement: "Part-time contract",
    place: "remote (Brussels, Belgium)",
    summary:
      "During an eight-month contract I helped build NORA, an AI platform that processes legal documents in English, French and Dutch for lawyers and notaries in Belgium and the Netherlands. I was also the team lead: I reviewed pull requests and owned deployments.",
    points: [
      "Python and FastAPI back-end services and React front-end features, with Supabase for application data and storage.",
      "OCR with the Google Vision API, so scanned and image-based PDFs go through the same processing as text documents.",
      "A RAG knowledge base: users ask questions about the documents they uploaded and get answers generated from the retrieved passages, with the sources cited.",
      "Smart Processing workflows that learn document transformation patterns from example pairs, using LLM APIs and DSPy.",
      "Asynchronous processing on Google Cloud Tasks and Pub/Sub, and DeepL translation between English, French and Dutch.",
    ],
    tech: ["Python", "FastAPI", "React", "Supabase", "GCP", "Vertex AI", "Google Vision", "DSPy", "DeepL"],
  },
  {
    company: "Satoripop",
    role: "Full-Stack Developer Intern",
    period: "Jul 2023 – Aug 2023",
    engagement: "Internship",
    place: "Sousse, Tunisia",
    summary:
      "I built a Google Meet-style video meeting app on my own, front end and back end: sign-in, roles, protected pages, meeting creation and scheduling, and calls through the Jitsi SDK.",
    tech: ["React", "TypeScript", "Express.js", "MySQL", "Jitsi"],
    links: [{ label: "jitsi.alabaganne.com", href: "https://jitsi.alabaganne.com" }],
  },
  {
    company: "Realinflo",
    role: "Full-Stack Developer Intern",
    period: "Feb 2021 – May 2021",
    engagement: "Internship",
    place: "remote (Hong Kong)",
    summary:
      "I built an admin dashboard to manage, chart and report on property data for a real estate platform, on Vue.js/Quasar and Node.js/Feathers.js with MongoDB, shipping in weekly milestones with the CTO and the Hong Kong team.",
    tech: ["Vue.js", "Quasar", "Node.js", "Feathers.js", "MongoDB"],
  },
  {
    company: "Satoripop",
    role: "Web Development Intern",
    period: "Jul 2020 – Aug 2020",
    engagement: "Internship",
    place: "Sousse, Tunisia",
    summary:
      "I learned Laravel and Vue.js on the job and built an employee management app for the company’s HR manager on my own, with sign-in, employee records and role-based dashboards, and documented its API with Swagger. I also turned a PSD design into a responsive e-commerce page.",
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap"],
    links: [{ label: "hr-management.alabaganne.com", href: "https://hr-management.alabaganne.com" }],
  },
];

