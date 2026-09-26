import { PageHeader } from "@/components/page-header";
import { SiteShell } from "@/components/site-shell";
import { Button, ButtonArrow } from "@/components/ui/button";

export const metadata = {
  title: "Page not found | Ala Baganne",
};

export default function NotFound() {
  return (
    <SiteShell>
      <PageHeader
        label="404"
        title={
          <>
            This page <span className="text-fg-subtle">doesn&apos;t exist.</span>
          </>
        }
        description="The link may be broken, or the page may have moved."
      >
        <div className="mt-10 flex flex-wrap gap-3 pb-16 motion-safe:animate-rise motion-safe:[animation-delay:240ms]">
          <Button href="/" size="lg">
            Back to home
            <ButtonArrow />
          </Button>
          <Button href="/blog" variant="secondary" size="lg">
            Read the blog
          </Button>
        </div>
      </PageHeader>
    </SiteShell>
  );
}
