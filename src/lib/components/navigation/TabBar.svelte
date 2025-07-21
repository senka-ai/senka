<script lang="ts">
	import type { BaseProps } from '../../types/component'

	interface Tab {
		id: string
		label: string
		icon?: any
		disabled?: boolean
	}

	interface Props extends BaseProps {
		tabs: Tab[]
		activeTab?: string
		onTabChange?: (tabId: string) => void
	}

	let { tabs = [], activeTab = $bindable(), class: className = '', onTabChange }: Props = $props()

	// Set default active tab if none provided
	$effect(() => {
		if (!activeTab && tabs.length > 0) {
			const firstEnabledTab = tabs.find((tab) => !tab.disabled)
			if (firstEnabledTab) {
				activeTab = firstEnabledTab.id
			}
		}
	})

	function handleTabClick(tab: Tab) {
		if (!tab.disabled) {
			activeTab = tab.id
			onTabChange?.(tab.id)
		}
	}

	function handleKeydown(event: KeyboardEvent, tab: Tab) {
		switch (event.key) {
			case 'Enter':
			case ' ':
				event.preventDefault()
				handleTabClick(tab)
				break
			case 'ArrowRight':
				event.preventDefault()
				focusNextTab()
				break
			case 'ArrowLeft':
				event.preventDefault()
				focusPreviousTab()
				break
		}
	}

	function focusNextTab() {
		const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
		const nextIndex = (currentIndex + 1) % tabs.length
		const nextTab = tabs[nextIndex]
		if (nextTab && !nextTab.disabled) {
			handleTabClick(nextTab)
		} else {
			// If next tab is disabled, keep looking
			const enabledTabs = tabs.filter((tab) => !tab.disabled)
			const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.id === activeTab)
			const nextEnabledIndex = (currentEnabledIndex + 1) % enabledTabs.length
			handleTabClick(enabledTabs[nextEnabledIndex])
		}
	}

	function focusPreviousTab() {
		const currentIndex = tabs.findIndex((tab) => tab.id === activeTab)
		const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1
		const prevTab = tabs[prevIndex]
		if (prevTab && !prevTab.disabled) {
			handleTabClick(prevTab)
		} else {
			// If previous tab is disabled, keep looking
			const enabledTabs = tabs.filter((tab) => !tab.disabled)
			const currentEnabledIndex = enabledTabs.findIndex((tab) => tab.id === activeTab)
			const prevEnabledIndex = currentEnabledIndex === 0 ? enabledTabs.length - 1 : currentEnabledIndex - 1
			handleTabClick(enabledTabs[prevEnabledIndex])
		}
	}

	let containerClasses = $derived.by(() => {
		const base = 'flex items-center gap-8'
		return `${base} ${className}`
	})

	function getTabClasses(tab: Tab) {
		const base = 'flex flex-col items-center gap-2 cursor-pointer transition-all duration-200'
		const isActive = tab.id === activeTab
		const isDisabled = tab.disabled

		if (isDisabled) {
			return `${base} opacity-50 cursor-not-allowed`
		}

		return base
	}

	function getIconClasses(tab: Tab) {
		const base = 'transition-colors duration-200'
		const isActive = tab.id === activeTab
		const isDisabled = tab.disabled

		if (isDisabled) {
			return `${base} text-neutral-400`
		}

		return isActive ? `${base} text-highlight` : `${base} text-neutral-300 hover:text-neutral-400`
	}

	function getLabelClasses(tab: Tab) {
		const base = 'text-body-xs transition-colors duration-200'
		const isActive = tab.id === activeTab
		const isDisabled = tab.disabled

		if (isDisabled) {
			return `${base} text-neutral-400`
		}

		return isActive ? `${base} text-thick-xs` : `${base} text-neutral-600 hover:text-neutral-800`
	}
</script>

<div class={containerClasses} role="tablist">
	{#each tabs as tab}
		<button
			type="button"
			role="tab"
			aria-selected={tab.id === activeTab}
			aria-disabled={tab.disabled}
			tabindex={tab.disabled ? -1 : 0}
			class={getTabClasses(tab)}
			disabled={tab.disabled}
			onclick={() => handleTabClick(tab)}
			onkeydown={(e) => handleKeydown(e, tab)}
		>
			{#if tab.icon}
				<div class={getIconClasses(tab)}>
					<tab.icon size={20} />
				</div>
			{:else}
				<div
					class="h-5 w-5 rounded-full transition-colors duration-200 {tab.id === activeTab
						? 'bg-highlight'
						: 'bg-neutral-300 hover:bg-neutral-400'} {tab.disabled ? 'bg-neutral-300' : ''}"
				></div>
			{/if}
			<div class="relative">
				<!-- Invisible thick text to reserve space -->
				<span class="text-thick-xs pointer-events-none opacity-0">{tab.label}</span>
				<!-- Visible text -->
				<span class="absolute inset-0 {getLabelClasses(tab)}">{tab.label}</span>
			</div>
		</button>
	{/each}
</div>
