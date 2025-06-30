import { program } from "commander";
import { CLI } from "./cli.js";

program
  .name("tailwind-sorter")
  .description("Sort Tailwind classes in files")
  .version("1.0.0", "-v, --version", "Output the current version");

program
  .command("sort")
  .option("-i, --include <pattern>", "Include path (required)")
  .option("-x, --exclude <pattern>", "Exclude path(s), comma-separated")
  .option("-d, --debug", "Enable debug mode")
  .action(async (options) => {
    const cli = new CLI(options);
    await cli.sort();
  });

program
  .command("init")
  .option("-d, --debug", "Enable debug mode")
  .description("Create a default config file")
  .action(async (options) => {
    const cli = new CLI(options);
    await cli.init();
  });

program.parse();
