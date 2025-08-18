/**
 * packages/ui/src/lib/layout-presets.ts
 * Common layout configuration presets for frequently used patterns
 * Reduces verbosity and provides consistent layouts across the Senka ecosystem
 * RELEVANT FILES: LayoutDiv.svelte, @senka-ai/layout-engine
 */

import type { LayoutContainer } from '@senka-ai/layout-engine'

/**
 * Common layout presets for typical UI patterns
 */
export const LAYOUT_PRESETS = {
  // Page-level layouts
  'page-stack': {
    id: 'page-stack',
    type: 'stack',
    direction: 'vertical',
    gap: 'spacious',
    fillContainer: true,
  },
  
  'page-content': {
    id: 'page-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  },
  
  // Header layouts
  'header-row': {
    id: 'header-row',
    type: 'row',
    gap: 'normal',
    align: 'center',
    justify: 'space-between',
    fillContainer: true,
  },
  
  'header-actions': {
    id: 'header-actions',
    type: 'row',
    gap: 'tight',
    align: 'center',
    justify: 'packed',
    fillContainer: false,
  },
  
  // Section layouts
  'section-stack': {
    id: 'section-stack',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  },
  
  'section-header': {
    id: 'section-header',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  },
  
  // Content layouts
  'content-grid': {
    id: 'content-grid',
    type: 'grid',
    columns: 'auto',
    gap: 'normal',
    align: 'stretch',
    fillContainer: true,
  },
  
  'content-list': {
    id: 'content-list',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  },
  
  // Card layouts
  'card-content': {
    id: 'card-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'normal',
    fillContainer: true,
  },
  
  'card-actions': {
    id: 'card-actions',
    type: 'row',
    gap: 'tight',
    align: 'center',
    justify: 'packed',
    fillContainer: false,
  },
  
  // Form layouts
  'form-stack': {
    id: 'form-stack',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  },
  
  'form-row': {
    id: 'form-row',
    type: 'row',
    gap: 'normal',
    align: 'center',
    wrap: true,
    fillContainer: true,
  },
  
  'form-actions': {
    id: 'form-actions',
    type: 'row',
    gap: 'normal',
    align: 'center',
    justify: 'space-between',
    fillContainer: true,
  },
  
  // Navigation layouts
  'nav-horizontal': {
    id: 'nav-horizontal',
    type: 'row',
    gap: 'normal',
    align: 'center',
    justify: 'packed',
    fillContainer: false,
  },
  
  'nav-vertical': {
    id: 'nav-vertical',
    type: 'stack',
    direction: 'vertical',
    gap: 'tight',
    fillContainer: true,
  },
  
  // Sidebar layouts
  'sidebar-content': {
    id: 'sidebar-content',
    type: 'stack',
    direction: 'vertical',
    gap: 'comfortable',
    fillContainer: true,
  },
  
  // Dashboard layouts
  'dashboard-grid': {
    id: 'dashboard-grid',
    type: 'grid',
    columns: 3,
    gap: 'comfortable',
    align: 'stretch',
    fillContainer: true,
  },
  
  'dashboard-cards': {
    id: 'dashboard-cards',
    type: 'grid',
    columns: 'auto',
    gap: 'normal',
    align: 'stretch',
    fillContainer: true,
  },
  
} as const satisfies Record<string, LayoutContainer>

/**
 * Type for preset keys
 */
export type LayoutPreset = keyof typeof LAYOUT_PRESETS

/**
 * Get a layout preset by key
 */
export function getLayoutPreset(preset: LayoutPreset): LayoutContainer {
  return LAYOUT_PRESETS[preset]
}

/**
 * Check if a string is a valid preset key
 */
export function isLayoutPreset(preset: string): preset is LayoutPreset {
  return preset in LAYOUT_PRESETS
}