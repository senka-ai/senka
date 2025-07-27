<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="mask0_471_8868">
      <rect x="0" y="0" width="25" height="24" fill="black" />
      <circle cx="12.7939" cy="11.9995" r="12" fill="white" />
      <path
        d="M16.033 14.3761L18.6346 7.61201C18.9861 6.66045 18.0908 5.80732 17.1814 6.15889L10.4174 8.76045C10.0189 8.91045 9.70488 9.22451 9.55488 9.62295L6.95332 16.387C6.60176 17.2964 7.45488 18.1917 8.40645 17.8401L15.1705 15.2386C15.5689 15.0886 15.883 14.7745 16.033 14.3761Z"
        fill="black"
      />
    </mask>
  </defs>
  <rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor" mask="url(#mask0_471_8868)" />
  <circle cx="12.7939" cy="11.9995" r="1.5" fill="currentColor" />
</svg>
