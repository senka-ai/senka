<script lang="ts">
	import Button from '../Button.svelte'
	import Image from '../media/Image.svelte'
	import ImagePlaceholder from '../media/ImagePlaceholder.svelte'
	import { ArrowRightIcon } from '../../icons'

	import type { BaseProps, ChildrenComponent, ClickHandler } from '../../types/component'

	interface Props extends BaseProps, ChildrenComponent, ClickHandler {
		title: string
		subtitle?: string
		image?: string
		imageAlt?: string
		iconType?: 'image' | 'custom'
		buttonText?: string
		showAction?: boolean
		actionType?: 'button' | 'arrow'
		iconColor?: string
		onButtonClick?: () => void
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
		iconColor = 'text-highlight-400',
		class: className = '',
		id,
		onclick,
		onButtonClick,
		children,
		...restProps
	}: Props = $props()

	let cardClasses = $derived.by(() => {
		const base = 'flex items-stretch overflow-hidden rounded-xl transition-all duration-200 h-18'
		const interactive = onclick && !disabled ? 'cursor-pointer hover:shadow-md' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		return `${base} ${interactive} ${disabledStyles} ${className}`
	})

	let iconClasses = $derived.by(() => {
		const base = 'flex-shrink-0 w-20 flex items-center justify-center'

		if (image) {
			return base
		}

		const background = 'bg-highlight-50'

		return `${base} ${background} ${iconColor}`
	})

	let contentClasses = $derived.by(() => {
		return 'bg-neutral-100 flex-1 min-w-0 p-4 flex flex-col justify-center'
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
			<Image src={image} alt={imageAlt} class="h-full w-full" aspectRatio="auto" />
		{:else if children}
			{@render children()}
		{:else}
			<div class="relative h-full w-full">
				<ImagePlaceholder variant="default" />
			</div>
		{/if}
	</div>

	<!-- Content Section -->
	<div class={contentClasses}>
		<h3 class="text-body-m text-primary leading-tight font-medium">
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
		<div class="flex flex-shrink-0 items-center bg-neutral-100 p-4">
			{#if actionType === 'button'}
				<Button variant="secondary" size="medium" onclick={() => handleButtonClick()} {disabled}>
					{#snippet children()}{buttonText}{/snippet}
				</Button>
			{:else if actionType === 'arrow'}
				<button
					class="flex items-center justify-center p-2 text-neutral-400 transition-colors duration-200 hover:text-neutral-600"
					onclick={() => handleButtonClick()}
					{disabled}
					aria-label="View details"
				>
					<ArrowRightIcon class="h-5 w-5" />
				</button>
			{/if}
		</div>
	{/if}
</div>
