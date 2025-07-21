import { describe, it, expect, vi } from 'vitest'
import { useControlledState, useFocusState, useToggleState } from '../state.svelte'

describe('useControlledState', () => {
  it('should handle uncontrolled state', () => {
    const onChange = vi.fn()
    const state = useControlledState<string>('initial', undefined, onChange)

    expect(state.value()).toBe('initial')
    expect(state.isControlled()).toBe(false)

    // Update uncontrolled state
    state.setValue('updated')
    expect(state.value()).toBe('updated')
    expect(onChange).toHaveBeenCalledWith('updated')
  })

  it('should handle controlled state', () => {
    const onChange = vi.fn()
    const state = useControlledState<string>('initial', 'controlled', onChange)

    expect(state.value()).toBe('controlled')
    expect(state.isControlled()).toBe(true)

    // Attempt to update controlled state
    state.setValue('updated')
    expect(state.value()).toBe('controlled') // Should remain controlled value
    expect(onChange).toHaveBeenCalledWith('updated')
  })

  it('should switch from uncontrolled to controlled', () => {
    const onChange = vi.fn()
    let controlledValue: string | undefined = undefined
    const state = useControlledState<string>('initial', controlledValue, onChange)

    expect(state.isControlled()).toBe(false)
    expect(state.value()).toBe('initial')

    // Simulate prop change to controlled
    controlledValue = 'now-controlled'
    // In real usage, this would be handled by Svelte's reactivity
    // For testing, we simulate the effect
    state.setValue('test') // This should now call onChange but not update internal state
    expect(onChange).toHaveBeenCalledWith('test')
  })
})

describe('useFocusState', () => {
  it('should handle focus and blur events', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const focusState = useFocusState(onFocus, onBlur, false)

    expect(focusState.focused()).toBe(false)

    // Simulate focus
    const focusEvent = new FocusEvent('focus')
    focusState.handleFocus(focusEvent)
    expect(focusState.focused()).toBe(true)
    expect(onFocus).toHaveBeenCalledWith(focusEvent)

    // Simulate blur
    const blurEvent = new FocusEvent('blur')
    focusState.handleBlur(blurEvent)
    expect(focusState.focused()).toBe(false)
    expect(onBlur).toHaveBeenCalledWith(blurEvent)
  })

  it('should not handle events when disabled', () => {
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    const focusState = useFocusState(onFocus, onBlur, true) // disabled

    // Simulate focus when disabled
    const focusEvent = new FocusEvent('focus')
    focusState.handleFocus(focusEvent)
    expect(focusState.focused()).toBe(false) // Should remain false
    expect(onFocus).not.toHaveBeenCalled()
  })
})

describe('useToggleState', () => {
  it('should handle toggle state with onChange callback', () => {
    const onChange = vi.fn()
    const toggleState = useToggleState(false, undefined, onChange)

    expect(toggleState.value()).toBe(false)

    // Toggle to true
    toggleState.toggle()
    expect(toggleState.value()).toBe(true)
    expect(onChange).toHaveBeenCalledWith(true)

    // Toggle back to false
    toggleState.toggle()
    expect(toggleState.value()).toBe(false)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should set specific values', () => {
    const onChange = vi.fn()
    const toggleState = useToggleState(false, undefined, onChange)

    // Set to true
    toggleState.setValue(true)
    expect(toggleState.value()).toBe(true)
    expect(onChange).toHaveBeenCalledWith(true)

    // Set to false
    toggleState.setValue(false)
    expect(toggleState.value()).toBe(false)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('should handle toggle without onChange callback', () => {
    const toggleState = useToggleState(false, undefined)

    expect(toggleState.value()).toBe(false)

    toggleState.toggle()
    expect(toggleState.value()).toBe(true)

    // Should not throw error when no onChange provided
    expect(() => toggleState.toggle()).not.toThrow()
  })
})
