<script lang="ts">
	import { ImageIcon } from '../icons'

	interface Props {
		src: string
		alt: string
		width?: number | string
		height?: number | string
		aspectRatio?: 'square' | '16:9' | '4:3' | '3:2' | 'auto'
		fit?: 'cover' | 'contain' | 'fill' | 'scale-down' | 'none'
		loading?: 'lazy' | 'eager'
		placeholder?: string
		fallback?: string
		class?: string
		rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
		onLoad?: () => void
		onError?: () => void
	}

	let {
		src,
		alt,
		width,
		height,
		aspectRatio = 'auto',
		fit = 'cover',
		loading = 'lazy',
		placeholder,
		fallback,
		class: className = '',
		rounded = 'none',
		onLoad,
		onError,
	}: Props = $props()

	let imageLoaded = $state(false)
	let imageError = $state(false)
	let currentSrc = $state(src)

	let containerClasses = $derived.by(() => {
		const base = 'relative overflow-hidden bg-neutral-100'

		const aspectRatios = {
			square: 'aspect-square',
			'16:9': 'aspect-video',
			'4:3': 'aspect-[4/3]',
			'3:2': 'aspect-[3/2]',
			auto: '',
		}

		const roundedClasses = {
			none: '',
			sm: 'rounded-sm',
			md: 'rounded-md',
			lg: 'rounded-lg',
			xl: 'rounded-xl',
			'2xl': 'rounded-2xl',
			'3xl': 'rounded-3xl',
			full: 'rounded-full',
		}

		return `${base} ${aspectRatios[aspectRatio]} ${roundedClasses[rounded]} ${className}`
	})

	let imageClasses = $derived.by(() => {
		const base = 'transition-opacity duration-300'

		const fitClasses = {
			cover: 'object-cover',
			contain: 'object-contain',
			fill: 'object-fill',
			'scale-down': 'object-scale-down',
			none: 'object-none',
		}

		const sizeClasses = width && height ? '' : 'w-full h-full'
		const opacityClass = imageLoaded ? 'opacity-100' : 'opacity-0'

		return `${base} ${fitClasses[fit]} ${sizeClasses} ${opacityClass}`
	})

	function handleLoad() {
		imageLoaded = true
		imageError = false
		onLoad?.()
	}

	function handleError() {
		imageError = true
		imageLoaded = false

		if (fallback && currentSrc !== fallback) {
			currentSrc = fallback
			imageError = false
			return
		}

		onError?.()
	}

	// Reset state when src changes
	$effect(() => {
		if (src !== currentSrc) {
			currentSrc = src
			imageLoaded = false
			imageError = false
		}
	})
</script>

<div class={containerClasses}>
	{#if placeholder && !imageLoaded && !imageError}
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100">
			{#if placeholder.startsWith('http') || placeholder.startsWith('data:') || placeholder.startsWith('/')}
				<img src={placeholder} alt="" class="h-full w-full object-cover opacity-50" />
			{:else}
				<div class="text-body-s flex items-center justify-center text-neutral-400">
					{placeholder}
				</div>
			{/if}
		</div>
	{/if}

	{#if !imageError}
		<img
			src={currentSrc}
			{alt}
			{width}
			{height}
			{loading}
			class={imageClasses}
			onload={handleLoad}
			onerror={handleError}
		/>
	{:else}
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100 text-neutral-500">
			<div class="flex flex-col items-center gap-2">
				<ImageIcon class="h-10 w-10" />
				<span class="text-body-xs">Failed to load image</span>
			</div>
		</div>
	{/if}

	{#if !imageLoaded && !imageError && !placeholder}
		<div class="absolute inset-0 flex items-center justify-center bg-neutral-100">
			<div class="animate-pulse">
				<ImageIcon class="h-10 w-10 text-neutral-300" />
			</div>
		</div>
	{/if}
</div>
