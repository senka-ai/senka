<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8883" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="-1" width="23" height="23">
		<path d="M6.03867 21.9995V7.15615H1.32314V21.9995H6.03867ZM3.68151 5.12832C5.3259 5.12832 6.34946 3.98853 6.34946 2.56416C6.31882 1.10767 5.32597 -0.000488281 3.71272 -0.000488281C2.09972 -0.000488281 1.04492 1.10769 1.04492 2.56416C1.04492 3.98859 2.06822 5.12832 3.65073 5.12832H3.68151ZM8.6487 21.9995H13.3642V13.7103C13.3642 13.2666 13.3949 12.8235 13.5194 12.5063C13.8603 11.62 14.6362 10.702 15.9388 10.702C17.6452 10.702 18.3278 12.0631 18.3278 14.0585V21.9994H23.043V13.4884C23.043 8.92906 20.7167 6.80767 17.6141 6.80767C15.0703 6.80767 13.9534 8.29535 13.3329 9.30861H13.3643V7.15584H8.64881C8.71069 8.54866 8.6487 21.9995 8.6487 21.9995Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8883)">
		<rect x="0.0439453" y="-0.000488281" width="24" height="24" fill="currentColor"/>
	</g>
</svg>