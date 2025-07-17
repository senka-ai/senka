<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Divider from '../lib/components/Divider.svelte'

	const { Story } = defineMeta({
		title: 'Components/Divider',
		component: Divider,
		args: {
			orientation: 'horizontal',
			variant: 'solid',
			spacing: 'medium',
		},
		argTypes: {
			orientation: {
				control: { type: 'select' },
				options: ['horizontal', 'vertical'],
				description: 'Divider orientation',
			},
			variant: {
				control: { type: 'select' },
				options: ['solid', 'dashed', 'dotted'],
				description: 'Divider style variant',
			},
			spacing: {
				control: { type: 'select' },
				options: ['none', 'small', 'medium', 'large'],
				description: 'Spacing around the divider',
			},
		},
	})
</script>

<Story name="Horizontal Solid" args={{ orientation: 'horizontal', variant: 'solid' }}>
	{#snippet template(args)}
		<div class="w-full">
			<p class="text-body-m">Content above divider</p>
			<Divider {...args} />
			<p class="text-body-m">Content below divider</p>
		</div>
	{/snippet}
</Story>

<Story name="Horizontal Dashed" args={{ orientation: 'horizontal', variant: 'dashed' }}>
	{#snippet template(args)}
		<div class="w-full">
			<p class="text-body-m">Content above divider</p>
			<Divider {...args} />
			<p class="text-body-m">Content below divider</p>
		</div>
	{/snippet}
</Story>

<Story name="Horizontal Dotted" args={{ orientation: 'horizontal', variant: 'dotted' }}>
	{#snippet template(args)}
		<div class="w-full">
			<p class="text-body-m">Content above divider</p>
			<Divider {...args} />
			<p class="text-body-m">Content below divider</p>
		</div>
	{/snippet}
</Story>

<Story name="Vertical Solid" args={{ orientation: 'vertical', variant: 'solid' }}>
	{#snippet template(args)}
		<div class="flex h-20 items-center">
			<p class="text-body-m">Left content</p>
			<Divider {...args} />
			<p class="text-body-m">Right content</p>
		</div>
	{/snippet}
</Story>

<Story name="No Spacing" args={{ spacing: 'none' }}>
	{#snippet template(args)}
		<div class="w-full">
			<p class="text-body-m">Content above divider</p>
			<Divider {...args} />
			<p class="text-body-m">Content below divider</p>
		</div>
	{/snippet}
</Story>

<Story name="Large Spacing" args={{ spacing: 'large' }}>
	{#snippet template(args)}
		<div class="w-full">
			<p class="text-body-m">Content above divider</p>
			<Divider {...args} />
			<p class="text-body-m">Content below divider</p>
		</div>
	{/snippet}
</Story>

<Story name="All Variants">
	{#snippet template()}
		<div class="space-y-8">
			<div>
				<h3 class="text-thick-m text-primary mb-4">Horizontal Variants</h3>
				<div class="w-full space-y-4">
					<div>
						<p class="text-body-s text-secondary mb-2">Solid</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider orientation="horizontal" variant="solid" spacing="medium" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>

					<div>
						<p class="text-body-s text-secondary mb-2">Dashed</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider orientation="horizontal" variant="dashed" spacing="medium" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>

					<div>
						<p class="text-body-s text-secondary mb-2">Dotted</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider orientation="horizontal" variant="dotted" spacing="medium" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-thick-m text-primary mb-4">Vertical Variants</h3>
				<div class="flex h-20 items-center gap-4">
					<div class="flex h-16 items-center rounded border border-neutral-200 px-4">
						<p class="text-body-m">Left</p>
						<Divider orientation="vertical" variant="solid" spacing="medium" />
						<p class="text-body-m">Right</p>
					</div>

					<div class="flex h-16 items-center rounded border border-neutral-200 px-4">
						<p class="text-body-m">Left</p>
						<Divider orientation="vertical" variant="dashed" spacing="medium" />
						<p class="text-body-m">Right</p>
					</div>

					<div class="flex h-16 items-center rounded border border-neutral-200 px-4">
						<p class="text-body-m">Left</p>
						<Divider orientation="vertical" variant="dotted" spacing="medium" />
						<p class="text-body-m">Right</p>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-thick-m text-primary mb-4">Spacing Options</h3>
				<div class="w-full space-y-4">
					<div>
						<p class="text-body-s text-secondary mb-2">No Spacing</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider spacing="none" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>

					<div>
						<p class="text-body-s text-secondary mb-2">Small Spacing</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider spacing="small" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>

					<div>
						<p class="text-body-s text-secondary mb-2">Large Spacing</p>
						<div class="rounded border border-neutral-200 p-4">
							<p class="text-body-m">Content above</p>
							<Divider spacing="large" />
							<p class="text-body-m">Content below</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
