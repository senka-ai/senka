<script lang="ts">
	interface Props {
		variant?: 'primary' | 'secondary' | 'tertiary'
		text: string
		leftIcon?: any
		rightIcon?: any
		disabled?: boolean
		class?: string
		id?: string
		onclick?: () => void
	}

	let {
		variant = 'secondary',
		text,
		leftIcon,
		rightIcon,
		disabled = false,
		class: className = '',
		id,
		onclick,
		...restProps
	}: Props = $props()

	let tagClasses = $derived.by(() => {
		const base = 'inline-flex items-center gap-1.5 font-medium transition-all duration-200 rounded-full uppercase'

		const variants = {
			primary: 'bg-highlight text-white',
			secondary: 'bg-transparent border border-highlight text-highlight',
			tertiary: 'bg-highlight-light text-highlight',
		}

		const sizes = 'h-6 px-3 text-medium-xs tracking-wider'

		const interactiveStyles = onclick && !disabled ? 'cursor-pointer hover:opacity-80' : ''
		const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

		return `${base} ${variants[variant]} ${sizes} ${interactiveStyles} ${disabledStyles} ${className}`
	})

	function handleClick() {
		if (!disabled && onclick) {
			onclick()
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if ((event.key === 'Enter' || event.key === ' ') && onclick && !disabled) {
			event.preventDefault()
			handleClick()
		}
	}
</script>

{#if onclick}
	<button class={tagClasses} {id} onclick={handleClick} onkeydown={handleKeyDown} {disabled} {...restProps}>
		{#if leftIcon}
			<span class="flex items-center">
				{@render leftIcon()}
			</span>
		{/if}

		{text}

		{#if rightIcon}
			<span class="flex items-center">
				{@render rightIcon()}
			</span>
		{/if}
	</button>
{:else}
	<span class={tagClasses} {id} {...restProps}>
		{#if leftIcon}
			<span class="flex items-center">
				{@render leftIcon()}
			</span>
		{/if}

		{text}

		{#if rightIcon}
			<span class="flex items-center">
				{@render rightIcon()}
			</span>
		{/if}
	</span>
{/if}
