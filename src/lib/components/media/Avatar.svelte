<script lang="ts">
	import AvatarPlaceholder from './AvatarPlaceholder.svelte'
	import type { BaseProps, ExtendedSizedComponent, StatusComponent } from '../../types/component'

	interface Props extends BaseProps, ExtendedSizedComponent, StatusComponent {
		src?: string
		alt?: string
		initials?: string
	}

	let { src, alt = '', size = 'medium', initials, status, class: className = '' }: Props = $props()

	let avatarClasses = $derived.by(() => {
		const base = 'relative inline-flex items-center justify-center bg-highlight-50 text-neutral-600 font-medium'

		const sizes = {
			xs: 'h-8 w-8 text-body-s rounded-xl',
			small: 'h-10 w-10 text-body-s rounded-2xl',
			medium: 'h-14 w-14 text-body-m rounded-2xl',
			large: 'h-20 w-20 text-body-l rounded-3xl',
		}

		return `${base} ${sizes[size]} ${className}`
	})

	let statusClasses = $derived.by(() => {
		if (!status) return ''

		const base = 'absolute rounded-full border-2 border-white'

		const statusColors = {
			online: 'bg-success',
			offline: 'bg-neutral',
			away: 'bg-warning',
			busy: 'bg-error',
		}

		const statusSizes = {
			xs: 'h-2.5 w-2.5 -bottom-0.5 -right-0.5',
			small: 'h-3 w-3 -bottom-0.5 -right-0.5',
			medium: 'h-3.5 w-3.5 -bottom-1 -right-1',
			large: 'h-4 w-4 -bottom-0.5 -right-0.5',
		}

		return `${base} ${statusColors[status]} ${statusSizes[size]}`
	})

	let displayInitials = $derived.by(() => {
		if (initials) return initials
		if (alt) {
			return alt
				.split(' ')
				.map((word) => word[0])
				.join('')
				.toUpperCase()
				.slice(0, 2)
		}
		return ''
	})

	let imageBorderRadius = $derived.by(() => {
		const borderRadius = {
			xs: 'rounded-lg',
			small: 'rounded-xl',
			medium: 'rounded-xl',
			large: 'rounded-2xl',
		}
		return borderRadius[size]
	})
</script>

<div class={avatarClasses}>
	{#if src}
		<img
			{src}
			{alt}
			class="h-full w-full object-cover {imageBorderRadius}"
			onerror={() => {
				// Handle image load error by falling back to initials
				src = undefined
			}}
		/>
	{:else if displayInitials}
		<span class="select-none">
			{displayInitials}
		</span>
	{:else}
		<!-- Generic person SVG fallback -->
		<AvatarPlaceholder {size} />
	{/if}

	{#if status}
		<span class={statusClasses} aria-label={`Status: ${status}`}></span>
	{/if}
</div>
