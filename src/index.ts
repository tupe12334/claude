import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function initializeCcSdd(): Promise<void> {
  console.log('📦 Initializing cc-sdd to generate Claude Code files...')
  console.log('📝 Auto-accepting all files except CLAUDE.md...')

  try {
    // Answer 'y' to all kiro commands (10 files) and 'n' to CLAUDE.md
    // This automatically overwrites all .claude/commands/kiro/* files but skips CLAUDE.md
    const responses = 'y\n'.repeat(10) + 'n\n'
    execSync('pnpm dlx cc-sdd', {
      input: responses,
      stdio: ['pipe', 'inherit', 'inherit'],
    })
    console.log('✅ cc-sdd initialized successfully')
  } catch (error) {
    throw new Error(`Failed to initialize cc-sdd: ${error}`)
  }
}

export async function setupCommands(): Promise<void> {
  console.log('⚙️  Setting up custom commands...')

  const claudeDir = '.claude'
  const commandDir = join(claudeDir, 'commands')

  // Create .claude/commands directory if it doesn't exist
  if (!existsSync(commandDir)) {
    mkdirSync(commandDir, { recursive: true })
  }

  // Copy commands from package to .claude/commands
  const packageCommandsDir = join(__dirname, '..', 'commands')
  if (existsSync(packageCommandsDir)) {
    try {
      execSync(`cp -r ${packageCommandsDir}/* ${commandDir}/`, {
        stdio: 'inherit',
      })
      console.log('✅ Custom commands set up successfully')
    } catch (error) {
      console.log('ℹ️  No custom commands to copy')
    }
  } else {
    console.log('ℹ️  No custom commands directory found')
  }
}

export async function setupAgents(): Promise<void> {
  console.log('🤖 Setting up agents...')

  const claudeDir = '.claude'
  const agentsDir = join(claudeDir, 'agents')

  // Create .claude/agents directory if it doesn't exist
  if (!existsSync(agentsDir)) {
    mkdirSync(agentsDir, { recursive: true })
  }

  // Copy agents from package to .claude/agents
  const packageAgentsDir = join(__dirname, '..', 'agents')
  if (existsSync(packageAgentsDir)) {
    try {
      execSync(`cp -r ${packageAgentsDir}/* ${agentsDir}/`, {
        stdio: 'inherit',
      })
      console.log('✅ Agents set up successfully')
    } catch (error) {
      console.log('ℹ️  No agents to copy')
    }
  } else {
    console.log('ℹ️  No agents directory found')
  }
}
