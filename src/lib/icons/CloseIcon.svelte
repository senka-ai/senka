<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8791" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="22" height="22">
		<path fill-rule="evenodd" clip-rule="evenodd" d="M2.73719 1.93861C3.32298 1.35282 4.27273 1.35282 4.85851 1.93861L22.8585 19.9386C23.4443 20.5244 23.4443 21.4741 22.8585 22.0599C22.2727 22.6457 21.323 22.6457 20.7372 22.0599L2.73719 4.05993C2.1514 3.47414 2.1514 2.52439 2.73719 1.93861Z" fill="currentColor"/>
		<path fill-rule="evenodd" clip-rule="evenodd" d="M22.8585 1.93861C22.2727 1.35282 21.323 1.35282 20.7372 1.93861L2.73719 19.9386C2.15141 20.5244 2.15141 21.4741 2.73719 22.0599C3.32298 22.6457 4.27273 22.6457 4.85851 22.0599L22.8585 4.05993C23.4443 3.47414 23.4443 2.52439 22.8585 1.93861Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8791)">
		<rect x="0.797852" y="-0.000732422" width="24" height="24" fill="currentColor"/>
	</g>
</svg>