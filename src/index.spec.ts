/* eslint-disable ddd/require-spec-file */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { execSync } from 'child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  appendFileSync,
  writeFileSync,
} from 'fs'
import {
  initializeCcSdd,
  initializeCenty,
  setupCommands,
  setupAgents,
  setupGitignore,
} from './index.js'

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
const mockReadFileSync = vi.mocked(readFileSync)
const mockAppendFileSync = vi.mocked(appendFileSync)
const mockWriteFileSync = vi.mocked(writeFileSync)

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

  describe('initializeCenty', () => {
    it('should initialize centy using pnpm dlx', async () => {
      mockExecSync.mockReturnValue(Buffer.from('success'))

      await initializeCenty()

      expect(mockExecSync).toHaveBeenCalledWith('pnpm dlx centy init', {
        stdio: 'inherit',
      })
    })

    it('should throw error if initialization fails', async () => {
      mockExecSync.mockImplementation(() => {
        throw new TestError('Initialization failed')
      })

      await expect(initializeCenty()).rejects.toThrow(
        'Failed to initialize centy'
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

  describe('setupGitignore', () => {
    it('should skip if .gitignore already has all Claude Code entries', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(
        'node_modules/\n.claude-container/\n.claude-revert-backup-*/\neslint-report.json\n'
      )

      await setupGitignore()

      expect(mockAppendFileSync).not.toHaveBeenCalled()
    })

    it('should only add missing entries (merge, not override)', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(
        'node_modules/\ndist/\n.claude-container/\n'
      )

      await setupGitignore()

      // Should be called with content containing only the missing entry
      expect(mockAppendFileSync).toHaveBeenCalledWith(
        expect.stringContaining('.gitignore'),
        expect.stringContaining('eslint-report.json')
      )
      // Should NOT duplicate the existing entry
      const callArg = String(mockAppendFileSync.mock.calls[0][1])
      expect(callArg.split('.claude-container/').length).toBe(1) // Should not appear again
    })

    it('should append all entries if .gitignore exists but missing all Claude entries', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue('node_modules/\ndist/\n')

      await setupGitignore()

      const callArg = String(mockAppendFileSync.mock.calls[0][1])
      expect(callArg).toContain('.claude-container/')
      expect(callArg).toContain('.claude-revert-backup-*/')
      expect(callArg).toContain('eslint-report.json')
      expect(callArg).toContain('# Claude Code temporary files')
    })

    it('should not add comment header if only entries are missing', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue(
        'node_modules/\n# Claude Code temporary files\n.claude-container/\n'
      )

      await setupGitignore()

      const callArg = String(mockAppendFileSync.mock.calls[0][1])
      expect(callArg).toContain('eslint-report.json')
      // Should not duplicate the comment header
      expect(callArg.split('# Claude Code temporary files').length).toBe(1)
    })

    it('should handle .gitignore without trailing newline', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockReturnValue('node_modules/\ndist/')

      await setupGitignore()

      // Should add a newline before appending
      const callArg = String(mockAppendFileSync.mock.calls[0][1])
      expect(callArg.startsWith('\n')).toBe(true)
    })

    it('should not fail if .gitignore update throws error', async () => {
      mockExistsSync.mockReturnValue(true)
      mockReadFileSync.mockImplementation(() => {
        throw new TestError('Read failed')
      })

      // Should not throw
      await expect(setupGitignore()).resolves.not.toThrow()
    })
  })
})
