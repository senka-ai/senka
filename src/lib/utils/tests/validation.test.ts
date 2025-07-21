import { describe, it, expect } from 'vitest'
import { validateValue, validationRules, useFieldValidation } from '../validation.svelte'

describe('validateValue', () => {
  it('should return valid result for empty rules', () => {
    const result = validateValue('test', [])
    expect(result.isValid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it('should return invalid result when validation fails', () => {
    const rules = [validationRules.required()]
    const result = validateValue('', rules)
    expect(result.isValid).toBe(false)
    expect(result.errors).toEqual(['This field is required'])
  })

  it('should return multiple errors for multiple failed rules', () => {
    const rules = [validationRules.required(), validationRules.minLength(5)]
    const result = validateValue('ab', rules)
    expect(result.isValid).toBe(false)
    expect(result.errors).toHaveLength(1) // Only minLength fails since value exists
    expect(result.errors[0]).toBe('Must be at least 5 characters')
  })
})

describe('validationRules.required', () => {
  it('should validate non-empty strings', () => {
    const rule = validationRules.required()
    expect(rule.validator('test')).toBe(true)
    expect(rule.validator('   ')).toBe(false) // only whitespace
    expect(rule.validator('')).toBe(false)
  })

  it('should validate arrays', () => {
    const rule = validationRules.required()
    expect(rule.validator([1, 2, 3])).toBe(true)
    expect(rule.validator([])).toBe(false)
  })

  it('should validate non-null values', () => {
    const rule = validationRules.required()
    expect(rule.validator(0)).toBe(true)
    expect(rule.validator(false)).toBe(true)
    expect(rule.validator(null)).toBe(false)
    expect(rule.validator(undefined)).toBe(false)
  })
})

describe('validationRules.minLength', () => {
  it('should validate minimum length', () => {
    const rule = validationRules.minLength(3)
    expect(rule.validator('abc')).toBe(true)
    expect(rule.validator('abcd')).toBe(true)
    expect(rule.validator('ab')).toBe(false)
  })

  it('should have correct error message', () => {
    const rule = validationRules.minLength(5)
    expect(rule.message).toBe('Must be at least 5 characters')
  })

  it('should accept custom error message', () => {
    const rule = validationRules.minLength(3, 'Too short!')
    expect(rule.message).toBe('Too short!')
  })
})

describe('validationRules.maxLength', () => {
  it('should validate maximum length', () => {
    const rule = validationRules.maxLength(5)
    expect(rule.validator('abc')).toBe(true)
    expect(rule.validator('abcde')).toBe(true)
    expect(rule.validator('abcdef')).toBe(false)
  })
})

describe('validationRules.email', () => {
  it('should validate email format', () => {
    const rule = validationRules.email()
    expect(rule.validator('test@example.com')).toBe(true)
    expect(rule.validator('user.name+tag@domain.co.uk')).toBe(true)
    expect(rule.validator('invalid-email')).toBe(false)
    expect(rule.validator('missing@')).toBe(false)
    expect(rule.validator('@missing.com')).toBe(false)
  })
})

describe('validationRules.numeric', () => {
  it('should validate numeric strings', () => {
    const rule = validationRules.numeric()
    expect(rule.validator('123')).toBe(true)
    expect(rule.validator('123.45')).toBe(true)
    expect(rule.validator('-123')).toBe(true)
    expect(rule.validator('abc')).toBe(false)
    expect(rule.validator('123abc')).toBe(false)
  })

  it('should validate number values', () => {
    const rule = validationRules.numeric()
    expect(rule.validator(123)).toBe(true)
    expect(rule.validator(123.45)).toBe(true)
    expect(rule.validator(-123)).toBe(true)
    expect(rule.validator(NaN)).toBe(false)
  })
})

describe('validationRules.min', () => {
  it('should validate minimum numeric value', () => {
    const rule = validationRules.min(10)
    expect(rule.validator(15)).toBe(true)
    expect(rule.validator(10)).toBe(true)
    expect(rule.validator(5)).toBe(false)
    expect(rule.validator('15')).toBe(true)
    expect(rule.validator('5')).toBe(false)
  })
})

describe('validationRules.max', () => {
  it('should validate maximum numeric value', () => {
    const rule = validationRules.max(10)
    expect(rule.validator(5)).toBe(true)
    expect(rule.validator(10)).toBe(true)
    expect(rule.validator(15)).toBe(false)
    expect(rule.validator('5')).toBe(true)
    expect(rule.validator('15')).toBe(false)
  })
})

describe('validationRules.pattern', () => {
  it('should validate regex patterns', () => {
    const rule = validationRules.pattern(/^[A-Z]+$/, 'Must be uppercase letters only')
    expect(rule.validator('ABC')).toBe(true)
    expect(rule.validator('abc')).toBe(false)
    expect(rule.validator('A1B')).toBe(false)
    expect(rule.message).toBe('Must be uppercase letters only')
  })
})

describe('validationRules.romanianCNP', () => {
  it('should validate Romanian CNP format', () => {
    const rule = validationRules.romanianCNP()
    // Valid CNP examples (format: 1YYMMDDCCSSSS)
    expect(rule.validator('1990101234567')).toBe(true) // Male born 1999-01-01
    expect(rule.validator('2990101234567')).toBe(true) // Female born 1999-01-01

    // Invalid formats
    expect(rule.validator('0990101234567')).toBe(false) // Invalid gender code
    expect(rule.validator('9990101234567')).toBe(false) // Invalid gender code
    expect(rule.validator('199010123456')).toBe(false) // Too short
    expect(rule.validator('19901012345678')).toBe(false) // Too long
    expect(rule.validator('1991301234567')).toBe(false) // Invalid month
    expect(rule.validator('1990132234567')).toBe(false) // Invalid day
    expect(rule.validator('abc0101234567')).toBe(false) // Non-numeric
  })
})

describe('useFieldValidation', () => {
  it('should initialize with correct state', () => {
    const field = useFieldValidation<string>('initial', [])

    expect(field.value).toBe('initial')
    expect(field.isValid).toBe(true)
    expect(field.isDirty).toBe(false)
    expect(field.isTouched).toBe(false)
    expect(field.error).toBeUndefined()
  })

  it('should update value and validate', () => {
    const field = useFieldValidation<string>('', [validationRules.required()])

    // Initially valid (not touched)
    expect(field.error).toBeUndefined()

    // Update with invalid value
    field.updateValue('')
    expect(field.value).toBe('')
    expect(field.isDirty).toBe(true)
    expect(field.isTouched).toBe(true)
    expect(field.isValid).toBe(false)
    expect(field.error).toBe('This field is required')

    // Update with valid value
    field.updateValue('test')
    expect(field.value).toBe('test')
    expect(field.isValid).toBe(true)
    expect(field.error).toBeUndefined()
  })

  it('should handle touch separately', () => {
    const field = useFieldValidation<string>('', [validationRules.required()])

    // Touch without updating value
    field.touch()
    expect(field.isTouched).toBe(true)
    expect(field.isDirty).toBe(false)
    expect(field.error).toBe('This field is required') // Now shows error because touched
  })

  it('should reset to initial state', () => {
    const field = useFieldValidation<string>('initial', [validationRules.required()])

    // Make changes
    field.updateValue('changed')
    expect(field.isDirty).toBe(true)
    expect(field.isTouched).toBe(true)

    // Reset
    field.reset()
    expect(field.value).toBe('initial')
    expect(field.isDirty).toBe(false)
    expect(field.isTouched).toBe(false)
    expect(field.isValid).toBe(true)
  })
})
