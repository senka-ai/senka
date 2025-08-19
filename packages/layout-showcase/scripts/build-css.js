#!/usr/bin/env node
import { spawn } from 'child_process'
import { resolve } from 'path'

/**
 * Simple Tailwind CSS v4 build script for monorepo
 * 
 * The key insight: Running from the UI dist directory allows Tailwind 
 * to properly scan template literals for decimal classes like py-2.5
 */

const isWatch = process.argv.includes('--watch')

// Define paths relative to current package
const INPUT_CSS = '../layout-showcase/src/app.css'
const OUTPUT_CSS = '../layout-showcase/src/app.generated.css'
const CONTENT_GLOB = '../**/*.{html,js,svelte,ts}'
const WORKING_DIR = '../ui/dist'

// Build command arguments
const args = [
  'tailwindcss',
  '-i', INPUT_CSS,
  '-o', OUTPUT_CSS,
  '--content', CONTENT_GLOB
]

if (isWatch) {
  args.push('--watch')
  console.log('👀 Watching for CSS changes...')
} else {
  console.log('🎨 Building Tailwind CSS...')
}

// Run from UI dist directory for proper template literal scanning
const child = spawn('npx', args, {
  stdio: 'inherit',
  cwd: resolve(process.cwd(), WORKING_DIR)
})

child.on('close', (code) => {
  if (code === 0 && !isWatch) {
    console.log('✅ Tailwind CSS compiled successfully')
  } else if (code !== 0) {
    console.error(`❌ Compilation failed with code ${code}`)
    process.exit(code)
  }
})