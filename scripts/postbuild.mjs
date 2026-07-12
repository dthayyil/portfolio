// Post-build: prepare the static `out/` folder for GitHub Pages.
//  - .nojekyll  : stop GitHub Pages from ignoring _next/ (underscore dirs)
//  - CNAME      : preserve the custom apex domain
//  - 404.html   : GitHub Pages serves this for unknown routes
import { writeFileSync, existsSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "out");
const DOMAIN = "deepakthayyil.online";

if (!existsSync(OUT)) {
  console.error("postbuild: out/ not found — did `next build` run with output:'export'?");
  process.exit(0);
}

writeFileSync(join(OUT, ".nojekyll"), "");
writeFileSync(join(OUT, "CNAME"), `${DOMAIN}\n`);

// Next emits 404 at out/404/index.html with trailingSlash; also expose 404.html.
const nested = join(OUT, "404", "index.html");
if (existsSync(nested)) copyFileSync(nested, join(OUT, "404.html"));

console.log("postbuild: wrote .nojekyll, CNAME, 404.html to out/");
