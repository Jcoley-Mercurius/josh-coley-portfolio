import Image from "next/image";
import type { Project } from "../_lib/projects";

// Shows the project's first permitted screenshot, or the A1 placeholder frame
// until one is supplied (the adapter only accepts screenshots once permission
// is granted).
export default function ProjectPreview({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const [shot] = project.screenshots;
  const frame = large ? "project-preview project-preview-large" : "project-preview";

  if (!shot) {
    return (
      <div className={frame}>
        <span>{large ? "Verified project screenshot pending" : "Project screenshot pending"}</span>
      </div>
    );
  }

  return (
    <div className={`${frame} project-preview-image`}>
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        sizes={
          large
            ? "(min-width: 80rem) 80rem, 100vw"
            : "(min-width: 56.3125rem) 33vw, (min-width: 40.6875rem) 50vw, 100vw"
        }
        className="object-cover object-top"
      />
    </div>
  );
}
