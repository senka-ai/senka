<script lang="ts">
  interface Props {
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'medium' | 'large';
    leftIcon?: string;
    rightIcon?: string;
    loading?: boolean;
    fullWidth?: boolean;
    disabled?: boolean;
    class?: string;
    id?: string;
    type?: 'button' | 'submit' | 'reset';
    onclick?: () => void;
    children?: any;
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
  }: Props = $props();
  
  let buttonClasses = $derived.by(() => {
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variants = {
      primary: 'bg-[var(--color-highlight-400)] text-white hover:bg-[var(--color-highlight-300)] focus:ring-[var(--color-highlight-200)] disabled:bg-[var(--color-neutral-400)] disabled:text-[var(--color-neutral-600)]',
      secondary: 'bg-transparent text-[var(--color-highlight-400)] border-2 border-[var(--color-highlight-400)] hover:bg-[var(--color-highlight-50)] focus:ring-[var(--color-highlight-200)] disabled:border-[var(--color-neutral-400)] disabled:text-[var(--color-neutral-500)]',
      tertiary: 'bg-transparent text-[var(--color-highlight-400)] hover:bg-[var(--color-highlight-50)] focus:ring-[var(--color-highlight-200)] disabled:text-[var(--color-neutral-500)]'
    };
    
    const sizes = {
      small: 'px-3 py-1.5 text-action-s rounded-md',
      medium: 'px-4 py-2 text-action-m rounded-lg',
      large: 'px-6 py-3 text-action-l rounded-lg'
    };
    
    const width = fullWidth ? 'w-full' : '';
    
    return `${base} ${variants[variant]} ${sizes[size]} ${width} ${className}`;
  });
</script>

<button
  class={buttonClasses}
  disabled={disabled || loading}
  {id}
  {type}
  {onclick}
  {...restProps}
>
  {#if loading}
    <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  {:else if leftIcon}
    <span class="flex items-center">
      {leftIcon}
    </span>
  {/if}
  
  {@render children?.()}
  
  {#if rightIcon && !loading}
    <span class="flex items-center">
      {rightIcon}
    </span>
  {/if}
</button>