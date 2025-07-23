<script lang="ts">
  import { page } from '$app/stores'
  import { browser } from '$app/environment'

  interface Props {
    isMobile: boolean
  }

  let { isMobile }: Props = $props()

  interface NavItem {
    path: string
    label: string
    icon: string
    mobileIcon?: string
  }

  const navItems: NavItem[] = [
    { path: '/', label: 'Acasă', icon: '🏠', mobileIcon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊', mobileIcon: '📊' },
    { path: '/schedule', label: 'Orar', icon: '📅', mobileIcon: '📅' },
    { path: '/tasks', label: 'Sarcini', icon: '📝', mobileIcon: '📝' },
    { path: '/lessons', label: 'Lecții', icon: '📖', mobileIcon: '📖' },
    { path: '/settings', label: 'Setări', icon: '⚙️', mobileIcon: '⚙️' },
  ]

  let currentPath = $derived.by(() => {
    if (!browser) return '/'
    return $page.url.pathname
  })

  function isActive(path: string): boolean {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }
</script>

{#if isMobile}
  <nav class="mobile-nav">
    {#each navItems as item}
      <a href={item.path} class="nav-item" class:active={isActive(item.path)} aria-label={item.label}>
        <span class="nav-icon">{item.mobileIcon || item.icon}</span>
        <span class="nav-label">{item.label}</span>
      </a>
    {/each}
  </nav>
{:else}
  <nav class="desktop-nav">
    <div class="nav-header">
      <h1>Senka</h1>
      <p>Aplicația educațională</p>
    </div>

    <div class="nav-items">
      {#each navItems as item}
        <a href={item.path} class="nav-item" class:active={isActive(item.path)}>
          <span class="nav-icon">{item.icon}</span>
          <span class="nav-label">{item.label}</span>
        </a>
      {/each}
    </div>

    <div class="nav-footer">
      <div class="user-info">
        <div class="user-avatar">👤</div>
        <div class="user-details">
          <p class="user-name">Ion Popescu</p>
          <p class="user-role">Elev</p>
        </div>
      </div>
    </div>
  </nav>
{/if}

<style>
  .mobile-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0.5rem;
    background: var(--color-surface);
    border-top: 1px solid var(--color-border);
    height: 80px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .mobile-nav .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border-radius: 8px;
    text-decoration: none;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
    min-width: 60px;
  }

  .mobile-nav .nav-item:hover {
    background: var(--color-neutral-100);
    color: var(--color-text-primary);
  }

  .mobile-nav .nav-item.active {
    background: var(--color-neutral-200);
    color: var(--color-text-primary);
  }

  .mobile-nav .nav-icon {
    font-size: 1.5rem;
    line-height: 1;
  }

  .mobile-nav .nav-label {
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }

  .desktop-nav {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 1.5rem;
    background: var(--color-surface);
    border-right: 1px solid var(--color-border);
  }

  .nav-header {
    margin-bottom: 2rem;
  }

  .nav-header h1 {
    color: var(--color-text-primary);
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 0 0.25rem 0;
  }

  .nav-header p {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    margin: 0;
  }

  .nav-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .desktop-nav .nav-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: var(--color-text-secondary);
    transition: all 0.2s ease;
    font-weight: 500;
  }

  .desktop-nav .nav-item:hover {
    background: var(--color-neutral-100);
    color: var(--color-text-primary);
  }

  .desktop-nav .nav-item.active {
    background: var(--color-neutral-200);
    color: var(--color-text-primary);
  }

  .desktop-nav .nav-icon {
    font-size: 1.25rem;
    line-height: 1;
  }

  .desktop-nav .nav-label {
    font-size: 0.95rem;
  }

  .nav-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border);
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--color-neutral-100);
    border-radius: 8px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    background: var(--color-neutral-200);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
  }

  .user-details {
    flex: 1;
  }

  .user-name {
    color: var(--color-text-primary);
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0 0 0.25rem 0;
  }

  .user-role {
    color: var(--color-text-secondary);
    font-size: 0.8rem;
    margin: 0;
  }
</style>