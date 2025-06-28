import loadConfig from "./config.js";
import { defaultExclude } from "../lib/defaultConfig.js";
import logger from "./logger.js";
import { SortOptions } from "../lib/types.js";

/**
 * Retrieves the classes map and pseudo class sort order from the workspace configuration.
 * If the configuration is invalid or missing, default values are used.
 *
 * @returns An object containing the classes map and pseudo class sort order.
 */
export default async function getOptions(options: SortOptions) {
  const config = await loadConfig();
  const { error } = logger;

  let include = options.include || config?.include;
  if (typeof include === "string") {
    include = [include];
  }
  if (!include || include.length === 0) {
    error(" Include path is required. Use -i or --include to specify it.");
  }

  let exclude = options.exclude || config?.exclude || [];
  if (typeof exclude === "string") {
    exclude = [exclude];
  }
  exclude = [...exclude, ...defaultExclude];

  return { include, exclude };
}
