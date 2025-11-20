import { describe, it, expect } from 'vitest'
import { InitializationError } from './errors.js'

describe('errors', () => {
  describe('InitializationError', () => {
    it('should create an error with correct name and message', () => {
      const error = new InitializationError('test message')
      expect(error.name).toBe('InitializationError')
      expect(error.message).toBe('test message')
      expect(error).toBeInstanceOf(Error)
    })

    it('should capture stack trace', () => {
      const error = new InitializationError('test')
      expect(error.stack).toBeDefined()
    })
  })
})
