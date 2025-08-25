/**
 * @senka-ai/layout-engine
 *
 * Intuitive layout system for Senka's no-code platform
 */

// Main engine
export { LayoutEngine } from '@layout-engine/engine'

// Arrangements
export {
  BaseArrangement,
  StackArrangement,
  RowArrangement,
  GridArrangement,
  FlowArrangement,
  OverlayArrangement,
  FrameArrangement,
  ArrangementEngine,
} from '@layout-engine/core/arrangements'

// Types
export * from '@layout-engine/types'

// Utilities
export * from '@layout-engine/utils'

// Version
export const VERSION = '0.0.1'
