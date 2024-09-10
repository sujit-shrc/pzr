import { Command } from "commander";
import init from "../commands/init.js";
import generate from "../commands/generate.js";
import { getPackageVersion } from "../utils/version.js";

const program = new Command();
const version = await getPackageVersion();

program
  .version(version)
  .description(
    "A CLI tool for generating Next.js, Express.js, and Vite React project structures",
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
  .action(generate);

export function run() {
  program.parse(process.argv);
}
