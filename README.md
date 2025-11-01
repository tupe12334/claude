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
2. ⚙️ Set up tupe commands in `.claude/commands/tupe/` for fixing linting issues
3. 🤖 Deploy the docs-reviewer agent to `.claude/agents/` for maintaining documentation quality

## What it does

- **Initializes cc-sdd**: Runs `cc-sdd` via `pnpm dlx` to generate Claude Code configuration files without adding it as a project dependency
- **Tupe Commands**: Sets up specialized tupe commands in `.claude/commands/tupe/` for automated linting fixes in your codebase
- **Docs Reviewer Agent**: Deploys a specialized agent to `.claude/agents/` that automatically reviews documentation to maintain proper abstraction levels, ensuring docs focus on concepts rather than implementation details

## Features

### Automated Linting Fixes

The tupe commands installed in `.claude/commands/tupe/` provide automated solutions for common linting issues:

- Automatically detect and fix linting errors in your codebase
- Integrate seamlessly with Claude Code's command system
- Run fixes directly from the Claude Code interface

### Documentation Quality Control

The included **docs-reviewer** agent ensures your documentation maintains the right level of abstraction:

- **Conceptual over Implementation**: Keeps docs focused on "what" and "why" rather than "how"
- **Paradigmatic Structures**: Shows folder organization patterns instead of exhaustive file listings
- **Automatic Review**: Triggers when you create or update documentation files
- **Smart Refactoring**: Converts overly-specific details into clear conceptual descriptions

### Easy Setup

Simply run the `claude` command in your project directory, and all necessary configurations and commands will be set up automatically.

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