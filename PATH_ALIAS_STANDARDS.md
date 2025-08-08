# Path Alias Standards

## Overview

All Senka packages must use semantic path aliases to ensure consistent, maintainable import patterns across the monorepo.

## Standard Alias Patterns

### Aliases Examples

**tsconfig.json**

```json
{
  "compilerOptions": {
    "paths": {
      "@components/*": ["./src/lib/components/*"],
      "@icons": ["./src/lib/icons"],
      "@utils/*": ["./src/lib/utils/*"],
      "@type/*": ["./src/lib/types/*"],
      "@styles/*": ["./src/styles/*"]
    }
  }
}
```

### Import Examples

```typescript
// ✅ Correct - Use semantic aliases
import Button from '@components/core/Button.svelte'
import { SpinnerIcon } from '@icons'
import { createStyles } from '@utils/styles'
import type { BaseProps } from '@type/component'

// ❌ Wrong - No relative paths
import Button from '../lib/components/core/Button.svelte'
import { SpinnerIcon } from '../../icons'
import { createStyles } from '../../utils/styles'
```

## Configuration

### Minimal Setup

**svelte.config.js** - Required for published packages

```javascript
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = {
  kit: {
    alias: {
      '@components': resolve(__dirname, 'src/lib/components'),
      '@icons': resolve(__dirname, 'src/lib/icons'),
      '@utils': resolve(__dirname, 'src/lib/utils'),
      '@type': resolve(__dirname, 'src/lib/type'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
}
```

## Rules

1. **Zero relative imports** - Use semantic aliases everywhere
2. **Consistent naming** - `@type` (singular), not `@types`
3. **Minimal config** - Only define aliases where actually needed
4. **Same-directory imports** - Use aliases even for `./Component.svelte`

## Benefits

- 🎯 **Semantic**: Imports are self-documenting
- 🔧 **Maintainable**: Moving files doesn't break imports
- 📖 **Consistent**: Same patterns across all packages
- ⚡ **Clean**: No more `../../../` navigation
