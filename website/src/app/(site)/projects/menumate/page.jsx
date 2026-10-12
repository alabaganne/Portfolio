import { CaseStudy, caseStudyMetadata } from "@/components/case-study";
import { getFeaturedProject } from "@/content/projects";

const project = getFeaturedProject("menumate");

export const metadata = caseStudyMetadata(project);

export default function MenuMatePage() {
  return <CaseStudy project={project} />;
}
