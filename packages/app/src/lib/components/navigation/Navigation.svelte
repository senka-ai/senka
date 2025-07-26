<script lang="ts">
  import { TabBar, Avatar, ExploreIcon } from '@senka-ai/ui'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'

  interface Props {
    isMobile: boolean
  }

  let { isMobile }: Props = $props()

  const navItems = [{ path: '/', label: 'Acasă', icon: ExploreIcon }]

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
  <TabBar
    tabs={navItems.map((item) => ({
      id: item.path,
      label: item.label,
      icon: item.icon,
    }))}
    activeTab={currentPath === '/' ? '/' : navItems.find((item) => currentPath.startsWith(item.path))?.path || '/'}
    onTabChange={(tabId) => goto(tabId)}
  />
{:else}
  <nav class="flex h-screen flex-col border-r border-gray-200 bg-white p-6">
    <div class="nav-header">
      <h1 class="mb-1 text-2xl font-bold text-gray-900">Senka</h1>
      <p class="text-sm text-gray-600">Aplicația educațională</p>
    </div>

    <div class="nav-items mt-8 flex flex-1 flex-col gap-2">
      {#each navItems as item}
        <a
          href={item.path}
          class="nav-item flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-gray-600 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          class:active={isActive(item.path)}
        >
          <item.icon class="h-5 w-5" />
          <span>{item.label}</span>
        </a>
      {/each}
    </div>

    <div class="nav-footer mt-8 border-t border-gray-200 pt-6">
      <div class="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
        <Avatar initials="IP" size="medium" />
        <div class="user-details">
          <p class="mb-1 text-sm font-semibold text-gray-900">Ion Popescu</p>
          <p class="text-xs text-gray-600">Elev</p>
        </div>
      </div>
    </div>
  </nav>
{/if}

<style>
  .nav-item.active {
    background-color: #eaf2ff;
    color: #006ffd;
  }
</style>
