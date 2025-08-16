#!/usr/bin/env node

/**
 * UI Library Usage Validator
 *
 * This script validates that Svelte components in packages follow the strict UI composition rules:
 * - Only use components from @senka-ai/ui
 * - Only use layout from @senka-ai/layout-engine
 * - Only use semantic colors from the design system
 * - No custom Tailwind utility classes
 * - No emoji icons
 * - No inline SVG
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { glob } from 'glob'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configuration
const PACKAGES_TO_CHECK = [
  'layout-showcase',
  'app',
  // Add more packages as needed
]

// Allowed temporary layout classes until layout-engine is complete
const ALLOWED_TEMP_CLASSES = new Set([
  'relative',
  'absolute',
  'fixed',
  'block',
  'inline-block',
  'hidden',
  'w-full',
  'h-full',
  'min-w-0',
  'max-w-full',
  'overflow-hidden',
  'overflow-auto',
])

// Semantic colors from the design system
const SEMANTIC_COLORS = new Set([
  // Text colors
  'text-primary',
  'text-secondary',
  'text-muted',
  // Background colors
  'bg-background',
  'bg-surface',
  'bg-surface-elevated',
  'bg-surface-hover',
  // Border colors
  'border-default',
  'border-strong',
  // State colors with scales
  ...['highlight', 'success', 'warning', 'error', 'neutral'].flatMap((color) => [
    `text-${color}`,
    `bg-${color}`,
    `border-${color}`,
    ...Array.from({ length: 9 }, (_, i) => `bg-${color}-${(i + 1) * 50}`),
    ...Array.from({ length: 9 }, (_, i) => `text-${color}-${(i + 1) * 50}`),
    ...Array.from({ length: 9 }, (_, i) => `border-${color}-${(i + 1) * 50}`),
  ]),
  // Typography
  'text-h1',
  'text-h2',
  'text-h3',
  'text-h4',
  'text-h5',
  'text-body-xl',
  'text-body-l',
  'text-body-m',
  'text-body-s',
  'text-body-xs',
  'text-action-l',
  'text-action-m',
  'text-action-s',
  'text-caption-m',
])

// Forbidden Tailwind utilities (partial list - expand as needed)
const FORBIDDEN_UTILITIES = [
  /\bflex\b/,
  /\bgrid\b/,
  /\bspace-[xy]-\d+/,
  /\bgap-\d+/,
  /\bp-\d+/,
  /\bm-\d+/,
  /\bpx-\d+/,
  /\bpy-\d+/,
  /\bmx-\d+/,
  /\bmy-\d+/,
  /\btext-(gray|blue|red|green|yellow|purple|pink|indigo)-\d+/,
  /\bbg-(gray|blue|red|green|yellow|purple|pink|indigo)-\d+/,
  /\bborder-(gray|blue|red|green|yellow|purple|pink|indigo)-\d+/,
  /\brounded-(sm|md|lg|xl|2xl|3xl)/,
  /\bshadow-(sm|md|lg|xl|2xl)/,
]

// Validation results
const results = {
  totalFiles: 0,
  filesWithIssues: 0,
  issues: [],
}

function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const relativePath = path.relative(process.cwd(), filePath)
  const fileIssues = []

  // Check for custom Tailwind classes
  const classMatches = content.matchAll(/class="([^"]*)"/g)
  for (const match of classMatches) {
    const classes = match[1].split(/\s+/)
    const line = content.substring(0, match.index).split('\n').length

    for (const className of classes) {
      // Skip empty classes
      if (!className) continue

      // Check if it's a semantic color or typography class
      if (SEMANTIC_COLORS.has(className)) continue

      // Check if it's an allowed temporary class
      if (ALLOWED_TEMP_CLASSES.has(className)) continue

      // Check against forbidden patterns
      let isForbidden = false
      for (const pattern of FORBIDDEN_UTILITIES) {
        if (pattern.test(className)) {
          isForbidden = true
          fileIssues.push({
            line,
            type: 'FORBIDDEN_CLASS',
            message: `Forbidden Tailwind utility class: "${className}"`,
          })
          break
        }
      }

      // If not semantic and not explicitly allowed, it might be custom
      if (!isForbidden && !className.startsWith('svelte-')) {
        // Check if it looks like a Tailwind utility
        if (/^(text|bg|border|p|m|flex|grid|space|gap|rounded|shadow)-/.test(className)) {
          fileIssues.push({
            line,
            type: 'CUSTOM_CLASS',
            message: `Potentially custom/forbidden class: "${className}"`,
          })
        }
      }
    }
  }

  // Check for emoji icons
  const emojiPattern = /["'][\u{1F300}-\u{1F9FF}][\u{FE00}-\u{FE0F}]?["']/gu
  const emojiMatches = content.matchAll(emojiPattern)
  for (const match of emojiMatches) {
    const line = content.substring(0, match.index).split('\n').length
    fileIssues.push({
      line,
      type: 'EMOJI_ICON',
      message: `Emoji used as icon: ${match[0]}`,
    })
  }

  // Check for inline SVG
  if (/<svg\s/.test(content)) {
    const svgMatches = content.matchAll(/<svg\s/g)
    for (const match of svgMatches) {
      const line = content.substring(0, match.index).split('\n').length
      fileIssues.push({
        line,
        type: 'INLINE_SVG',
        message: 'Inline SVG detected - use icon components from @senka-ai/ui instead',
      })
    }
  }

  // Check for non-semantic colors
  const nonSemanticColors = [
    /text-(gray|blue|red|green|yellow|purple|pink|indigo|orange|teal|cyan)-\d+/g,
    /bg-(gray|blue|red|green|yellow|purple|pink|indigo|orange|teal|cyan)-\d+/g,
    /border-(gray|blue|red|green|yellow|purple|pink|indigo|orange|teal|cyan)-\d+/g,
    /text-(black|white)/g,
    /text-tertiary/g, // This doesn't exist in the semantic system
  ]

  for (const pattern of nonSemanticColors) {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      const line = content.substring(0, match.index).split('\n').length
      fileIssues.push({
        line,
        type: 'NON_SEMANTIC_COLOR',
        message: `Non-semantic color class: "${match[0]}"`,
      })
    }
  }

  // Check for missing UI library imports when using custom components
  if ((!content.includes('@senka-ai/ui') && content.includes('<Button')) || content.includes('<Card')) {
    fileIssues.push({
      line: 1,
      type: 'MISSING_IMPORT',
      message: 'UI components used but @senka-ai/ui not imported',
    })
  }

  // Record results
  if (fileIssues.length > 0) {
    results.filesWithIssues++
    results.issues.push({
      file: relativePath,
      issues: fileIssues,
    })
  }

  results.totalFiles++
}

async function validatePackage(packageName) {
  const packagePath = path.join(process.cwd(), 'packages', packageName)

  if (!fs.existsSync(packagePath)) {
    console.log(`⚠️  Package ${packageName} not found`)
    return
  }

  // Find all Svelte files
  const pattern = path.join(packagePath, '**/*.svelte')
  const files = await glob(pattern, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/.svelte-kit/**'],
  })

  console.log(`\n📦 Validating package: ${packageName}`)
  console.log(`   Found ${files.length} Svelte files`)

  for (const file of files) {
    validateFile(file)
  }
}

async function main() {
  console.log('🔍 UI Library Usage Validator')
  console.log('================================\n')

  // Validate each package
  for (const packageName of PACKAGES_TO_CHECK) {
    await validatePackage(packageName)
  }

  // Print results
  console.log('\n\n📊 Validation Results')
  console.log('======================')
  console.log(`Total files checked: ${results.totalFiles}`)
  console.log(`Files with issues: ${results.filesWithIssues}`)

  if (results.issues.length === 0) {
    console.log('\n✅ All files pass validation!')
    process.exit(0)
  } else {
    console.log('\n❌ Issues found:\n')

    for (const fileResult of results.issues) {
      console.log(`\n📄 ${fileResult.file}`)
      for (const issue of fileResult.issues) {
        const icon =
          issue.type === 'FORBIDDEN_CLASS'
            ? '🚫'
            : issue.type === 'EMOJI_ICON'
              ? '😱'
              : issue.type === 'INLINE_SVG'
                ? '🖼️'
                : issue.type === 'NON_SEMANTIC_COLOR'
                  ? '🎨'
                  : issue.type === 'CUSTOM_CLASS'
                    ? '⚠️'
                    : issue.type === 'MISSING_IMPORT'
                      ? '📦'
                      : '❓'
        console.log(`   ${icon} Line ${issue.line}: ${issue.message}`)
      }
    }

    console.log('\n\n💡 How to fix:')
    console.log('1. Replace custom Tailwind classes with layout-engine arrangements')
    console.log('2. Use only semantic colors from the design system')
    console.log('3. Import icon components instead of using emojis')
    console.log('4. Use UI library components instead of custom styled elements')
    console.log('\n📚 See AI_UI_BUILDING_INSTRUCTIONS.md for detailed guidance')

    process.exit(1)
  }
}

// Run the validator
main().catch((error) => {
  console.error('Error running validator:', error)
  process.exit(1)
})
