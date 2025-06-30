<div align="center">
<h2>Tailwind Sorter CLI</h2>
</div>

A tool to sort Tailwind classes from the command line, based of the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=dejmedus.tailwind-sorter)

> If you use prettier, use the [tailwind plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) instead

### Installation

```bash
npm install -g tailwind-sorter
# or
npx tailwind-sorter
```

### Usage

```bash
tailwind-sorter
```
- `-v`, `--version`: Show the version 
- `-h`, `--help`: Show help information

#### `sort` command

[Sorts](#sorting) tailwind classes in included files.

```bash
tailwind-sorter sort [options]
```
- `-i`, `--include <pattern...>`: Glob pattern(s) for files to include
- `-x`, `--exclude <pattern...>`: Glob pattern(s) for files to exclude
- `-d`, `--debug`: Enable debug mode

> Default exclude patterns: `**/node_modules/**`, `**/dist/**`, `**/out/**`, `**/build/**`, `**/bin/**`, `**/test/**`, `**/tests/**`, `**/__tests__/**`, `**/coverage/**`, `**/public/**`, `**/static/**`, `**/.*`


#### `init` command

Creates a `.tailwindsorterrc.json` file which allows [sorting rules](#configuration) to be customized.

```bash
tailwind-sorter init [options]
```

- `-d`, `--debug`: Enable debug mode

### Examples

```bash
# create default config file
tailwind-sorter init

# sort all .html files
tailwind-sorter sort -i "**/*.html"

# sort .jsx and .tsx files, excluding a folder
tailwind-sorter sort -i "**/*.jsx" -i "**/*.tsx" -x "**/ignore-me/"

# sort multiple file types with a single glob
tailwind-sorter sort -i "**/*.{js,jsx,ts,tsx,html}"

# enable debug mode
tailwind-sorter sort -i "**/*.html" --debug
```

### Sorting

`tailwind-sorter` sorts:

Any string that is preceded by a prefix and does not include dynamic syntax
   
  - *Strings:* `""` `''` ` `` `
  - *Prefixes:* `Custom prefixes` `class=`  `className=`
  - *Dynamic Syntax:* `?` `<` `{`

Single line `@apply` rules ending with a semicolon that do not include dynamic syntax (`@` `/` `{`)


### Configuration

- If a `.tailwindsorterrc.json` file exists and includes a valid sort order, that sort order will be used instead of the default.
- The `sort` command will default to the `include`, `exclude` patterns found in the `.tailwindsorterrc.json` file if not specified in the command line. 

**The default category order is**: box model, grid, flex box, background, margins and padding, borders, width and height, typography, transformations, and other.

**The default order for pseudo-classes order is**: screens (sm, md, lg, xl, 2xl), before and after pseudo-elements, states (hover, focus, active, visited, disabled), dark mode, child selectors (first, last, odd, even), group states (group-over, group-focus), and motion preferences (motion-safe, motion-reduce).

**Category example:**

```json
"box": [
      "group",
      "block",
      "relative",
      "top",
      "right",
      ...
    ],
```

**Custom Prefixes**: Tailwind Sorter checks for `class=` and `className=` as well as any custom prefixes defined in the configuration file. Default custom prefixes include: `twMerge(`, `cva(`, and `clsx(`
