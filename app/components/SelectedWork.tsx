import { projects } from "../_lib/project-records";
import ProjectCard from "./ProjectCard";
import WorkFilter from "./WorkFilter";

export default function SelectedWork() {
  return (
    <section
      id="work"
      aria-labelledby="work-title"
      className="mx-auto max-w-content px-[6%] py-[45px] tablet:px-[5%] tablet:py-[70px]"
    >
      <div className="mb-[30px] flex flex-col items-start gap-3 tablet:flex-row tablet:items-end tablet:justify-between tablet:gap-[30px]">
        <h2
          id="work-title"
          className="font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]"
        >
          Selected work
        </h2>
        <span className="eyebrow">Different problems. Deliberate solutions.</span>
      </div>
      {/* Cards render on the server; the client filter only chooses which to show. */}
      <WorkFilter
        items={projects.map((project) => ({
          id: project.id,
          category: project.category,
          card: <ProjectCard project={project} />,
        }))}
      />
    </section>
  );
}
