import sortTailwind from "../utils/sortTailwind.js";
import { defaultClassesMap } from "./_defaultClassMap.js";

const { classesMap, pseudoSortOrder, sectionOrder, customPrefixes } =
  defaultClassesMap();

export default function sortHelper(
  unsortedString: string,
  prefixes?: string[]
) {
  return sortTailwind(
    unsortedString,
    classesMap,
    pseudoSortOrder,
    prefixes || customPrefixes,
    sectionOrder
  );
}
