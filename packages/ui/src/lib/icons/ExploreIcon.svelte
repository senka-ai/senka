<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_471_8868)">
    <mask id="mask0_471_8868" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="-1" width="25" height="25">
      <path
        d="M14.2939 11.9995C14.2939 12.8292 13.6236 13.4995 12.7939 13.4995C11.9643 13.4995 11.2939 12.8292 11.2939 11.9995C11.2939 11.1698 11.9643 10.4995 12.7939 10.4995C13.6236 10.4995 14.2939 11.1698 14.2939 11.9995ZM0.793945 11.9995C0.793945 5.37139 6.16582 -0.000488281 12.7939 -0.000488281C19.4221 -0.000488281 24.7939 5.37139 24.7939 11.9995C24.7939 18.6276 19.4221 23.9995 12.7939 23.9995C6.16582 23.9995 0.793945 18.6276 0.793945 11.9995ZM16.033 14.3761L18.6346 7.61201C18.9861 6.66045 18.0908 5.80732 17.1814 6.15889L10.4174 8.76045C10.0189 8.91045 9.70488 9.22451 9.55488 9.62295L6.95332 16.387C6.60176 17.2964 7.45488 18.1917 8.40645 17.8401L15.1705 15.2386C15.5689 15.0886 15.883 14.7745 16.033 14.3761Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0_471_8868)">
      <rect x="0.793945" y="-0.00146484" width="24" height="24" fill="currentColor" />
    </g>
  </g>
  <defs>
    <clipPath id="clip0_471_8868">
      <rect width="24" height="24" fill="white" transform="translate(0.793945 -0.000488281)" />
    </clipPath>
  </defs>
</svg>
