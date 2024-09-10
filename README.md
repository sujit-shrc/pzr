# pzr (pazer) CLI

pzr is a CLI tool for generating project structures and files for Next.js, Express.js, and Vite React projects. It simplifies the process of creating new pages, routes, and components, allowing developers to focus on writing business logic rather than boilerplate code.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initializing a Project](#initializing-a-project)
  - [Generating Files](#generating-files)
- [Project-Specific Usage](#project-specific-usage)
- [Configuration](#configuration)
- [Support](#support)
- [License](#license)

## Installation

You can install pzr globally using npm or yarn:

```bash
npm install -g pzr
# or
yarn global add pzr
```

> **Note:** Global installation allows you to use `pzr` from any directory on your system.

## Usage

### Initializing a Project

To initialize a new project or configure pzr for an existing project, run:

```bash
pzr init
```

This command will detect your project type and configuration and prompt you to confirm or modify the detected settings.

### Generating Files

To generate new pages, routes, or components, use the `create` command or its shorthand `-c`:

```bash
pzr create [pages...]
# or
pzr -c [pages...]
```

**Example:**

```bash
pzr create home about contact
# or
pzr -c home about contact
```

This will create new pages/routes for "home", "about", and "contact" based on your project configuration.

To generate files in a specific directory, use the `-d` or `--directory` option:

```bash
pzr create -d dashboard/settings profile
# or
pzr -c -d dashboard/settings profile
```

This will create a "profile" page/route inside the "dashboard/settings" directory.

> **Tip:** You can create multiple pages/routes at once by listing them after the `create` command or `-c` flag.

## Project-Specific Usage

### Local Installation

If you prefer not to install pzr globally, you can use it on a per-project basis:

1. Install as a dev dependency:

   ```bash
   npm install --save-dev pzr
   # or
   yarn add --dev pzr
   ```

2. Run pzr commands using npx:

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

   Then use npm or yarn to run the commands:

   ```bash
   npm run pzr:init
   npm run pzr:create home about
   # or with yarn
   yarn pzr:init
   yarn pzr:create home about
   ```

### Via npx (without installation)

You can also use pzr without installation via npx:

```bash
npx pzr init
npx pzr -c home about
npx pzr -c -d dashboard/settings profile
```

> **Note:** Using npx without installation may result in slower execution times as it downloads the package each time.

## Configuration

pzr stores its configuration in a `.pzr-config.json` file in your project root. This file is created when you run `pzr init` and contains information about your project type, language preference, and other settings.

> **Warning:** It's recommended to use the `pzr init` command to modify your configuration. Manual edits to `.pzr-config.json` may lead to unexpected behavior.

## Support

For bug reports and feature requests, please open an issue on our [GitHub repository](https://github.com/sujit-shrc/pzr).

> **Info:** Contributions are welcome! Feel free to submit pull requests to help improve pzr.

## License

pzr is released under the MIT License. See the LICENSE file for more details.
