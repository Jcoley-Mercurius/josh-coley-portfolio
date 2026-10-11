// Project record adapter. Validates the supplied records in content/projects/
// so an incomplete or malformed record fails the build instead of publishing
// an unsupported claim. Kept free of imports so `node --test` can load it.

export const projectCategories = [
  "Websites",
  "Booking",
  "SaaS",
  "Marketplaces",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];
export type ProjectFilter = "All" | ProjectCategory;

export const projectFilters: readonly ProjectFilter[] = ["All", ...projectCategories];

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  summary: string;
  status: string;
  publicationReady: boolean;
  permission: string;
  role: string;
  screenshots: string[];
  metrics: string[];
  evidenceRequired: string[];
  reportedCapability: string | null;
}

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(label: string, message: string): never {
  throw new Error(`Invalid project record ${label}: ${message}`);
}

function text(record: Record<string, unknown>, key: string, label: string): string {
  const value = record[key];
  if (typeof value !== "string" || value.trim() === "") {
    fail(label, `"${key}" must be a non-empty string`);
  }
  return value.trim();
}

function textList(record: Record<string, unknown>, key: string, label: string): string[] {
  const value = record[key];
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    fail(label, `"${key}" must be an array of strings`);
  }
  return value as string[];
}

export function parseProject(input: unknown, index = 0): Project {
  if (typeof input !== "object" || input === null || Array.isArray(input)) {
    fail(`#${index}`, "must be an object");
  }
  const record = input as Record<string, unknown>;
  const label = typeof record.id === "string" ? `"${record.id}"` : `#${index}`;

  const id = text(record, "id", label);
  if (!slugPattern.test(id)) fail(label, `"id" must be a lowercase slug`);

  const category = text(record, "category", label);
  if (!projectCategories.includes(category as ProjectCategory)) {
    fail(label, `"category" must be one of ${projectCategories.join(", ")}`);
  }

  if (typeof record.publicationReady !== "boolean") {
    fail(label, `"publicationReady" must be a boolean`);
  }

  const reportedCapability = record.reportedCapability ?? null;
  if (reportedCapability !== null && typeof reportedCapability !== "string") {
    fail(label, `"reportedCapability" must be a string or null`);
  }

  const project: Project = {
    id,
    name: text(record, "name", label),
    category: category as ProjectCategory,
    type: text(record, "type", label),
    summary: text(record, "summary", label),
    status: text(record, "status", label),
    publicationReady: record.publicationReady,
    permission: text(record, "permission", label),
    role: text(record, "role", label),
    screenshots: textList(record, "screenshots", label),
    metrics: textList(record, "metrics", label),
    evidenceRequired: textList(record, "evidenceRequired", label),
    reportedCapability,
  };

  // No results or screenshots may be shown before the evidence is cleared.
  if (!project.publicationReady && project.metrics.length > 0) {
    fail(label, "metrics require publicationReady");
  }
  if (project.permission !== "granted" && project.screenshots.length > 0) {
    fail(label, `screenshots require "permission": "granted"`);
  }

  return project;
}

export function parseProjects(inputs: readonly unknown[]): Project[] {
  const projects = inputs.map((input, index) => parseProject(input, index));
  const seen = new Set<string>();
  for (const { id } of projects) {
    if (seen.has(id)) fail(`"${id}"`, "duplicate id");
    seen.add(id);
  }
  return projects;
}

export function filterProjects<T extends { category: ProjectCategory }>(
  projects: readonly T[],
  filter: ProjectFilter,
): T[] {
  return filter === "All" ? [...projects] : projects.filter((p) => p.category === filter);
}

export function projectCountLabel(count: number): string {
  return `${count} ${count === 1 ? "project" : "projects"} shown`;
}
