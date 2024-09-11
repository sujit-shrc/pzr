# pzr (pazer) CLI

> [!NOTE]
> 
> Supercharge your web development workflow with pzr - the CLI based templates generator tool for Next.js, Express.js, and Vite React projects!

pzr simplifies the process of creating new pages, routes, and components, allowing developers to focus on writing business logic rather than boilerplate code.

## Why `pzr`?

- 🔮 **Smart Project Config Detection**: Automatically identifies your project type and configuration
- ⚡ **Lightning-Fast Setup**: Initialize new projects or add pzr to existing ones with a single command
- 🏗️ **Effortless Scaffolding**: Generate pages, routes, and components tailored to your project structure
- 🔧 **Flexible and Customizable**: Easily adjust detected settings to match your specific needs
- 🌟 **Framework Agnostic**: Supports Next.js, Express.js, and Vite React out of the box

Whether you're a seasoned developer or just starting out, pzr helps you focus on what matters most - writing great code and building amazing applications!

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initializing a Project](#initializing-a-project)
  - [Generating Files](#generating-files)
- [Project-Specific Usage](#project-specific-usage)
- [Features](#features)
- [Configuration](#configuration)
- [Support](#support)
- [License](#license)

## Installation

Install `pzr` globally using `npm` or `yarn`:

```bash
npm install -g pzr
# or
yarn global add pzr
```

> [!TIP]
> 
> Global installation allows you to use `pzr` from any directory on your system.

## Usage

### Initializing a Project

To initialize a new project or configure pzr for an existing project:

```bash
pzr init
```

This command will:

1. 🔍 Automatically detect your project type and configuration
2. 🖥️ Display the detected settings
3. ✅ Prompt you to confirm or modify these settings

### Generating Files

Create new pages, routes, or components using the `create` command or its shorthand `-c`:

```bash
pzr create [pages...]
# or
pzr -c [pages...]
```

#### Examples

Create multiple pages:

```bash
pzr create home about contact
# or
pzr -c home about contact
```

Generate files in a specific directory:

```bash
pzr create -d dashboard/settings profile
# or
pzr -c -d dashboard/settings profile
```

> [!TIP]
> 
> You can create multiple pages/routes at once by listing them after the `create` command or `-c` flag.

## Project-Specific Usage

### Local Installation

If you prefer not to install `pzr` globally, use it on a per-project basis:

1. Install as a dev dependency:

   ```bash
   npm install --save-dev pzr
   # or
   yarn add --dev pzr
   ```

2. Run `pzr` commands using `npx`:

   ```bash
   npx pzr init
   npx pzr -c home about
   ```

3. Alternatively, add scripts to your `package.json`:

   ```json
   {
     "scripts": {
       "pzr:init": "pzr init",
       "pzr:create": "pzr -c"
     }
   }
   ```

   Then use `npm` or yarn to run the commands:

   ```bash
   npm run pzr:init
   npm run pzr:create home about
   # or with yarn
   yarn pzr:init
   yarn pzr:create home about
   ```

### Via `npx` (without installation)

Use `pzr` without installation via npx:

```bash
npx pzr init
npx pzr -c home about
npx pzr -c -d dashboard/settings profile
```

> [!WARNING]
> 
> Using `npx` without installation may result in slower execution times as it downloads the package each time.

## Features

### 🔍 Automatic Project Configuration Detection

`pzr` intelligently detects:

- **Project Type**: Next.js, Express.js, or Vite React
- **Language**: TypeScript or JavaScript
- **Source Directory**: Whether you're using a `src` directory
- **Next.js Routing**: Page Router or App Router (for Next.js projects)

### 🖥️ User Confirmation Prompts

After detection, `pzr` will display the detected settings and prompt you to confirm or customize them, ensuring accuracy and flexibility.

### 📁 Project-Specific File Generation

`pzr` file generation based on the project type:

- **Next.js**:

  - Generates `layout.tsx`, `page.tsx`, and `loader.tsx` in created routes in `/app` or `/src/app` dir.
  - Supports both Page Router and App Router structures and both `tsx` and `jsx` components.

- **Express.js**:

  - Creates models, controllers, and routes for `js` or `ts` apps.
  - Automatically adds `app.use(routeMiddleware)` in `app.ts`

- **Vite React**:
  - Generates `.jsx` or `.tsx` components in the `/components` directory

> [!IMPORTANT]
> 
> We're actively working on adding support for more project types!

## Configuration

pzr stores its configuration in a `.pzr-config.json` file in your project root. This file is created when you run `pzr init` and contains information about your project type, language preference, and other settings.

> [!CAUTION]
> 
> It's recommended to use the `pzr init` command to modify your configuration. Manual edits to `.pzr-config.json` may lead to unexpected behavior.

## Support

For bug reports and feature requests, please open an issue on our [GitHub repository](https://github.com/sujit-shrc/pzr).

> [!IMPORTANT]
> 
> 🤝 We welcome contributions! Feel free to submit pull requests to help improve pzr.

## License

`pzr` is released under the MIT License. See the LICENSE file for more details.
