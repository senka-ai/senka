import type {
  LayoutContainer,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  SpacingValue,
} from '$lib/types'

/**
 * Validate a complete layout container
 */
export function validateLayout(container: LayoutContainer): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // Validate ID
  if (!container.id) {
    errors.push({
      type: 'missing-id',
      message: 'Layout container must have an ID',
    })
  }

  // Validate arrangement type
  if (!container.type) {
    errors.push({
      type: 'missing-type',
      message: 'Layout container must have a type',
    })
  } else {
    const arrangementValidation = validateArrangement(container)
    errors.push(...arrangementValidation.errors)
    warnings.push(...arrangementValidation.warnings)
  }

  // Validate constraints
  if (container.constraints) {
    const constraintValidation = validateConstraints(container)
    errors.push(...constraintValidation.errors)
    warnings.push(...constraintValidation.warnings)
  }

  // Validate responsive configuration
  if (container.responsive) {
    const responsiveValidation = validateResponsive(container)
    errors.push(...responsiveValidation.errors)
    warnings.push(...responsiveValidation.warnings)
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Validate arrangement configuration
 */
function validateArrangement(container: LayoutContainer): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []

  // Check valid arrangement type
  const validTypes = ['flow', 'stack', 'row', 'grid', 'overlay', 'frame']
  if (!validTypes.includes(container.type)) {
    errors.push({
      type: 'invalid-arrangement',
      message: `Invalid arrangement type: ${container.type}`,
      path: 'type',
    })
  }

  // Type-specific validation
  switch (container.type) {
    case 'stack':
      if (container.direction && !['horizontal', 'vertical'].includes(container.direction)) {
        errors.push({
          type: 'invalid-direction',
          message: `Invalid direction for stack: ${container.direction}`,
          path: 'direction',
        })
      }
      break

    case 'grid':
      if (container.direction || container.wrap || container.reverse) {
        warnings.push({
          type: 'unused-property',
          message: 'Grid arrangement does not use direction, wrap, or reverse properties',
          path: 'type',
        })
      }
      break
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate constraints
 */
function validateConstraints(container: LayoutContainer): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  const constraints = container.constraints!

  // Check min/max size conflicts
  if (constraints.minSize && constraints.maxSize) {
    if (
      constraints.minSize.width &&
      constraints.maxSize.width &&
      constraints.minSize.width > constraints.maxSize.width
    ) {
      errors.push({
        type: 'constraint-conflict',
        message: 'Minimum width cannot be greater than maximum width',
        path: 'constraints.minSize.width',
      })
    }

    if (
      constraints.minSize.height &&
      constraints.maxSize.height &&
      constraints.minSize.height > constraints.maxSize.height
    ) {
      errors.push({
        type: 'constraint-conflict',
        message: 'Minimum height cannot be greater than maximum height',
        path: 'constraints.minSize.height',
      })
    }
  }

  // Check aspect ratio
  if (constraints.aspectRatio && constraints.aspectRatio !== 'preserve') {
    if (constraints.aspectRatio <= 0) {
      errors.push({
        type: 'invalid-aspect-ratio',
        message: 'Aspect ratio must be positive',
        path: 'constraints.aspectRatio',
      })
    }
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate responsive configuration
 */
function validateResponsive(container: LayoutContainer): ValidationResult {
  const errors: ValidationError[] = []
  const warnings: ValidationWarning[] = []
  const responsive = container.responsive!

  // Validate automatic responsive settings
  if (responsive.automatic) {
    const { mobileOptimization, breakpoints } = responsive.automatic

    if (!['aggressive', 'balanced', 'minimal'].includes(mobileOptimization)) {
      errors.push({
        type: 'invalid-optimization',
        message: `Invalid mobile optimization level: ${mobileOptimization}`,
        path: 'responsive.automatic.mobileOptimization',
      })
    }

    if (breakpoints !== 'auto' && Array.isArray(breakpoints)) {
      breakpoints.forEach((bp, index) => {
        if (typeof bp !== 'number' || bp <= 0) {
          errors.push({
            type: 'invalid-breakpoint',
            message: `Invalid breakpoint value at index ${index}`,
            path: `responsive.automatic.breakpoints[${index}]`,
          })
        }
      })
    }
  }

  // Check for conflicting responsive rules
  if (responsive.automatic?.enabled && responsive.breakpointRules) {
    warnings.push({
      type: 'responsive-conflict',
      message: 'Both automatic and manual responsive rules are defined. Manual rules will override automatic behavior.',
      path: 'responsive',
    })
  }

  return { valid: errors.length === 0, errors, warnings }
}

/**
 * Validate spacing value
 */
export function validateSpacing(spacing: SpacingValue): boolean {
  const validScales = ['none', 'tight', 'cozy', 'normal', 'comfortable', 'spacious', 'custom']

  if (!spacing || !spacing.scale) return false
  if (!validScales.includes(spacing.scale)) return false

  if (spacing.scale === 'custom') {
    return typeof spacing.custom === 'number' && spacing.custom >= 0
  }

  return true
}
