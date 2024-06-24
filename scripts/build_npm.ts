// scripts/build_npm.ts
import { build, emptyDir } from "@deno/dnt";

import pkg from "../deno.json" with { type: "json" };

const outputDir = "./npm";

await emptyDir(outputDir);

await build({
  importMap: "deno.json",
  entryPoints: ["./mod.ts"],
  outDir: outputDir,
  shims: {
    deno: true,
  },
  package: {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
    repository: pkg.repository,
    bugs: {
      url: `${pkg.homepage}/issues`,
    },
    license: pkg.license,
  },
  postBuild() {
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
    Deno.copyFileSync("SECURITY.md", "npm/SECURITY.md");
    Deno.copyFileSync("CONTRIBUTING.md", "npm/CONTRIBUTING.md");
  },
});
