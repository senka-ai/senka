<script lang="ts">
  import { TabBar, Avatar, ExploreIcon } from '@senka-ai/ui'
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { browser } from '$app/environment'

  interface Props {
    isMobile: boolean
  }

  let { isMobile }: Props = $props()

  const navItems = [
    { path: '/', label: 'Acasă', icon: ExploreIcon }
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
  <TabBar
    tabs={navItems.map(item => ({
      id: item.path,
      label: item.label,
      icon: item.icon
    }))}
    activeTab={currentPath === '/' ? '/' : navItems.find(item => currentPath.startsWith(item.path))?.path || '/'}
    onTabChange={(tabId) => goto(tabId)}
  />
{:else}
  <nav class="flex flex-col h-screen p-6 bg-white border-r border-gray-200">
    <div class="nav-header">
      <h1 class="text-2xl font-bold text-gray-900 mb-1">Senka</h1>
      <p class="text-sm text-gray-600">Aplicația educațională</p>
    </div>
    
    <div class="nav-items flex flex-col gap-2 flex-1 mt-8">
      {#each navItems as item}
        <a 
          href={item.path} 
          class="nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-all duration-200 font-medium"
          class:active={isActive(item.path)}
        >
          <item.icon class="w-5 h-5" />
          <span>{item.label}</span>
        </a>
      {/each}
    </div>
    
    <div class="nav-footer mt-8 pt-6 border-t border-gray-200">
      <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <Avatar
          initials="IP"
          size="medium"
        />
        <div class="user-details">
          <p class="text-sm font-semibold text-gray-900 mb-1">Ion Popescu</p>
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
