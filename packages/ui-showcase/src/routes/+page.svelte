<script lang="ts">
  // Import Button component from UI library
  import { Button } from '@senka-ai/ui'
  // Import some icons for examples
  import { AddIcon, HeartFilledIcon, ArrowRightIcon } from '@senka-ai/ui/icons'

  let clickCount = 0

  function handleButtonClick() {
    clickCount++
    console.log('Button clicked!', clickCount)
  }

  function handleAddClick() {
    console.log('Add button clicked!')
  }

  function handleFavoriteClick() {
    console.log('Favorite button clicked!')
  }
</script>

<div class="showcase-section">
  <h2 class="showcase-title">Button Component</h2>
  <p class="showcase-description">
    The Button component supports three variants (primary, secondary, tertiary), multiple sizes, and flexible icon
    placement.
  </p>

  <div class="space-y-8">
    <!-- Basic Variants -->
    <div class="example-card">
      <h3 class="example-title">Basic Variants</h3>
      <div class="component-examples">
        <Button variant="primary" onclick={handleButtonClick}>
          {#snippet children()}
            Primary Button
          {/snippet}
        </Button>

        <Button variant="secondary" onclick={handleButtonClick}>
          {#snippet children()}
            Secondary Button
          {/snippet}
        </Button>

        <Button variant="tertiary" onclick={handleButtonClick}>
          {#snippet children()}
            Tertiary Button
          {/snippet}
        </Button>
      </div>
      <p class="text-sm" style="color: var(--color-text-secondary)">Click count: {clickCount}</p>
    </div>

    <!-- Different Sizes -->
    <div class="example-card">
      <h3 class="example-title">Button Sizes</h3>
      <div class="component-examples items-center">
        <Button variant="primary" size="small" onclick={handleButtonClick}>
          {#snippet children()}
            Small
          {/snippet}
        </Button>

        <Button variant="primary" size="medium" onclick={handleButtonClick}>
          {#snippet children()}
            Medium
          {/snippet}
        </Button>

        <Button variant="primary" size="large" onclick={handleButtonClick}>
          {#snippet children()}
            Large
          {/snippet}
        </Button>
      </div>
    </div>

    <!-- Buttons with Icons -->
    <div class="example-card">
      <h3 class="example-title">Buttons with Icons</h3>
      <div class="component-examples">
        <Button variant="secondary" onclick={handleAddClick}>
          {#snippet leftIcon(size)}
            <AddIcon {size} />
          {/snippet}
          {#snippet children()}
            Add Item
          {/snippet}
        </Button>

        <Button variant="tertiary" onclick={handleFavoriteClick}>
          {#snippet children()}
            Favorite
          {/snippet}
          {#snippet rightIcon(size)}
            <HeartFilledIcon {size} />
          {/snippet}
        </Button>

        <Button variant="primary" onclick={handleButtonClick}>
          {#snippet leftIcon(size)}
            <ArrowRightIcon {size} />
          {/snippet}
          {#snippet children()}
            Continue
          {/snippet}
          {#snippet rightIcon(size)}
            <ArrowRightIcon {size} />
          {/snippet}
        </Button>
      </div>
    </div>

    <!-- Disabled States -->
    <div class="example-card">
      <h3 class="example-title">Disabled States</h3>
      <div class="component-examples">
        <Button variant="primary" disabled={true}>
          {#snippet children()}
            Disabled Primary
          {/snippet}
        </Button>

        <Button variant="secondary" disabled={true}>
          {#snippet children()}
            Disabled Secondary
          {/snippet}
        </Button>

        <Button variant="tertiary" disabled={true}>
          {#snippet children()}
            Disabled Tertiary
          {/snippet}
        </Button>
      </div>
    </div>

    <!-- Full Width -->
    <div class="example-card">
      <h3 class="example-title">Full Width Button</h3>
      <Button variant="primary" fullWidth={true} onclick={handleButtonClick}>
        {#snippet children()}
          Full Width Button
        {/snippet}
      </Button>
    </div>

    <!-- Loading State -->
    <div class="example-card">
      <h3 class="example-title">Loading State</h3>
      <div class="component-examples">
        <Button variant="primary" loading={true}>
          {#snippet children()}
            Loading...
          {/snippet}
        </Button>
      </div>
    </div>
  </div>
</div>

<!-- Code Examples -->
<div class="showcase-section">
  <h2 class="showcase-title">Usage in Monorepo</h2>

  <div class="example-card">
    <h3 class="example-title">Import from Local Package</h3>
    <div class="code-block">
      {`// In ui-showcase, we import directly from the monorepo
import { Button } from '@senka-ai/ui'
import { AddIcon } from '@senka-ai/ui/icons'

// This resolves to packages/ui/src/lib via Vite aliases`}
    </div>
  </div>

  <div class="example-card">
    <h3 class="example-title">External Usage</h3>
    <div class="code-block">
      {`// For external projects, install from npm:
npm install @senka-ai/ui

// Then import normally:
import { Button } from '@senka-ai/ui'
import { AddIcon } from '@senka-ai/ui/icons'`}
    </div>
  </div>

  <div class="example-card">
    <h3 class="example-title">CSS Integration</h3>
    <div class="code-block">
      {`// app.css - Import UI library styles
@import '@senka-ai/ui/styles';

// This single import includes:
// - Google Fonts (Inter)
// - Tailwind CSS
// - All color definitions
// - Typography system
// - Spacing, hover, focus states
// - Light and dark theme support`}
    </div>
  </div>
</div>
