import type { Project } from "../_lib/projects";

// The case-study link arrives with the S3 routes; card motion is S4.
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full border border-line bg-[#ffffff42] p-[22px]">
      <small className="block text-bronze">
        {project.category} · {project.type}
      </small>
      <h3 className="mb-4 font-display text-[25px] leading-[1.1] font-normal">
        {project.name}
      </h3>
      <div className="project-preview">
        <span>Project screenshot pending</span>
      </div>
      <span className="inline-block border border-line px-2 py-1 text-[11px] text-bronze">
        {project.status}
      </span>
      <p className="my-[1em] text-sm tablet:min-h-[68px]">{project.summary}</p>
    </article>
  );
}
