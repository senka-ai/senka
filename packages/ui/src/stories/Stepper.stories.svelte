<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf'
  import Stepper from '@ui/components/controls/Stepper.svelte'

  const { Story } = defineMeta({
    title: 'Controls/Stepper',
    component: Stepper,
    args: {
      steps: [
        { id: 'step1', title: 'Personal Info' },
        { id: 'step2', title: 'Account Setup' },
        { id: 'step3', title: 'Verification' },
        { id: 'step4', title: 'Complete' },
      ],
      currentStep: 1,
      interactive: true,
      showTitles: true,
      size: 'medium',
      orientation: 'horizontal',
      disabled: false,
    },
    argTypes: {
      steps: {
        control: false,
        description: 'Array of step definitions with id and title',
      },
      currentStep: {
        control: { type: 'number', min: 0, max: 3, step: 1 },
        description: 'Current active step index (0-based)',
      },
      interactive: {
        control: { type: 'boolean' },
        description: 'Whether steps can be clicked for navigation',
      },
      showTitles: {
        control: { type: 'boolean' },
        description: 'Whether to show step titles below indicators',
      },
      showConnectors: {
        control: { type: 'boolean' },
        description: 'Whether to show connector lines between steps',
      },
      size: {
        control: { type: 'select' },
        options: ['small', 'medium', 'large'],
        description: 'Visual size of the stepper',
      },
      orientation: {
        control: { type: 'select' },
        options: ['horizontal'],
        description: 'Layout orientation',
      },
      disabled: {
        control: { type: 'boolean' },
        description: 'Whether the entire stepper is disabled',
      },
      onchange: {
        control: false,
        description: 'Called when step is changed - receives step index',
      },
      onclick: {
        control: false,
        description: 'Called when any step is clicked',
      },
    },
    parameters: {
      docs: {
        description: {
          component:
            'A stepper component for displaying progress through a sequence of steps. Supports navigation, different states, and customizable appearance.',
        },
      },
    },
  })
</script>

<Story name="Overview" parameters={{ layout: 'default' }}>
  {#snippet template()}
    <div class="space-y-8">
      <!-- Different Steps Progress -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Progress States</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Step 1 of 4 - Just Started</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Personal Info' },
                { id: 'step2', title: 'Account Setup' },
                { id: 'step3', title: 'Verification' },
                { id: 'step4', title: 'Complete' },
              ]}
              currentStep={0}
              interactive={false}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">Step 2 of 4 - In Progress</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Personal Info' },
                { id: 'step2', title: 'Account Setup' },
                { id: 'step3', title: 'Verification' },
                { id: 'step4', title: 'Complete' },
              ]}
              currentStep={1}
              interactive={false}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">Step 4 of 4 - Completed</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Personal Info' },
                { id: 'step2', title: 'Account Setup' },
                { id: 'step3', title: 'Verification' },
                { id: 'step4', title: 'Complete' },
              ]}
              currentStep={3}
              interactive={false}
            />
          </div>
        </div>
      </div>

      <!-- Sizes -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Sizes</h3>
        <div class="space-y-6">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Small</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2' },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={1}
              size="small"
              interactive={false}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">Medium</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2' },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={1}
              size="medium"
              interactive={false}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">Large</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2' },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={1}
              size="large"
              interactive={false}
            />
          </div>
        </div>
      </div>

      <!-- Without Titles -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Without Titles</h3>
        <Stepper
          steps={[
            { id: 'step1', title: 'Step 1' },
            { id: 'step2', title: 'Step 2' },
            { id: 'step3', title: 'Step 3' },
            { id: 'step4', title: 'Step 4' },
            { id: 'step5', title: 'Step 5' },
          ]}
          currentStep={2}
          showTitles={false}
          interactive={false}
        />
      </div>

      <!-- Without Connectors -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Without Connectors</h3>
        <Stepper
          steps={[
            { id: 'step1', title: 'Step 1' },
            { id: 'step2', title: 'Step 2' },
            { id: 'step3', title: 'Step 3' },
            { id: 'step4', title: 'Step 4' },
            { id: 'step5', title: 'Step 5' },
          ]}
          currentStep={2}
          showConnectors={false}
          interactive={false}
        />
      </div>

      <!-- States -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">States</h3>
        <div class="space-y-4">
          <div>
            <p class="mb-2 text-sm text-neutral-600">Interactive (Clickable)</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2' },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={1}
              interactive={true}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">Disabled</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2' },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={1}
              disabled={true}
            />
          </div>

          <div>
            <p class="mb-2 text-sm text-neutral-600">With Disabled Steps</p>
            <Stepper
              steps={[
                { id: 'step1', title: 'Step 1' },
                { id: 'step2', title: 'Step 2', disabled: true },
                { id: 'step3', title: 'Step 3' },
              ]}
              currentStep={0}
              interactive={true}
            />
          </div>
        </div>
      </div>
    </div>
  {/snippet}
