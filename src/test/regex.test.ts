import * as assert from "assert";

import { defaultCustomPrefixes } from "../lib/defaultConfig.js";
import { createRegex } from "../lib/regex.js";

function findMatch(
  fullString: string,
  customPrefixes: string[] = defaultCustomPrefixes
) {
  const regex = createRegex(customPrefixes);

  let match = regex.exec(fullString);
  let group = match?.[5] || match?.[4] || match?.[3] || null;

  return group;
}

function checkEquals(
  fullString: string,
  correctMatch: string,
  customPrefixes?: string[]
) {
  const group = findMatch(fullString, customPrefixes);

  if (!group) {
    assert.fail("No matching string");
  }

  assert.strictEqual(group, correctMatch);
}

describe("Correct Regex", () => {
  it(`Correct regex className=''`, () => {
    checkEquals(
      `<div blah blah blah className='relative before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[""]' blah >`,
      'relative before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[""]'
    );
  });

  it(`Correct regex className=""`, () => {
    checkEquals(
      `<div blah blah blah className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]" blah >`,
      "relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]"
    );
  });

  it(`Correct regex class=''`, () => {
    checkEquals(
      `<div blah blah blah class='before:content-[""] relative before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl' blah >`,
      'before:content-[""] relative before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl'
    );
  });

  it(`Correct regex class=""`, () => {
    checkEquals(
      `<div blah blah blah class="relative before:rounded-full before:content-[''] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl" blah >`,
      "relative before:rounded-full before:content-[''] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl"
    );
  });

  it("Svelte w multiple class:", () => {
    checkEquals(
      `<div class:isActive={isActive} class:hasError={hasError} class:disabled={isDisabled} class="bg-blue-400 text-white bg-blue-500">`,
      `bg-blue-400 text-white bg-blue-500`
    );
  });
});

describe("Custom Prefixes", () => {
  it(`Newline twMerge(`, () => {
    checkEquals(
      `const classes = {
  container: twMerge(
    "flex flex-col items-stretch mt-4 text-[20px] lg:text-red-500"
  ),
};`,
      "flex flex-col items-stretch mt-4 text-[20px] lg:text-red-500"
    );
  });

  it(`twMerge(`, () => {
    checkEquals(
      `<div blah blah blah twMerge("relative before:rounded-full before:content-[''] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl") blah >`,
      "relative before:rounded-full before:content-[''] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl"
    );
  });

  it(`Inside brackets twMerge(`, () => {
    checkEquals(
      `<aside className={twMerge('fixed bottom-0 right-0 p-4')}>`,
      "fixed bottom-0 right-0 p-4"
    );
  });

  it(`Multiline brackets twMerge(`, () => {
    checkEquals(
      `className={twMerge(
        "relative h-full font-sans antialiased",
        inter.className
        )}>`,
      "relative h-full font-sans antialiased"
    );
  });

  it(`Complex twMerge(`, () => {
    checkEquals(
      "twMerge(`lg:grid-cols-[1fr,auto] grid-cols-2`)",
      "lg:grid-cols-[1fr,auto] grid-cols-2"
    );
  });

  it(`clsx(`, () => {
    checkEquals(
      `<div blah blah blah clsx('relative before:rounded-full before:content-[""] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl') blah >`,
      'relative before:rounded-full before:content-[""] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl'
    );
  });

  it(`Newline clsx(`, () => {
    checkEquals(
      `<span
        className={clsx(
          "px-2 items-center rounded-full inline-flex py-1 text-sm",
          {
            "bg-gray-100 text-gray-500": status === "pending",
            "bg-green-500 text-white": status === "paid",
          }
        )}
      ></span>`,
      "px-2 items-center rounded-full inline-flex py-1 text-sm"
    );
  });

  it(`Whitespace clsx(`, () => {
    checkEquals(
      `clsx(   'text-base          bg-blue-500          ')`,
      "text-base          bg-blue-500          "
    );
  });

  it(`Multi cva(`, () => {
    checkEquals(
      `cva('text-white bg-blue-500', { 'bg-blue-700 text-gray-100': isHovering })`,
      "text-white bg-blue-500"
    );
  });
});

