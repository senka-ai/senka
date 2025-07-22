<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg
  class={className}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="5" />
  <path d="M12 1v2" />
  <path d="M12 21v2" />
  <path d="M4.22 4.22l1.42 1.42" />
  <path d="M18.36 18.36l1.42 1.42" />
  <path d="M1 12h2" />
  <path d="M21 12h2" />
  <path d="M4.22 19.78l1.42-1.42" />
  <path d="M18.36 5.64l1.42-1.42" />
</svg>
