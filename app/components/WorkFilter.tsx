"use client";

import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import {
  filterProjects,
  projectCountLabel,
  projectFilters,
  type ProjectCategory,
  type ProjectFilter,
} from "../_lib/projects";

interface WorkItem {
  id: string;
  category: ProjectCategory;
  card: ReactNode;
}

const noop = () => () => {};

export default function WorkFilter({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const allButton = useRef<HTMLButtonElement>(null);
  // Without JavaScript every card stays visible and the inert filter controls
  // are hidden (space reserved, so hydration causes no layout shift).
  const interactive = useSyncExternalStore(noop, () => true, () => false);
  const shown = filterProjects(items, filter);

  const showAll = () => {
    setFilter("All");
    allButton.current?.focus();
  };

  return (
    <>
      <div
        role="group"
        aria-label="Filter projects"
        className={`my-7 flex flex-wrap gap-2 ${interactive ? "" : "invisible"}`}
      >
        {projectFilters.map((option) => (
          <button
            key={option}
            ref={option === "All" ? allButton : undefined}
            type="button"
            aria-pressed={filter === option}
            onClick={() => setFilter(option)}
            className="filter-chip"
          >
            {option}
          </button>
        ))}
      </div>
      <p role="status" className="mb-3 max-w-[450px] text-xs text-muted">
        {projectCountLabel(shown.length)}
      </p>
      {shown.length > 0 ? (
        <ul role="list" className="grid grid-cols-1 gap-6 tablet:grid-cols-2 desktop:grid-cols-3">
          {shown.map((item) => (
            <li key={item.id}>{item.card}</li>
          ))}
        </ul>
      ) : (
        <div className="text-muted">
          <p>No {filter} projects to show yet.</p>
          <button type="button" onClick={showAll} className="a1-btn mt-4 cursor-pointer">
            Show all projects
          </button>
        </div>
      )}
    </>
  );
}
