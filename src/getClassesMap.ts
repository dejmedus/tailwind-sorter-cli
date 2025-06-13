import {
  defaultCategories,
  defaultSortOrder,
  defaultPseudoSortOrder,
} from "./lib/defaultConfig.js";

/**
 * Retrieves the classes map and pseudo class sort order from the workspace configuration.
 * If the configuration is invalid or missing, default values are used.
 *
 * @returns An object containing the classes map and pseudo class sort order.
 */
export default function getClassesMap() {
  let classesMap: { [property: string]: number } = {};

  let index = 0;
  defaultSortOrder.forEach((category) => {
    defaultCategories[category].forEach((className) => {
      classesMap[className] = index++;
    });
  });

  const pseudoSortOrder = defaultPseudoSortOrder;

  return { classesMap, pseudoSortOrder };
}
