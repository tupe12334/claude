#!/usr/bin/env node

import { installPackage, setupCommands, setupAgents } from './index.js'

async function main() {
  try {
    console.log('🚀 Initializing @tupe12334/claude...')
    
    // Install cc-sdd package
    await installPackage()
    
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