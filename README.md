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
2. ⚙️ Deploy tupe commands to `.claude/commands/tupe/`:
   - `/tupe:container-pr` - Containerized development with automatic PR creation
   - `/tupe:package-setup` - Initialize or validate package configuration
   - `/tupe:lint` - Systematic ESLint error fixing
   - `/tupe:boot` - Project onboarding with service boot
   - `/tupe:project-onboard` - Comprehensive codebase learning
   - And more specialized workflow commands
3. 🔧 Deploy the gitops agent to `.claude/agents/` for intelligent Git operations management
4. 📝 Deploy the docs-reviewer agent to `.claude/agents/` for maintaining documentation quality

## What it does

- **Initializes cc-sdd**: Runs `cc-sdd` via `pnpm dlx` to generate Claude Code configuration files without adding it as a project dependency
- **Tupe Commands Suite**: Deploys 10 specialized commands to `.claude/commands/tupe/`:
  - **container-pr**: Execute work in isolated Docker containers with automatic PR creation
  - **package-setup**: Initialize or validate package configuration with pnpm, vitest, and CI/CD
  - **lint**: Systematic ESLint error fixing with continuous verification
  - **boot**: Project onboarding with service initialization
  - **project-onboard**: Comprehensive codebase exploration and learning
  - **commit-push**: Smart git operations for session changes
  - **ultrathink**: Deep thinking mode for complex tasks
  - **validate-feature**: Feature validation with comprehensive testing
  - **implement-and-validate**: Full TDD implementation cycle
  - **lib-opportunities**: Analyze for npm package replacement opportunities
- **GitOps Agent**: Deploys an intelligent Git operations manager to `.claude/agents/` that handles commits with context awareness for monorepos, polyrepos, and submodules
- **Docs Reviewer Agent**: Deploys a specialized agent to `.claude/agents/` that automatically reviews documentation to maintain proper abstraction levels, ensuring docs focus on concepts rather than implementation details

## Features

### Concurrent Multi-Agent Workflows

The **container-pr** command enables **multiple Claude agents to work simultaneously** on different tasks:

**Key Innovation**: Run several agents in parallel, each in an isolated container, without any conflicts.

**Use Case**: Start multiple Claude Code sessions (or agents) working on different features:

- Agent 1: Adding authentication → PR #123
- Agent 2: Updating dependencies → PR #124
- Agent 3: Optimizing queries → PR #125
- All running at the same time without interfering!

**Features**:

- **True Parallelism**: Multiple agents work concurrently, not sequentially
- **Complete Isolation**: Each agent in its own Docker container with clean environment
- **Multi-Language**: Auto-detects Node.js, Python, Go, and more
- **Secure Credentials**: GitHub and npm tokens passed safely via env vars
- **Auto-PR Creation**: Each agent creates its own pull request
- **Zero Conflicts**: No interference between agents or with host system
- **Clean Workflows**: Automatic cleanup and branch management

Simply run `/tupe:container-pr` in each Claude Code session and work on multiple tasks simultaneously!

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

## Available Commands

After installation, you'll have access to powerful tupe commands in Claude Code:

### `/tupe:container-pr` - Concurrent Multi-Agent Workflow

Execute work in isolated Docker containers to enable multiple agents working simultaneously:

**Primary benefit**: Run multiple Claude agents in parallel, each in its own container, without conflicts.

```bash
# In Claude Code, simply run:
/tupe:container-pr
```

**What it does**:

1. **Environment Setup**:
   - Verifies Docker, GitHub CLI, and credentials
   - Analyzes the repository structure
   - Captures gh and npm tokens securely

2. **Container Preparation**:
   - Detects project type (Node.js, Python, Go, etc.)
   - Builds appropriate Docker image with tools
   - Installs GitHub CLI and necessary dependencies

3. **Isolated Execution**:
   - Creates a new branch for the work
   - Executes all requested work inside the container
   - Mounts repository as volume
   - Passes credentials via environment variables

4. **Automated PR Creation**:
   - Commits all changes with descriptive messages
   - Pushes to remote branch
   - Creates pull request with comprehensive description
   - Returns PR URL to the developer

5. **Cleanup**:
   - Removes container artifacts
   - Returns to original branch

