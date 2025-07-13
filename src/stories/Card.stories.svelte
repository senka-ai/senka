<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Card from '../lib/components/Card.svelte'
	import Button from '../lib/components/Button.svelte'

	const { Story } = defineMeta({
		title: 'Components/Card',
		component: Card,
		args: {
			variant: 'default',
			padding: 'medium',
			clickable: false,
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'outlined', 'elevated'],
				description: 'Card variant',
			},
			padding: {
				control: { type: 'select' },
				options: ['none', 'small', 'medium', 'large'],
				description: 'Card padding',
			},
			clickable: {
				control: { type: 'boolean' },
				description: 'Clickable card',
			},
		},
	})
</script>

<Story name="Default" args={{ variant: 'default' }}>
	{#snippet template(args)}
		<Card {...args}>
			<div class="space-y-3">
				<h3 class="text-h3">Card Title</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">
					This is a sample card with some content. Cards are containers that group information about a subject.
				</p>
				<Button variant="primary">Action</Button>
			</div>
		</Card>
	{/snippet}
</Story>

<Story name="Outlined" args={{ variant: 'outlined' }}>
	{#snippet template(args)}
		<Card {...args}>
			<div class="space-y-3">
				<h3 class="text-h3">Card Title</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">
					This is a sample card with some content. Cards are containers that group information about a subject.
				</p>
				<Button variant="primary">Action</Button>
			</div>
		</Card>
	{/snippet}
</Story>

<Story name="Elevated" args={{ variant: 'elevated' }}>
	{#snippet template(args)}
		<Card {...args}>
			<div class="space-y-3">
				<h3 class="text-h3">Card Title</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">
					This is a sample card with some content. Cards are containers that group information about a subject.
				</p>
				<Button variant="primary">Action</Button>
			</div>
		</Card>
	{/snippet}
</Story>

<Story name="Clickable" args={{ clickable: true }}>
	{#snippet template(args)}
		<Card {...args}>
			<div class="space-y-3">
				<h3 class="text-h3">Card Title</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">
					This is a sample card with some content. Cards are containers that group information about a subject.
				</p>
				<Button variant="primary">Action</Button>
			</div>
		</Card>
	{/snippet}
</Story>

<Story name="All Variants">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-3">
		<Card variant="default">
			<div class="space-y-3">
				<h3 class="text-h3">Default Card</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">Standard card with default border.</p>
				<Button variant="secondary">Button</Button>
			</div>
		</Card>

		<Card variant="outlined">
			<div class="space-y-3">
				<h3 class="text-h3">Outlined Card</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">Card with thicker border outline.</p>
				<Button variant="secondary">Button</Button>
			</div>
		</Card>

		<Card variant="elevated">
			<div class="space-y-3">
				<h3 class="text-h3">Elevated Card</h3>
				<p class="text-body-m text-[var(--color-neutral-600)]">Card with shadow elevation.</p>
				<Button variant="secondary">Button</Button>
			</div>
		</Card>
	</div>
</Story>
