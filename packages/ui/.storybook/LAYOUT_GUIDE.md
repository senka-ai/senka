# Story Layout Guide

## Overview

Stories automatically get consistent container styling with appropriate sizing. You can control the container size using the `layout` parameter.

## Container Sizes

- **`default`** (672px): Most component stories - automatically applied if no parameter is specified
- **`compact`** (448px): Individual components, small forms, simple examples
- **`wide`** (896px): Overview grids, icon galleries, complex layouts
- **`full`**: No max-width constraint for full-width components

## Usage

Add the `layout` parameter to your story:

```svelte
<Story name="Icon Grid" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template(args)}
    <div class="grid grid-cols-8 gap-4">
      <!-- Many icons -->
    </div>
  {/snippet}
</Story>

<Story name="Single Icon" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <div class="flex items-center gap-4">
      <Icon {...args} />
      <span>Icon name</span>
    </div>
  {/snippet}
</Story>

<Story name="Full Width Component" args={{}} parameters={{ layout: 'full' }}>
  {#snippet template(args)}
    <NavBar {...args} />
  {/snippet}
</Story>
```

## Automatic Sizing (Fallback)

If you don't specify a `layout` parameter, the system will automatically apply sizing based on story names:

- Stories with "Icon", "Default", "Basic" in the name get compact sizing
- Stories named "Overview" in Icon stories get wide sizing  
- Stories with "Full Width" in the name get full sizing
- All others get default sizing

## Best Practices

1. **Use parameters for explicit control** - more reliable than relying on name patterns
2. **Choose appropriate sizes** - compact for single components, wide for overviews
3. **Test responsiveness** - ensure your content works within the container constraints