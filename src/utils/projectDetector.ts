import fs from "fs-extra";

export async function detectProjectType(): Promise<
  "Next.js" | "Express.js" | "Vite React"
> {
  const packageJson = await fs.readJson("package.json");

  if (packageJson.dependencies?.next) {
    return "Next.js";
  } else if (packageJson.dependencies?.express) {
    return "Express.js";
  } else if (
    packageJson.dependencies?.["react-scripts"] ||
    packageJson.devDependencies?.vite
  ) {
    return "Vite React";
  }

  throw new Error(
    "Unable to detect project type. Make sure you are in a valid project directory.",
  );
}

export async function detectLanguage(): Promise<"TypeScript" | "JavaScript"> {
  const tsConfigExists = await fs.pathExists("tsconfig.json");
  return tsConfigExists ? "TypeScript" : "JavaScript";
}

export async function detectSrcDirectory(): Promise<boolean> {
  return await fs.pathExists("src");
}

export async function detectRouterType(): Promise<
  "App Router" | "Pages Router" | undefined
> {
  if (await fs.pathExists("app")) {
    return "App Router";
  }
  if (await fs.pathExists("pages")) {
    return "Pages Router";
  }
  // If neither is found, return undefined
  return undefined;
}
