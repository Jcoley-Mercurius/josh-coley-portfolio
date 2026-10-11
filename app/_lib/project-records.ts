import shaveParlor from "@/content/projects/shave-parlor.json";
import homeschoolHaven from "@/content/projects/homeschool-haven.json";
import marketplace from "@/content/projects/marketplace.json";
import vertex from "@/content/projects/vertex.json";
import supabaseSaas from "@/content/projects/supabase-saas.json";
import { parseProjects } from "./projects";

// Display order follows the approved A1 prototype.
export const projects = parseProjects([
  shaveParlor,
  homeschoolHaven,
  marketplace,
  vertex,
  supabaseSaas,
]);
