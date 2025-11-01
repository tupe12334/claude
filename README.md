# @tupe12334/claude

A CLI tool that initializes `cc-sdd` and sets up custom tupe commands in the `.claude` folder for automated linting fixes and documentation quality control.

[![CI/CD](https://github.com/tupe12334/claude/actions/workflows/ci.yml/badge.svg)](https://github.com/tupe12334/claude/actions/workflows/ci.yml)

## Installation

```bash
npm install -g @tupe12334/claude
```

## Usage

Run the CLI in any directory where you want to set up Claude Code with custom commands and agents:

```bash
claude
```

This will:

1. 📦 Initialize `cc-sdd` using `pnpm dlx` to generate Claude Code configuration files
2. ⚙️ Deploy `/tupe/lint` command to `.claude/commands/tupe/` for systematic ESLint error fixing
3. 🔧 Deploy the gitops agent to `.claude/agents/` for intelligent Git operations management
4. 📝 Deploy the docs-reviewer agent to `.claude/agents/` for maintaining documentation quality

## What it does

- **Initializes cc-sdd**: Runs `cc-sdd` via `pnpm dlx` to generate Claude Code configuration files without adding it as a project dependency
- **Tupe Lint Command**: Deploys the `/tupe/lint` command to `.claude/commands/tupe/` for systematic ESLint error fixing with continuous verification
- **GitOps Agent**: Deploys an intelligent Git operations manager to `.claude/agents/` that handles commits with context awareness for monorepos, polyrepos, and submodules
- **Docs Reviewer Agent**: Deploys a specialized agent to `.claude/agents/` that automatically reviews documentation to maintain proper abstraction levels, ensuring docs focus on concepts rather than implementation details

## Features

### Automated Linting Fixes

The `/tupe/lint` command provides systematic, intelligent ESLint error resolution:

- **Smart Configuration**: Automatically ensures your project uses the latest `eslint-config-agent`
- **One-at-a-Time Fixing**: Fixes each error individually to prevent cascading issues
- **Continuous Verification**: After each fix, runs tests and builds to ensure nothing breaks
- **Error Prevention**: Detects and fixes any new errors introduced during the fixing process
- **Progress Tracking**: Shows clear progress with todo list tracking
- **Git Integration**: Commits each successful fix with descriptive messages

Simply run `/tupe/lint` in Claude Code to fix all linting errors systematically while maintaining code quality.

### Intelligent Git Operations

The **gitops** agent provides expert-level Git management with context awareness:

- **Repository Intelligence**: Automatically detects monorepo, polyrepo, or submodule structures
- **Session-Aware Commits**: Only commits files changed in the current Claude session
- **Convention Following**: Respects repository-specific commit formats (Conventional Commits, custom formats)
- **Safety First**: Runs comprehensive pre-commit checks (secrets, file sizes, tests, builds)
- **Monorepo Support**: Properly scopes commits to affected packages
- **Submodule Management**: Handles submodule commits correctly and safely
- **Ultrathink Mode**: Analyzes thoroughly before any git operation

### Documentation Quality Control

The included **docs-reviewer** agent ensures your documentation maintains the right level of abstraction:

- **Conceptual over Implementation**: Keeps docs focused on "what" and "why" rather than "how"
- **Paradigmatic Structures**: Shows folder organization patterns instead of exhaustive file listings
- **Automatic Review**: Triggers when you create or update documentation files
- **Smart Refactoring**: Converts overly-specific details into clear conceptual descriptions

### Easy Setup

Simply run the `claude` command in your project directory, and all necessary configurations and commands will be set up automatically.

## Usage

After installation, you'll have access to powerful tupe commands in Claude Code:

### `/tupe/lint` - Systematic Linting Error Fixer

Fix all ESLint errors in your project systematically:

```bash
# In Claude Code, simply run:
/tupe/lint
```

**What it does**:
1. **Setup Phase**:
   - Installs/updates `eslint-config-agent@latest`
   - Creates/updates `eslint.config.mjs` with the agent config
   - Removes any conflicting ESLint configurations
   - Analyzes all existing linting errors

2. **Fixing Phase** (for each error):
   - Selects one error to fix
   - Makes the minimal fix needed
   - Runs tests to ensure they still pass
   - Runs build to ensure it still works
   - Checks for new linting errors
   - Fixes any cascading errors immediately
   - Commits the fix with descriptive message

3. **Verification Phase**:
   - Final lint check (should show 0 errors)
   - Final test run (all must pass)
   - Final build (must succeed)
   - Generates completion report

**Example Output**:
```
Fixed 15 of 47 errors (32 remaining)
Current: src/utils/helpers.ts:42 - no-unused-vars
Status: ✓ Tests passing ✓ Build successful ✓ No new errors
```

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm

### Setup

```bash
# Clone the repository
git clone <repo-url>
cd claude

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Project Structure

```
├── src/
│   ├── cli.ts          # CLI entry point
│   ├── index.ts        # Main logic
│   └── __tests__/      # Test files
├── commands/           # Custom commands to be deployed
├── agents/             # Agents to be deployed
├── dist/              # Built output
└── package.json
```

### Scripts

- `pnpm build` - Build the TypeScript code
- `pnpm dev` - Build in watch mode
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage
- `pnpm release` - Release a new version

## Publishing

```bash
pnpm release
```

This will:
1. Run tests and build
2. Bump version
3. Create git tag
4. Publish to npm
5. Create GitHub release

## License

MIT