</Story>

<Story name="Default" args={{}} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={args.steps || [
        { id: 'step1', title: 'Personal Info' },
        { id: 'step2', title: 'Account Setup' },
        { id: 'step3', title: 'Verification' },
        { id: 'step4', title: 'Complete' },
      ]}
      currentStep={args.currentStep}
      interactive={args.interactive}
      showTitles={args.showTitles}
      showConnectors={args.showConnectors}
      size={args.size}
      orientation={args.orientation}
      disabled={args.disabled}
      onchange={args.onchange}
      onclick={args.onclick}
    />
  {/snippet}
</Story>

<Story name="Three Steps" args={{ currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Setup' },
        { id: 'step2', title: 'Configure' },
        { id: 'step3', title: 'Deploy' },
      ]}
      currentStep={args.currentStep}
      interactive={args.interactive}
      showTitles={args.showTitles}
      size={args.size}
    />
  {/snippet}
</Story>

<Story name="Five Steps" args={{ currentStep: 2 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Plan' },
        { id: 'step2', title: 'Design' },
        { id: 'step3', title: 'Build' },
        { id: 'step4', title: 'Test' },
        { id: 'step5', title: 'Launch' },
      ]}
      currentStep={args.currentStep}
      interactive={args.interactive}
      showTitles={args.showTitles}
      size={args.size}
    />
  {/snippet}
</Story>

<Story name="Small Size" args={{ size: 'small', currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Start' },
        { id: 'step2', title: 'Progress' },
        { id: 'step3', title: 'Finish' },
      ]}
      currentStep={args.currentStep}
      size={args.size}
      interactive={args.interactive}
      showTitles={args.showTitles}
    />
  {/snippet}
</Story>

<Story name="Medium Size" args={{ size: 'medium', currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Start' },
        { id: 'step2', title: 'Progress' },
        { id: 'step3', title: 'Finish' },
      ]}
      currentStep={args.currentStep}
      size={args.size}
      interactive={args.interactive}
      showTitles={args.showTitles}
    />
  {/snippet}
</Story>

<Story name="Large Size" args={{ size: 'large', currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Start' },
        { id: 'step2', title: 'Progress' },
        { id: 'step3', title: 'Finish' },
      ]}
      currentStep={args.currentStep}
      size={args.size}
      interactive={args.interactive}
      showTitles={args.showTitles}
    />
  {/snippet}
</Story>

<Story name="Without Titles" args={{ showTitles: false, currentStep: 2 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Step 1' },
        { id: 'step2', title: 'Step 2' },
        { id: 'step3', title: 'Step 3' },
        { id: 'step4', title: 'Step 4' },
        { id: 'step5', title: 'Step 5' },
      ]}
      currentStep={args.currentStep}
      showTitles={args.showTitles}
      interactive={args.interactive}
      size={args.size}
    />
  {/snippet}
</Story>

<Story name="Interactive" args={{ interactive: true, currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Personal' },
        { id: 'step2', title: 'Account' },
        { id: 'step3', title: 'Verify' },
        { id: 'step4', title: 'Done' },
      ]}
      currentStep={args.currentStep}
      interactive={args.interactive}
      showTitles={args.showTitles}
      size={args.size}
      onchange={(stepIndex) => console.log('Step changed to:', stepIndex)}
      onclick={() => console.log('Stepper clicked')}
    />
  {/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true, currentStep: 1 }} parameters={{ layout: 'compact' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Step 1' },
        { id: 'step2', title: 'Step 2' },
        { id: 'step3', title: 'Step 3' },
      ]}
      currentStep={args.currentStep}
      disabled={args.disabled}
      interactive={args.interactive}
      showTitles={args.showTitles}
      size={args.size}
    />
  {/snippet}
</Story>

<Story name="Without Connectors" args={{ showConnectors: false, currentStep: 2 }} parameters={{ layout: 'default' }}>
  {#snippet template(args)}
    <Stepper
      steps={[
        { id: 'step1', title: 'Planning' },
        { id: 'step2', title: 'Development' },
        { id: 'step3', title: 'Testing' },
        { id: 'step4', title: 'Deployment' },
        { id: 'step5', title: 'Monitoring' },
      ]}
      currentStep={args.currentStep}
      showConnectors={args.showConnectors}
      interactive={args.interactive}
      showTitles={args.showTitles}
      size={args.size}
    />
  {/snippet}
</Story>
