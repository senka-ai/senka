import { describe, it, expect } from 'vitest'
import { LayoutEngine, VERSION } from './index.js'

describe('LayoutEngine', () => {
  it('should export LayoutEngine class', () => {
    expect(LayoutEngine).toBeDefined()
    expect(typeof LayoutEngine).toBe('function')
  })

  it('should export VERSION constant', () => {
    expect(VERSION).toBe('0.0.1')
  })

  it('should create LayoutEngine instance', () => {
    const engine = new LayoutEngine()
    expect(engine).toBeInstanceOf(LayoutEngine)
  })
})
