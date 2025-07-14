<script lang="ts">
	interface Props {
		class?: string
		size?: number | string
	}

	let { class: className = '', size = 24 }: Props = $props()
</script>

<svg class={className} width={size} height={size} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="mask0_471_8873" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23">
		<path d="M12.7936 0.999512C18.8681 0.999512 23.7922 5.92361 23.7922 11.9982C23.7922 18.0727 18.8681 22.9968 12.7936 22.9968C11.0143 22.9992 9.26113 22.5681 7.68581 21.7408L2.96739 22.9693C2.80973 23.0104 2.64408 23.0095 2.48685 22.9669C2.32962 22.9242 2.18627 22.8412 2.07101 22.726C1.95576 22.6109 1.87259 22.4676 1.82976 22.3104C1.78693 22.1532 1.78592 21.9876 1.82683 21.8299L3.05428 17.1125C2.22476 15.5356 1.79248 13.78 1.79493 11.9982C1.79493 5.92361 6.71903 0.999512 12.7936 0.999512Z" fill="currentColor"/>
	</mask>
	<g mask="url(#mask0_471_8873)">
		<rect x="0.793945" y="-0.000488281" width="24" height="24" fill="currentColor"/>
	</g>
</svg>