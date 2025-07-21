import { browser } from '$app/environment'

type Theme = 'light' | 'dark'

let currentTheme: Theme = 'light'
let initialized = false
let listeners: Array<(theme: Theme) => void> = []

function getInitialTheme(): Theme {
  if (!browser) return 'light'

  const savedTheme = localStorage.getItem('theme')
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    return savedTheme as Theme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

// Initialize theme on first access
function ensureInitialized(): void {
  if (!initialized && browser) {
    currentTheme = getInitialTheme()
    initialized = true
    applyThemeToDOM()
    setupSystemThemeListener()
  }
}

// Apply theme to DOM
function applyThemeToDOM(): void {
  if (browser) {
    document.documentElement.setAttribute('data-theme', currentTheme)
  }
}

// Setup system theme change listener
function setupSystemThemeListener(): void {
  if (browser) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only auto-change if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)
  }
}

// Notify listeners of theme change
function notifyListeners(): void {
  listeners.forEach((listener) => listener(currentTheme))
}

// Public API
export function getTheme(): Theme {
  ensureInitialized()
  return currentTheme
}

export function setTheme(newTheme: Theme): void {
  if (newTheme === 'light' || newTheme === 'dark') {
    ensureInitialized()
    currentTheme = newTheme

    if (browser) {
      localStorage.setItem('theme', currentTheme)
      applyThemeToDOM()
    }

    notifyListeners()
  }
}

export function toggleTheme(): void {
  setTheme(currentTheme === 'light' ? 'dark' : 'light')
}

// For reactive access in components - returns a reactive state
export function useTheme() {
  ensureInitialized()

  // Create reactive state inside the component context
  const theme = $state({ current: currentTheme })

  // Subscribe to changes
  const unsubscribe = subscribe((newTheme) => {
    theme.current = newTheme
  })

  // Return reactive getter and cleanup
  return {
    get current(): Theme {
      return theme.current
    },
    destroy: unsubscribe,
  }
}

// Subscribe to theme changes
export function subscribe(listener: (theme: Theme) => void): () => void {
  listeners.push(listener)
  listener(currentTheme) // Call immediately with current value

  return () => {
    const index = listeners.indexOf(listener)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}
