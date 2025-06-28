import * as assert from "assert";

import { findLongestMatch } from "../utils/sortTailwind.js";
import { defaultClassesMap } from "./_defaultClassMap.js";

describe("Find Config Match", () => {
  const { classesMap } = defaultClassesMap();

  it("carrots", () => {
    assert.strictEqual(findLongestMatch("carrots", classesMap), "");
  });

  it("banana-icecream", () => {
    assert.strictEqual(findLongestMatch("banana-icecream", classesMap), "");
  });

  it("shape-wrapper", () => {
    assert.strictEqual(findLongestMatch("shape-wrapper", classesMap), "");
  });

  it("custom_flex", () => {
    assert.strictEqual(findLongestMatch("custom_flex", classesMap), "");
  });

  it("_custom_flex", () => {
    assert.strictEqual(findLongestMatch("_custom_flex", classesMap), "");
  });

  it("pe-4", () => {
    assert.strictEqual(findLongestMatch("pe-4", classesMap), "pe-");
  });

  it("_ prefix for ignored classes", () => {
    assert.strictEqual(findLongestMatch("_ml-5", classesMap), "ml-");
  });

  it("_ prefix for ignored classes w pseudos", () => {
    assert.strictEqual(findLongestMatch("_hover:ml-5", classesMap), "ml-");
  });

  it("-ml-5", () => {
    assert.strictEqual(findLongestMatch("-ml-5", classesMap), "ml-");
  });

  it("list-type-bananas", () => {
    assert.strictEqual(
      findLongestMatch("list-type-bananas", classesMap),
      "list-type-"
    );
  });

  it("tw-list-type-bananas", () => {
    assert.strictEqual(
      findLongestMatch("tw-list-type-bananas", classesMap),
      "list-type-"
    );
  });

  it("tw-not-list-type-bananas", () => {
    assert.strictEqual(
      findLongestMatch("tw-not-list-type-bananas", classesMap),
      "list-type-"
    );
  });

  it("lg:w-[568px]", () => {
    assert.strictEqual(findLongestMatch("lg:w-[568px]", classesMap), "w-");
  });

  it("hover:not-lg:w-[568px]", () => {
    assert.strictEqual(
      findLongestMatch("hover:not-lg:w-[568px]", classesMap),
      "w-"
    );
  });

  it("hover:list-type-bananas", () => {
    assert.strictEqual(
      findLongestMatch("hover:list-type-bananas", classesMap),
      "list-type-"
    );
  });

  it("! important", () => {
    assert.strictEqual(
      findLongestMatch("hover:!bg-blue-500", classesMap),
      "bg-"
    );
  });

  it("fractions", () => {
    assert.strictEqual(findLongestMatch("w-1/2", classesMap), "w-");
  });

  it("multiple pseudos", () => {
    assert.strictEqual(
      findLongestMatch("hover:focus:bg-blue-500", classesMap),
      "bg-"
    );
  });

  // https://tailwindcss.com/blog/tailwindcss-v3-3#new-line-height-shorthand-for-font-size-utilities
  it("line height shorthand", () => {
    assert.strictEqual(
      findLongestMatch("text-sm/[17px]", classesMap),
      "text-sm"
    );
  });

  it("container queries with @", () => {
    assert.strictEqual(
      findLongestMatch("@lg/main:text-sm", classesMap),
      "text-sm"
    );
  });

  it("arbitrary [] with /", () => {
    assert.strictEqual(
      findLongestMatch("list-image-[url(/carrot.png)]", classesMap),
      "list-image-"
    );
  });

  it("css vars", () => {
    assert.strictEqual(
      findLongestMatch("bg-(--brand-color)", classesMap),
      "bg-"
    );
  });

  // https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-nested-groups
  it("group-", () => {
    assert.strictEqual(
      findLongestMatch("group-hover:text-blue-500", classesMap),
      "text-"
    );
  });

  // https://tailwindcss.com/docs/hover-focus-and-other-states#differentiating-nested-groups
  it("group/", () => {
    assert.strictEqual(findLongestMatch("group/banana", classesMap), "group");
  });

  it("group-[]", () => {
    assert.strictEqual(
      findLongestMatch("group-[:nth-of-type(3)_&]:block", classesMap),
      "block"
    );
  });

  // https://tailwindcss.com/docs/responsive-design#max-width-container-queries
  it("container query with dynamic syntax", () => {
    assert.strictEqual(findLongestMatch("@[618px]:flex", classesMap), "flex");
  });

  it("data attribute selectors", () => {
    assert.strictEqual(
      findLongestMatch("data-[open=true]:bg-blue-500", classesMap),
      "bg-"
    );
  });

  it("supports-", () => {
    assert.strictEqual(
      findLongestMatch("supports-[display:block]:grid", classesMap),
      "grid"
    );
  });

  it("arbitrary [] class", () => {
    assert.strictEqual(
      findLongestMatch("before:content-[attr(data:time)]", classesMap),
      "content-"
    );

    assert.strictEqual(
      findLongestMatch("content-['Time:_12:30_PM']", classesMap),
      "content-"
    );

    assert.strictEqual(
      findLongestMatch("[&_p]:text-gray-500", classesMap),
      "text-"
    );
  });

  it("arbitrary [] pseudos", () => {
    assert.strictEqual(
      findLongestMatch("[&>*:not(:first-child)]:mt-2", classesMap),
      "mt-"
    );

    assert.strictEqual(
      findLongestMatch("[&:nth-child(3)]:bg-blue-500", classesMap),
      "bg-"
    );
  });
});
