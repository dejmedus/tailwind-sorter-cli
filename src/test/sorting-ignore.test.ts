import * as assert from "assert";

import sortTailwind from "../utils/sortTailwind.js";
import { defaultClassesMap } from "./_defaultClassMap.js";

describe("Ignore sorting", () => {
  const { classesMap, pseudoSortOrder, customPrefixes } = defaultClassesMap();

  function sort(unsortedString: string, prefixes?: string[]) {
    return sortTailwind(
      unsortedString,
      classesMap,
      pseudoSortOrder,
      prefixes || customPrefixes
    );
  }

  it("Dynamic styles class={` ternary ': do not change", () => {
    const unsortedString =
      "<div class={`button ${isActive ? 'button-active' : 'button-inactive'}`}";

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it('Dynamic styles class={` ternary ": do not change', () => {
    const unsortedString =
      '<div class={`button ${isActive ? "button-active" : "button-inactive"}`}';

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic styles className={`: do not change", () => {
    const unsortedString =
      "<div className={`flex items-center gap-1.5 rounded-lg border-2 px-3 py-1.5 ${buttonClasses.DEFAULT}`}>";

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic Vue.js syntax: do not change", () => {
    const unsortedString = `<div :class="{ 'text-white': isActive, 'bg-blue-500': isActive }"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Vue.js :class array: do not change", () => {
    const unsortedString = `<div :class="[{ 'bg-red-500': !isActive, 'bg-blue-500': isActive }, 'text-white']`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic Ruby syntax: do not change", () => {
    const unsortedString = `<button class="text-white #{dynamic_class} bg-blue-500">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic Rails erb syntax: do not change", () => {
    const unsortedString = `<button class="<%= is_active ? 'text-white bg-green-500' : 'text-white bg-gray-500' %> text-white bg-blue-500 rounded">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic erb helper tag: do not change", () => {
    const customPrefixes = ["class:"];

    const unsortedString = `<%= link_to "Home", root_path, class: "nav-link #{'text-pink-500 bg-white' if current_page?(root_path)}" %>`;

    assert.strictEqual(sort(unsortedString, customPrefixes), unsortedString);
  });

  it("Dynamic erb helper tag array: do not change", () => {
    const customPrefixes = ["class:"];

    const unsortedString = `<%= link_to "Dashboard", dashboard_path, class: ["text-pink-500 bg-white", current_user.admin? ? "bg-red-500 text-white" : "bg-blue-500 text-white"] %>`;

    assert.strictEqual(sort(unsortedString, customPrefixes), unsortedString);
  });

  it("Conditional Angular syntax: do not change", () => {
    const unsortedString = `<div [class.text-white]="isPrimary" [class.bg-blue-500]="isPrimary"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Dynamic Angular: do not change", () => {
    const unsortedString = `<div class="'bg-' + (isActive ? 'green' : 'red') + '-500'"></div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Nunjucks syntax: do not change", () => {
    const unsortedString = `<div class="bg-blue {{ widget.size }}  case-video-container {{ widget.marginTop }} {{ widget.marginBottom }} waiting appear appear-video-playing text-lg"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("HTMX syntax: do not change", () => {
    const unsortedString = `<div data-htmx-class="bg-blue-500:text-white:bg-gray-300"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  const isActive = true;
  it("HTMX dynamic syntax: do not change", () => {
    const unsortedString = `<div data-htmx-class="${
      isActive
        ? "bg-blue-500:text-white:bg-gray-300"
        : "bg-white:text-gray-500:bg-blue-300"
    }"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Alpine.js syntax: do not change", () => {
    const unsortedString = `<div x-data="{ isPrimary: true, isActive: true }"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Alpine.js dynamic syntax: do not change", () => {
    const unsortedString = `<div x-bind:class="basketItem.quantity  === 1 ? 'bg-slate-200' : ''"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Svelte syntax: do not change", () => {
    const unsortedString = `<div class:isActive="bg-blue-400 text-white bg-blue-500"`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Svelte dynamic syntax: do not change", () => {
    const unsortedString = `<div class:isActive={isActive ? "bg-blue-400 text-white bg-blue-500" : "text-gray-500 bg-white"}>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Svelte dynamic styles: do not change", () => {
    const unsortedString = `<div class:isActive={isActive} class="bg-{color}-400 text-white">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Svelte multiple dynamic class: do not change", () => {
    const unsortedString = `<div class:isActive={isActive} class="bg-blue-400 text-white {isDisabled ? 'opacity-50' : ''}">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Elixir dynamic syntax: do not change", () => {
    const unsortedString = `
    <li class={"#{case item.status do
      :pending -> "bg-yellow-100"
      :completed -> "bg-green-100"
      :in_progress -> "bg-blue-100"
    end} p-2 mb-2"}>
    `;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Phoenix dynamic syntax <%=: do not change", () => {
    const unsortedString = `<button class="text-pink-500 bg-white mt-5 px-4 py-2 <%= @button_color %> text-white rounded hover:<%= @button_hover_color %>"></button>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Phoenix dynamic syntax brackets: do not change", () => {
    const unsortedString = `<span class={if @counter > 5, do: "text-2xl text-red-500", else: "text-2xl text-gray-500"} id="counter">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Tailwind merge vars only: do not change", () => {
    const unsortedString =
      "<button {...props} className={twMerge(BTN_PRIMARY_CLASSNAMES, props.className)} />";

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Tailwind merge dynamic: do not change", () => {
    const unsortedString = `<div
            className={twMerge(
                TYPOGRAPHY_STYLES_LABEL_SMALL,
                'grid w-max gap-2',
                forceHover ? 'bg-gray-200' : ['bg-white', !disabled && 'hover:bg-gray-200'],
                isMuted && 'text-gray-600',
                className,
            )}
        >`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("clsx dynamic syntax: do not change", () => {
    const unsortedString = `clsx({ foo:true }, { bar:false }, null, { '--foobar':'hello' })`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("cva array: do not sort", () => {
    const unsortedString = `const cardBase = cva(["card", "border-solid", "border-slate-300", "rounded"], {
      variants: {
        shadow: {
          md: "drop-shadow-md",
          lg: "drop-shadow-lg",
          xl: "drop-shadow-xl",
        },
      },
    })`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("PHP Symfony cva; do not sort", () => {
    const unsortedString = `{% set buttonVariants = cva({
    base: 'inline-flex items-center justify-center gap-2 w-fit whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        },
    },
}) %}`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("cva dynamic: do not sort", () => {
    const unsortedString = `cva({ 'bg-blue-700 text-gray-100': isHovering })`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("React dynamic apply: do not change", () => {
    const unsortedString = `<style jsx>{\`.btn { @apply bg-\${color} text-white; }\`}</style>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Vue dynamic apply: do not change", () => {
    const unsortedString = `<style>.btn { @apply bg-{{ color }} text-{{ textColor }}; }</style>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Elixir/Phoenix dynamic apply: do not change", () => {
    const unsortedString = `<style>.btn { @apply bg-<%= @color %> text-white; }</style>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("SCSS dynamic apply: do not change", () => {
    const unsortedString = `.btn { @apply bg-#{$base-color}-#{$shade + 100} text-white; }`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Astro dynamic apply: do not change", () => {
    const unsortedString = `<style>.btn { @apply bg-{color} text-white; }</style>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("CSS variables: do not change", () => {
    const unsortedString = `.btn { @apply bg-var(--color) text-white; }`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("SCSS dynamic: do not change", () => {
    const unsortedString = `.btn { @apply bg-#{map-get($theme, primary)} text-#{map-get($theme, text)}; }`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Comments: do not change", () => {
    const unsortedString = `
    .btn {
      @apply bg-blue-500 /* comment */ text-white;
    }`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  // https://tailwindcss.com/blog/tailwindcss-v3#arbitrary-properties
  it("Arbitrary properties: do not change", () => {
    const unsortedString = `<div class="[mask-type:luminance] hover:[mask-type:alpha]">`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Multiline apply comments: do not change", () => {
    const unsortedString = `
    .btn {
      @apply bg-blue-500 /* primary color */
             text-white /* text color */;
    }`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Apply without semicolon: do not change", () => {
    const unsortedString = `
    .btn {
      background-color: blue;
      @apply hover:bg-blue-700 bg-blue-500
      border: 1px solid black;
    }
    `;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Multiline apply: do not change", () => {
    const unsortedString = `
    .btn {
      background-color: blue;
      @apply hover:bg-blue-700 
      bg-blue-500
      text-pink-500;
      border: 1px solid black;
    }
    `;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("JS/TS dynamic syntax ${}: do not change", () => {
    const unsortedString = "<div class={`bg-${color}-500`}>Hello, world!</div>";

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("PHP dynamic syntax <?php ?>: do not change", () => {
    const unsortedString = `<div class="<?php echo "bg-$color-500"; ?>">Hello, world!</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("PHP dynamic syntax <?= ?>: do not change", () => {
    const unsortedString = `<?php
$isActive = true;
$bgClass = $isActive ? 'bg-green-500' : 'bg-red-500';
?>

<div class="p-4 <?= $bgClass ?> text-white rounded-lg">
    <?= $isActive ? 'Active' : 'Inactive' ?>
</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("PHP Blade dynamic syntax {{ }} do not change", () => {
    const unsortedString = `<button class="px-4
    {{ $isActive ? 'flex-col flex' : 'text-black bg-gray-300' }}">
    Submit
</button>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("PHP Blade dynamic syntax class arr do not change", () => {
    const unsortedString = `<button {{ class([
          'px-4 rounded py-2',
          'text-white bg-blue-500' => $isActive,
          'text-black bg-gray-300' => !$isActive,
      ]) }}>
          Submit
      </button>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Django dynamic syntax {% %}: do not change", () => {
    const unsortedString = `<div class="bg-{% color %}-500">Hello, world!</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Jinja dynamic syntax {{ }}: do not change", () => {
    const unsortedString = `<div class="bg-{{ color }}-500">Hello, world!</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("Ruby ERB dynamic syntax <% %>: do not change", () => {
    const unsortedString = `<div class="<%= "bg-#{color}-500" %>">Hello, world!</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });

  it("ASP.NET dynamic syntax <% %>: do not change", () => {
    const unsortedString = `<div class="<%= $"bg-{color}-500" %>">Hello, world!</div>`;

    assert.strictEqual(sort(unsortedString), unsortedString);
  });
});
