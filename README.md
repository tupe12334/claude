# @tupe12334/claude

A CLI tool that installs the `cc-sdd` package and sets up custom commands and agents in the `.claude` folder.

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

1. 📦 Install the `cc-sdd` package
2. ⚙️ Set up custom commands in `.claude/command/`
3. 🤖 Set up agents in `.claude/agents/`

## What it does

- **Installs cc-sdd**: Automatically installs the required `cc-sdd` package dependency
- **Custom Commands**: Copies any bundled commands to `.claude/command/` for Claude Code to use
- **Agents**: Copies any bundled agents to `.claude/agents/` for enhanced Claude Code functionality

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