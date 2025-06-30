import * as assert from "assert";
import mock from "mock-fs";
import sinon from "sinon";

import getClassesMap from "../utils/getClassesMap.js";
import getOptions from "../utils/getOptions.js";
import { defaultExclude } from "../lib/defaultConfig.js";
import { defaultClassesMap } from "../test/_defaultClassMap.js";
import { explorer } from "../utils/config.js";

const emptyConfig = {
  include: ["*.html"],
  exclude: [],
  customPrefixes: [],
  categoryOrder: { sortOrder: [] },
  pseudoClassesOrder: { sortOrder: [] },
  categories: {},
};

describe("getClassesMap", () => {
  afterEach(() => {
    sinon.restore();
    mock.restore();
    explorer.clearCaches();
  });

  it("respects user-defined category and pseudo class order", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify({
        ...emptyConfig,
        categories: {
          category1: ["class1", "class3"],
          category2: ["class2", "class4"],
        },
        categoryOrder: { sortOrder: ["category2", "category1"] },
        pseudoClassesOrder: { sortOrder: ["hover", "focus"] },
        customPrefixes: ["tw-"],
      }),
    });

    const { classesMap, pseudoSortOrder, customPrefixes } =
      await getClassesMap();

    assert.deepStrictEqual(classesMap, {
      class1: 2,
      class2: 0,
      class3: 3,
      class4: 1,
    });
    assert.deepStrictEqual(pseudoSortOrder, ["hover", "focus"]);
    assert.deepStrictEqual(customPrefixes, ["tw-"]);
  });

  it("falls back to defaults if config is empty", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify(emptyConfig),
    });

    const { classesMap, pseudoSortOrder, customPrefixes } =
      await getClassesMap();

    assert.ok(
      Object.keys(classesMap).length > 0,
      "should use default classesMap"
    );
    assert.ok(pseudoSortOrder.length > 0, "should use default pseudoSortOrder");
    assert.ok(customPrefixes.length > 0, "should use default customPrefixes");
  });

  it("falls back to defaults if sortOrder references missing category", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify({
        ...emptyConfig,
        categories: { only: ["a"] },
        categoryOrder: { sortOrder: ["only", "missing-category"] },
      }),
    });

    const result = await getClassesMap();

    assert.deepStrictEqual(result.classesMap, defaultClassesMap().classesMap);
  });
});

describe("getOptions", () => {
  afterEach(() => {
    mock.restore();
    sinon.restore();
    explorer.clearCaches();
  });

  it("falls back to config if CLI args are not provided", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify({
        ...emptyConfig,
        include: ["*.ts"],
        exclude: ["temp/"],
      }),
    });

    const result = await getOptions({});

    assert.deepStrictEqual(result.include, ["*.ts"]);
    assert.deepStrictEqual(result.exclude, ["temp/", ...defaultExclude]);
  });

  it("uses include and exclude from command-line options", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify({
        ...emptyConfig,
        include: ["./not-used/"],
        exclude: ["**/also-not-used"],
      }),
    });

    const result = await getOptions({
      include: "src/**/*.ts",
      exclude: "ignore/**/*.ts",
    });

    assert.deepStrictEqual(result.include, ["src/**/*.ts"]);
    assert.deepStrictEqual(result.exclude, [
      "ignore/**/*.ts",
      ...defaultExclude,
    ]);
  });

  it("throws if include is missing entirely", async () => {
    mock({
      ".tailwindsorterrc.json": JSON.stringify({
        ...emptyConfig,
        include: [],
      }),
    });

    const exitStub = sinon.stub(process, "exit");
    const errorStub = sinon.stub(console, "error");

    await getOptions({});

    assert.ok(errorStub.called);
    assert.ok(exitStub.calledWith(1));
  });
});
