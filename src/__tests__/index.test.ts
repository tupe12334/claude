import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { initializeCcSdd, setupCommands, setupAgents } from '../index.js'

export class TestError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TestError'
  }
}

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

  describe('initializeCcSdd', () => {
    it('should initialize cc-sdd using pnpm dlx with auto-responses', async () => {
      mockExecSync.mockReturnValue(Buffer.from('success'))

      await initializeCcSdd()

      expect(mockExecSync).toHaveBeenCalledWith('pnpm dlx cc-sdd', {
        input: 'y\n'.repeat(10) + 'n\n',
        stdio: ['pipe', 'inherit', 'inherit'],
      })
    })

    it('should throw error if initialization fails', async () => {
      mockExecSync.mockImplementation(() => {
        throw new TestError('Initialization failed')
      })

      await expect(initializeCcSdd()).rejects.toThrow(
        'Failed to initialize cc-sdd'
      )
    })
  })

  describe('setupCommands', () => {
    it('should create commands directory if it does not exist', async () => {
      mockExistsSync.mockReturnValue(false)

      await setupCommands()

      expect(mockMkdirSync).toHaveBeenCalledWith('.claude/commands', {
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
