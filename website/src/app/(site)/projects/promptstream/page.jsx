import { CaseStudy, caseStudyMetadata } from "@/components/case-study";
import { getFeaturedProject } from "@/content/projects";

const project = getFeaturedProject("promptstream");

export const metadata = caseStudyMetadata(project);

export default function PromptStreamPage() {
  return <CaseStudy project={project} />;
}
