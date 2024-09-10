import inquirer from "inquirer";
import ora from "ora";
import {
  detectProjectType,
  detectLanguage,
  detectSrcDirectory,
} from "../utils/projectDetector.js";
import { setConfig } from "../utils/configManager.js";
import { success, error, info } from "../utils/logger.js";
import { ProjectConfig } from "../types.js";

async function init(): Promise<void> {
  const spinner = ora("Detecting project configuration...").start();

  try {
    const detectedConfig: ProjectConfig = {
      framework: await detectProjectType(),
      language: await detectLanguage(),
      useSrcDirectory: await detectSrcDirectory(),
    };

    if (detectedConfig) spinner.succeed("Project configuration detected");

    const confirmedConfig = await confirmConfiguration(detectedConfig);

    await setConfig(confirmedConfig);

    success("Configurations saved successfully");
    info(
      "You can now use `pzr -c/create` to create new pages, routes, or templates",
    );
  } catch (err) {
    spinner.fail("Initialization failed!");
    error(
      err instanceof Error
        ? err.message
        : "An unknown error occurred. Please check your setup and try again!",
    );
  }
}

async function confirmConfiguration(
  detectedConfig: ProjectConfig,
): Promise<ProjectConfig> {
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: "Confirm or select the framework:",
      choices: ["Next.js", "Express.js", "Vite React"],
      default: detectedConfig.framework,
    },
    {
      type: "list",
      name: "language",
      message: "Confirm or select the language:",
      choices: ["TypeScript", "JavaScript"],
      default: detectedConfig.language,
    },
    {
      type: "confirm",
      name: "useSrcDirectory",
      message: "Are you using a src directory?",
      default: detectedConfig.useSrcDirectory,
    },
    {
      type: "list",
      name: "router",
      message: "Select the router type (for Next.js):",
      choices: ["App Router", "Pages Router"],
      when: (answers) => answers.framework === "Next.js",
    },
  ]);

  return answers;
}

export default init;
