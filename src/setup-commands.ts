import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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