**Benefits**:

- **Concurrent agent workflows**: Run multiple agents in parallel without interference
- **Complete isolation**: Each agent works in its own container environment
- **Independent PRs**: Each task gets its own pull request automatically
- **Zero conflicts**: Agents don't interfere with each other or the host
- **Reproducible**: Same container environment every time
- **Secure**: Credentials passed safely via environment variables

### `/tupe:package-setup` - Package Configuration Manager

Initialize or validate package setup with correct configuration for publishing, CI/CD, testing, and building:

```bash
# In Claude Code, simply run:
/tupe:package-setup
```

**What it does**:

Handles two scenarios:

1. **Publishable Packages**: Full setup with npm publishing, release-it, CI/CD with publish step
2. **Internal Packages**: Setup without publishing, CI/CD with tests/builds only

**Setup includes**:

1. **Package Configuration**:
   - Creates or validates package.json with correct ES module setup
   - Ensures proper `main`, `types`, `exports` fields
   - Sets up all necessary scripts (build, test, lint, format)
   - Configures `publishConfig` for npm (if publishable)

2. **TypeScript Setup**:
   - Creates tsconfig.json with strict mode
   - Configures for declaration file generation
   - Sets up proper module resolution

3. **Testing Configuration** (if needed):
   - Installs and configures vitest
   - Creates vitest.config.ts with coverage setup
   - Sets up example test structure

4. **Linting and Formatting**:
   - Installs ESLint@latest with eslint-config-agent@latest (ONLY config needed)
   - Sets up Prettier with consistent style
   - Configures cspell for spell checking
   - Creates .prettierignore

5. **Git Hooks (Husky + lint-staged)**:
   - Installs and initializes Husky
   - Creates pre-commit hook (runs lint-staged on staged files)
   - Creates pre-push hook (runs lint, format, spell, tests)
   - Configures lint-staged for automatic fixing
   - Ensures code quality before commits and pushes

6. **Release Management** (publishable only):
   - Installs release-it
   - Creates .release-it.json configuration
   - Sets up release script

7. **CI/CD Pipeline**:
   - Creates GitHub Actions workflow
   - Tests on Node 20, 22
   - Runs lint, format check, tests, and build
   - Auto-publishes to npm (if publishable)
   - Or just runs tests/builds (if internal)

8. **Project Structure**:
   - Creates src/ directory with example code
   - Sets up .gitignore
   - Validates gh CLI setup

**Example usage scenarios**:

```text
Scenario 1: New publishable library
→ /tupe:package-setup
→ Answers: Publishable? Yes, Build? Yes, Tests? Yes
→ Result: Full setup with npm publishing

Scenario 2: Internal monorepo package
→ /tupe:package-setup
→ Answers: Publishable? No, Build? Yes, Tests? Yes
→ Result: Setup with CI/CD but no publishing

Scenario 3: Validate existing package
→ /tupe:package-setup
→ Validates all configs and fixes issues
```

**Validation checklist**:

- ✅ package.json with ES modules and correct fields
- ✅ TypeScript configuration with strict mode
- ✅ Testing setup with vitest
- ✅ ESLint with eslint-config-agent@latest (ONLY config)
- ✅ Prettier and cspell configured
- ✅ Husky git hooks (pre-commit, pre-push)
- ✅ lint-staged for automatic fixing
- ✅ CI/CD workflow working
- ✅ Release configuration (if publishable)
- ✅ GitHub secrets verified (if publishable)

**Git hooks ensure**:

- 🔒 Pre-commit: Auto-fix linting, formatting, spelling on staged files
- 🔒 Pre-push: Full validation (lint, format, spell, tests) before pushing

### `/tupe:lint` - Systematic Linting Error Fixer

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

```text
Fixed 15 of 47 errors (32 remaining)
Current: src/utils/helpers.ts:42 - no-unused-vars
Status: ✓ Tests passing ✓ Build successful ✓ No new errors
```

## Development

### Prerequisites

- Node.js >= 20.0.0
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

```text
├── src/
│   ├── cli.ts          # CLI entry point
│   ├── cli.spec.ts     # CLI tests
│   ├── index.ts        # Main logic
│   └── index.spec.ts   # Main logic tests
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
