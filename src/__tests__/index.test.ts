import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { installPackage, setupCommands, setupAgents } from '../index.js'

vi.mock('child_process')
vi.mock('fs')

const mockExecSync = vi.mocked(execSync)
const mockExistsSync = vi.mocked(existsSync)
const mockMkdirSync = vi.mocked(mkdirSync)

describe('CLI Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('installPackage', () => {
    it('should install cc-sdd package successfully', async () => {
      mockExecSync.mockReturnValue(Buffer.from('success'))

      await installPackage()

      expect(mockExecSync).toHaveBeenCalledWith('pnpm add cc-sdd', {
        stdio: 'inherit',
      })
    })

    it('should throw error if installation fails', async () => {
      mockExecSync.mockImplementation(() => {
        throw new Error('Installation failed')
      })

      await expect(installPackage()).rejects.toThrow(
        'Failed to install cc-sdd package'
      )
    })
  })

  describe('setupCommands', () => {
    it('should create command directory if it does not exist', async () => {
      mockExistsSync.mockReturnValue(false)

      await setupCommands()

      expect(mockMkdirSync).toHaveBeenCalledWith('.claude/command', {
        recursive: true,
      })
    })

    it('should copy commands if package commands directory exists', async () => {
      mockExistsSync.mockReturnValueOnce(true) // for commandDir
      mockExistsSync.mockReturnValueOnce(true) // for packageCommandsDir
      mockExecSync.mockReturnValue(Buffer.from('success'))

      await setupCommands()

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('cp -r'),
        { stdio: 'inherit' }
      )
    })
  })

  describe('setupAgents', () => {
    it('should create agents directory if it does not exist', async () => {
      mockExistsSync.mockReturnValue(false)

      await setupAgents()

      expect(mockMkdirSync).toHaveBeenCalledWith('.claude/agents', {
        recursive: true,
      })
    })

    it('should copy agents if package agents directory exists', async () => {
      mockExistsSync.mockReturnValueOnce(true) // for agentsDir
      mockExistsSync.mockReturnValueOnce(true) // for packageAgentsDir
      mockExecSync.mockReturnValue(Buffer.from('success'))

      await setupAgents()

      expect(mockExecSync).toHaveBeenCalledWith(
        expect.stringContaining('cp -r'),
        { stdio: 'inherit' }
      )
    })
  })
})
