<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import Card from '../lib/components/layout/Card.svelte'
	import { ImageIcon, ProfileIcon, ChatIcon } from '../lib/icons'

	const { Story } = defineMeta({
		title: 'Components/Card',
		component: Card,
		args: {
			title: 'Card Title',
			subtitle: 'Subtitle',
			description: 'Description. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do.',
			buttonText: 'Button',
			showAction: true,
			actionType: 'button',
			variant: 'default',
			favorite: false,
			disabled: false,
		},
		argTypes: {
			variant: {
				control: { type: 'select' },
				options: ['default', 'compact'],
				description: 'Card variant',
			},
			actionType: {
				control: { type: 'select' },
				options: ['button', 'arrow'],
				description: 'Type of action element',
			},
			showAction: {
				control: { type: 'boolean' },
				description: 'Show action element',
			},
			favorite: {
				control: { type: 'boolean' },
				description: 'Favorite state',
			},
			disabled: {
				control: { type: 'boolean' },
				description: 'Disabled state',
			},
		},
	})
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="With Image" args={{ image: 'https://picsum.photos/400/300', imageAlt: 'Sample image' }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="With Icon">
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args}>
				{#snippet children()}
					<ProfileIcon class="h-8 w-8" />
				{/snippet}
			</Card>
		</div>
	{/snippet}
</Story>

<Story name="Compact Variant" args={{ variant: 'compact' }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="With Favorite">
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} onFavoriteClick={() => console.log('Favorite clicked')} favorite={true} />
		</div>
	{/snippet}
</Story>

<Story name="Arrow Action" args={{ actionType: 'arrow' }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="No Action" args={{ showAction: false }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Clickable Card">
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} onclick={() => console.log('Card clicked')} onButtonClick={() => console.log('Button clicked')} />
		</div>
	{/snippet}
</Story>

<Story name="Simple Card" args={{ subtitle: '', description: '', showAction: false }}>
	{#snippet template(args)}
		<div class="max-w-sm">
			<Card {...args} />
		</div>
	{/snippet}
</Story>

<Story name="All Variants">
	{#snippet template()}
		<div class="space-y-8">
			<!-- Default Cards -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Default Variant</h3>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<Card
						title="With Image"
						subtitle="Subtitle"
						description="Description. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
						image="https://picsum.photos/400/300"
						imageAlt="Sample image"
						buttonText="Button"
						showAction={true}
					/>
					<Card
						title="With Icon"
						subtitle="Subtitle"
						description="Description. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
						buttonText="Button"
						showAction={true}
					>
						{#snippet children()}
							<ChatIcon class="h-8 w-8" />
						{/snippet}
					</Card>
					<Card
						title="Simple Card"
						subtitle="Subtitle"
						description="Description. Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do."
						buttonText="Button"
						showAction={true}
					/>
				</div>
			</div>

			<!-- Compact Cards -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Compact Variant</h3>
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<Card variant="compact" title="Compact Card" subtitle="Subtitle" buttonText="Button" showAction={true}>
						{#snippet children()}
							<ProfileIcon class="h-6 w-6" />
						{/snippet}
					</Card>
					<Card variant="compact" title="With Arrow" subtitle="Subtitle" actionType="arrow" showAction={true} />
				</div>
			</div>

			<!-- Action Types -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Action Types</h3>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
					<Card
						title="Button Action"
						subtitle="Subtitle"
						description="Card with button action"
						buttonText="Button"
						showAction={true}
						actionType="button"
					/>
					<Card
						title="Arrow Action"
						subtitle="Subtitle"
						description="Card with arrow action"
						showAction={true}
						actionType="arrow"
					/>
					<Card title="No Action" subtitle="Subtitle" description="Card without any action" showAction={false} />
				</div>
			</div>

			<!-- Special States -->
			<div>
				<h3 class="mb-4 text-lg font-semibold">Special States</h3>
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<Card
						title="Favorite Card"
						subtitle="Subtitle"
						description="Card with favorite functionality"
						buttonText="Button"
						showAction={true}
						favorite={true}
						onFavoriteClick={() => console.log('Favorite clicked')}
					/>
					<Card
						title="Disabled Card"
						subtitle="Subtitle"
						description="Card in disabled state"
						buttonText="Button"
						showAction={true}
						disabled={true}
					/>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
