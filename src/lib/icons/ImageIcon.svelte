<script lang="ts">
  interface Props {
    class?: string
    size?: number | string
  }

  let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_471_8820)">
    <mask id="mask0_471_8820" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="1" width="25" height="21">
      <path
        d="M9.39161 8.71488C9.39161 10.0956 8.31709 11.2149 6.9916 11.2149C5.66612 11.2149 4.59161 10.0956 4.59161 8.71488C4.59161 7.33417 5.66612 6.21489 6.9916 6.21489C8.31709 6.21489 9.39161 7.33417 9.39161 8.71488Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.794922 4.49878C0.794922 3.11807 1.86944 1.99878 3.19492 1.99878H22.3949C23.7204 1.99878 24.7949 3.11807 24.7949 4.49878V19.4988C24.7949 20.8795 23.7204 21.9987 22.3949 21.9987H20.8107C20.8055 21.9988 20.8002 21.9988 20.7949 21.9988H3.7419C3.73738 21.9988 3.73286 21.9988 3.72834 21.9987H3.19492C1.86944 21.9987 0.794922 20.8795 0.794922 19.4988V4.49878ZM3.19492 3.87378H22.3949C22.7263 3.87378 22.9949 4.1536 22.9949 4.49878V12.2889L17.7806 6.9988L8.90953 15.9988L6.29634 13.3476L2.59492 17.1029V4.49878C2.59492 4.1536 2.86355 3.87378 3.19492 3.87378Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0_471_8820)">
      <rect x="0.794922" y="-0.00195312" width="24" height="24" fill="currentColor" />
    </g>
  </g>
  <defs>
    <clipPath id="clip0_471_8820">
      <rect width="24.0009" height="24.0006" fill="white" transform="translate(0.793945 -0.00146484)" />
    </clipPath>
  </defs>
</svg>
