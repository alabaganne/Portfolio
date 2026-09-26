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
  default: "text-fg hover:text-fg-muted",
  muted: "text-fg-muted hover:text-fg",
  subtle: "text-fg-subtle hover:text-fg",
};

export function ArrowLink({ href, direction = "up-right", tone = "default", className, children, ...props }) {
  const { Icon, motion } = arrows[direction] ?? arrows["up-right"];
  const icon = <Icon aria-hidden className={cn("size-4 shrink-0 transition-transform duration-300", motion)} />;

  return (
    <SmartLink
      href={href}
      className={cn(
        "group/link inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
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
