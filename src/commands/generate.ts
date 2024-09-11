import path from "path";
import ora from "ora";
import { getConfig } from "../utils/configManager.js";
import { createFile, updateAppFile } from "../utils/fileSystem.js";
import { error, info } from "../utils/logger.js";
import { ProjectConfig } from "../types.js";
import { getTemplate } from "../templates/index.js";
import chalk from "chalk";

async function generate(
  pages: string[],
  options: { directory?: string },
): Promise<void> {
  const spinner = ora({
    text: chalk.blue("Booting up the code generator daemon... Hang tight! \n"),
    spinner: "dots",
  }).start();

  const config = await getConfig();
  try {
    for (const page of pages) {
      const pageDir = options.directory
        ? path.join(options.directory, page)
        : page;

      switch (config.framework) {
        case "Next.js":
          spinner.text = `⚙️ Generating Next.js files for ${page}...`;
          await generateNextjsFiles(pageDir, config);
          break;
        case "Express.js":
          spinner.text = `🛠Generating Express.js files for ${page}...`;
          await generateExpressFiles(page, config);
          break;
        case "Vite React":
          spinner.text = `✨Generating Vite React files for ${page}...`;
          await generateViteReactFiles(pageDir, config);
          break;
        default:
          throw new Error(`❌Unsupported framework: ${config.framework}`);
      }
    }

    console.log(chalk.yellow(`󱏓 list: [${pages.join(", ")}]`));
    info("");

    spinner.succeed(chalk.green("Exit code 0: Your code is ready to run! 🚀"));

    info("Happy coding, oh mighty developer! 🌟");
  } catch (err) {
    spinner.fail(
      chalk.red(
        "Kernel panic! Unexpected exception in code generation module.",
      ),
    );
    error(err instanceof Error ? err.message : "An unknown error occurred");
    console.log(
      chalk.yellow(
        "Remember: It's not a bug, it's an undocumented feature. Try again!",
      ),
    );
  }
}

async function generateNextjsFiles(
  pageDir: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.usingSrcDir ? "src" : "";
  const pagesDir = config.router === "App Router" ? "app" : "pages";
  const ext = config.language === "TypeScript" ? "tsx" : "js";

  await createFile(
    path.join(baseDir, pagesDir, pageDir, `page.${ext}`),
    getTemplate("nextJs", "page", config),
  );
  await createFile(
    path.join(baseDir, pagesDir, pageDir, `layout.${ext}`),
    getTemplate("nextJs", "layout", config),
  );
  await createFile(
    path.join(baseDir, pagesDir, pageDir, `loading.${ext}`),
    getTemplate("nextJs", "loading", config),
  );
  info(` Next.js routes created for: ${chalk.blue(pageDir)}`);
}

async function generateExpressFiles(
  resource: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.usingSrcDir ? "src" : "";
  const ext = config.language === "TypeScript" ? "ts" : "js";

  await createFile(
    path.join(baseDir, `controllers/${resource}.${ext}`),
    getTemplate("express", "controller", config),
  );
  await createFile(
    path.join(baseDir, `models/${resource}.${ext}`),
    getTemplate("express", "model", config),
  );
  await createFile(
    path.join(baseDir, `routes/${resource}.${ext}`),
    getTemplate("express", "route", config),
  );
  await updateAppFile(resource, config);

  info(
    ` Express.js routes, controllers, and models set up done for: ${chalk.blue(`${resource}`)}`,
  );
}

async function generateViteReactFiles(
  componentDir: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.usingSrcDir ? "src" : "";
  const ext = config.language === "TypeScript" ? "tsx" : "jsx";

  await createFile(
    path.join(baseDir, "components", componentDir, `index.${ext}`),
    getTemplate("viteReact", "component", config),
  );

  info(`󰜈 Vite React ${chalk.magenta(componentDir)} component generated.`);
}

export default generate;
