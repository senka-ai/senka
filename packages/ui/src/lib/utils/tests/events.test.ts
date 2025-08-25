import { describe, it, expect, vi } from 'vitest'
import { createSafeClickHandler, createKeyboardHandler, KeySets, isInteractiveElement } from '@ui/utils/events'

describe('isInteractiveElement', () => {
  it('should identify interactive elements', () => {
    // Create mock elements
    const button = document.createElement('button')
    const input = document.createElement('input')
    const link = document.createElement('a')
    link.href = 'https://example.com'
    const div = document.createElement('div')
    const clickableDiv = document.createElement('div')
    clickableDiv.setAttribute('role', 'button')

    expect(isInteractiveElement(button)).toBe(true)
    expect(isInteractiveElement(input)).toBe(true)
    expect(isInteractiveElement(link)).toBe(true)
    expect(isInteractiveElement(clickableDiv)).toBe(true)
    expect(isInteractiveElement(div)).toBe(false)
  })
})

describe('createSafeClickHandler', () => {
  it('should call onClick when not disabled', () => {
    const onClick = vi.fn()
    const handler = createSafeClickHandler(onClick, false)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', {
      value: document.createElement('div'),
      writable: false,
    })

    handler(event)
    expect(onClick).toHaveBeenCalled()
  })

  it('should not call onClick when disabled', () => {
    const onClick = vi.fn()
    const handler = createSafeClickHandler(onClick, true)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', {
      value: document.createElement('div'),
      writable: false,
    })

    handler(event)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should not call onClick when clicking interactive child element', () => {
    const onClick = vi.fn()
    const handler = createSafeClickHandler(onClick, false)

    const button = document.createElement('button')
    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', {
      value: button,
      writable: false,
    })

    handler(event)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('should handle undefined onClick gracefully', () => {
    const mockHandler = vi.fn()
    const handler = createSafeClickHandler(mockHandler, false)

    const event = new MouseEvent('click', { bubbles: true })
    Object.defineProperty(event, 'target', {
      value: document.createElement('div'),
      writable: false,
    })

    expect(() => handler(event)).not.toThrow()
  })
})

describe('createKeyboardHandler', () => {
  it('should call action for specified keys', () => {
    const action = vi.fn()
    const handler = createKeyboardHandler(action, {
      keys: ['Enter', ' '],
      preventDefault: true,
      disabled: false,
    })

    // Test Enter key
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')

    handler(enterEvent)
    expect(action).toHaveBeenCalled()
    expect(preventDefaultSpy).toHaveBeenCalled()

    // Test Space key
    action.mockClear()
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' })
    handler(spaceEvent)
    expect(action).toHaveBeenCalled()
  })

  it('should not call action for non-specified keys', () => {
    const action = vi.fn()
    const handler = createKeyboardHandler(action, {
      keys: ['Enter'],
      disabled: false,
    })

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' })
    handler(escapeEvent)
    expect(action).not.toHaveBeenCalled()
  })

  it('should not call action when disabled', () => {
    const action = vi.fn()
    const handler = createKeyboardHandler(action, {
      keys: ['Enter'],
      disabled: true,
    })

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    handler(enterEvent)
    expect(action).not.toHaveBeenCalled()
  })

  it('should not preventDefault when option is false', () => {
    const action = vi.fn()
    const handler = createKeyboardHandler(action, {
      keys: ['Enter'],
      preventDefault: false,
      disabled: false,
    })

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const preventDefaultSpy = vi.spyOn(enterEvent, 'preventDefault')

    handler(enterEvent)
    expect(action).toHaveBeenCalled()
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('should use KeySets.ACTIVATION correctly', () => {
    const action = vi.fn()
    const keys: string[] = [...KeySets.ACTIVATION]
    const handler = createKeyboardHandler(action, {
      keys: keys,
      disabled: false,
    })

    // Test all activation keys
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' })

    handler(enterEvent)
    expect(action).toHaveBeenCalled()

    action.mockClear()
    handler(spaceEvent)
    expect(action).toHaveBeenCalled()
  })

  it('should handle undefined action gracefully', () => {
    const mockAction = vi.fn()
    const handler = createKeyboardHandler(mockAction, {
      keys: ['Enter'],
      disabled: true,
    })

    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' })
    expect(() => handler(enterEvent)).not.toThrow()
  })
})

describe('KeySets', () => {
  it('should contain expected activation keys', () => {
    expect(KeySets.ACTIVATION).toContain('Enter')
    expect(KeySets.ACTIVATION).toContain(' ')
  })

  it('should contain expected navigation keys', () => {
    expect(KeySets.NAVIGATION).toContain('ArrowUp')
    expect(KeySets.NAVIGATION).toContain('ArrowDown')
    expect(KeySets.NAVIGATION).toContain('ArrowLeft')
    expect(KeySets.NAVIGATION).toContain('ArrowRight')
  })

  it('should contain expected horizontal navigation keys', () => {
    expect(KeySets.HORIZONTAL_NAVIGATION).toContain('ArrowLeft')
    expect(KeySets.HORIZONTAL_NAVIGATION).toContain('ArrowRight')
  })
})
