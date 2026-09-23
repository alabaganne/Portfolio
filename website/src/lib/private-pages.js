// Personal pages that stay live but must never show up in search results.
// Enforced two ways:
//   1. `noIndexMetadata` is spread into each page's `metadata` export (meta tag).
//   2. `middleware.js` sets an X-Robots-Tag header on these paths.
// Deliberately NOT listed in robots.txt: blocking a crawler there would stop it
// from ever reading the noindex directive, which is what actually removes a page
// from search results.
export const privatePages = [
  "/hey",
  "/coffee",
  "/movie",
  "/study",
  "/birthday",
  "/eya",
  "/sorry",
];

export const noIndexMetadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};
