import fs from "fs-extra";
import path from "path";
import { ProjectConfig } from "../types.js";

export async function createFile(
  filePath: string,
  content: string,
): Promise<void> {
  await fs.ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, content);
}

export async function updateAppFile(
  resource: string,
  config: ProjectConfig,
): Promise<void> {
  const baseDir = config.usingSrcDir ? "src" : "";
  const appFile = path.join(
    baseDir,
    `app.${config.language === "TypeScript" ? "ts" : "js"}`,
  );
  const appContent = await fs.readFile(appFile, "utf8");

  const newRoute = `app.use('/${resource}', ${config.language === "TypeScript" ? "routes." : ""}${resource});`;
  const updatedContent = appContent.replace(
    /app\.listen/,
    `${newRoute}\n\napp.listen`,
  );

  await fs.writeFile(appFile, updatedContent);
}
