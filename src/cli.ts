#!/usr/bin/env node

import { initializeCcSdd, setupCommands, setupAgents } from './index.js'

async function main(): Promise<void> {
  try {
    console.log('🚀 Initializing @tupe12334/claude...')

    // Initialize cc-sdd to generate Claude Code files
    await initializeCcSdd()

    // Setup custom commands
    await setupCommands()

    // Setup agents
    await setupAgents()
    console.log('✅ Setup complete!')
  } catch (error) {
    console.error('❌ Setup failed:', error)
    process.exit(1)
  }
}

main()