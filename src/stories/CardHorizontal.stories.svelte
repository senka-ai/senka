<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf'
	import CardHorizontal from '../lib/components/CardHorizontal.svelte'
	import { ChatIcon, PersonIcon, HeartFilledIcon } from '../lib/icons'

	const { Story } = defineMeta({
		title: 'Components/CardHorizontal',
		component: CardHorizontal,
		args: {
			title: 'Title',
			subtitle: 'Subtitle',
			iconType: 'image',
			buttonText: 'Button',
			showAction: true,
			actionType: 'button',
			disabled: false,
		},
		argTypes: {
			iconType: {
				control: { type: 'select' },
				options: ['image', 'custom'],
				description: 'Type of icon to display',
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
			disabled: {
				control: { type: 'boolean' },
				description: 'Disabled state',
			},
		},
	})
</script>

<Story name="Default">
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="With Image" args={{ image: 'https://picsum.photos/80/80', imageAlt: 'Sample image' }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Avatar Type" args={{ iconType: 'custom' }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args}>
				{#snippet children()}
					<PersonIcon class="h-6 w-6" />
				{/snippet}
			</CardHorizontal>
		</div>
	{/snippet}
</Story>

<Story name="Heart Type" args={{ iconType: 'custom' }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args}>
				{#snippet children()}
					<HeartFilledIcon class="h-6 w-6" />
				{/snippet}
			</CardHorizontal>
		</div>
	{/snippet}
</Story>

<Story name="Custom Icon" args={{ iconType: 'custom' }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args}>
				{#snippet children()}
					<ChatIcon class="h-6 w-6 text-highlight" />
				{/snippet}
			</CardHorizontal>
		</div>
	{/snippet}
</Story>

<Story name="Arrow Action" args={{ actionType: 'arrow' }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="No Action" args={{ showAction: false }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Disabled" args={{ disabled: true }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="Clickable Card">
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal
				{...args}
				onclick={() => console.log('Card clicked')}
				onButtonClick={() => console.log('Button clicked')}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Text Only" args={{ iconType: 'image', showAction: false }}>
	{#snippet template(args)}
		<div class="max-w-md">
			<CardHorizontal {...args} />
		</div>
	{/snippet}
</Story>

<Story name="All Variants">
	{#snippet template()}
		<div class="space-y-6 max-w-lg">
			<!-- Image Variants -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Image Variants</h3>
				<div class="space-y-3">
					<CardHorizontal
						title="With Image + Button"
						subtitle="Subtitle"
						image="https://picsum.photos/80/80"
						imageAlt="Sample image"
						buttonText="Button"
						showAction={true}
						actionType="button"
					/>
					<CardHorizontal
						title="With Image + Arrow"
						subtitle="Subtitle"
						iconType="image"
						showAction={true}
						actionType="arrow"
					/>
					<CardHorizontal
						title="With Image Only"
						subtitle="Subtitle"
						iconType="image"
						showAction={false}
					/>
				</div>
			</div>

			<!-- Avatar Variants -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Avatar Variants</h3>
				<div class="space-y-3">
					<CardHorizontal
						title="Avatar + Button"
						subtitle="Subtitle"
						iconType="custom"
						buttonText="Button"
						showAction={true}
						actionType="button"
					>
						{#snippet children()}
							<PersonIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
					<CardHorizontal
						title="Avatar + Arrow"
						subtitle="Subtitle"
						iconType="custom"
						showAction={true}
						actionType="arrow"
					>
						{#snippet children()}
							<PersonIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
					<CardHorizontal
						title="Avatar Only"
						subtitle="Subtitle"
						iconType="custom"
						showAction={false}
					>
						{#snippet children()}
							<PersonIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
				</div>
			</div>

			<!-- Heart Variants -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Heart Variants</h3>
				<div class="space-y-3">
					<CardHorizontal
						title="Heart + Button"
						subtitle="Subtitle"
						iconType="custom"
						buttonText="Button"
						showAction={true}
						actionType="button"
					>
						{#snippet children()}
							<HeartFilledIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
					<CardHorizontal
						title="Heart + Arrow"
						subtitle="Subtitle"
						iconType="custom"
						showAction={true}
						actionType="arrow"
					>
						{#snippet children()}
							<HeartFilledIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
					<CardHorizontal
						title="Heart Only"
						subtitle="Subtitle"
						iconType="custom"
						showAction={false}
					>
						{#snippet children()}
							<HeartFilledIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
				</div>
			</div>

			<!-- Text Only Variants -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Text Only Variants</h3>
				<div class="space-y-3">
					<CardHorizontal
						title="Text + Button"
						subtitle="Subtitle"
						buttonText="Button"
						showAction={true}
						actionType="button"
					/>
					<CardHorizontal
						title="Text + Arrow"
						subtitle="Subtitle"
						showAction={true}
						actionType="arrow"
					/>
					<CardHorizontal
						title="Text Only"
						subtitle="Subtitle"
						showAction={false}
					/>
				</div>
			</div>

			<!-- Special States -->
			<div>
				<h3 class="text-lg font-semibold mb-4">Special States</h3>
				<div class="space-y-3">
					<CardHorizontal
						title="Clickable Card"
						subtitle="Click the entire card"
						iconType="custom"
						buttonText="Button"
						showAction={true}
						onclick={() => console.log('Card clicked')}
						onButtonClick={() => console.log('Button clicked')}
					>
						{#snippet children()}
							<PersonIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
					<CardHorizontal
						title="Disabled Card"
						subtitle="Cannot interact"
						iconType="custom"
						buttonText="Button"
						showAction={true}
						disabled={true}
					>
						{#snippet children()}
							<HeartFilledIcon class="h-6 w-6" />
						{/snippet}
					</CardHorizontal>
				</div>
			</div>
		</div>
	{/snippet}
</Story>