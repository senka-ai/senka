<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import ProgressBar from '@ui/components/feedback/ProgressBar.svelte'
  import { CheckIcon, InfoIcon, MinusIcon } from '@ui/icons'

  const { Story } = defineMeta({
    title: 'Feedback/ProgressBar',
    component: ProgressBar,
    args: {
      progress: 50,
      size: 'medium',
      color: 'primary',
      variant: 'default',
      showLabel: false,
      animated: true,
      disabled: false,
    },
    argTypes: {
      progress: {
        control: { type: 'range', min: 0, max: 100, step: 5 },
        description: 'Progress percentage (0-100)',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size of the progress bar',
      },
      color: {
        control: { type: 'select' },
        options: ['primary', 'success', 'warning', 'error'],
        description: 'Color variant of the progress bar',
      },
      variant: {
        control: { type: 'select' },
        options: ['default', 'stepped'],
        description: 'Progress bar variant',
      },
      showLabel: {
        control: { type: 'boolean' },
        description: 'Whether to show progress label',
      },
      animated: {
        control: { type: 'boolean' },
        description: 'Whether progress changes are animated',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
      steps: {
        control: { type: 'number', min: 2, max: 10 },
        description: 'Number of steps (for stepped variant)',
      },
      currentStep: {
        control: { type: 'number', min: 0, max: 9 },
        description: 'Current step (for stepped variant)',
      },
      max: {
        control: { type: 'number', min: 1, max: 1000 },
        description: 'Maximum value for progress calculation',
      },
      value: {
        control: { type: 'number', min: 0, max: 1000 },
        description: 'Current value for progress calculation',
      },
      label: {
        control: { type: 'text' },
        description: 'Custom label text',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Variants Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Variants</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Default Progress Bar</p>
            <ProgressBar progress={60} showLabel />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Stepped Progress Bar</p>
            <ProgressBar variant="stepped" steps={5} currentStep={2} showLabel />
          </div>
        </div>
      </div>

      <!-- Sizes Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Small</p>
            <ProgressBar size="small" progress={40} />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Medium</p>
            <ProgressBar size="medium" progress={60} />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Large</p>
            <ProgressBar size="large" progress={80} />
          </div>
        </div>
      </div>

      <!-- Colors Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Colors</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Primary</p>
            <ProgressBar color="primary" progress={50} />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Success</p>
            <ProgressBar color="success" progress={100} />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Warning</p>
            <ProgressBar color="warning" progress={75} />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Error</p>
            <ProgressBar color="error" progress={25} />
          </div>
        </div>
      </div>

      <!-- States Section -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">With Label</p>
            <ProgressBar progress={65} showLabel />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Disabled</p>
            <ProgressBar progress={45} disabled />
          </div>
          <div>
            <p class="mb-2 text-sm text-neutral-600">Custom Label</p>
            <ProgressBar progress={80} showLabel label="4 of 5 tasks completed" />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      progress={args.progress}
      size={args.size}
      color={args.color}
      variant={args.variant}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
      steps={args.steps}
      currentStep={args.currentStep}
      max={args.max}
      value={args.value}
      label={args.label}
    />
  {/snippet}
</Story>

<Story name="Default Variant" args={{ variant: 'default', progress: 60 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      progress={args.progress}
      size={args.size}
      color={args.color}
      variant={args.variant}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story
  name="Stepped Variant"
  args={{ variant: 'stepped', steps: 5, currentStep: 2 }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <ProgressBar
      variant={args.variant}
      steps={args.steps}
      currentStep={args.currentStep}
      size={args.size}
      color={args.color}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small', progress: 40 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      size={args.size}
      progress={args.progress}
      color={args.color}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium', progress: 60 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      size={args.size}
      progress={args.progress}
      color={args.color}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large', progress: 80 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      size={args.size}
      progress={args.progress}
      color={args.color}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Primary Color" args={{ color: 'primary', progress: 50 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      color={args.color}
      progress={args.progress}
      size={args.size}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Success Color" args={{ color: 'success', progress: 100 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      color={args.color}
      progress={args.progress}
      size={args.size}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Warning Color" args={{ color: 'warning', progress: 75 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      color={args.color}
      progress={args.progress}
      size={args.size}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Error Color" args={{ color: 'error', progress: 25 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      color={args.color}
      progress={args.progress}
      size={args.size}
      showLabel={args.showLabel}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="With Label" args={{ showLabel: true, progress: 65 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      showLabel={args.showLabel}
      progress={args.progress}
      size={args.size}
      color={args.color}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story
  name="Custom Label"
  args={{ showLabel: true, label: '4 of 5 tasks completed', progress: 80 }}
  parameters={{ layout: 'compact' }}
>
  {#snippet template(args)}
    <ProgressBar
      showLabel={args.showLabel}
      label={args.label}
      progress={args.progress}
      size={args.size}
      color={args.color}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, progress: 45 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      disabled={args.disabled}
      progress={args.progress}
      size={args.size}
      color={args.color}
      showLabel={args.showLabel}
      animated={args.animated}
    />
  {/snippet}
</Story>

<Story name="Value Based Progress" args={{ value: 350, max: 500, showLabel: true }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <ProgressBar
      value={args.value}
      max={args.max}
      showLabel={args.showLabel}
      size={args.size}
      color={args.color}
      animated={args.animated}
      disabled={args.disabled}
    />
  {/snippet}
</Story>

<Story name="File Upload Example" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">File Upload Progress</h3>

      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span>document.pdf</span>
          <span class="text-neutral-600">2.5 MB</span>
        </div>
        <ProgressBar progress={85} color="primary" showLabel label="85% uploaded" />
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span>image.jpg</span>
          <span class="text-neutral-600">1.2 MB</span>
        </div>
        <ProgressBar progress={100} color="success" showLabel label="Upload complete" />
      </div>

      <div class="space-y-3">
        <div class="flex items-center justify-between text-sm">
          <span>video.mp4</span>
          <span class="text-neutral-600">45.8 MB</span>
        </div>
        <ProgressBar progress={15} color="primary" showLabel />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Task Progress Example" args={{}}>
  {#snippet template()}
    <div class="max-w-md space-y-6">
      <h3 class="text-lg font-medium">Project Progress</h3>

      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm font-medium">Overall Progress</p>
          <ProgressBar variant="stepped" steps={6} currentStep={4} color="primary" showLabel size="large" />
        </div>

        <div class="space-y-3 text-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <CheckIcon class="text-success h-4 w-4" size={16} />
              <span>Research & Planning</span>
            </div>
            <span class="text-success">Complete</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <CheckIcon class="text-success h-4 w-4" size={16} />
              <span>Design Mockups</span>
            </div>
            <span class="text-success">Complete</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <CheckIcon class="text-success h-4 w-4" size={16} />
              <span>Frontend Development</span>
            </div>
            <span class="text-success">Complete</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <CheckIcon class="text-success h-4 w-4" size={16} />
              <span>Backend Development</span>
            </div>
            <span class="text-success">Complete</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <InfoIcon class="text-warning h-4 w-4" size={16} />
              <span>Testing & QA</span>
            </div>
            <span class="text-warning">In Progress</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <MinusIcon class="h-4 w-4 text-neutral-500" size={16} />
              <span>Deployment</span>
            </div>
            <span class="text-neutral-500">Pending</span>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Skill Level Example" args={{}}>
  {#snippet template()}
    <div class="max-w-sm space-y-6">
      <h3 class="text-lg font-medium">Skills</h3>

      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm">JavaScript</p>
          <ProgressBar progress={90} color="success" size="small" />
        </div>

        <div>
          <p class="mb-2 text-sm">TypeScript</p>
          <ProgressBar progress={75} color="primary" size="small" />
        </div>

        <div>
          <p class="mb-2 text-sm">Svelte</p>
          <ProgressBar progress={85} color="primary" size="small" />
        </div>

        <div>
          <p class="mb-2 text-sm">Python</p>
          <ProgressBar progress={60} color="warning" size="small" />
        </div>

        <div>
          <p class="mb-2 text-sm">Rust</p>
          <ProgressBar progress={25} color="error" size="small" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>
