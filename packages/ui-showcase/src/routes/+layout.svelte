<script lang="ts">
	import '../app.css'
</script>

<div class="showcase-container">
	<header class="mb-8">
		<h1 class="text-3xl font-extrabold mb-2" style="color: var(--color-text-primary)">
			Senka UI Showcase
		</h1>
		<p class="text-base" style="color: var(--color-text-secondary)">
			Interactive examples of UI components from the @senka-ai/ui library
		</p>
	</header>
	
	<main>
		<slot />
	</main>
</div>