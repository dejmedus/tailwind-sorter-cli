#!/usr/bin/env node

import { program } from "commander";
import fg from "fast-glob";
import fs from "fs/promises";
import sortTailwind from "./sortTailwind.js";
import getClassesMap from "./getClassesMap.js";

program
  .name("tailwind-sorter")
  .description("Sort Tailwind classes in files")
  .version("1.0.0", "-v, --version", "output the current version")
  .option("-i, --include <pattern>", "Include glob (required)")
  .option("-x, --exclude <pattern>", "Exclude glob")
  .option("-d, --debug", "Enable debug mode")
  .parse();

const opts = program.opts();

if (!opts.include) {
  console.error("Error: --include <pattern> is required.");
  process.exit(1);
}

const globOptions: {
  ignore?: string[];
  onlyFiles?: boolean;
} = {
  onlyFiles: true,
};

if (opts.exclude) {
  const excludePatterns = opts.exclude
    ? opts.exclude.split(",").map((s: string) => s.trim())
    : [];

  globOptions.ignore = [
    ...excludePatterns,
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
    "**/test/**",
  ];
}

const files = await fg(opts.include, globOptions);

const { classesMap, pseudoSortOrder } = getClassesMap();

for (const file of files) {
  const content = await fs.readFile(file, "utf8");
  const sorted = sortTailwind(content, classesMap, pseudoSortOrder);
  await fs.writeFile(file, sorted);

  debug(`Sorted file: ${file}`);
}

function debug(message: string) {
  if (opts.debug) {
    console.log(`\x1b[90m${message}\x1b[0m`);
  }
}
