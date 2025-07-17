<script lang="ts">
	import Button from './Button.svelte'
	import ImagePlaceholder from './ImagePlaceholder.svelte'
	import { ArrowRightIcon } from '../icons'

	interface Props {
		title: string
		subtitle?: string
		description?: string
		image?: string
		imageAlt?: string
		icon?: any
		children?: any
		buttonText?: string
		showAction?: boolean
		actionType?: 'button' | 'arrow'
		variant?: 'default' | 'compact'
		favorite?: boolean
		disabled?: boolean
		iconColor?: string
		class?: string
		id?: string
		onclick?: () => void
		onButtonClick?: () => void
		onFavoriteClick?: () => void
	}

	let {
		title,
		subtitle,
		description,
		image,
		imageAlt = '',
		icon,
		children,
		buttonText = 'Button',
		showAction = false,
		actionType = 'button',
		variant = 'default',
		favorite = false,
		disabled = false,
		iconColor = 'text-highlight-400',
		class: className = '',
		id,
		onclick,
		onButtonClick,
		onFavoriteClick,
		...restProps
	}: Props = $props()

	let cardClasses = $derived.by(() => {
		const base = 'overflow-hidden transition-all duration-200'
		const interactive = onclick && !disabled ? 'cursor-pointer hover:shadow-md' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		const variants = {
			default: 'rounded-2xl',
			compact: 'rounded-xl',
		}

		return `${base} ${variants[variant]} ${interactive} ${disabledStyles} ${className}`
	})

	let placeholderSize = $derived.by((): 'small' | 'medium' | 'large' => {
		return 'medium'
	})

	let contentClasses = $derived.by(() => {
		const base = 'bg-neutral-100 flex-1'
		const padding = variant === 'default' ? 'p-6' : 'p-4'
		return `${base} ${padding}`
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

	function handleFavoriteClick(event: Event) {
		event.stopPropagation()
		if (!disabled && onFavoriteClick) {
			onFavoriteClick()
		}
	}
</script>

<div class={cardClasses} {id} onclick={handleCardClick} {...restProps}>
	<!-- Image or Icon Section -->
	{#if image}
		<img src={image} alt={imageAlt} class="h-40 w-full object-cover" />
	{:else if children}
		<div class="bg-highlight-50 flex items-center justify-center {variant === 'default' ? 'h-40' : 'h-32'} {iconColor}">
			{@render children()}
		</div>
	{:else}
		<div class="relative {variant === 'default' ? 'h-40' : 'h-32'}">
			<ImagePlaceholder variant="default" size={placeholderSize} />
		</div>
	{/if}

	<!-- Content Section -->
	<div class={contentClasses}>
		<!-- Header with Title and Favorite -->
		<div class="mb-2 flex items-start justify-between">
			<div class="min-w-0 flex-1">
				<h3 class="text-heading-s text-primary leading-tight font-semibold">
					{title}
				</h3>
				{#if subtitle}
					<p class="text-body-s text-secondary mt-0.5">
						{subtitle}
					</p>
				{/if}
			</div>

			{#if onFavoriteClick}
				<button
					class="hover:text-error ml-2 p-1 text-neutral-400 transition-colors duration-200"
					onclick={handleFavoriteClick}
					aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
				>
					<svg class="h-5 w-5" fill={favorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						/>
					</svg>
				</button>
			{/if}
		</div>

		<!-- Description -->
		{#if description}
			<p class="text-body-s text-secondary mb-4 leading-relaxed">
				{description}
			</p>
		{/if}

		<!-- Action Section -->
		{#if showAction}
			<div class="flex items-center justify-between">
				{#if actionType === 'button'}
					<Button variant="secondary" size="medium" fullWidth={true} onclick={() => handleButtonClick()} {disabled}>
						{#snippet children()}{buttonText}{/snippet}
					</Button>
				{:else if actionType === 'arrow'}
					<button
						class="text-highlight hover:text-highlight-hover flex items-center transition-colors duration-200"
						onclick={() => handleButtonClick()}
						{disabled}
					>
						<ArrowRightIcon class="h-5 w-5" />
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>
