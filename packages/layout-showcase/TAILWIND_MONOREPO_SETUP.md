# Tailwind CSS v4 Monorepo Setup

This guide explains how to properly configure Tailwind CSS v4 in a monorepo to automatically scan and compile ALL classes from the `@senka-ai/ui` library, including decimal classes like `py-2.5` in template literals.

## The Problem

Tailwind CSS v4's content scanner has difficulty detecting classes inside JavaScript template literals that span multiple lines. This is critical in monorepos where UI library components use complex class combinations.

## The Solution

**Key Insight**: Run the Tailwind CLI from the UI library's dist directory to enable proper template literal scanning.

## Implementation

### 1. Dependencies
Add Tailwind v4 to your package dependencies:
```json
{
  "devDependencies": {
    "@tailwindcss/cli": "4.1.12",
    "tailwindcss": "4.1.12"
  }
}
```

### 2. CSS Setup
Create a simple CSS file importing only the UI library styles:
```css
/* src/app.css */
@import '@senka-ai/ui/styles';
```

### 3. Build Script
Create `scripts/build-css.js`:
```javascript
#!/usr/bin/env node
import { spawn } from 'child_process'
import { resolve } from 'path'

const isWatch = process.argv.includes('--watch')

// Adjust paths for your package location
const INPUT_CSS = '../your-package/src/app.css'
const OUTPUT_CSS = '../your-package/src/app.generated.css'
const CONTENT_GLOB = '../**/*.{html,js,svelte,ts}'
const WORKING_DIR = '../ui/dist'

const args = [
  'tailwindcss',
  '-i', INPUT_CSS,
  '-o', OUTPUT_CSS,
  '--content', CONTENT_GLOB
]

if (isWatch) args.push('--watch')

// CRITICAL: Run from UI dist directory
const child = spawn('npx', args, {
  stdio: 'inherit',
  cwd: resolve(process.cwd(), WORKING_DIR)
})

child.on('close', (code) => {
  if (code !== 0) process.exit(code)
})
```

### 4. Package Scripts
```json
{
  "scripts": {
    "build:css": "node scripts/build-css.js",
    "dev:css": "node scripts/build-css.js --watch",
    "build": "npm run build:css && vite build"
  }
}
```

### 5. Layout Integration
Import the generated CSS in your layout:
```svelte
<!-- +layout.svelte -->
<script>
  import '../app.generated.css'
</script>
```

## Why This Works

- **Working Directory**: Running from `../ui/dist` allows Tailwind to properly resolve and scan template literals
- **Content Scanning**: The `../**/*.{html,js,svelte,ts}` glob captures all UI library files
- **Path Resolution**: Relative paths ensure the setup works across different environments

## Result

All Tailwind classes from the UI library are automatically detected and compiled, including decimal classes like `py-2.5`, `px-3.25`, etc., even when used inside complex template literals.