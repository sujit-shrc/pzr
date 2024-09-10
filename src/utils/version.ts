import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getPackageVersion() {
  try {
    const packageJsonPath = resolve(__dirname, "..", "..", "package.json");
    const packageJson = JSON.parse(await readFile(packageJsonPath, "utf8"));
    return packageJson.version;
  } catch (error) {
    console.error("Error reading package.json:", error);
    return "unknown";
  }
}
