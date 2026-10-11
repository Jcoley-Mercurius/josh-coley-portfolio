import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import {
  filterProjects,
  findProject,
  nextProject,
  parseProject,
  parseProjects,
  projectCategories,
  projectCountLabel,
} from "./projects.ts";

const recordsDir = new URL("../../content/projects/", import.meta.url);
const records = readdirSync(recordsDir)
  .filter((file) => file.endsWith(".json"))
  .map((file) => JSON.parse(readFileSync(new URL(file, recordsDir), "utf8")));

const valid = {
  id: "example-project",
  name: "Example",
  category: "SaaS",
  type: "SaaS project",
  summary: "An example record.",
  challenge: "An example challenge.",
  decisions: ["An example decision"],
  detail: "An example detail.",
  status: "Evidence pending",
  publicationReady: false,
  permission: "unverified",
  role: "verify",
  screenshots: [],
  metrics: [],
  evidenceRequired: ["scope and contribution"],
  reportedCapability: null,
};

test("every supplied record is valid", () => {
  const projects = parseProjects(records);
  assert.equal(projects.length, 5);
});

test("supplied records stay truthfully labelled", () => {
  const projects = parseProjects(records);
  for (const project of projects) {
    // Write-ups are not verified yet, so no record is cleared or shows results.
    assert.equal(project.publicationReady, false, project.id);
    assert.deepEqual(project.metrics, [], project.id);
    // Owner decision 2026-10-11: all five are Josh's own work, cleared to publish.
    assert.equal(project.permission, "granted", project.id);
    assert.match(project.role, /^Solo build: /, project.id);
  }
  // Delivery status as stated by the owner on 2026-10-11.
  const status = Object.fromEntries(projects.map((p) => [p.id, p.status]));
  assert.deepEqual(status, {
    "shave-parlor": "In rebuild",
    "homeschool-haven": "Demo",
    marketplace: "Live",
    "supabase-saas": "Live",
    vertex: "Pre-launch",
  });
});

test("every referenced screenshot exists in public/", () => {
  const publicDir = new URL("../../public/", import.meta.url);
  for (const project of parseProjects(records)) {
    for (const { src } of project.screenshots) {
      assert.ok(existsSync(new URL(`.${src}`, publicDir)), `${project.id}: ${src} is missing`);
    }
  }
});

test("rejects missing or empty required fields", () => {
  for (const key of ["id", "name", "type", "summary", "challenge", "detail", "status"]) {
    assert.throws(() => parseProject({ ...valid, [key]: undefined }), new RegExp(key));
    assert.throws(() => parseProject({ ...valid, [key]: "  " }), new RegExp(key));
  }
});

test("requires at least one key decision", () => {
  assert.throws(() => parseProject({ ...valid, decisions: [] }), /decisions/);
  assert.throws(() => parseProject({ ...valid, decisions: [" "] }), /decisions/);
  assert.throws(() => parseProject({ ...valid, decisions: "Scope" }), /decisions/);
});

test("rejects unknown categories and malformed slugs", () => {
  assert.throws(() => parseProject({ ...valid, category: "Games" }), /category/);
  assert.throws(() => parseProject({ ...valid, id: "Not A Slug" }), /slug/);
});

test("rejects claims made before evidence is cleared", () => {
  const shot = { src: "/projects/example-project/home.png", alt: "Home page" };
  assert.throws(() => parseProject({ ...valid, metrics: ["40% faster"] }), /metrics/);
  assert.throws(() => parseProject({ ...valid, screenshots: [shot] }), /screenshots/);
});

test("accepts only the agreed permission terms", () => {
  assert.equal(parseProject({ ...valid, permission: "granted" }).permission, "granted");
  for (const permission of ["Granted", "yes", "pending"]) {
    assert.throws(() => parseProject({ ...valid, permission }), /permission/);
  }
});

test("screenshots need alt text and must live in the project's folder", () => {
  const granted = { ...valid, permission: "granted" };
  const shot = { src: "/projects/example-project/home-page.webp", alt: "Home page" };
  assert.deepEqual(parseProject({ ...granted, screenshots: [shot] }).screenshots, [shot]);
  assert.throws(() => parseProject({ ...granted, screenshots: [shot.src] }), /screenshot #0/);
  assert.throws(() => parseProject({ ...granted, screenshots: [{ src: shot.src }] }), /alt/);
  assert.throws(() => parseProject({ ...granted, screenshots: [{ ...shot, alt: " " }] }), /alt/);
  for (const src of [
    "/projects/other-project/home.png",
    "/headshot.jpg",
    "/projects/example-project/../headshot.jpg",
    "/projects/example-project/home.svg",
    "https://example.com/projects/example-project/home.png",
  ]) {
    assert.throws(() => parseProject({ ...granted, screenshots: [{ ...shot, src }] }), /image file/);
  }
});

test("rejects duplicate ids", () => {
  assert.throws(() => parseProjects([valid, valid]), /duplicate/);
});

test("filters by category, including empty results", () => {
  const projects = parseProjects(records);
  assert.equal(filterProjects(projects, "All").length, projects.length);
  for (const category of projectCategories) {
    const shown = filterProjects(projects, category);
    assert.ok(shown.every((p) => p.category === category));
  }
  assert.deepEqual(
    filterProjects(projects, "SaaS").map((p) => p.id).sort(),
    ["supabase-saas", "vertex"],
  );
  const onlySaas = projects.filter((p) => p.category === "SaaS");
  assert.deepEqual(filterProjects(onlySaas, "Booking"), []);
});

test("count label is singular for one project", () => {
  assert.equal(projectCountLabel(0), "0 projects shown");
  assert.equal(projectCountLabel(1), "1 project shown");
  assert.equal(projectCountLabel(5), "5 projects shown");
});

test("finds projects by exact slug only", () => {
  const projects = parseProjects(records);
  assert.equal(findProject(projects, "vertex")?.name, "Vertex");
  assert.equal(findProject(projects, "Vertex"), undefined);
  assert.equal(findProject(projects, "missing"), undefined);
});

test("next project follows display order and wraps", () => {
  const projects = parseProjects(records);
  const ids = projects.map((p) => p.id);
  for (const [index, id] of ids.entries()) {
    assert.equal(nextProject(projects, id).id, ids[(index + 1) % ids.length]);
  }
  assert.throws(() => nextProject(projects, "missing"), /Unknown project/);
});
