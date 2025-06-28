import fg from "fast-glob";
import fs from "fs/promises";
import path from "path";

import getClassesMap from "./utils/getClassesMap.js";
import getOptions from "./utils/getOptions.js";
import logger from "./utils/logger.js";
import sortTailwind from "./utils/sortTailwind.js";
import { defaultConfig, Config } from "./lib/defaultConfig.js";
import { SortOptions } from "./lib/types.js";

export class CLI {
  options: SortOptions;
  defaultConfig: Config = defaultConfig;

  constructor(options: SortOptions) {
    this.options = options;
    logger.configure(options);
  }

  async sort() {
    const { log, error } = logger;
    const { include, exclude } = await getOptions(this.options);

    if (!include) {
      error("Include path is required. Use -i or --include to specify it.");
      return; // so TS isn't upset - but error will exit the process
    }

    log(`Sorting files matching: ${include}`);
    exclude && log(`Excluding files matching: ${exclude}`);

    const pathOptions: { ignore?: string[]; onlyFiles?: boolean } = {
      onlyFiles: true,
    };

    exclude && (pathOptions.ignore = [...exclude]);

    const files = await fg(include, pathOptions);
    const { classesMap, pseudoSortOrder, customPrefixes } =
      await getClassesMap();

    for (const file of files) {
      const content = await fs.readFile(file, "utf8");
      const sorted = sortTailwind(
        content,
        classesMap,
        pseudoSortOrder,
        customPrefixes
      );
      await fs.writeFile(file, sorted);
      log(`Sorted file: ${file}`);
    }
  }

  async init() {
    const { log, error } = logger;
    log("Creating default Tailwind Sorter config file...");

    try {
      const configPath = path.resolve(process.cwd(), ".tailwindsorterrc.json");
      await fs.writeFile(configPath, JSON.stringify(defaultConfig, null, 2));
      log(`Created default config at ${configPath}`);
    } catch (err) {
      error(`Failed to create config file: ${err}`);
    }
  }
}
