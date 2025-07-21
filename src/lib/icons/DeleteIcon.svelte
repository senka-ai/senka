<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <mask id="mask0_471_8814" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23">
    <circle cx="12.7939" cy="11.9995" r="11" fill="currentColor" />
  </mask>
  <g mask="url(#mask0_471_8814)">
    <rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor" />
  </g>
  <path
    d="M10.1289 7.82082C9.71093 7.40283 9.03324 7.40283 8.61525 7.82082C8.19726 8.2388 8.19726 8.9165 8.61525 9.33449L11.2804 11.9996L8.61525 14.6647C8.19726 15.0827 8.19726 15.7604 8.61525 16.1784C9.03324 16.5964 9.71093 16.5964 10.1289 16.1784L12.794 13.5133L15.4592 16.1784C15.8772 16.5964 16.5549 16.5964 16.9728 16.1784C17.3908 15.7604 17.3908 15.0827 16.9728 14.6647L14.3077 11.9996L16.9728 9.33449C17.3908 8.9165 17.3908 8.2388 16.9728 7.82082C16.5549 7.40283 15.8772 7.40283 15.4592 7.82082L12.794 10.4859L10.1289 7.82082Z"
    fill="white"
  />
</svg>
