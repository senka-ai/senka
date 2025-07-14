<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8782" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="5" y="0" width="15" height="24">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M6.24745 0.938607C5.64538 1.52439 5.64538 2.47414 6.24745 3.05993L15.4353 11.9993L6.24745 20.9386C5.64538 21.5244 5.64538 22.4741 6.24745 23.0599C6.84952 23.6457 7.82567 23.6457 8.42775 23.0599L19.7959 11.9993L8.42775 0.938607C7.82567 0.352821 6.84952 0.352821 6.24745 0.938607Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8782)">
		<rect x="0.794922" y="-0.00268555" width="24" height="24" fill="currentColor"/>
	</g>
</svg>