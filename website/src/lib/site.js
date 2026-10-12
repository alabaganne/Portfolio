// Contact details and navigation shared by the navbar, footer and pages.
export const site = {
  name: "Ala Baganne",
  role: "Full-Stack Software Engineer",
  url: "https://alabaganne.com",
  email: "alabaganne9@gmail.com",
  phone: { label: "+216 50 101 959", href: "tel:+21650101959" },
  whatsapp: "https://wa.me/21650101959",
  location: "Monastir, Tunisia",
  timezone: "UTC+1",
  languages: "English, French, Arabic",
  resume: "/Ala_Baganne_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/alabaganne/",
    github: "https://github.com/alabaganne",
    upwork: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce",
  },
};

// `match` marks the link as current on other paths, e.g. Work on the case study pages.
export const navLinks = [
  { href: "/#work", label: "Work", match: "/projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const socialLinks = [
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.github, label: "GitHub" },
  { href: site.socials.upwork, label: "Upwork" },
];
