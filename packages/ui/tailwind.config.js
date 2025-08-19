/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // This will be extended by consuming apps
    // They should add their own content paths
  ],
  theme: {
    extend: {
      colors: {
        // Senka Design System Colors
        highlight: {
          50: 'var(--color-highlight-50)',
          100: 'var(--color-highlight-100)', 
          200: 'var(--color-highlight-200)',
          300: 'var(--color-highlight-300)',
          400: 'var(--color-highlight-400)',
          DEFAULT: 'var(--color-highlight-400)', // bg-highlight
          hover: 'var(--color-highlight-300)', // bg-highlight-hover
          light: 'var(--color-highlight-50)', // bg-highlight-light
        },
        neutral: {
          50: 'var(--color-neutral-50)',
          100: 'var(--color-neutral-100)',
          200: 'var(--color-neutral-200)', 
          300: 'var(--color-neutral-300)',
          400: 'var(--color-neutral-400)',
          500: 'var(--color-neutral-500)',
          600: 'var(--color-neutral-600)',
          700: 'var(--color-neutral-700)',
          800: 'var(--color-neutral-800)',
          900: 'var(--color-neutral-900)',
          DEFAULT: 'var(--color-neutral-600)', // bg-neutral
          disabled: 'var(--color-neutral-400)', // bg-neutral-disabled
        },
        success: {
          50: 'var(--color-success-50)',
          100: 'var(--color-success-100)',
          200: 'var(--color-success-200)',
          300: 'var(--color-success-300)',
          400: 'var(--color-success-400)',
          DEFAULT: 'var(--color-success-300)', // bg-success
        },
        warning: {
          50: 'var(--color-warning-50)',
          100: 'var(--color-warning-100)',
          200: 'var(--color-warning-200)',
          300: 'var(--color-warning-300)',
          400: 'var(--color-warning-400)',
          DEFAULT: 'var(--color-warning-300)', // bg-warning
        },
        error: {
          50: 'var(--color-error-50)',
          100: 'var(--color-error-100)',
          200: 'var(--color-error-200)',
          300: 'var(--color-error-300)',
          400: 'var(--color-error-400)',
          DEFAULT: 'var(--color-error-300)', // bg-error
        },
        // Semantic color aliases
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        'surface-elevated': 'var(--color-surface-elevated)',
        'surface-hover': 'var(--color-surface-hover)',
        primary: 'var(--color-text-primary)', // text-primary
        secondary: 'var(--color-text-secondary)', // text-secondary  
        muted: 'var(--color-text-muted)', // text-muted
        'border-default': 'var(--color-border-default)', // border-default
        'border-strong': 'var(--color-border-strong)', // border-strong
        'border-subtle': 'var(--color-border-subtle)', // border-subtle
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      spacing: {
        // Custom spacing scale from design system
        '0.25': '0.0625rem', // 1px
        '0.5': '0.125rem',   // 2px
        '0.75': '0.1875rem', // 3px
        '1.25': '0.3125rem', // 5px
        '1.75': '0.4375rem', // 7px
        '2.25': '0.5625rem', // 9px
        '2.75': '0.6875rem', // 11px
        '3.25': '0.8125rem', // 13px
        '3.75': '0.9375rem', // 15px
        '4.25': '1.0625rem', // 17px
        '4.75': '1.1875rem', // 19px
      },
    },
  },
  plugins: [],
}