import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
