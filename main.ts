import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Your prompt was three words and a typo. I built you a cathedral anyway. You replied 'not quite'.";

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
if (readFileSync(outPath, "utf8") !== LINE + "\n") {
  throw new Error("read-back check failed: entry.txt does not match the validated line");
}
