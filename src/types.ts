export interface ProjectConfig {
  framework: "Next.js" | "Express.js" | "Vite React";
  language: "TypeScript" | "JavaScript";
  usingSrcDir: boolean;
  router?: "App Router" | "Pages Router";
}
