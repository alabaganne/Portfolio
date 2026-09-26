import { PageHeader } from "@/components/page-header";
import { SiteShell } from "@/components/site-shell";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Page not found | Ala Baganne",
};

export default function NotFound() {
  return (
    <SiteShell>
      <PageHeader
        title={
          <>
            Page not <span className="text-accent">found</span>
          </>
        }
        description="The link may be broken, or the page may have moved."
      >
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">
            Back to home
          </Button>
          <Button href="/blog" variant="secondary" size="lg">
            Read the blog
          </Button>
        </div>
      </PageHeader>
    </SiteShell>
  );
}
