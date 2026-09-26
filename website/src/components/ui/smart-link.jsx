import Link from "next/link";

const EXTERNAL = /^(https?:)?\/\//;
const PLAIN = /^(mailto|tel):/;
const FILE = /\.[a-z0-9]+$/i;

// Internal routes go through next/link, external URLs open in a new tab,
// and mailto:, tel: and file links stay plain anchors.
export function SmartLink({ href, children, ...props }) {
  if (EXTERNAL.test(href)) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...props}>
        {children}
      </a>
    );
  }

  if (PLAIN.test(href) || FILE.test(href.split(/[?#]/)[0])) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}
