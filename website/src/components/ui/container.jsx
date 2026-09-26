import { cn } from "@/lib/utils";

export function Container({ as: Component = "div", className, ...props }) {
  return <Component className={cn("mx-auto w-full max-w-[1400px] px-6 sm:px-10 md:px-16 lg:px-20", className)} {...props} />;
}
