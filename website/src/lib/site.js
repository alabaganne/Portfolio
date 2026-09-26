// Contact details and navigation shared by the navbar, footer and pages.
export const site = {
  name: "Ala Baganne",
  role: "Full-Stack Software Engineer",
  url: "https://alabaganne.com",
  email: "alabaganne9@gmail.com",
  phone: { label: "+216 50 101 959", href: "tel:+21650101959" },
  location: "Monastir, Tunisia",
  resume: "/Ala_Baganne_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/alabaganne/",
    github: "https://github.com/alabaganne",
    upwork: "https://www.upwork.com/freelancers/~018064bc5b1d8ca3ce",
  },
};

export const navLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
];

export const footerLinks = [
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#education", label: "Education" },
  { href: "/blog", label: "Blog" },
];

export const socialLinks = [
  { href: site.socials.linkedin, label: "LinkedIn" },
  { href: site.socials.github, label: "GitHub" },
  { href: site.socials.upwork, label: "Upwork" },
];
