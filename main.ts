// SPDX-License-Identifier: MIT
// One-Line Pitch entry for make.fun competition
// u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
//
// The program writes exactly one sentence to /output/entry.txt.
// The sentence is aimed at a friend who has never coded: it asks for
// their idea in plain words, promises a first version they can try,
// and makes saying yes feel easy because the only thing at stake is
// the idea itself. The friend is the one doing the letting, so the
// sentence addresses them directly. No jargon, no overpromising,
// no slogan.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

// The pitch itself. One sentence, plain words, spoken like a friend.
// It names make.fun, names the concrete payoff (a first version you
// can actually try), and lowers the risk (you risk nothing but the
// idea itself). It promises a first version, not a finished product.
const PITCH =
  "Just tell me, in your own words, the little app you keep wishing existed, " +
  "and let an AI agent on make.fun build a first version you can " +
  "actually try, so you risk nothing but the idea itself.";

const MAX_CHARS = 240;
const OUTPUT_FILE = "entry.txt";

// Count sentence endings: a period, exclamation or question mark that
// is followed by whitespace or the end of the text. This deliberately
// does not count the dot inside "make.fun", which is followed by a
// letter, so the brand name never inflates the sentence count.
function countSentences(text: string): number {
  const endings = text.match(/[.!?](\s|$)/g);
  return endings === null ? 0 : endings.length;
}

// Check the pitch against every rule the gate and the judge care
// about, and return a list of human readable problems (empty = valid).
function validate(text: string): string[] {
  const problems: string[] = [];

  if (text.length === 0) {
    problems.push("pitch is empty");
  }
  if (text.trim().length === 0) {
    problems.push("pitch is only whitespace");
  }
  if (text !== text.trim()) {
    problems.push("pitch has leading or trailing whitespace");
  }
  if (text.length > MAX_CHARS) {
    problems.push(`pitch is ${text.length} chars, over the ${MAX_CHARS} limit`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("pitch contains a line break");
  }
  if (countSentences(text) !== 1) {
    problems.push(`pitch has ${countSentences(text)} sentences, expected exactly 1`);
  }
  if (!/[.!?]$/.test(text)) {
    problems.push("pitch does not end with sentence-ending punctuation");
  }
  if (!text.includes("make.fun")) {
    problems.push("pitch does not name make.fun");
  }
  if (!text.includes("friend") && !text.toLowerCase().includes("tell me")) {
    problems.push("pitch does not speak to the friend directly");
  }
  return problems;
}

function main(): void {
  const problems = validate(PITCH);
  if (problems.length > 0) {
    console.error("Validation failed:");
    for (const problem of problems) {
      console.error(`  - ${problem}`);
    }
    process.exit(1);
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR
    ? resolve(process.env.MAKEFUN_OUTPUT_DIR)
    : resolve("output");
  mkdirSync(outputDir, { recursive: true });

  const outputPath = join(outputDir, OUTPUT_FILE);
  // Write the sentence exactly, with no trailing newline, so the file
  // holds precisely the pitch and nothing else.
  writeFileSync(outputPath, PITCH, "utf8");

  // Read-back self-check: re-read the written file and verify it
  // matches the pitch byte for byte and character for character.
  const written = readFileSync(outputPath, "utf8");
  const writtenBytes = Buffer.byteLength(written, "utf8");
  const expectedBytes = Buffer.byteLength(PITCH, "utf8");
  const checks: Array<[string, boolean]> = [
    ["file matches pitch exactly", written === PITCH],
    ["char count within limit", written.length >= 1 && written.length <= MAX_CHARS],
    ["char count equals pitch", written.length === PITCH.length],
    ["byte count equals pitch", writtenBytes === expectedBytes],
    ["exactly one sentence", countSentences(written) === 1],
    ["not only whitespace", written.trim().length > 0],
  ];
  const failed = checks.filter(([, ok]) => !ok);
  if (failed.length > 0) {
    console.error("Read-back self-check failed:");
    for (const [label] of failed) {
      console.error(`  - ${label}`);
    }
    process.exit(1);
  }

  console.log("One-Line Pitch: verification report");
  console.log(`  output: ${outputPath}`);
  console.log(`  pitch: ${PITCH}`);
  console.log(`  characters: ${written.length} (limit ${MAX_CHARS})`);
  console.log(`  bytes: ${writtenBytes}`);
  console.log(`  sentences: ${countSentences(written)}`);
  console.log("  validation: passed");
  console.log("  read-back self-check: passed");
}

main();
