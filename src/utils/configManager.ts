import fs from "fs-extra";
import { ProjectConfig } from "../types.js";
import { error as Error } from "./logger.js";
const CONFIG_FILE = ".pzr-config.json";

export async function getConfig(): Promise<ProjectConfig> {
  try {
    return await fs.readJson(CONFIG_FILE);
  } catch (error) {
    Error(
      "Configurations file not found. Please run `npx pzr init/ pzr init` first.",
    );
    process.exit(1);
  }
}

export async function setConfig(config: ProjectConfig): Promise<void> {
  await fs.writeJson(CONFIG_FILE, config, { spaces: 2 });
}
