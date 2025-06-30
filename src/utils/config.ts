import { cosmiconfig } from "cosmiconfig";

import logger from "./logger.js";
import { Config } from "../lib/defaultConfig";

const moduleName = "tailwindsorter";
export const explorer = cosmiconfig(moduleName);

/**
 * Loads the Tailwind Sorter configuration from the workspace.
 * Uses cosmiconfig to search for a configuration file.
 *
 * @returns {Promise<Config | null>} The loaded configuration or null if not found.
 */
export default async function loadConfig(): Promise<Config | null> {
  const { log, warning } = logger;

  try {
    const result = await explorer.search();
    if (result && result.config) {
      log(
        `Tailwind Sorter: Configuration loaded from ${
          result.filepath || "default location"
        }`
      );
      return result.config;
    }
    log(
      `Tailwind Sorter: No configuration found. Using default configuration.`
    );
    return null;
  } catch (error) {
    warning(`Could not load config: ${error}`);
    return null;
  }
}
