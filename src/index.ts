#!/usr/bin/env node

import { program } from "commander";
import fg from "fast-glob";
import fs from "fs/promises";
import sortTailwind from "./sortTailwind.js";
import getClassesMap from "./getClassesMap.js";

program
  .name("tailwind-sorter")
  .description("Sort Tailwind classes in files")
  .version("1.0.0", "-v, --version", "Output the current version")
  .option("-i, --include <pattern>", "Include path (required)")
  .option("-x, --exclude <pattern>", "Exclude path")
  .option("-d, --debug", "Enable debug mode")
  .parse();

const options = program.opts();

if (!options.include) {
  error("Error: --include <pattern> is required.");
  process.exit(1);
}

const pathOptions: {
  ignore?: string[];
  onlyFiles?: boolean;
} = {
  onlyFiles: true,
};

if (options.exclude) {
  const excludePatterns = options.exclude
    ? options.exclude.split(",").map((path: string) => path.trim())
    : [];

  pathOptions.ignore = [
    ...excludePatterns,
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/out/**",
    "**/test/**",
  ];
}

const files = await fg(options.include, pathOptions);
const { classesMap, pseudoSortOrder } = getClassesMap();

for (const file of files) {
  const content = await fs.readFile(file, "utf8");
  const sorted = sortTailwind(content, classesMap, pseudoSortOrder);
  await fs.writeFile(file, sorted);

  debug(`Sorted file: ${file}`);
}

function debug(message: string) {
  if (!options.debug) {
    return;
  }

  console.log(`\x1b[90m${message}\x1b[0m`);
}

function error(message: string) {
  if (options.debug) {
    console.error(`\x1b[31mError: ${message}\x1b[0m`);
  } else {
    errorBox(message);
  }

  process.exit(1);
}
