<script>
	import Card from '$lib/components/Card.svelte';
	import Badge from '$lib/components/Badge.svelte';
	import Button from '$lib/components/Button.svelte';

	function handleCardClick(cardType) {
		alert(
			`${cardType} card clicked! Check this component in Storybook for more interactive examples.`
		);
	}
</script>

<main>
	<header>
		<h1>Senka - Storybook Integration Demo</h1>
		<p>
			This page demonstrates custom Svelte components that are documented and tested in Storybook.
		</p>

		<div class="storybook-info">
			<Badge type="number" value={1} variant="success" />
			<span>Run <code>npm run storybook</code> to explore these components interactively!</span>
		</div>
	</header>

	<section class="demo-section">
		<h2>Card Components</h2>
		<div class="cards-grid">
			<Card
				variant="default"
				clickable={true}
				onclick={() => handleCardClick('Default')}
			>
				<h3>Default Card</h3>
				<p>A basic card component with clean styling.</p>
			</Card>

			<Card
				variant="elevated"
				clickable={true}
				onclick={() => handleCardClick('Elevated')}
			>
				<h3>Elevated Card</h3>
				<p>A card with elevation for important content.</p>
				<div class="card-extra">
					<Badge type="number" value={5} variant="success" size="small" />
				</div>
			</Card>

			<Card
				variant="outlined"
			>
				<h3>Outlined Card</h3>
				<p>A card with outlined styling for supporting content.</p>
				<div class="card-extra">
					<Badge type="dot" variant="warning" size="small" />
					<Badge type="icon" variant="default" size="small" />
				</div>
			</Card>
		</div>
	</section>

	<section class="demo-section">
		<h2>Badge Components</h2>
		<div class="badges-showcase">
			<div class="badge-group">
				<h3>Status Badges</h3>
				<Badge type="number" value={1} variant="success" />
				<Badge type="number" value={2} variant="warning" />
				<Badge type="number" value={3} variant="error" />
				<Badge type="number" value={4} variant="default" />
			</div>

			<div class="badge-group">
				<h3>Size Variations</h3>
				<Badge type="number" value={5} size="small" variant="default" />
				<Badge type="number" value={10} size="medium" variant="default" />
				<Badge type="number" value={15} size="large" variant="default" />
			</div>
		</div>
	</section>

	<section class="demo-section">
		<h2>Button Components</h2>
		<div class="counters-grid">
			<div class="counter-demo">
				<h3>Button Variants</h3>
				<div class="button-group">
					<Button variant="primary">
						{#snippet children()}Primary{/snippet}
					</Button>
					<Button variant="secondary">
						{#snippet children()}Secondary{/snippet}
					</Button>
					<Button variant="tertiary">
						{#snippet children()}Tertiary{/snippet}
					</Button>
				</div>
			</div>

			<div class="counter-demo">
				<h3>Button Sizes</h3>
				<div class="button-group">
					<Button size="small">
						{#snippet children()}Small{/snippet}
					</Button>
					<Button size="medium">
						{#snippet children()}Medium{/snippet}
					</Button>
					<Button size="large">
						{#snippet children()}Large{/snippet}
					</Button>
				</div>
			</div>

			<div class="counter-demo">
				<h3>Button States</h3>
				<div class="button-group">
					<Button>
						{#snippet children()}Normal{/snippet}
					</Button>
					<Button disabled>
						{#snippet children()}Disabled{/snippet}
					</Button>
					<Button loading>
						{#snippet children()}Loading{/snippet}
					</Button>
				</div>
			</div>
		</div>
	</section>

	<footer>
		<Card variant="elevated">
			<h3>Storybook Integration</h3>
			<p>All components on this page are fully documented in Storybook with:</p>
			<ul>
				<li>Interactive controls for all props</li>
				<li>Multiple story variations</li>
				<li>Live code examples</li>
				<li>Accessibility testing</li>
			</ul>
			<div style="margin-top: 1rem;">
				<Badge type="icon" variant="success" />
				<Badge type="icon" variant="success" />
				<Badge type="icon" variant="success" />
			</div>
		</Card>
	</footer>
</main>

<style>
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	header {
		text-align: center;
		margin-bottom: 3rem;
	}

	h1 {
		color: #1f2937;
		margin-bottom: 0.5rem;
		font-size: 2.5rem;
	}

	header p {
		color: #6b7280;
		font-size: 1.1rem;
		margin-bottom: 1rem;
	}

	.storybook-info {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 1rem;
		background: #f0f9ff;
		border: 1px solid #0ea5e9;
		border-radius: 8px;
		margin-top: 1rem;
	}

	.storybook-info code {
		background: #1f2937;
		color: #f9fafb;
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		font-family: 'Monaco', 'Menlo', monospace;
	}

	.demo-section {
		margin-bottom: 3rem;
	}

	.demo-section h2 {
		color: #374151;
		margin-bottom: 1.5rem;
		font-size: 1.75rem;
	}

	.cards-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.card-extra {
		margin-top: 1rem;
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badges-showcase {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.badge-group {
		padding: 1.5rem;
		border: 1px solid #e5e7eb;
		border-radius: 8px;
		background: #f9fafb;
	}

	.badge-group h3 {
		margin: 0 0 1rem 0;
		color: #374151;
		font-size: 1.1rem;
	}

	.badge-group :global(.badge) {
		margin-right: 0.5rem;
		margin-bottom: 0.5rem;
	}

	.counters-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.counter-demo {
		text-align: center;
	}

	.counter-demo h3 {
		margin-bottom: 1rem;
		color: #374151;
		font-size: 1.1rem;
	}

	.button-group {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	footer {
		margin-top: 4rem;
	}

	footer ul {
		margin: 1rem 0;
		padding-left: 1.5rem;
	}

	footer li {
		margin-bottom: 0.5rem;
		color: #4b5563;
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
		}

		.cards-grid,
		.counters-grid {
			grid-template-columns: 1fr;
		}

		.storybook-info {
			flex-direction: column;
			text-align: center;
		}
	}
</style>
