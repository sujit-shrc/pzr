// src/commands/generate.ts
import path from "path";
import ora from "ora";
import { getConfig } from "../utils/configManager.js";
import { createFile, updateAppFile } from "../utils/fileSystem.js";
import { error } from "../utils/logger.js";
import { ProjectConfig } from "../types.js";
import { getTemplate } from "../templates/index.js";

async function generate(
  pages: string[],
  options: { directory?: string },
): Promise<void> {
  const spinner = ora("Generating files...").start();
  const config = await getConfig();

  try {
    for (const page of pages) {
      const pageDir = options.directory
        ? path.join(options.directory, page)
        : page;

      switch (config.framework) {
        case "Next.js":
          await generateNextjsFiles(pageDir, config);
          break;
        case "Express.js":
          await generateExpressFiles(page, config);
          break;
        case "Vite React":
          await generateViteReactFiles(pageDir, config);
          break;
      }
    }

    spinner.succeed("Structure generated successfully!");
  } catch (err) {
    spinner.fail("Failed to generate files");
    error(err instanceof Error ? err.message : "An unknown error occurred");
  }
}

async function generateNextjsFiles(
  pageDir: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.useSrcDirectory ? "src" : "";
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
}

async function generateExpressFiles(
  resource: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.useSrcDirectory ? "src" : "";
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
}

async function generateViteReactFiles(
  componentDir: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.useSrcDirectory ? "src" : "";
  const ext = config.language === "TypeScript" ? "tsx" : "jsx";

  await createFile(
    path.join(baseDir, "components", componentDir, `index.${ext}`),
    getTemplate("viteReact", "component", config),
  );
}

export default generate;
