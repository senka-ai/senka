<script lang="ts">
  interface Props {
    src?: string;
    alt?: string;
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    initials?: string;
    status?: 'online' | 'offline' | 'away' | 'busy';
    class?: string;
  }
  
  let { 
    src,
    alt = '',
    size = 'medium',
    initials,
    status,
    class: className = ''
  }: Props = $props();
  
  let avatarClasses = $derived.by(() => {
    const base = 'relative inline-flex items-center justify-center rounded-full bg-[var(--color-neutral-300)] text-[var(--color-neutral-600)] font-medium overflow-hidden';
    
    const sizes = {
      small: 'h-8 w-8 text-body-s',
      medium: 'h-10 w-10 text-body-m',
      large: 'h-12 w-12 text-body-l',
      xlarge: 'h-16 w-16 text-h4'
    };
    
    return `${base} ${sizes[size]} ${className}`;
  });
  
  let statusClasses = $derived.by(() => {
    if (!status) return '';
    
    const base = 'absolute bottom-0 right-0 rounded-full border-2 border-white';
    
    const statusColors = {
      online: 'bg-[var(--color-success-200)]',
      offline: 'bg-[var(--color-neutral-500)]',
      away: 'bg-[var(--color-warning-200)]',
      busy: 'bg-[var(--color-error-200)]'
    };
    
    const statusSizes = {
      small: 'h-2 w-2',
      medium: 'h-3 w-3',
      large: 'h-3 w-3',
      xlarge: 'h-4 w-4'
    };
    
    return `${base} ${statusColors[status]} ${statusSizes[size]}`;
  });
  
  let displayInitials = $derived.by(() => {
    if (initials) return initials;
    if (alt) {
      return alt.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
    }
    return '';
  });
</script>

<div class={avatarClasses}>
  {#if src}
    <img 
      {src} 
      {alt} 
      class="h-full w-full object-cover"
      onerror={() => {
        // Handle image load error by falling back to initials
        src = undefined;
      }}
    />
  {:else}
    <span class="select-none">
      {displayInitials}
    </span>
  {/if}
  
  {#if status}
    <span class={statusClasses} aria-label={`Status: ${status}`}></span>
  {/if}
</div>