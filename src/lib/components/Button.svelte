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
    const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none';
    
    const variants = {
      primary: 'bg-highlight text-white hover:bg-highlight-hover disabled:bg-neutral-disabled disabled:text-neutral-disabled',
      secondary: 'bg-transparent text-highlight border-2 border-highlight hover:bg-highlight-light disabled:border-neutral-disabled disabled:text-neutral-light',
      tertiary: 'bg-transparent text-highlight hover:bg-highlight-light disabled:text-neutral-light'
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
  
  {#if children}
    {@render children()}
  {/if}
  
  {#if rightIcon && !loading}
    <span class="flex items-center">
      {rightIcon}
    </span>
  {/if}
</button>