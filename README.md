# African Job Board

Cross border opportunities for african job seekers and companies

## Getting Started with Turbo Repo

### Project Structure

```
├── apps
│   ├── api
│   └── web
├── LICENSE
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── README.md
├── requirements.md
└── turbo.json
```

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v22.16.0 or newer).

### 1. Install `pnpm`

Turbo Repo works seamlessly with [pnpm](https://pnpm.io/):

```bash
npm install -g pnpm
```

### 2. Install Turbo Repo globally

```bash
pnpm install -g turbo
```

### 3. Install project dependencies

From the project root, run:

```bash
pnpm install
```

This will install all dependencies for every package in the monorepo.

### 4. Start the development server

To start all apps in development mode:

```bash
turbo dev
```

Or, to start a specific app (e.g., the `api` app):

```bash
turbo dev --filter=api
```

### 5. Installing dependencies for individual apps

**Do not install dependencies globally.** Each app should manage its own dependencies.

- To install a dependency for a specific app, either:
  - Change directory into the app and install:
    ```bash
    cd apps/api
    pnpm install <package-name>
    ```
  - Or, from the project root, use:
    ```bash
    pnpm install <package-name> --filter=api
    ```

### 6. Sharing types and resources

To share types or utilities between apps, create a package (e.g., `packages/types`) and import it where needed. This promotes code reuse and consistency across the monorepo.
