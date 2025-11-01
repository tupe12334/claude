import { execSync } from 'child_process'
import { InitializationError } from './errors.js'

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
    throw new InitializationError(`Failed to initialize cc-sdd: ${error}`)
  }
}
