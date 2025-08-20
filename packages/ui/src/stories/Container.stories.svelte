<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Container from '@components/layout/Container.svelte'
  import Button from '@components/core/Button.svelte'
  import TextField from '@components/forms/TextField.svelte'
  import Badge from '@components/feedback/Badge.svelte'
  import Tag from '@components/content/Tag.svelte'

  const { Story } = defineMeta({
    title: 'Layout/Container',
    component: Container,
    args: {
      variant: 'default',
      padding: 'normal',
      radius: 'normal',
      background: true,
      color: 'neutral',
      fullWidth: false,
      disabled: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['default', 'elevated', 'bordered'],
        description: 'Container visual variant',
      },
      padding: {
        control: { type: 'select' },
        options: ['none', 'tight', 'normal', 'comfortable', 'spacious'],
        description: 'Internal padding amount',
      },
      radius: {
        control: { type: 'select' },
        options: ['none', 'small', 'normal', 'large'],
        description: 'Border radius size',
      },
      color: {
        control: { type: 'select' },
        options: ['neutral', 'highlight', 'success', 'warning', 'error'],
        description: 'Semantic color for backgrounds and borders',
      },
      background: {
        control: { type: 'boolean' },
        description: 'Apply background color (only affects neutral default variant, enabled by default)',
      },
      fullWidth: {
        control: { type: 'boolean' },
        description: 'Take full width of parent',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
    },
  })
</script>

