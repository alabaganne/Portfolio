import { CaseStudy, caseStudyMetadata } from "@/components/case-study";
import { getFeaturedProject } from "@/content/projects";

const project = getFeaturedProject("kartatunisie");

export const metadata = caseStudyMetadata(project);

export default function KartaTunisiePage() {
  return <CaseStudy project={project} />;
}
