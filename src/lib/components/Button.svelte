<script lang="ts">
	import { SpinnerIcon } from '../icons'

	interface Props {
		variant?: 'primary' | 'secondary' | 'tertiary'
		size?: 'small' | 'medium' | 'large'
		leftIcon?: string
		rightIcon?: string
		loading?: boolean
		fullWidth?: boolean
		disabled?: boolean
		class?: string
		id?: string
		type?: 'button' | 'submit' | 'reset'
		onclick?: () => void
		children?: any
	}

	let {
		variant = 'primary',
		size = 'medium',
		leftIcon,
		rightIcon,
		loading = false,
		fullWidth = false,
		disabled = false,
		class: className = '',
		id,
		type = 'button',
		onclick,
		children,
		...restProps
	}: Props = $props()

	let buttonClasses = $derived.by(() => {
		const base =
			'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none'

		const variants = {
			primary:
				'bg-highlight text-white border-2 border-transparent hover:bg-highlight-hover disabled:bg-neutral-disabled disabled:text-neutral-disabled',
			secondary:
				'bg-transparent text-highlight border-2 border-highlight hover:bg-highlight-light disabled:border-neutral-disabled disabled:text-neutral-light',
			tertiary:
				'bg-transparent text-highlight border-2 border-transparent hover:bg-highlight-light disabled:text-neutral-light',
		}

		const sizes = {
			small: 'px-3 py-1.5 text-action-s rounded-lg',
			medium: 'px-4 py-3 text-action-m rounded-xl',
			large: 'px-6 py-3 text-action-l rounded-2xl',
		}

		const width = fullWidth ? 'w-full' : ''

		return `${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`
	})
</script>

<button class={buttonClasses} disabled={disabled || loading} {id} {type} {onclick} {...restProps}>
	{#if loading}
		<SpinnerIcon class="h-4 w-4" />
	{:else if leftIcon}
		<span class="flex items-center">
			{leftIcon}
		</span>
	{/if}

	{#if children}
		{@render children()}
	{/if}

	{#if rightIcon && !loading}
		<span class="flex items-center">
			{rightIcon}
		</span>
	{/if}
</button>