<Story name="Overview" args={{}} parameters={{ layout: 'wide' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p class="text-secondary mb-2 text-sm">Default</p>
            <Container variant="default" padding="normal" radius="normal">
              <div class="space-y-3">
                <h4 class="text-h5 text-primary">Default Container</h4>
                <p class="text-body-m text-secondary">Simple container with subtle background</p>
                <Button variant="primary" size="small">Action</Button>
              </div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Elevated</p>
            <Container variant="elevated" padding="normal" radius="normal">
              <div class="space-y-3">
                <h4 class="text-h5 text-primary">Elevated Container</h4>
                <p class="text-body-m text-secondary">Container with background and shadow</p>
                <Button variant="secondary" size="small">Action</Button>
              </div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Bordered</p>
            <Container variant="bordered" padding="normal" radius="normal">
              <div class="space-y-3">
                <h4 class="text-h5 text-primary">Bordered Container</h4>
                <p class="text-body-m text-secondary">Container with visible border</p>
                <Button variant="tertiary" size="small">Action</Button>
              </div>
            </Container>
          </div>
        </div>
      </div>

      <!-- Semantic Colors Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Semantic Colors</h3>
        <div class="space-y-6">
          <div>
            <p class="text-secondary mb-4 text-sm">Default Variant with Colors</p>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Container variant="default" color="neutral" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="default" value="Neutral" />
                  <p class="text-body-s text-secondary mt-2">Default neutral</p>
                </div>
              </Container>

              <Container variant="default" color="highlight" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="default" value="Highlight" />
                  <p class="text-body-s text-secondary mt-2">Primary accent</p>
                </div>
              </Container>

              <Container variant="default" color="success" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="success" value="Success" />
                  <p class="text-body-s text-secondary mt-2">Success states</p>
                </div>
              </Container>

              <Container variant="default" color="warning" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="warning" value="Warning" />
                  <p class="text-body-s text-secondary mt-2">Warning states</p>
                </div>
              </Container>

              <Container variant="default" color="error" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="error" value="Error" />
                  <p class="text-body-s text-secondary mt-2">Error states</p>
                </div>
              </Container>
            </div>
          </div>

          <div>
            <p class="text-secondary mb-4 text-sm">Bordered Variant with Colors</p>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Container variant="bordered" color="neutral" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="default" value="Neutral" />
                  <p class="text-body-s text-secondary mt-2">Standard border</p>
                </div>
              </Container>

              <Container variant="bordered" color="highlight" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="default" value="Highlight" />
                  <p class="text-body-s text-secondary mt-2">Primary border</p>
                </div>
              </Container>

              <Container variant="bordered" color="success" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="success" value="Success" />
                  <p class="text-body-s text-secondary mt-2">Success border</p>
                </div>
              </Container>

              <Container variant="bordered" color="warning" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="warning" value="Warning" />
                  <p class="text-body-s text-secondary mt-2">Warning border</p>
                </div>
              </Container>

              <Container variant="bordered" color="error" padding="normal" radius="small">
                <div class="text-center">
                  <Badge variant="error" value="Error" />
                  <p class="text-body-s text-secondary mt-2">Error border</p>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </div>

      <!-- Padding Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Padding Options</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div>
              <p class="text-secondary mb-2 text-sm">None</p>
              <Container variant="bordered" padding="none" radius="small">
                <div class="text-body-s text-primary">No padding</div>
              </Container>
            </div>

            <div>
              <p class="text-secondary mb-2 text-sm">Tight</p>
              <Container variant="bordered" padding="tight" radius="small">
                <div class="text-body-s text-primary">Tight padding</div>
              </Container>
            </div>

            <div>
              <p class="text-secondary mb-2 text-sm">Normal</p>
              <Container variant="bordered" padding="normal" radius="small">
                <div class="text-body-s text-primary">Normal padding</div>
              </Container>
            </div>

            <div>
              <p class="text-secondary mb-2 text-sm">Comfortable</p>
              <Container variant="bordered" padding="comfortable" radius="small">
                <div class="text-body-s text-primary">Comfortable padding</div>
              </Container>
            </div>

            <div>
              <p class="text-secondary mb-2 text-sm">Spacious</p>
              <Container variant="bordered" padding="spacious" radius="small">
                <div class="text-body-s text-primary">Spacious padding</div>
              </Container>
            </div>
          </div>
        </div>
      </div>

      <!-- Border Radius Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Border Radius</h3>
        <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p class="text-secondary mb-2 text-sm">None</p>
            <Container variant="bordered" padding="normal" radius="none">
              <div class="text-body-s text-primary">No radius</div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Small</p>
            <Container variant="bordered" padding="normal" radius="small">
              <div class="text-body-s text-primary">Small radius</div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Normal</p>
            <Container variant="bordered" padding="normal" radius="normal">
              <div class="text-body-s text-primary">Normal radius</div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Large</p>
            <Container variant="bordered" padding="normal" radius="large">
              <div class="text-body-s text-primary">Large radius</div>
            </Container>
          </div>
        </div>
      </div>

      <!-- Background Option -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Background Options</h3>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <p class="text-secondary mb-2 text-sm">Default with background (default)</p>
            <Container variant="default" padding="normal" radius="normal" background={true}>
              <div class="space-y-2">
                <p class="text-body-m text-primary">Subtle background applied by default</p>
                <Badge variant="success" value="With Background" />
              </div>
            </Container>
          </div>

          <div>
            <p class="text-secondary mb-2 text-sm">Default without background</p>
            <Container variant="default" padding="normal" radius="normal" background={false}>
              <div class="space-y-2">
                <p class="text-body-m text-primary">Background disabled</p>
                <Badge variant="default" value="Transparent" />
              </div>
            </Container>
          </div>
        </div>
      </div>

      <!-- Real-world Examples -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Usage Examples</h3>
        <div class="space-y-6">
          <div>
            <p class="text-secondary mb-2 text-sm">Form Container</p>
            <Container variant="elevated" padding="comfortable" radius="normal" fullWidth>
              <div class="space-y-4">
                <h4 class="text-h5 text-primary">Contact Information</h4>
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextField label="First Name" placeholder="Enter your first name" />
                  <TextField label="Last Name" placeholder="Enter your last name" />
                </div>
                <TextField label="Email" placeholder="your.email@example.com" fullWidth />
                <div class="flex gap-2">
                  <Button variant="primary">Save</Button>
                  <Button variant="secondary">Cancel</Button>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Container Content</h4>
        <p class="text-body-m text-secondary">This is content inside the container</p>
        <Button variant="primary" size="small">Action Button</Button>
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Elevated" args={{ variant: 'elevated' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Elevated Container</h4>
        <p class="text-body-m text-secondary">Container with background and subtle shadow</p>
        <Badge variant="success" value="Elevated" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Bordered" args={{ variant: 'bordered' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Bordered Container</h4>
        <p class="text-body-m text-secondary">Container with visible border outline</p>
        <Badge variant="default" value="Bordered" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Success Color" args={{ color: 'success', variant: 'bordered' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Success Container</h4>
        <p class="text-body-m text-secondary">Container with success color styling</p>
        <Badge variant="success" value="Success" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Warning Color" args={{ color: 'warning', variant: 'bordered' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Warning Container</h4>
        <p class="text-body-m text-secondary">Container with warning color styling</p>
        <Badge variant="warning" value="Warning" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Error Color" args={{ color: 'error', variant: 'bordered' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Error Container</h4>
        <p class="text-body-m text-secondary">Container with error color styling</p>
        <Badge variant="error" value="Error" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Highlight Color" args={{ color: 'highlight', variant: 'elevated' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Highlight Container</h4>
        <p class="text-body-m text-secondary">Container with highlight color styling</p>
        <Badge variant="default" value="Highlight" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Spacious Padding" args={{ padding: 'spacious', variant: 'bordered' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Spacious Container</h4>
        <p class="text-body-m text-secondary">Container with generous internal spacing</p>
        <Tag variant="primary" text="Spacious" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Large Radius" args={{ radius: 'large', variant: 'elevated' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Large Radius</h4>
        <p class="text-body-m text-secondary">Container with large border radius</p>
        <Tag variant="tertiary" text="Rounded" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Full Width" args={{ fullWidth: true, variant: 'bordered' }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Full Width Container</h4>
        <p class="text-body-m text-secondary">Container takes full width of its parent</p>
        <Badge variant="error" value="Full Width" />
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, variant: 'elevated' }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Container {...args}>
      <div class="space-y-3">
        <h4 class="text-h5 text-primary">Disabled Container</h4>
        <p class="text-body-m text-secondary">Container in disabled state</p>
        <Button disabled variant="primary" size="small">Disabled Action</Button>
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Form Example" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <Container variant="elevated" padding="comfortable" radius="normal" fullWidth>
      <div class="max-w-md space-y-4">
        <h3 class="text-h4 text-primary">User Profile</h3>
        <TextField label="Display Name" placeholder="Enter your display name" fullWidth />
        <TextField label="Email" type="email" placeholder="your.email@example.com" fullWidth />
        <div class="flex gap-3">
          <Button variant="primary">Save Changes</Button>
          <Button variant="secondary">Cancel</Button>
        </div>
      </div>
    </Container>
  {/snippet}
</Story>

<Story name="Content Section" args={{}} parameters={{ layout: 'default' }}>
  {#snippet template()}
    <Container variant="bordered" padding="normal" radius="normal">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-h4 text-primary">Dashboard Widget</h3>
          <div class="flex gap-2">
            <Tag variant="primary" text="Active" />
            <Tag variant="secondary" text="Live" />
          </div>
        </div>
        <p class="text-body-m text-secondary">
          Container components provide a clean way to group related content and controls. Unlike Card components,
          containers are simple and flexible without built-in features like titles, images, or actions.
        </p>
        <div class="flex items-center gap-3">
          <Badge variant="success" value="Online" />
          <Badge variant="default" value="3 users" />
          <Badge variant="warning" value="2 pending" />
        </div>
      </div>
    </Container>
  {/snippet}
</Story>
