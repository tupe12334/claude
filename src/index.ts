import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function installPackage(): Promise<void> {
  console.log('📦 Installing cc-sdd package...')
  
  try {
    execSync('pnpm add cc-sdd', { stdio: 'inherit' })
    console.log('✅ cc-sdd package installed successfully')
  } catch (error) {
    throw new Error(`Failed to install cc-sdd package: ${error}`)
  }
}

export async function setupCommands(): Promise<void> {
  console.log('⚙️  Setting up custom commands...')
  
  const claudeDir = '.claude'
  const commandDir = join(claudeDir, 'command')
  
  // Create .claude/command directory if it doesn't exist
  if (!existsSync(commandDir)) {
    mkdirSync(commandDir, { recursive: true })
  }
  
  // Copy commands from package to .claude/command
  const packageCommandsDir = join(__dirname, '..', 'commands')
  if (existsSync(packageCommandsDir)) {
    try {
      execSync(`cp -r ${packageCommandsDir}/* ${commandDir}/`, { stdio: 'inherit' })
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
      execSync(`cp -r ${packageAgentsDir}/* ${agentsDir}/`, { stdio: 'inherit' })
      console.log('✅ Agents set up successfully')
    } catch (error) {
      console.log('ℹ️  No agents to copy')
    }
  } else {
    console.log('ℹ️  No agents directory found')
  }
}