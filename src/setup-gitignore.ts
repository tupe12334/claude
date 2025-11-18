import { existsSync, readFileSync, appendFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const REQUIRED_GITIGNORE_ENTRIES = [
  '',
  '# Claude Code temporary files',
  '.claude-container/',
  '.claude-revert-backup-*/',
  'eslint-report.json',
]

/**
 * Ensures .gitignore has entries for Claude Code temporary files
 * This prevents accidentally committing temporary files created by tupe commands
 */
export async function setupGitignore(): Promise<void> {
  console.log('📝 Ensuring .gitignore is configured...')

  const gitignorePath = join(process.cwd(), '.gitignore')

  try {
    // Check if .gitignore exists
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path is built from process.cwd() and constant
    if (!existsSync(gitignorePath)) {
      // Create new .gitignore with basic entries
      const basicGitignore = [
        '# Dependencies',
        'node_modules/',
        '',
        '# Build output',
        'dist/',
        '',
        '# Testing',
        'coverage/',
        '',
        '# Environment',
        '.env',
        '.env.local',
        '',
        '# Logs',
        '*.log',
        '',
        '# OS',
        '.DS_Store',
        ...REQUIRED_GITIGNORE_ENTRIES,
      ].join('\n')

      // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path is built from process.cwd() and constant
      writeFileSync(gitignorePath, basicGitignore + '\n')
      console.log('✅ Created .gitignore with Claude Code entries')
      return
    }

    // Read existing .gitignore
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path is built from process.cwd() and constant
    const existingContent = readFileSync(gitignorePath, 'utf-8')

    // Check each entry individually to see what's missing
    const missingEntries: string[] = []

    // Check if the comment header exists
    const hasCommentHeader = existingContent.includes(
      '# Claude Code temporary files'
    )

    // Check each actual entry (not comments or empty lines)
    if (!existingContent.includes('.claude-container/')) {
      missingEntries.push('.claude-container/')
    }
    if (!existingContent.includes('.claude-revert-backup-*/')) {
      missingEntries.push('.claude-revert-backup-*/')
    }
    if (!existingContent.includes('eslint-report.json')) {
      missingEntries.push('eslint-report.json')
    }

    // If nothing is missing, we're done
    if (missingEntries.length === 0) {
      console.log('✅ .gitignore already configured')
      return
    }

    // Build the entries to add
    const entriesToAdd: string[] = []

    // Add comment header if it doesn't exist and we have entries to add
    if (!hasCommentHeader) {
      entriesToAdd.push('', '# Claude Code temporary files')
    }

    // Add only the missing entries
    entriesToAdd.push(...missingEntries)

    // Append to file
    const needsNewline = !existingContent.endsWith('\n')
    const finalContent =
      (needsNewline ? '\n' : '') + entriesToAdd.join('\n') + '\n'

    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Path is built from process.cwd() and constant
    appendFileSync(gitignorePath, finalContent)
    const entryWord = missingEntries.length === 1 ? 'entry' : 'entries'
    console.log(
      `✅ Updated .gitignore with ${missingEntries.length} missing ${entryWord}`
    )
  } catch (error) {
    console.log('⚠️  Could not update .gitignore:', error)
    // Don't fail the setup if .gitignore update fails
  }
}
