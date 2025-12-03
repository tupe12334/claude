import { execSync } from 'child_process'
import { InitializationError } from './errors.js'

export async function initializeCenty(): Promise<void> {
  console.log('🔧 Initializing centy for context management...')

  try {
    execSync('pnpm dlx centy init', {
      stdio: 'inherit',
    })
    console.log('✅ centy initialized successfully')
  } catch (error) {
    throw new InitializationError(`Failed to initialize centy: ${error}`)
  }
}
