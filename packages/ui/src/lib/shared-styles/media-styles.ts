// packages/ui/src/lib/shared-styles/media-styles.ts
// Shared style composers for media component family (Image, Video)
// Centralizes styling patterns for media containers used by both Image and Video components
// RELEVANT FILES: ../../components/media/Image.svelte, ../../components/media/Video.svelte

import { composeClasses } from '../utils/styles'

/**
 * Media container style composer for Image and Video components
 * Provides consistent styling for media containers with aspect ratios and rounded corners
 * Used by both Image and Video components for consistent media presentation
 */
export function createMediaContainerStyles(options: {
  aspectRatio: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  className?: string
}): string {
  const { aspectRatio, rounded, className = '' } = options

  const base = 'relative overflow-hidden bg-highlight-50'

  const aspectRatios = {
    square: 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '3:2': 'aspect-[3/2]',
    auto: '',
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  }

  return composeClasses(base, aspectRatios[aspectRatio], roundedClasses[rounded], className)
}