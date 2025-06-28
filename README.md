<div align="center">
<h2>Tailwind Sorter CLI</h2>
</div>

A tool to sort Tailwind classes in files.

#### Installation

```bash
npm install -g tailwind-sorter
# or
npx tailwind-sorter
```
#### Usage

```bash
tailwind-sorter
```
- `-v`, `--version`: Show the version of Tailwind Sorter
- `-h`, `--help`: Show help information for Tailwind Sorter

#### Sort Tailwind classes in files

```bash
tailwind-sorter sort [options]
```
- `-i`, `--include <pattern...>`: Glob pattern(s) for files to include
- `-x`, `--exclude <pattern...>`: Glob pattern(s) for files to exclude
- `-d`, `--debug`: Enable debug mode


#### Create default config file


```bash
tailwind-sorter init [options]
```

If a config file exists and includes a valid sort order, that sort order will be used instead of the default.
If no include/exclude flags are used as part of a sort command, the config file's patterns will be used.

- `-d`, `--debug`: Enable debug mode

#### Examples

```bash
# create default config file
tailwind-sorter init

# sort all .html files
tailwind-sorter sort -i "**/*.html"

# sort .jsx and .tsx files, excluding tests
tailwind-sorter sort -i "**/*.jsx" -i "**/*.tsx" -x "**/tests/**"

# sort multiple file types with a single glob
tailwind-sorter sort -i "**/*.{js,jsx,ts,tsx,html}"

# enable debug mode
tailwind-sorter sort -i "**/*.html" -i "**/*.css" --debug
```

#### Sorting

`tailwind-sorter` sorts:

Any string that is preceded by a prefix and does not include dynamic syntax
   
  - *Strings:* `""` `''` ` `` `
  - *Prefixes:* `Custom prefixes` `class=`  `className=`
  - *Dynamic Syntax:* `?` `<` `{`

Single line `@apply` rules ending with a semicolon that do not include dynamic syntax (`@` `/` `{`)


#### With Prettier

If you use prettier, [the tailwind plugin](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier) is recommended
