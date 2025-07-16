<script lang="ts">
	import Button from './Button.svelte'
	import { ArrowRightIcon, ImageIcon, PersonIcon, HeartFilledIcon } from '../icons'

	interface Props {
		title: string
		subtitle?: string
		image?: string
		imageAlt?: string
		iconType?: 'image' | 'avatar' | 'heart' | 'custom'
		buttonText?: string
		showAction?: boolean
		actionType?: 'button' | 'arrow'
		disabled?: boolean
		class?: string
		id?: string
		onclick?: () => void
		onButtonClick?: () => void
		children?: any
	}

	let {
		title,
		subtitle,
		image,
		imageAlt = '',
		iconType = 'image',
		buttonText = 'Button',
		showAction = false,
		actionType = 'button',
		disabled = false,
		class: className = '',
		id,
		onclick,
		onButtonClick,
		children,
		...restProps
	}: Props = $props()

	let cardClasses = $derived.by(() => {
		const base = 'flex items-center gap-3 p-4 bg-white border border-neutral-200 rounded-xl transition-all duration-200'
		const interactive = onclick && !disabled ? 'cursor-pointer hover:bg-neutral-50 hover:border-neutral-300' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''
		
		return `${base} ${interactive} ${disabledStyles} ${className}`
	})

	let iconClasses = $derived.by(() => {
		const base = 'flex-shrink-0 flex items-center justify-center'
		const size = 'h-12 w-12'
		const background = iconType === 'image' ? 'bg-neutral-100 text-neutral-400' : 
						  iconType === 'avatar' ? 'bg-highlight-light text-white' :
						  iconType === 'heart' ? 'bg-white' :
						  'bg-neutral-100 text-neutral-400'
		const borderRadius = 'rounded-lg'
		
		return `${base} ${size} ${background} ${borderRadius}`
	})

	function handleCardClick() {
		if (!disabled && onclick) {
			onclick()
		}
	}

	function handleButtonClick() {
		if (!disabled && onButtonClick) {
			onButtonClick()
		}
	}
</script>

<div class={cardClasses} {id} onclick={handleCardClick} {...restProps}>
	<!-- Left Icon/Image Section -->
	<div class={iconClasses}>
		{#if image}
			<img src={image} alt={imageAlt} class="w-full h-full object-cover rounded-lg" />
		{:else if children}
			{@render children()}
		{:else if iconType === 'avatar'}
			<PersonIcon class="h-6 w-6" />
		{:else if iconType === 'heart'}
			<HeartFilledIcon class="h-6 w-6 text-highlight" />
		{:else}
			<ImageIcon class="h-6 w-6" />
		{/if}
	</div>

	<!-- Content Section -->
	<div class="flex-1 min-w-0">
		<h3 class="text-body-m text-primary font-medium leading-tight">
			{title}
		</h3>
		{#if subtitle}
			<p class="text-body-s text-secondary mt-0.5">
				{subtitle}
			</p>
		{/if}
	</div>

	<!-- Right Action Section -->
	{#if showAction}
		<div class="flex-shrink-0">
			{#if actionType === 'button'}
				<Button
					variant="secondary"
					size="medium"
					onclick={() => handleButtonClick()}
					disabled={disabled}
				>
					{#snippet children()}{buttonText}{/snippet}
				</Button>
			{:else if actionType === 'arrow'}
				<button
					class="flex items-center justify-center p-2 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
					onclick={() => handleButtonClick()}
					disabled={disabled}
					aria-label="View details"
				>
					<ArrowRightIcon class="h-5 w-5" />
				</button>
			{/if}
		</div>
	{/if}
</div>