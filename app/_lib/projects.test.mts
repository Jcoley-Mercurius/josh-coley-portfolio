import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import {
  filterProjects,
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
    assert.equal(project.publicationReady, false, project.id);
    assert.deepEqual(project.metrics, [], project.id);
    assert.deepEqual(project.screenshots, [], project.id);
  }
  const shaveParlor = projects.find((p) => p.id === "shave-parlor");
  assert.equal(shaveParlor?.status, "In rebuild");
});

test("rejects missing or empty required fields", () => {
  for (const key of ["id", "name", "type", "summary", "status"]) {
    assert.throws(() => parseProject({ ...valid, [key]: undefined }), new RegExp(key));
    assert.throws(() => parseProject({ ...valid, [key]: "  " }), new RegExp(key));
  }
});

test("rejects unknown categories and malformed slugs", () => {
  assert.throws(() => parseProject({ ...valid, category: "Games" }), /category/);
  assert.throws(() => parseProject({ ...valid, id: "Not A Slug" }), /slug/);
});

test("rejects claims made before evidence is cleared", () => {
  assert.throws(() => parseProject({ ...valid, metrics: ["40% faster"] }), /metrics/);
  assert.throws(() => parseProject({ ...valid, screenshots: ["home.png"] }), /screenshots/);
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
