import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectPreview from "../../components/ProjectPreview";
import { projects } from "../../_lib/project-records";
import { findProject, nextProject } from "../../_lib/projects";

// Only the supplied records have case studies. Any other slug is answered by
// the root not-found, which renders on the server. (A notFound() thrown from
// the page returns an empty HTML shell in Next 16.4 and only renders with
// JavaScript, so unknown slugs must not reach it.)
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = findProject(projects, (await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    openGraph: {
      title: `${project.name} · Mercurius Solutions`,
      description: project.summary,
      siteName: "Mercurius Solutions",
      type: "article",
      locale: "en_US",
    },
  };
}

const chapters = [
  { id: "challenge", label: "Challenge" },
  { id: "contribution", label: "Contribution" },
  { id: "decisions", label: "Decisions" },
  { id: "evidence", label: "Evidence" },
];

const engineeringDetails = [
  "Responsive behavior",
  "Accessible interactions",
  "Technical decisions",
  "Performance observations",
];

const chapterHeading =
  "mb-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]";
const panel = "border border-line p-[30px]";
const note = "text-xs text-muted";

// Copy follows the approved A1 prototype case study. Every section stays
// labelled as pending until the record is cleared for publication (S6).
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = findProject(projects, (await params).slug);
  if (!project) notFound();
  const next = nextProject(projects, project.id);

  return (
    <article
      aria-labelledby="study-title"
      className="mx-auto min-h-[80vh] max-w-content px-[6%] py-[45px] tablet:px-[5%] tablet:py-[70px]"
    >
      <Link href="/#work">
        <span aria-hidden="true">←</span> Back to work
      </Link>

      <div className="grid grid-cols-1 items-center gap-[30px] tablet:grid-cols-[1.5fr_1fr] desktop:gap-[60px]">
        <div>
          <p className="eyebrow mt-4">Case study · {project.category}</p>
          <h1
            id="study-title"
            tabIndex={-1}
            className="my-6 font-display text-[clamp(44px,6vw,76px)] leading-[1.1] font-normal tracking-[-0.05em] [overflow-wrap:anywhere] focus:outline-none"
          >
            {project.name}
          </h1>
          <p>{project.summary}</p>
        </div>
        <dl className="border-l border-line pl-7 text-sm">
          <dt className="text-bronze">Project type</dt>
          <dd className="mb-[15px]">{project.type}</dd>
          <dt className="text-bronze">Status</dt>
          <dd className="mb-[15px]">{project.status}</dd>
          <dt className="text-bronze">Evidence</dt>
          <dd className="mb-[15px]">
            {project.publicationReady ? "Cleared for publication" : "Review pending"}
          </dd>
        </dl>
      </div>

      <nav
        aria-label="Case-study chapters"
        className="my-[25px] flex flex-wrap gap-[15px] border-y border-line py-[15px] text-[13px] tablet:text-base"
      >
        {chapters.map((chapter) => (
          <a key={chapter.id} href={`#${chapter.id}`}>
            {chapter.label}
          </a>
        ))}
      </nav>

      <ProjectPreview project={project} large />

      <div className="my-10 grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-8">
        <section id="challenge" aria-labelledby="challenge-title" className={panel}>
          <h2 id="challenge-title" className={chapterHeading}>
            The challenge
          </h2>
          <p>{project.challenge}</p>
        </section>
        <section id="contribution" aria-labelledby="contribution-title" className={panel}>
          <h2 id="contribution-title" className={chapterHeading}>
            My contribution
          </h2>
          <p>
            {project.role === "verify"
              ? "Scope, role, and delivery evidence to verify before publication."
              : project.role}
          </p>
        </section>
      </div>

      <section id="decisions" aria-labelledby="decisions-title">
        <h2 id="decisions-title" className={chapterHeading}>
          Key decisions
        </h2>
        <p className="mb-5">{project.detail}</p>
        <ol role="list" className="grid grid-cols-1 gap-5 desktop:grid-cols-3">
          {project.decisions.map((decision, index) => (
            <li key={decision} className="border border-line p-6">
              <span className="eyebrow" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="my-4 font-display text-[23px] leading-[1.1] font-normal">
                {decision}
              </h3>
              <p className={note}>Intent to be paired with implementation evidence.</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="evidence" aria-labelledby="evidence-title" className="mt-10">
        <h2 id="evidence-title" className={chapterHeading}>
          Working evidence
        </h2>
        <div className="my-10 grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-8">
          <div className={panel}>
            <h3 className="mb-4 font-display text-[28px] leading-[1.1] font-normal">
              Interface walkthrough
            </h3>
            <div className="project-preview">
              <span>Walkthrough pending</span>
            </div>
            <p className={note}>A narrated view of the actual user journey.</p>
          </div>
          <div className={panel}>
            <h3 className="mb-4 font-display text-[28px] leading-[1.1] font-normal">
              Engineering details
            </h3>
            <ul role="list" className="mb-4">
              {engineeringDetails.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
            <p className={note}>Verification pending. No results claimed.</p>
          </div>
        </div>
      </section>

      <Link className="a1-btn a1-btn-primary" href={`/work/${next.id}`}>
        {/* Non-breaking space keeps the arrow with the name when the label wraps. */}
        Next project · {next.name}&nbsp;<span aria-hidden="true">↗</span>
      </Link>
    </article>
  );
}
