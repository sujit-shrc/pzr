import { Command } from "commander";
import init from "../commands/init.js";
import generate from "../commands/generate.js";
import { getPackageVersion } from "../utils/version.js";
import chalk from "chalk";
const program = new Command();
const version = await getPackageVersion();

program
  .version(version)
  .description(
    chalk.cyan(
      "CLI tool for generating Next.js, Express.js, and Vite React project templates",
    ),
  );

program
  .option("-c, --create <pages...>", "Create new pages, routes, or components")
  .option(
    "-d, --directory <directory>",
    "Specify a directory for the generated files",
  );

program
  .command("init")
  .description(
    "Initialize a new project or detect existing project configuration",
  )
  .action(init);

program
  .command("create [pages...]")
  .alias("c")
  .description("Generate new pages, routes, or components")
  .option(
    "-d, --directory <directory>",
    "Specify a directory for the generated files",
  )
  .action(async (pages, localOptions) => {
    const globalOptions = program.opts();
    const options = { ...globalOptions, ...localOptions };
    await generate(pages, options);
  });

program.action((options) => {
  if (options.create) {
    // check if options array contains -d or --directory
    const isDirectory = options.create.includes("-d");
    if (isDirectory) {
      const directoryIndex = options.create.indexOf("-d");
      const directory = options.create[directoryIndex + 1];

      // extract remaining arguments after directory
      const pages = options.create.slice(directoryIndex + 2);
      generate(pages, { directory });
    } else {
      generate(options.create, options);
    }
  }
});

export function run() {
  console.log(chalk.green("pzr v" + version));
  program.parse();
}
