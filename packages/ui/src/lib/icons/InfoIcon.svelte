<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <mask id="mask0_471_8804">
      <rect x="0" y="0" width="25" height="24" fill="black" />
      <circle cx="12.7939" cy="11.9995" r="11" fill="white" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.427 10.8128C10.427 10.2605 10.8747 9.81279 11.427 9.81279H12.7938C13.346 9.81279 13.7938 10.2605 13.7938 10.8128V15.4695H14.9996C15.5519 15.4695 15.9996 15.9173 15.9996 16.4695C15.9996 17.0218 15.5519 17.4695 14.9996 17.4695H10.5879C10.0356 17.4695 9.58789 17.0218 9.58789 16.4695C9.58789 15.9173 10.0356 15.4695 10.5879 15.4695H11.7938V11.8128H11.427C10.8747 11.8128 10.427 11.3651 10.427 10.8128Z"
        fill="black"
      />
      <path
        d="M14.0264 7.83803C14.0264 8.56068 13.4406 9.14651 12.7179 9.14651C11.9952 9.14651 11.4094 8.56068 11.4094 7.83803C11.4094 7.11537 11.9952 6.52954 12.7179 6.52954C13.4406 6.52954 14.0264 7.11537 14.0264 7.83803Z"
        fill="black"
      />
    </mask>
  </defs>
  <rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor" mask="url(#mask0_471_8804)" />
</svg>
