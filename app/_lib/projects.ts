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
// "granted" is the owner's publication permission; nothing else is accepted.
export const projectPermissions = ["granted", "unverified"] as const;

export type ProjectFilter = "All" | ProjectCategory;

export const projectFilters: readonly ProjectFilter[] = ["All", ...projectCategories];

// A permitted screenshot, served from public/projects/{project id}/. Width and
// height are the file's pixel size (checked by the unit tests) so the
// walkthrough reserves the right space; the caption labels it there.
export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
}

export interface Decision {
  title: string;
  detail: string;
}

// An external link from a case study, such as the live site or source code.
export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;
  name: string;
  category: ProjectCategory;
  type: string;
  summary: string;
  challenge: string;
  decisions: Decision[];
  detail: string;
  status: string;
  publicationReady: boolean;
  permission: string;
  role: string;
  screenshots: Screenshot[];
  engineering: string[];
  links: ProjectLink[];
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

function objectList(
  record: Record<string, unknown>,
  key: string,
  label: string,
): Record<string, unknown>[] {
  const value = record[key];
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "object" || item === null || Array.isArray(item))
  ) {
    fail(label, `"${key}" must be an array of objects`);
  }
  return value as Record<string, unknown>[];
}

function decisionList(record: Record<string, unknown>, label: string): Decision[] {
  const value = objectList(record, "decisions", label);
  if (value.length === 0) fail(label, `"decisions" must list at least one decision`);
  return value.map((item, index) => ({
    title: text(item, "title", `${label} decision #${index}`),
    detail: text(item, "detail", `${label} decision #${index}`),
  }));
}

function linkList(record: Record<string, unknown>, label: string): ProjectLink[] {
  return objectList(record, "links", label).map((item, index) => {
    const href = text(item, "href", `${label} link #${index}`);
    if (!/^https:\/\/[^\s/]+(?:\/\S*)?$/.test(href)) {
      fail(label, `link "${href}" must be an https URL`);
    }
    return { label: text(item, "label", `${label} link #${index}`), href };
  });
}

function pixels(shot: Record<string, unknown>, key: string, label: string): number {
  const value = shot[key];
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    fail(label, `"${key}" must be a positive whole number`);
  }
  return value;
}

const screenshotFile = /^[a-z0-9]+(?:-[a-z0-9]+)*\.(?:png|jpe?g|webp|avif)$/;

function screenshotList(record: Record<string, unknown>, id: string, label: string): Screenshot[] {
  const value = record.screenshots;
  if (!Array.isArray(value)) fail(label, `"screenshots" must be an array`);
  return value.map((item, index) => {
    if (typeof item !== "object" || item === null || Array.isArray(item)) {
      fail(label, `screenshot #${index} must be an object with "src" and "alt"`);
    }
    const shot = item as Record<string, unknown>;
    const shotLabel = `${label} screenshot #${index}`;
    const src = text(shot, "src", shotLabel);
    const alt = text(shot, "alt", shotLabel);
    const prefix = `/projects/${id}/`;
    if (!src.startsWith(prefix) || !screenshotFile.test(src.slice(prefix.length))) {
      fail(label, `screenshot "${src}" must be an image file in ${prefix}`);
    }
    return {
      src,
      alt,
      width: pixels(shot, "width", shotLabel),
      height: pixels(shot, "height", shotLabel),
      caption: text(shot, "caption", shotLabel),
    };
  });
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

  const permission = text(record, "permission", label);
  if (!projectPermissions.includes(permission as (typeof projectPermissions)[number])) {
    fail(label, `"permission" must be one of ${projectPermissions.join(", ")}`);
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
    challenge: text(record, "challenge", label),
    decisions: decisionList(record, label),
    detail: text(record, "detail", label),
    status: text(record, "status", label),
    publicationReady: record.publicationReady,
    permission,
    role: text(record, "role", label),
    screenshots: screenshotList(record, id, label),
    engineering: textList(record, "engineering", label).map((item) => item.trim()),
    links: linkList(record, label),
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
  if (project.engineering.some((item) => item === "")) {
    fail(label, `"engineering" must not contain empty entries`);
  }

  // A cleared record needs its evidence in place and nothing left open.
  if (project.publicationReady) {
    if (project.permission !== "granted") fail(label, `publicationReady requires "granted"`);
    if (project.screenshots.length === 0) fail(label, "publicationReady requires a screenshot");
    if (project.engineering.length === 0) {
      fail(label, `publicationReady requires "engineering" details`);
    }
    if (project.evidenceRequired.length > 0) {
      fail(label, `publicationReady requires an empty "evidenceRequired"`);
    }
    if (project.reportedCapability !== null) {
      fail(label, `publicationReady requires a verified, not reported, capability`);
    }
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

export function findProject<T extends { id: string }>(
  projects: readonly T[],
  id: string,
): T | undefined {
  return projects.find((project) => project.id === id);
}

// The case-study "Next project" link follows display order and wraps.
export function nextProject<T extends { id: string }>(projects: readonly T[], id: string): T {
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) throw new Error(`Unknown project "${id}"`);
  return projects[(index + 1) % projects.length];
}
