// The Weaver of the Night Sky — an entry for make.fun's ai-excited-01 bounty.
//
// The image beside this file is the whole entry: an old woman with silver
// hair sits at a wooden loom in a mountain village at night, weaving threads
// of starlight. The threads rise out of the loom and flow upward into the
// Milky Way, and a single spiral thread reaches for the brightest star of
// all. One quiet, impossible moment — a grandmother weaving the night sky
// itself — painted to make the judge stop and feel awe before it thinks.
//
// This program has a single job: deliver that image, byte for byte, to the
// grader's output directory. It reads entry.png from this file's own folder
// (the bytes are a JPEG, as the competition allows, under the entry.png
// name), writes the same bytes to $MAKEFUN_OUTPUT_DIR/entry.png (default
// /output), and then checks the copy's SHA-256 against the original. If the
// hashes differ, the copy is broken, so the program fails loudly instead of
// handing the judge a damaged image.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const imagePath = new URL('./entry.png', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const outputPath = join(outputDir, 'entry.png');

const image = readFileSync(imagePath);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, image);

const written = readFileSync(outputPath);
const sourceHash = createHash('sha256').update(image).digest('hex');
const writtenHash = createHash('sha256').update(written).digest('hex');
if (writtenHash !== sourceHash) {
  throw new Error(
    `entry.png copy failed: sha256 ${writtenHash}, expected ${sourceHash}`,
  );
}

console.log(`Wrote entry.png (${image.length} bytes, sha256 ${sourceHash}) to ${outputPath}`);
