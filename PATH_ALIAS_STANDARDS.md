# Path Alias Standards

## Overview

All Senka packages must use semantic path aliases to ensure consistent, maintainable import patterns across the monorepo.

## Standard Alias Patterns

### Aliases Examples for `ui` package

**tsconfig.json**

```json
{
  "compilerOptions": {
    "paths": {
      "@ui/*": ["./src/lib/*"]
    }
  }
}
```

### Import Examples for `ui` package

```typescript
// ✅ Correct - Use semantic aliases
import Button from '@ui/components/core/Button.svelte'
import { SpinnerIcon } from '@ui/icons'
import { createStyles } from '@ui/utils/styles'
import type { BaseProps } from '@ui/type/component'

// ❌ Wrong - No relative paths
import Button from '../lib/components/core/Button.svelte'
import { SpinnerIcon } from '../../icons'
import { createStyles } from '../../utils/styles'
```

## Configuration for `ui` package

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
      '@ui': resolve(__dirname, 'src/lib'),
    },
  },
}
```

## Rules

1. **Zero relative imports** - Use semantic aliases everywhere
2. **Minimal config** - Only define aliases where actually needed
3. **Same-directory imports** - Use aliases even for `./Component.svelte`

## Benefits

- 🎯 **Semantic**: Imports are self-documenting
- 🔧 **Maintainable**: Moving files doesn't break imports
- 📖 **Consistent**: Same patterns across all packages
- ⚡ **Clean**: No more `../../../` navigation
