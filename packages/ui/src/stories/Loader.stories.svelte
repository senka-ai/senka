<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Loader from '@components/feedback/Loader.svelte'
  import Button from '@components/core/Button.svelte'

  // State for interactive examples
  let progressValue = $state(0)
  let isLoading = $state(false)

  // Simulate progress loading
  const simulateProgress = () => {
    progressValue = 0
    isLoading = true
    const interval = setInterval(() => {
      progressValue += 10
      if (progressValue >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          isLoading = false
          progressValue = 0
        }, 1000)
      }
    }, 200)
  }

  const { Story } = defineMeta({
    title: 'Feedback/Loader',
    component: Loader,
    args: {
      variant: 'spinner',
      progress: 0,
      size: 'medium',
      color: 'primary',
      showProgress: false,
      speed: 'normal',
      label: 'Loading...',
      showLabel: false,
      disabled: false,
    },
    argTypes: {
      variant: {
        control: { type: 'select' },
        options: ['spinner', 'progress'],
        description: 'Loader variant - spinner for indeterminate loading, progress for determinate',
      },
      progress: {
        control: { type: 'range', min: 0, max: 100, step: 1 },
        description: 'Progress value (0-100) for progress variant',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Size of the loader',
      },
      color: {
        control: { type: 'select' },
        options: ['primary', 'secondary', 'success', 'warning', 'error'],
        description: 'Color theme of the loader',
      },
      showProgress: {
        control: { type: 'boolean' },
        description: 'Whether to show progress percentage text (progress variant only)',
      },
      speed: {
        control: { type: 'select' },
        options: ['slow', 'normal', 'fast'],
        description: 'Animation speed for spinner variant',
      },
      label: {
        control: { type: 'text' },
        description: 'Custom label text',
      },
      showLabel: {
        control: { type: 'boolean' },
        description: 'Whether to show the label text',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Disabled state',
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Spinner Loaders -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Spinner Loaders</h3>
        <div class="flex flex-wrap items-center gap-8">
          <div class="text-center">
            <Loader variant="spinner" size="small" />
            <p class="mt-2 text-sm text-neutral-600">Small</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" size="medium" />
            <p class="mt-2 text-sm text-neutral-600">Medium</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" size="large" />
            <p class="mt-2 text-sm text-neutral-600">Large</p>
          </div>
        </div>
      </div>

      <!-- Progress Loaders -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Progress Loaders</h3>
        <div class="flex flex-wrap items-center gap-8">
          <div class="text-center">
            <Loader variant="progress" progress={25} size="medium" showProgress />
            <p class="mt-2 text-sm text-neutral-600">25% Complete</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={50} size="medium" showProgress />
            <p class="mt-2 text-sm text-neutral-600">50% Complete</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={75} size="medium" showProgress />
            <p class="mt-2 text-sm text-neutral-600">75% Complete</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={100} size="medium" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Complete</p>
          </div>
        </div>
      </div>

      <!-- Colors -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Colors</h3>
        <div class="flex flex-wrap items-center gap-8">
          <div class="text-center">
            <Loader variant="spinner" color="primary" />
            <p class="mt-2 text-sm text-neutral-600">Primary</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" color="success" />
            <p class="mt-2 text-sm text-neutral-600">Success</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" color="warning" />
            <p class="mt-2 text-sm text-neutral-600">Warning</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" color="error" />
            <p class="mt-2 text-sm text-neutral-600">Error</p>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{ variant: 'spinner' }}>
  {#snippet template(args)}
    <div>
      <Loader
        variant={args.variant}
        progress={args.progress}
        size={args.size}
        color={args.color}
        showProgress={args.showProgress}
        speed={args.speed}
        label={args.label}
        showLabel={args.showLabel}
        disabled={args.disabled}
      />
    </div>
  {/snippet}
</Story>

<Story name="Spinner Variants" args={{ variant: 'spinner' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Sizes -->
      <div>
        <h4 class="text-md mb-4 font-medium">Sizes</h4>
        <div class="flex items-center gap-8">
          <div class="text-center">
            <Loader variant="spinner" size="small" />
            <p class="mt-2 text-sm text-neutral-600">Small</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" size="medium" />
            <p class="mt-2 text-sm text-neutral-600">Medium</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" size="large" />
            <p class="mt-2 text-sm text-neutral-600">Large</p>
          </div>
        </div>
      </div>

      <!-- Speeds -->
      <div>
        <h4 class="text-md mb-4 font-medium">Animation Speeds</h4>
        <div class="flex items-center gap-8">
          <div class="text-center">
            <Loader variant="spinner" speed="slow" />
            <p class="mt-2 text-sm text-neutral-600">Slow</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" speed="normal" />
            <p class="mt-2 text-sm text-neutral-600">Normal</p>
          </div>
          <div class="text-center">
            <Loader variant="spinner" speed="fast" />
            <p class="mt-2 text-sm text-neutral-600">Fast</p>
          </div>
        </div>
      </div>

      <!-- With Labels -->
      <div>
        <h4 class="text-md mb-4 font-medium">With Labels</h4>
        <div class="flex items-center gap-8">
          <Loader variant="spinner" label="Loading..." showLabel />
          <Loader variant="spinner" label="Processing..." showLabel color="success" />
          <Loader variant="spinner" label="Uploading..." showLabel color="warning" />
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Progress Variants" args={{ variant: 'progress' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Different Progress Values -->
      <div>
        <h4 class="text-md mb-4 font-medium">Progress Values</h4>
        <div class="grid grid-cols-4 gap-8">
          <div class="text-center">
            <Loader variant="progress" progress={0} showProgress />
            <p class="mt-2 text-sm text-neutral-600">Starting</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={33} showProgress />
            <p class="mt-2 text-sm text-neutral-600">In Progress</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={66} showProgress />
            <p class="mt-2 text-sm text-neutral-600">Almost Done</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={100} showProgress />
            <p class="mt-2 text-sm text-neutral-600">Complete</p>
          </div>
        </div>
      </div>

      <!-- Sizes with Progress -->
      <div>
        <h4 class="text-md mb-4 font-medium">Sizes</h4>
        <div class="flex items-center gap-8">
          <div class="text-center">
            <Loader variant="progress" progress={45} size="small" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Small</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={45} size="medium" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Medium</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={45} size="large" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Large</p>
          </div>
        </div>
      </div>

      <!-- Colors with Progress -->
      <div>
        <h4 class="text-md mb-4 font-medium">Colors</h4>
        <div class="flex items-center gap-8">
          <div class="text-center">
            <Loader variant="progress" progress={60} color="primary" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Primary</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={80} color="success" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Success</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={40} color="warning" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Warning</p>
          </div>
          <div class="text-center">
            <Loader variant="progress" progress={20} color="error" showProgress />
            <p class="mt-2 text-sm text-neutral-600">Error</p>
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="File Upload Example">
  {#snippet template()}
    <div class="bg-background max-w-md rounded-2xl border border-neutral-200 p-6">
      <div class="space-y-4">
        <h3 class="text-h4 font-semibold text-neutral-900">File Upload</h3>

        {#if !isLoading}
          <div class="space-y-3">
            <p class="text-body-m text-neutral-700">Ready to upload your files</p>
            <Button onclick={simulateProgress} fullWidth>Start Upload</Button>
          </div>
        {:else}
          <div class="space-y-4">
            <div class="flex items-center justify-center">
              <Loader
                variant="progress"
                progress={progressValue}
                showProgress
                size="large"
                color="primary"
                label="Uploading files..."
                showLabel
              />
            </div>
            <p class="text-body-s text-center text-neutral-600">
              {progressValue < 100 ? 'Please wait while we upload your files...' : 'Upload complete!'}
            </p>
          </div>
        {/if}
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Page Loading Example" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="flex min-h-[300px] flex-col items-center justify-center space-y-4">
      <Loader variant="spinner" size="large" color="primary" label="Loading page content..." showLabel />
      <p class="text-body-m text-center text-neutral-600">Please wait while we load the latest data</p>
    </div>
  {/snippet}
</Story>

<Story name="Disabled State" args={{ disabled: true }} parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="space-y-8">
      <div class="text-center">
        <h4 class="text-md mb-4 font-medium">Disabled Spinner</h4>
        <Loader variant="spinner" disabled label="Disabled" showLabel />
      </div>

      <div class="text-center">
        <h4 class="text-md mb-4 font-medium">Disabled Progress</h4>
        <Loader variant="progress" progress={50} disabled showProgress label="Disabled" showLabel />
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Interactive Example" parameters={{ layout: 'full' }}>
  {#snippet template()}
    <div class="mx-auto max-w-sm space-y-6">
      <h3 class="text-center text-lg font-semibold">Interactive Loader Demo</h3>

      <div class="space-y-4">
        <Button onclick={simulateProgress} fullWidth disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Start Progress Demo'}
        </Button>

        <div class="flex justify-center">
          {#if isLoading}
            <Loader
              variant="progress"
              progress={progressValue}
              showProgress
              size="large"
              color={progressValue >= 100 ? 'success' : 'primary'}
              label={progressValue >= 100 ? 'Complete!' : 'Processing...'}
              showLabel
            />
          {:else}
            <Loader variant="spinner" size="medium" color="secondary" disabled />
          {/if}
        </div>

        <div class="text-center text-sm text-neutral-600">
          {#if isLoading}
            {progressValue >= 100 ? 'Process completed successfully!' : `Progress: ${progressValue}%`}
          {:else}
            Click the button to start the demo
          {/if}
        </div>
      </div>
    </div>
  {/snippet}
</Story>
