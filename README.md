<div align="center">
<h2>Tailwind Sorter CLI</h2>
</div>

A tool to sort Tailwind classes in your project files

#### Installation

```bash
npm install -g tailwind-sorter
# or
npx tailwind-sorter
```

#### Usage

```bash
tailwind-sorter [options]
```
#### Options

- `-i`, `--include <pattern>`: Glob pattern for files to include
- `-x`, `--exclude <pattern>`: Glob pattern for files to exclude
- `-h`, `--help`: Show help message
- `-d`, `--debug`: Enable debug mode
- `-v`, `--version`: Show version number

#### Examples
```bash
# .html files
tailwind-sorter -i "*.html"

# .jsx and .tsx files, excluding tests
tailwind-sorter -i "**/*.{jsx,tsx}" -x "**/tests"
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
