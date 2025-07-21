<script lang="ts">
	import { ProfileIcon } from '../../icons'
	import type { BaseProps, ExtendedSizedComponent } from '../../types/component'

	interface Props extends BaseProps, ExtendedSizedComponent {}

	let { class: className = '', size = 'medium' }: Props = $props()

	let containerClasses = $derived.by(() => {
		const base = 'absolute inset-0 flex items-center justify-center bg-highlight-50'

		const borderRadiusMap = {
			xs: 'rounded-xl',
			small: 'rounded-2xl',
			medium: 'rounded-2xl',
			large: 'rounded-3xl',
		}

		return `${base} ${borderRadiusMap[size]} ${className}`
	})

	let iconClasses = $derived.by(() => {
		const base = 'text-highlight-100'

		const iconSizes = {
			xs: 'w-6 h-6',
			small: 'w-8 h-8',
			medium: 'w-11 h-11',
			large: 'w-16 h-16',
		}

		return `${base} ${iconSizes[size]}`
	})
</script>

<div class={containerClasses}>
	<ProfileIcon class={iconClasses} />
</div>
