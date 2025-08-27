// packages/ui/src/lib/utils/shared-styles/input-styles.ts
// Shared style composers for input component family (TextField, TextArea, NumberInput, Dropdown)
// Centralizes styling patterns for form input components following the new architecture
// RELEVANT FILES: ../../components/forms/TextField.svelte, ../../components/forms/TextArea.svelte, ../styles.ts, ../../type/component.ts

import { createStyleComposer } from '../utils/styles'
import type { SizeMap, VariantMap } from '../utils/styles'

/**
 * Standard input field style composer for the Input component family
 * Provides consistent styling across TextField, TextArea, NumberInput, and Dropdown components
 * Updated to use semantic colors only as per the new architecture requirements
 */
export const createInputStyles = createStyleComposer({
  base: 'w-full px-3.25 py-3.25 text-body-m text-neutral-900 bg-neutral-50 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-offset-0',
  variants: {
    default: 'border-neutral-400 text-primary placeholder:text-neutral-500',
    focused: 'border-highlight ring-1 ring-highlight-400 placeholder:text-neutral-500',
    error: 'border-error text-primary focus:border-error focus:ring-1 ring-error-400 placeholder:text-neutral-500',
    disabled: 'border-neutral-300 bg-neutral-100 text-muted cursor-not-allowed placeholder:text-muted',
    success:
      'border-success text-primary focus:border-success focus:ring-1 ring-success-50 placeholder:text-neutral-500',
  } satisfies VariantMap<'default' | 'focused' | 'error' | 'disabled' | 'success'>,
  sizes: {
    small: 'px-2.5 py-2 text-body-s rounded-lg',
    medium: 'px-3.25 py-3.25 text-body-m rounded-xl',
    large: 'px-4 py-4 text-body-l rounded-2xl',
  } satisfies SizeMap<'small' | 'medium' | 'large'>,
})

