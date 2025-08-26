<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Text from '@ui/components/core/Text.svelte'

  const { Story } = defineMeta({
    title: 'Core/Text',
    component: Text,
    args: {
      variant: 'md',
      as: 'div',
      color: 'primary',
      disabled: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'xl', 'lg', 'md', 'sm', 'xs', 'button', 'label', 'caption'],
        description: 'Typography variant from design system',
      },
      text: {
        control: { type: 'text' },
        description: 'Text content to display',
      },
      as: {
        control: { type: 'select' },
        options: ['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        description:
          'HTML element to render - overrides automatic semantic mapping (h1-h5 variants automatically use heading elements)',
      },
      color: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'muted', 'highlight', 'success', 'warning', 'error'],
        description: 'Text color semantic variant',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state with muted appearance',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Heading Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Heading Typography</h3>
        <div class="space-y-3">
          <Text variant="h1">H1 - Extra bold / 24</Text>
          <Text variant="h2">H2 - Extra bold / 18</Text>
          <Text variant="h3">H3 - Extra bold / 16</Text>
          <Text variant="h4">H4 - Bold / 14</Text>
          <Text variant="h5">H5 - Bold / 12</Text>
        </div>
      </div>

      <!-- Body Typography -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Body Typography</h3>
        <div class="space-y-3">
          <Text variant="xl">XL - Regular / 18</Text>
          <Text variant="lg">Large - Regular / 16</Text>
          <Text variant="md">Medium - Regular / 14</Text>
          <Text variant="sm">Small - Regular / 12</Text>
          <Text variant="xs">Extra Small - Medium / 10</Text>
        </div>
      </div>

      <!-- Semantic Typography -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Semantic Typography</h3>
        <div class="space-y-3">
          <Text variant="button">Button - Semi Bold / 14</Text>
          <Text variant="label">Label - Semi Bold / 12</Text>
          <Text variant="caption">Caption - Semi Bold / 10</Text>
        </div>
      </div>

      <!-- Color Variants -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Color Variants</h3>
        <div class="space-y-3">
          <Text variant="md" color="primary">Primary text color</Text>
          <Text variant="md" color="secondary">Secondary text color</Text>
          <Text variant="md" color="muted">Muted text color</Text>
          <Text variant="md" color="highlight">Highlight text color</Text>
          <Text variant="md" color="success">Success text color</Text>
          <Text variant="md" color="warning">Warning text color</Text>
          <Text variant="md" color="error">Error text color</Text>
        </div>
      </div>

      <!-- Disabled State -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-3">
          <Text variant="md">Normal text</Text>
          <Text variant="md" disabled>Disabled text</Text>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Lorem ipsum dolor sit amet</Text>
  {/snippet}
</Story>

<Story name="Heading H1" args={{ variant: 'h1' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Main Heading</Text>
  {/snippet}
</Story>

<Story name="Heading H2" args={{ variant: 'h2' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Section Heading</Text>
  {/snippet}
</Story>

<Story name="Extra Large" args={{ variant: 'xl' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Large body text for important content</Text>
  {/snippet}
</Story>

<Story name="Large" args={{ variant: 'lg' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Large body text</Text>
  {/snippet}
</Story>

<Story name="Medium" args={{ variant: 'md' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Default body text for most content</Text>
  {/snippet}
</Story>

<Story name="Small" args={{ variant: 'sm' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Small body text</Text>
  {/snippet}
</Story>

<Story name="Extra Small" args={{ variant: 'xs' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Extra small body text</Text>
  {/snippet}
</Story>

<Story name="Button Text" args={{ variant: 'button' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Button Label</Text>
  {/snippet}
</Story>

<Story name="Label Text" args={{ variant: 'label' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Form Label</Text>
  {/snippet}
</Story>

<Story name="Caption Text" args={{ variant: 'caption' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Caption or helper text</Text>
  {/snippet}
</Story>

<Story name="Primary Color" args={{ color: 'primary' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Primary text color</Text>
  {/snippet}
</Story>

<Story name="Highlight Color" args={{ color: 'highlight' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Highlighted text</Text>
  {/snippet}
</Story>

<Story name="Error Color" args={{ color: 'error' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Error message</Text>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text {...args}>Disabled text</Text>
  {/snippet}
</Story>

<Story name="With Children" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Text variant="lg" color="primary">
      This text uses <Text variant="label" color="highlight" as="span">children pattern</Text> for inline styling.
    </Text>
  {/snippet}
</Story>

<Story name="Text Prop (Convenience)" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-4">
      <h3 class="mb-4 text-lg font-semibold">Using text prop for dynamic content</h3>
      <div class="space-y-3">
        <Text variant="md" text="This uses the text prop - good for dynamic content" />
        <Text variant="md" text="Especially useful in loops or when content comes from variables" />
        <Text variant="caption" text="But children pattern is preferred for most cases" />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Semantic HTML" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-4">
      <h3 class="mb-4 text-lg font-semibold">Automatic Semantic HTML Mapping</h3>
      <div class="space-y-3">
        <Text variant="h1">Automatically renders as H1 element</Text>
        <Text variant="h2">Automatically renders as H2 element</Text>
        <Text variant="h3">Automatically renders as H3 element</Text>
        <Text variant="lg">Body variants render as div by default</Text>
        <Text variant="md" as="p">Override with as="p" when needed</Text>
        <Text variant="caption" as="span">Override with as="span" for inline text</Text>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Typography Scale" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-6">
      <h3 class="mb-4 text-lg font-semibold">Complete Typography Scale</h3>

      <div class="space-y-4">
        <div>
          <Text variant="h5" color="secondary">Heading Scale</Text>
          <div class="mt-2 space-y-2">
            <Text variant="h1">The quick brown fox jumps</Text>
            <Text variant="h2">The quick brown fox jumps over</Text>
            <Text variant="h3">The quick brown fox jumps over the lazy dog</Text>
            <Text variant="h4">The quick brown fox jumps over the lazy dog and runs</Text>
            <Text variant="h5">The quick brown fox jumps over the lazy dog and runs away quickly</Text>
          </div>
        </div>

        <div>
          <Text variant="h5" color="secondary">Body Scale</Text>
          <div class="mt-2 space-y-2">
            <Text variant="xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
            <Text variant="lg">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <Text variant="md">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</Text>
            <Text variant="sm">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</Text>
            <Text variant="xs">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia.</Text>
          </div>
        </div>

        <div>
          <Text variant="h5" color="secondary">Semantic Scale</Text>
          <div class="mt-2 space-y-2">
            <Text variant="button">Button Text</Text>
            <Text variant="label">Label Text</Text>
            <Text variant="caption">Caption Text</Text>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>
