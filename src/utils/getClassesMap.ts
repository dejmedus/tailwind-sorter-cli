import {
  defaultCategories,
  defaultSortOrder,
  defaultPseudoSortOrder,
  defaultCustomPrefixes,
} from "../lib/defaultConfig.js";
import loadConfig from "./config.js";
import logger from "./logger.js";

/**
 * Retrieves the classes map, pseudo class sort order, and custom prefixes from config.
 * If the configuration is invalid or missing, default values are used.
 *
 * @returns An object containing the classes map, pseudo class sort order, and custom prefixes.
 */
export default async function getClassesMap() {
  const config = await loadConfig();
  const { log, warning } = logger;

  let categories: { [category: string]: string[] } =
    config?.categories && Object.keys(config.categories).length > 0
      ? config.categories
      : defaultCategories;

  if (
    !config?.categories ||
    Object.keys(config.categories || {}).length === 0
  ) {
    log(
      "Tailwind Sorter: No categories found in config. Using default categories."
    );
  }

  let sortOrder: string[] =
    config?.categoryOrder?.sortOrder &&
    config.categoryOrder.sortOrder.length > 0
      ? config.categoryOrder.sortOrder
      : defaultSortOrder;

  if (
    !config?.categoryOrder ||
    !config.categoryOrder.sortOrder ||
    config.categoryOrder.sortOrder.length === 0
  ) {
    log(
      "Tailwind Sorter: No category order found in config. Using default category order."
    );
  }

  let pseudoSortOrder: string[] =
    config?.pseudoClassesOrder?.sortOrder &&
    config.pseudoClassesOrder.sortOrder.length > 0
      ? config.pseudoClassesOrder.sortOrder
      : defaultPseudoSortOrder;

  if (
    !config?.pseudoClassesOrder ||
    !config.pseudoClassesOrder.sortOrder ||
    config.pseudoClassesOrder.sortOrder.length === 0
  ) {
    log(
      "Tailwind Sorter: No pseudo class order found in config. Using default pseudo class order."
    );
  }

  let customPrefixes: string[] =
    config?.customPrefixes && config.customPrefixes.length > 0
      ? config.customPrefixes
      : defaultCustomPrefixes;

  if (!config?.customPrefixes || config.customPrefixes.length === 0) {
    log(
      "Tailwind Sorter: No custom prefixes found in config. Using default custom prefixes."
    );
  }

  const categoriesArr = Object.keys(categories);
  const invalidCategories = sortOrder.filter(
    (category) => !categoriesArr.includes(category)
  );
  const validConfig =
    categoriesArr.length === sortOrder.length && invalidCategories.length === 0;

  if (!validConfig) {
    warning(
      `Tailwind Sorter: Invalid configuration. ${
        invalidCategories.length
          ? `Categories not found: ${invalidCategories.join(", ")}`
          : "Please check config file."
      }`
    );
    categories = defaultCategories;
    sortOrder = defaultSortOrder;
  }

  const classesMap: { [property: string]: number } = {};
  let index = 0;
  sortOrder.forEach((category) => {
    (categories[category] || []).forEach((className) => {
      classesMap[className] = index++;
    });
  });

  return { classesMap, pseudoSortOrder, customPrefixes };
}
