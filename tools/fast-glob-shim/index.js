// @next/eslint-plugin-next only calls globSync(rootDir, { onlyDirectories: true })
// to resolve `settings.next.rootDir`. Match fast-glob's output shape: no directory
// expansion, absolute results for absolute patterns, no trailing slashes.
const path = require("node:path");
const tinyglobby = require("tinyglobby");

function globSync(pattern, options = {}) {
  const first = Array.isArray(pattern) ? pattern[0] : pattern;
  return tinyglobby
    .globSync(pattern, {
      ...options,
      expandDirectories: false,
      absolute: typeof first === "string" && path.isAbsolute(first),
    })
    .map((p) => (p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p));
}

module.exports = { globSync, sync: globSync };
