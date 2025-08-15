import type { SpacingValue, SpacingScale } from '$lib/types'

/**
 * Spacing scale values in pixels
 */
export const SPACING_SCALE: Record<SpacingScale, number> = {
  none: 0,
  tight: 4,
  cozy: 8,
  normal: 16,
  comfortable: 24,
  spacious: 32,
  custom: 0, // Will be overridden by custom value
}

/**
 * Get numeric spacing value from SpacingValue, SpacingScale, or number
 */
export function getSpacingValue(spacing: SpacingValue | SpacingScale | number): number {
  if (typeof spacing === 'number') {
    return spacing
  }
  if (typeof spacing === 'string') {
    return SPACING_SCALE[spacing]
  }
  // SpacingValue object
  if (spacing.scale === 'custom' && spacing.custom !== undefined) {
    return spacing.custom
  }
  return SPACING_SCALE[spacing.scale]
}

/**
 * Create a SpacingValue from a scale
 */
export function createSpacing(scale: SpacingScale, custom?: number): SpacingValue {
  return {
    scale,
    custom: scale === 'custom' ? custom : undefined,
  }
}

/**
 * Get responsive spacing for touch devices
 */
export function getTouchSpacing(spacing: SpacingValue): SpacingValue {
  const value = getSpacingValue(spacing)

  // Increase spacing by 1.5x for touch, with minimum of 16px
  const touchValue = Math.max(Math.round(value * 1.5), 16)

  return {
    scale: 'custom',
    custom: touchValue,
  }
}

/**
 * Validate spacing value
 */
export function isValidSpacing(spacing: SpacingValue): boolean {
  if (!spacing || !spacing.scale) return false

  if (spacing.scale === 'custom') {
    return typeof spacing.custom === 'number' && spacing.custom >= 0
  }

  return spacing.scale in SPACING_SCALE
}
