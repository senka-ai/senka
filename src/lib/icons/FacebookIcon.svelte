<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8860" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="-1" width="13" height="25">
		<path d="M9.93969 23.9995V12.738H6.96191V8.68334H9.93969V5.22011C9.93969 2.49868 11.6987 -0.000488281 15.7517 -0.000488281C17.3928 -0.000488281 18.6062 0.156832 18.6062 0.156832L18.5106 3.94322C18.5106 3.94322 17.2731 3.93117 15.9226 3.93117C14.461 3.93117 14.2269 4.60473 14.2269 5.72267V8.68334H18.6268L18.4354 12.738H14.2269V23.9995H9.93969Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8860)">
		<rect x="0.795898" y="-0.000488281" width="24" height="24" fill="currentColor"/>
	</g>
</svg>