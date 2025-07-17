<script lang="ts">
	interface Props {
		orientation?: 'horizontal' | 'vertical'
		variant?: 'solid' | 'dashed' | 'dotted'
		spacing?: 'none' | 'small' | 'medium' | 'large'
		class?: string
		id?: string
	}

	let {
		orientation = 'horizontal',
		variant = 'solid',
		spacing = 'medium',
		class: className = '',
		id,
		...restProps
	}: Props = $props()

	let dividerClasses = $derived.by(() => {
		const base = 'border-neutral-300'

		const orientations = {
			horizontal: 'w-full border-t',
			vertical: 'h-full border-l',
		}

		const variants = {
			solid: '',
			dashed: 'border-dashed',
			dotted: 'border-dotted',
		}

		const spacings = {
			none: '',
			small: orientation === 'horizontal' ? 'my-2' : 'mx-2',
			medium: orientation === 'horizontal' ? 'my-4' : 'mx-4',
			large: orientation === 'horizontal' ? 'my-6' : 'mx-6',
		}

		return `${base} ${orientations[orientation]} ${variants[variant]} ${spacings[spacing]} ${className}`
	})
</script>

<div class={dividerClasses} {id} {...restProps}></div>
