import { execSync } from 'child_process'
import { InitializationError } from './errors.js'

export async function initializeCcSdd(): Promise<void> {
  console.log('📦 Initializing cc-sdd to generate Claude Code files...')
  console.log('📝 Auto-accepting all files except CLAUDE.md...')

  try {
    // Answer 'n' to CLAUDE.md to skip overwriting it
    const responses = 'n\n'
    execSync('pnpm dlx cc-sdd', {
      input: responses,
      stdio: ['pipe', 'inherit', 'inherit'],
    })
    console.log('✅ cc-sdd initialized successfully')
  } catch (error) {
    throw new InitializationError(`Failed to initialize cc-sdd: ${error}`)
  }
}
