#!/usr/bin/env node

import {
  initializeCcSdd,
  initializeCenty,
  setupCommands,
  setupAgents,
  setupGitignore,
} from './index.js'

async function main(): Promise<void> {
  try {
    console.log('🚀 Initializing @tupe12334/claude...')

    // Initialize cc-sdd to generate Claude Code files
    await initializeCcSdd()

    // Initialize centy for context management
    await initializeCenty()

    // Setup custom commands
    await setupCommands()

    // Setup agents
    await setupAgents()

    // Ensure .gitignore has Claude Code entries
    await setupGitignore()

    console.log('✅ Setup complete!')
  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

main()
