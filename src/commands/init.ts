import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import type { ChalkInstance } from "chalk";
import {
  detectProjectType,
  detectLanguage,
  detectSrcDirectory,
  detectRouterType,
} from "../utils/projectDetector.js";
import { setConfig } from "../utils/configManager.js";
import { success, error, info } from "../utils/logger.js";
import { ProjectConfig } from "../types.js";

function createBox(content: string, padding: number = 1): string {
  const lines = content.split("\n");
  const width = Math.max(...lines.map((line) => line.length)) - 17;

  const top = `╭${"─".repeat(width - 2)}╮`;
  const bottom = `╰${"─".repeat(width - 2)}╯`;

  const paddedLines = lines.map(
    (line) =>
      `│${" ".repeat(padding)}${line.padEnd(width - padding * 2 - 2)}${" ".repeat(padding)}│`,
  );

  return [top, ...paddedLines, bottom].join("\n");
}

function formatProjectConfig(config: ProjectConfig): string {
  const getIcon = (key: string) => {
    const icons: { [key: string]: string } = {
      framework: "",
      language: "",
      usingSrcDir: "󱏓",
      router: "",
    };
    return icons[key] || "󰈚"; // Default icon if key not found
  };

  const colorize = (key: string, value: any) => {
    const MIN_VALUE_WIDTH = 11;
    const colors: { [key: string]: ChalkInstance } = {
      framework: chalk.cyan,
      language: chalk.yellow,
      isSrcDir: chalk.green,
      router: chalk.magenta,
    };
    const colorFunc = colors[key] || chalk.white; // Default to white if key not found
    const formattedKey = key === "usingSrcDir" ? "isSrcDir" : key;
    const valueStr = String(value).padEnd(MIN_VALUE_WIDTH);

    return `${colorFunc(getIcon(key))} ${formattedKey.padEnd(11)}: ${colorFunc(String(valueStr))}`;
  };

  return Object.entries(config)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => colorize(key, value))
    .join("\n");
}

async function init(): Promise<void> {
  const spinner = ora("Detecting project configuration...").start();
  try {
    const framework = await detectProjectType();
    const detectedConfig: ProjectConfig = {
      framework,
      language: await detectLanguage(),
      usingSrcDir: await detectSrcDirectory(),
      router: framework === "Next.js" ? await detectRouterType() : undefined,
    };
    spinner.succeed(chalk.green("Project configuration detected"));

    // Display detected configuration
    console.log(chalk.cyan(" Detected Configurations:"));
    const formattedConfig = formatProjectConfig(detectedConfig);
    const boxedConfig = createBox(formattedConfig, 1);
    console.log(boxedConfig);

    const { modifyConfig } = await inquirer.prompt([
      {
        type: "confirm",
        name: "modifyConfig",
        message: "Do you want to modify the detected configurations?",
        default: false,
      },
    ]);

    let finalConfig: ProjectConfig;
    if (modifyConfig) {
      finalConfig = await confirmConfiguration(detectedConfig);
    } else {
      finalConfig = detectedConfig;
    }

    await setConfig(finalConfig);
    success(chalk.green("Configurations saved successfully"));
    info(
      chalk.blue("You can now use ") +
        chalk.yellow("`pzr -c/create`") +
        chalk.blue(" to create new pages, routes, or templates"),
    );
  } catch (err) {
    spinner.fail(chalk.red("Initialization failed!"));
    error(
      chalk.red(
        err instanceof Error
          ? err.message
          : "An unknown error occurred. Please check your setup and try again!",
      ),
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
      name: "usingSrcDir",
      message: "Are you using a src directory?",
      default: detectedConfig.usingSrcDir,
    },
    {
      type: "list",
      name: "router",
      message: "Confirm or select the router type (for Next.js):",
      choices: ["App Router", "Pages Router"],
      default: detectedConfig.router,
      when: (answers) => answers.framework === "Next.js",
    },
  ]);
  return answers;
}

export default init;