describe("Non-Default Custom Prefixes", () => {
  it("Potato :)", () => {
    const customPrefixes = ["potato="];

    checkEquals(
      `potato=   'text-base          bg-blue-500'`,
      "text-base          bg-blue-500",
      customPrefixes
    );
  });

  // https://symfony.com/doc/current/form/tailwindcss.html
  it("PHP Symfony form plugin", () => {
    const customPrefixes = ["label_class|default("];

    checkEquals(
      `{%- set label_class = label_class|default('bg-blue-500 text-white') -%}`,
      "bg-blue-500 text-white",
      customPrefixes
    );
  });

  it("Rails erb helper tags", () => {
    const customPrefixes = ["class:"];

    checkEquals(
      `<%= link_to 'New Frog', new_frog_path, class: 'bg-blue-500 text-white' %>`,
      "bg-blue-500 text-white",
      customPrefixes
    );
  });

  it("Rails rb view component helper tags", () => {
    const customPrefixes = ["class:"];

    checkEquals(
      `link_to 'New Frog', new_frog_path, class: 'bg-blue-500 text-white'`,
      "bg-blue-500 text-white",
      customPrefixes
    );
  });

  it("Rails rb view component special syntax", () => {
    const customPrefixes = ["has_dom_class -> {"];

    checkEquals(
      `has_dom_class -> { 'bg-blue-500 text-white' }`,
      "bg-blue-500 text-white",
      customPrefixes
    );
  });
});

describe("No Match", () => {
  function hasMatch(fullString: string, hasMatch: boolean) {
    const group = findMatch(fullString);

    assert.equal(!!group, hasMatch);
  }

  it(`Ignore dynamic PHP <?php`, () => {
    hasMatch(
      '<div class="<?php echo "bg-$color-500"; ?>">IGNORE THIS ONE</div>',
      false
    );
  });

  it(`Ignore dynamic PHP Blade $attributes`, () => {
    hasMatch(
      `<button {{ $attributes->merge(['class' => 'text-white bg-blue-500 ']) }}>
          {{ $slot }}
      </button>`,
      false
    );
  });

  it(`Ignore dynamic PHP Blade {{ }}`, () => {
    hasMatch(`<div class="alert alert-{{ $type }}">`, false);
  });

  it(`Ignore dynamic PHP <?= `, () => {
    hasMatch('<div class="<?= $themeClass ?> p-6 rounded-lg">', false);
  });

  it("Ignore dynamic Svelte", () => {
    hasMatch("<div class:isActive={isActive}>", false);
  });

  it(`Ignore dynamic twMerge`, () => {
    hasMatch(
      "<div blah blah blah twMerge(`relative before:rounded-full ${IGNORE DYNAMIC STYLING} before:content-[''] before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl`) blah >",
      false
    );
  });

  it(`Ignore dynamic elixr`, () => {
    hasMatch(
      '<div class="<%= $"bg-{color}-500" %>">IGNORE THIS ONE</div>',
      false
    );
  });

  it(`Ignore dynamic`, () => {
    hasMatch(
      '<div class="<%= $"bg-{color}-500" %>">IGNORE THIS ONE</div>',
      false
    );
  });

  it(`Ignore dynamic rust yew`, () => {
    hasMatch('<div class={css!("color: red;")}>{"Hello World!"}</div>', false);
    hasMatch(
      '<div key={idx} class={classes!("game-cellule", cellule_status)}></div>',
      false
    );
  });

  it(`Ignore dynamic rust leptos`, () => {
    hasMatch(
      '<button class=("button-20", move || count() % 2 == 1) >"Click Me"</button>',
      false
    );
    hasMatch("<div class:red=move || count() % 2 == 1 ></div>", false);
    hasMatch("<div class=style::jumbotron/>", false);
  });
});
