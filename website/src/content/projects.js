// Portfolio projects. `featuredProjects` get a home page row and a case study page under /projects/<slug>;
// the rest are listed under "More projects". Case study text is checked against each project's code and
// docs: keep it to what is built and verifiable, and leave out numbers that aren't recorded anywhere.
//
// Case study sections are lists of blocks: a string is a paragraph, { list: [...] } a bullet list and
// { links: [...] } a row of links.

// Bump when a project image changes, so browsers and the image optimizer fetch the new file.
export const imageVersion = "20261012";

export const featuredProjects = [
  {
    slug: "menumate",
    name: "MenuMate",
    type: "Independent product",
    period: "2025 – today",
    status: "Live, free to use",
    role: "Sole designer and developer",
    summary:
      "A web app where restaurants build their menu, put a QR code on each table and receive guests’ orders on a live dashboard. Guests order from their phones without an app and pay the restaurant directly.",
    decision:
      "A single Postgres function saves each order and its items in one transaction, so the kitchen never sees an empty ticket and a retried request can’t create a duplicate.",
    tech: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    image: {
      src: "/projects/menumate-demo.png",
      alt: "MenuMate’s landing page on a laptop, next to a phone showing a demo restaurant’s menu with prices in dinars.",
    },
    links: [
      { label: "menumate.net", href: "https://menumate.net" },
      { label: "Demo menu", href: "https://www.menumate.net/en/chez-farouk" },
    ],
    seo: {
      title: "MenuMate case study | Ala Baganne",
      description:
        "How Ala Baganne designed and built MenuMate, a QR-code menu and table-ordering app for restaurants, with Next.js, Supabase and Postgres.",
    },
    sections: [
      {
        label: "Problem",
        body: [
          "Restaurant owners need a menu that guests can read on their phones and that staff can update themselves, plus a way to take orders from every table. Guests shouldn’t have to install an app.",
        ],
      },
      {
        label: "Ownership",
        body: [
          "I designed, built and launched MenuMate on my own: the database schema and access rules, the API routes, the guest menu and its themes, the owner dashboard, the emails and the printable QR sheets.",
        ],
      },
      {
        label: "Constraints",
        body: [
          {
            list: [
              "I work on it alone and part-time, alongside contract work.",
              "Its first market is Tunisia, where Stripe isn’t available and local gateways don’t offer automatic recurring billing. In September 2026 I removed the billing screens and made MenuMate free. It doesn’t handle payments: guests pay the restaurant the way they already do.",
              "The Tunisian dinar has three decimal places, so prices and totals are stored and shown with three decimals.",
            ],
          },
        ],
      },
      {
        label: "Architecture",
        body: [
          "MenuMate is a Next.js app (App Router, TypeScript) on Vercel, backed by Supabase for Postgres, authentication, realtime updates and file storage.",
          "Each restaurant’s menu is rendered on the server at its own URL, in one of three themes. A small client-side loader downloads only the theme the restaurant picked, so a menu doesn’t carry every theme’s CSS.",
          "When a guest sends an order, an API route checks the restaurant, the table, the items and their prices, then calls a Postgres function that saves the order with its items. The owner’s dashboard subscribes to a realtime channel for that restaurant and falls back to polling every 60 seconds if the connection drops.",
          "It’s multi-tenant: one account can run several restaurants, each with its own menus, orders and staff access. Row-level security policies keep each restaurant’s data separate, and each owner’s images sit in their own storage folder. QR codes are generated in the browser, printable menus and QR sheets are rendered as PDFs, and the interface is in English and French.",
        ],
      },
      {
        label: "Tradeoff",
        body: [
          "Orders used to be saved in two requests: first the order, then its items. The dashboard listens for new orders in real time, so the insert event could arrive before the items existed and show the kitchen an empty ticket. A failure between the two requests also left orders without items.",
          "I moved order creation into one Postgres function that inserts the order and its items in a single transaction. The guest’s browser picks the order id, so if a response is lost and the request is retried, the function returns the existing order instead of sending the kitchen a duplicate. The tradeoff is that this logic now lives in SQL, in a database migration, rather than in the TypeScript API route.",
        ],
      },
      {
        label: "Testing & reliability",
        body: [
          {
            list: [
              "A SQL script runs 11 checks that one restaurant can’t read or change another restaurant’s data, against a local database, and rolls everything back afterwards.",
              "Money formatting and arithmetic have assertion tests, including three-decimal dinar amounts.",
              "Most API routes validate input with zod. The order route checks ids, the table, prices and a 25-item cap, and limits each client to 10 orders a minute per restaurant.",
              "Not done yet: there is no CI pipeline and no end-to-end browser tests. The test scripts run by hand.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        body: [
          "MenuMate is live at menumate.net and free to use. Owners can sign up, build a menu, pick a theme, print table QR codes and take orders on the live dashboard. A demo restaurant’s menu is public, so you can try the guest side.",
        ],
      },
      {
        label: "Evidence",
        body: [
          {
            links: [
              { label: "menumate.net", href: "https://menumate.net" },
              { label: "Demo restaurant menu", href: "https://www.menumate.net/en/chez-farouk" },
            ],
          },
          "The screenshots below show the public demo menu on a phone and the live orders board with a test order. The code is in a private repository.",
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/menumate/guest-menu-phone.webp",
        width: 860,
        height: 1770,
        displayWidth: 320,
        alt: "MenuMate’s public demo menu on a phone: Tunisian starters with prices in dinars and the order bar at the bottom.",
        caption: "The public demo menu on a phone. Guests add dishes and send the order from their table.",
      },
      {
        src: "/projects/menumate/live-orders.webp",
        width: 800,
        height: 600,
        displayWidth: 640,
        alt: "MenuMate dashboard showing the live orders board, with a new order from table 1 in a test café.",
        caption: "Live orders board in a test café. New orders appear here without a page reload.",
      },
    ],
  },
  {
    slug: "kartatunisie",
    name: "KartaTunisie",
    type: "Independent product",
    period: "2026 – today",
    status: "Live",
    role: "Sole designer and developer",
    summary:
      "An online shop where buyers in Tunisia order game credits, gift cards and AI subscriptions, pay in dinars by bank transfer or in cash, and get their code by email once the payment is confirmed.",
    decision:
      "The server re-prices every order from the live catalog and stops it if the price changed since the page loaded, so the browser never decides what the buyer pays.",
    tech: ["Next.js", "TypeScript", "MySQL", "Drizzle ORM", "next-intl", "Tailwind CSS"],
    image: {
      src: "/projects/karta-demo.png",
      alt: "KartaTunisie’s French storefront on a laptop, showing gaming gift cards priced in Tunisian dinars.",
    },
    links: [{ label: "kartatunisie.com", href: "https://kartatunisie.com" }],
    seo: {
      title: "KartaTunisie case study | Ala Baganne",
      description:
        "How Ala Baganne designed and built KartaTunisie, a three-language gift card shop for Tunisia paid in dinars, with Next.js, TypeScript, Drizzle and MySQL.",
    },
    sections: [
      {
        label: "Problem",
        body: [
          "Many people in Tunisia can’t pay foreign online stores with their bank card, which makes buying game credits or a ChatGPT subscription hard. KartaTunisie sells these as codes and takes payment in dinars, by bank transfer or in cash.",
        ],
      },
      {
        label: "Ownership",
        body: [
          "I designed, built and launched KartaTunisie on my own, in French, English and Arabic: the storefront, the order flow, the admin panel, the emails, and the deployment and backups on a VPS.",
        ],
      },
      {
        label: "Constraints",
        body: [
          {
            list: [
              "No card payments: buyers pay by bank transfer or in cash in Monastir, and staff check each payment before sending the code. D17 mobile payments are built but stay off until the merchant account is ready.",
              "Prices are in dinars, stored as whole millimes and shown the Tunisian way: “1.250 DT” is one dinar and 250 millimes, so the shop never uses a thousands separator.",
              "It runs on a small VPS shared with other sites, as a single Node.js process, with MySQL tuned for the memory available.",
            ],
          },
        ],
      },
      {
        label: "Architecture",
        body: [
          "KartaTunisie is a Next.js app (App Router, TypeScript) with Drizzle ORM on MySQL, and next-intl for the three languages.",
          "The order form is validated with zod and submitted through a server action. The server rebuilds the order from the live catalog, saves it under a unique reference (retrying if a reference is already taken) and sends the confirmation emails after the response. Buyers paying by bank transfer upload their receipt, which is checked by its file signature and size before it’s stored.",
          "In the admin panel, each staff role has its own permissions. A staff member with the right permission pastes the gift card code, which goes to the buyer by email and is never written to the database.",
          "Deploys run from a script: copy the code, install, build, migrate the database, swap in the new folder (keeping the old one) and restart the systemd service behind Nginx. A nightly database dump keeps 14 days of backups.",
        ],
      },
      {
        label: "Tradeoff",
        body: [
          "Admins change prices and stock from the panel while the shop is open, so the page a buyer has open can be older than the latest price. The simple option is to trust the price the form sends, but then a stale page or an edited request decides the total.",
          "Instead, the form sends the product, the amount and the price the buyer saw. The server looks up the live price in the catalog and, if the two differ, stops the order and asks the buyer to reload the page. The buyer sees one extra step when a price changes, and never pays an amount they didn’t see.",
        ],
      },
      {
        label: "Testing & reliability",
        body: [
          {
            list: [
              "298 Vitest tests in 25 files cover pricing, money, building and validating orders, payments, receipts, order status rules, permissions and email templates. They are unit tests without a browser or database, and they all pass.",
              "Orders are limited to 3 per email every 10 minutes and 10 per IP address an hour. Five failed admin logins lock that IP address for 15 minutes.",
              "Every admin page and action checks the user’s permission, and an order’s status only changes if nobody else changed it first.",
              "Not done yet: there is no CI pipeline and no end-to-end tests.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        body: [
          "KartaTunisie is live at kartatunisie.com in French, English and Arabic. Buyers can browse the catalog, order and upload a payment receipt; staff confirm payments and send codes from the admin panel.",
        ],
      },
      {
        label: "Evidence",
        body: [
          { links: [{ label: "kartatunisie.com", href: "https://kartatunisie.com" }] },
          "The screenshot below is the public product page with its order form. The code is in a private repository.",
        ],
      },
    ],
    gallery: [
      {
        src: "/projects/karta/order-form.webp",
        width: 2880,
        height: 1800,
        alt: "KartaTunisie’s Valorant product page in English, with amounts priced in dinars and the order form.",
        caption: "Product page and order form. The buyer picks an amount, enters their details and chooses how to pay.",
      },
    ],
  },
  {
    slug: "internly",
    name: "Internly",
    type: "Final-year project, Bachelor’s in Computer Science",
    period: "2021, updated 2026",
    status: "Live demo with sample data",
    role: "Sole developer",
    summary:
      "An internship platform with three workspaces: students find internships, apply and track their applications, companies post roles and review applicants, and admins manage the catalog.",
    decision:
      "Each search filter counts results with the other filters applied but not its own, so picking one city still shows how many internships the other cities have.",
    tech: ["Laravel", "Vue.js", "Inertia.js", "Tailwind CSS", "MySQL", "Pusher"],
    image: {
      src: "/projects/internly-demo.png",
      alt: "Internly’s student dashboard on a laptop: open internships, companies hiring and the status of recent applications.",
    },
    links: [
      { label: "internly.alabaganne.com", href: "https://internly.alabaganne.com" },
      { label: "Code on GitHub", href: "https://github.com/alabaganne/internly" },
    ],
    seo: {
      title: "Internly case study | Ala Baganne",
      description:
        "Internly, an internship platform built with Laravel, Vue.js and Inertia.js: student, company and admin workspaces, search, applications and messaging.",
    },
    sections: [
      {
        label: "Problem",
        body: [
          "Students need one place to find internships, apply and follow their applications. Companies need to post roles and review who applied, and someone has to keep the fields of study and skills in order.",
        ],
      },
      {
        label: "Ownership",
        body: [
          "I built Internly on my own as the final-year project of my Bachelor’s in Computer Science at ISSAT Sousse, in spring 2021: the data model, the Laravel back end and the Vue interface.",
          "In 2026 I upgraded it from Laravel 8 to Laravel 12, replaced Laravel Mix with Vite, moved to Inertia 2, redesigned the interface and added feature tests. The live demo runs this version.",
        ],
      },
      {
        label: "Architecture",
        body: [
          "Laravel serves Vue pages through Inertia.js, so there is no separate API: routing, validation and authorization stay in Laravel. The data lives in MySQL.",
          "A user is either a student or a company, through a polymorphic relation, and an admin flag unlocks the admin tools. Laravel policies decide who can apply, edit, reply or delete.",
          "Application updates are stored as database notifications and broadcast with Pusher on a private channel for each user, and new messages go out on the same channel.",
        ],
      },
      {
        label: "Tradeoff",
        body: [
          "The internship search has filters for field, city and company, and each option shows how many internships match. If every count applied every active filter, picking one city would drop all the other cities to zero, and the filter could only ever narrow the results.",
          "Instead, each filter’s counts apply the other filters and the keyword search, but not its own selection. Picking Sousse still shows how many internships Tunis has for the same field and company. It costs one count query per filter on each search.",
        ],
      },
      {
        label: "Testing & reliability",
        body: [
          {
            list: [
              "Form requests validate input, for example a cover letter of at least 200 characters and at most 10 attachments of 10 MB each.",
              "Policies allow one application per internship, and editing or withdrawing it only while it’s pending. Since 2026, companies have to complete their profile before posting.",
              "Sending a message doesn’t depend on the realtime broadcast: if Pusher fails, the message is still saved and the error is logged.",
              "The 2026 update added 14 feature tests for applying, saving roles, messaging, notifications and page rendering. The 2021 version only had the authentication tests that come with Laravel Breeze.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        body: [
          "Delivered as my final-year project in 2021. The live demo runs on sample data, and its login form comes filled in with a demo student account.",
        ],
      },
      {
        label: "Evidence",
        body: [
          {
            links: [
              { label: "internly.alabaganne.com", href: "https://internly.alabaganne.com" },
              { label: "Code on GitHub", href: "https://github.com/alabaganne/internly" },
            ],
          },
          "Screenshots of every workspace are below.",
        ],
      },
    ],
  },
  {
    slug: "promptstream",
    name: "PromptStream",
    type: "Independent product",
    period: "2026 – today",
    status: "Released, updated from time to time",
    role: "Sole designer and developer",
    summary:
      "A dictation app for Linux and macOS: hold a key, speak, and the cleaned-up text is pasted wherever your cursor is, in any app.",
    decision:
      "Wayland doesn’t let apps simulate key presses, so on Linux it pastes through the XDG RemoteDesktop portal, the only route that reaches native Wayland windows.",
    tech: ["Electron", "React", "TypeScript", "Next.js", "Supabase", "Whisper (Groq)"],
    image: {
      src: "/projects/promptstream-demo.png",
      alt: "PromptStream’s account settings window on a laptop, with its “Dictating…” indicator below.",
    },
    links: [
      { label: "promptstream.alabaganne.com", href: "https://promptstream.alabaganne.com" },
      { label: "Download", href: "https://promptstream.alabaganne.com/download" },
    ],
    seo: {
      title: "PromptStream case study | Ala Baganne",
      description:
        "How Ala Baganne built PromptStream, a system-wide dictation app for Linux and macOS with Electron, Next.js, Supabase and Whisper.",
    },
    sections: [
      {
        label: "Problem",
        body: [
          "I use Wispr Flow on my MacBook. When I moved my desktop to Fedora, I couldn’t find a dictation app for Linux that worked as well, so I built one, Linux first. It has to work everywhere: chat, email, the browser, the terminal, the code editor.",
        ],
      },
      {
        label: "Ownership",
        body: [
          "I designed and built PromptStream on my own: the Electron desktop app for Linux and macOS, the Next.js website and API, accounts with Supabase, and the hosting on my VPS.",
        ],
      },
      {
        label: "Constraints",
        body: [
          {
            list: [
              "Wayland, the default on Fedora, doesn’t let one app type into another app’s window.",
              "It can’t rely on integrations with each app, so it pastes through the clipboard like a person would.",
              "Speech has to reach a transcription model, so dictation needs a network connection.",
            ],
          },
        ],
      },
      {
        label: "Architecture",
        body: [
          "The desktop app is Electron with React and TypeScript, with separate macOS and Linux back ends for the global shortcut and for pasting.",
          "While the shortcut is held, a small overlay window records the microphone and shows a live level meter. The app sends the audio to a Next.js API route with the user’s Supabase session token. That route transcribes it with Whisper on Groq, and a second route cleans up the text with an LLM, so the API keys stay on the server. The personal dictionary goes to both as a glossary, so names and jargon come out spelled right.",
          "To paste, the app puts the text on the clipboard and sends the paste shortcut: through AppleScript on macOS, and through the RemoteDesktop portal over D-Bus on Linux. On macOS the previous clipboard comes back afterwards. History stays on the computer, capped at 500 entries.",
        ],
      },
      {
        label: "Tradeoff",
        body: [
          "On Linux, the usual ways to send a key press don’t work everywhere: XTEST through XWayland only reaches X11 apps, and tools like wtype or ydotool need a wlroots compositor or root access.",
          "The XDG RemoteDesktop portal, which GNOME and KDE both implement, is the only route that reaches native Wayland windows. The cost is a permission prompt the first time on GNOME; the app asks the portal to remember the grant, so it only appears once.",
        ],
      },
      {
        label: "Testing & reliability",
        body: [
          {
            list: [
              "24 Vitest unit tests cover the hotkey state machine, key combination tracking and the text helpers, and they pass.",
              "If cleanup or pasting fails, the transcribed text stays on the clipboard and in history, so nothing you said is lost.",
              "Requests time out (60 seconds for transcription, 25 for cleanup), and an expired session, a plan limit or a rate limit each get their own message.",
              "If the microphone only records silence, the app says so and, on macOS, asks for access again. If the chosen microphone disappears, it falls back to the default one.",
              "The LLM sometimes answered a dictated question instead of cleaning it up. Few-shot examples and a check that falls back to the raw text fixed it.",
              "Not done yet: the website and API have no tests.",
            ],
          },
        ],
      },
      {
        label: "Outcome",
        body: [
          "PromptStream is released at promptstream.alabaganne.com for macOS 13+ and Linux (AppImage), with a free plan, and I update it from time to time. Windows isn’t supported yet.",
        ],
      },
      {
        label: "Evidence",
        body: [
          {
            links: [
              { label: "promptstream.alabaganne.com", href: "https://promptstream.alabaganne.com" },
              { label: "Download page", href: "https://promptstream.alabaganne.com/download" },
            ],
          },
          "The code is in a private repository.",
        ],
      },
    ],
  },
];

export const moreProjects = [
  {
    name: "BackupMaster",
    tag: "iPhone backups on macOS",
    href: "https://backupmaster.alabaganne.com",
    image: "/projects/backupmaster-demo.png",
    tech: ["Swift", "SwiftUI", "libimobiledevice", "Next.js", "SQLite"],
  },
  {
    name: "EXODIA Store",
    tag: "Custom Shopify theme",
    href: "https://exodia-preview.myshopify.com/",
    previewPassword: "paglow",
    image: "/projects/exodia-demo.png",
    tech: ["Shopify", "Liquid", "JavaScript", "CSS"],
  },
  {
    name: "Resume Studio",
    tag: "Résumés with PDF & Word export",
    href: "https://react-resume-studio.vercel.app",
    image: "/projects/resume-studio-demo.png",
    tech: ["Next.js", "TypeScript", "Tailwind", "jsPDF", "docx"],
  },
  {
    name: "LeBonBureau",
    tag: "Office furniture store",
    href: "https://lebonbureau.alabaganne.com",
    image: "/projects/lebonbureau-demo.png",
    tech: ["Next.js", "Medusa", "TypeScript", "Tailwind"],
  },
  {
    name: "Satoripop RH",
    tag: "HR platform",
    href: "https://hr-management.alabaganne.com",
    image: "/projects/satoripop-rh-demo.png",
    tech: ["Vue.js", "Laravel", "MySQL", "Bootstrap", "Swagger"],
  },
  {
    name: "Martinez Auto Detail",
    tag: "Booking system",
    href: "https://booking.martinezautodetailwa.com/",
    image: "/projects/martinez-demo.png",
    tech: ["Next.js", "React", "Tailwind", "Square API"],
  },
  {
    name: "ABSoft",
    tag: "Agency website",
    href: "https://absoft.alabaganne.com",
    image: "/projects/absoft-demo.png",
    tech: ["Next.js", "React", "TypeScript", "CSS Modules", "Resend"],
  },
  {
    name: "Socialura",
    tag: "WordPress store with Stripe checkout",
    href: "https://socialura.alabaganne.com",
    image: "/projects/socialura-demo.png",
    tech: ["WordPress", "CSS", "Stripe", "Custom UI"],
  },
  {
    name: "Taroura Arena",
    tag: "Gym & karate club website",
    href: "https://taroura-arena.alabaganne.com/",
    image: "/projects/taroura-arena-demo.png",
    tech: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Meet",
    tag: "Video meeting app",
    href: "https://jitsi.alabaganne.com",
    image: "/projects/meet-demo.png",
    tech: ["React", "TypeScript", "Node.js", "Express.js", "MySQL", "Jitsi SDK"],
  },
  // Global Deals: client work, hidden for now. Uncomment to show it under "More projects".
  // {
  //   name: "Global Deals",
  //   tag: "3D globe with event markers",
  //   href: "https://global-deals.vercel.app",
  //   image: "/projects/global-deals-demo.png",
  //   tech: ["React 18", "Mapbox GL", "Supabase", "Tiptap", "Tailwind v4"],
  // },
  {
    name: "Eyedeal",
    tag: "Store landing page",
    href: "https://ecommerce.alabaganne.com",
    image: "/projects/eyedeal-demo.png",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
];

export const getFeaturedProject = (slug) => featuredProjects.find((project) => project.slug === slug);
