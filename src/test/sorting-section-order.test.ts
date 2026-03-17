import * as assert from "assert";

import sortTailwind from "../utils/sortTailwind.js";
import { defaultClassesMap } from "./_defaultClassMap.js";

describe("Section Order", () => {
  const { classesMap, pseudoSortOrder, customPrefixes } = defaultClassesMap();

  function sort(unsortedString: string, sectionOrder: string[]) {
    return sortTailwind(
      unsortedString,
      classesMap,
      pseudoSortOrder,
      customPrefixes,
      sectionOrder
    );
  }

  it('default ["classes", "customClasses"]', () => {
    const unsortedString = `<div class="hover:bg-blue-500 potato flex bg-black custom text-white lg:text-gray-100">`;
    const sortedString = `<div class="flex bg-black hover:bg-blue-500 text-white lg:text-gray-100 potato custom">`;

    assert.strictEqual(
      sort(unsortedString, ["classes", "customClasses"]),
      sortedString
    );
  });

  it('["customClasses", "classes"]', () => {
    const unsortedString = `<div class="hover:bg-blue-500 flex custom bg-black text-white potato lg:text-gray-100">`;
    const sortedString = `<div class="custom potato flex bg-black hover:bg-blue-500 text-white lg:text-gray-100">`;

    assert.strictEqual(
      sort(unsortedString, ["customClasses", "classes"]),
      sortedString
    );
  });

  it('["classes", "pseudoClasses", "customClasses"] splits pseudo classes out', () => {
    const unsortedString = `<div class="flex flex-col md:flex-row justify-between gap-4 p-4 md:p-8 bg-background">`;
    const sortedString = `<div class="flex flex-col justify-between gap-4 bg-background p-4 md:flex-row md:p-8">`;

    assert.strictEqual(
      sort(unsortedString, ["classes", "pseudoClasses", "customClasses"]),
      sortedString
    );
  });

  it('["classes", "pseudoClasses", "customClasses"] with custom classes', () => {
    const unsortedString = `<div class="hover:bg-blue-500 flex custom bg-black text-white potato lg:text-gray-100">`;
    const sortedString = `<div class="flex bg-black text-white hover:bg-blue-500 lg:text-gray-100 custom potato">`;

    assert.strictEqual(
      sort(unsortedString, ["classes", "pseudoClasses", "customClasses"]),
      sortedString
    );
  });

  it('["pseudoClasses", "classes", "customClasses"]', () => {
    const unsortedString = `<div class="hover:bg-blue-500 flex custom bg-black frog potato text-white lg:text-gray-100">`;
    const sortedString = `<div class="hover:bg-blue-500 lg:text-gray-100 flex bg-black text-white custom frog potato">`;

    assert.strictEqual(
      sort(unsortedString, ["pseudoClasses", "classes", "customClasses"]),
      sortedString
    );
  });

  it('["customClasses", "classes", "pseudoClasses"]', () => {
    const unsortedString = `<div class="hover:bg-blue-500 flex frog bg-black text-white lg:text-gray-100 custom">`;
    const sortedString = `<div class="frog custom flex bg-black text-white hover:bg-blue-500 lg:text-gray-100">`;

    assert.strictEqual(
      sort(unsortedString, ["customClasses", "classes", "pseudoClasses"]),
      sortedString
    );
  });

  it('["classes", "customClasses", "pseudoClasses"]', () => {
    const unsortedString = `<div class="hover:bg-blue-500 flex bg-black text-white potato lg:text-gray-100 custom">`;
    const sortedString = `<div class="flex bg-black text-white potato custom hover:bg-blue-500 lg:text-gray-100">`;

    assert.strictEqual(
      sort(unsortedString, ["classes", "customClasses", "pseudoClasses"]),
      sortedString
    );
  });
});
