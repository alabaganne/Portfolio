import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, ArrowUpRight } from "lucide-react";

import { SmartLink } from "@/components/ui/smart-link";
import { cn } from "@/lib/utils";

const arrows = {
  "up-right": {
    Icon: ArrowUpRight,
    motion: "group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5",
  },
  right: { Icon: ArrowRight, motion: "group-hover/link:translate-x-0.5" },
  left: { Icon: ArrowLeft, motion: "group-hover/link:-translate-x-0.5" },
  up: { Icon: ArrowUp, motion: "group-hover/link:-translate-y-0.5" },
  down: { Icon: ArrowDown, motion: "group-hover/link:translate-y-0.5" },
};

const tones = {
  default: "text-fg hover:opacity-80",
  muted: "text-fg-muted hover:text-fg",
  subtle: "text-fg-subtle hover:text-fg",
};

const sizes = {
  base: { text: "gap-1.5 text-base font-medium", icon: "size-4" },
  title: { text: "gap-2 font-display text-title", icon: "size-6" },
};

export function ArrowLink({
  href,
  direction = "up-right",
  tone = "default",
  size = "base",
  className,
  children,
  ...props
}) {
  const { Icon, motion } = arrows[direction] ?? arrows["up-right"];
  const { text, icon: iconSize } = sizes[size] ?? sizes.base;
  const icon = <Icon aria-hidden className={cn("shrink-0 transition-transform duration-300", iconSize, motion)} />;

  return (
    <SmartLink
      href={href}
      className={cn(
        "group/link inline-flex items-center transition-[color,opacity] duration-250",
        text,
        tones[tone] ?? tones.default,
        className,
      )}
      {...props}
    >
      {direction === "left" ? icon : null}
      <span>{children}</span>
      {direction === "left" ? null : icon}
    </SmartLink>
  );
}

// A wrapping row of ArrowLinks, e.g. a project's live site and code.
export function ArrowLinkList({ links, className }) {
  return (
    <ul className={cn("flex flex-wrap gap-x-6 gap-y-2", className)}>
      {links.map((link) => (
        <li key={link.href}>
          <ArrowLink href={link.href}>{link.label}</ArrowLink>
        </li>
      ))}
    </ul>
  );
}
