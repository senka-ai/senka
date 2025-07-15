<script lang="ts">
	import Badge from '$lib/components/Badge.svelte'
</script>

<div class="dashboard">
	<header class="dashboard-header">
		<h1>Dashboard</h1>
		<p>Privire de ansamblu asupra activităților tale</p>
	</header>

	<div class="dashboard-grid">
		<div class="quick-stats card-elevated">
			<h2>Statistici rapide</h2>
			<div class="stats-grid">
				<div class="stat-item">
					<div class="stat-number">5</div>
					<div class="stat-label">Teme astăzi</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">3</div>
					<div class="stat-label">Lecții noi</div>
				</div>
				<div class="stat-item">
					<div class="stat-number">2</div>
					<div class="stat-label">Teste programate</div>
				</div>
			</div>
		</div>

		<div class="recent-activity card-default">
			<h2>Activitate recentă</h2>
			<div class="activity-list">
				<div class="activity-item">
					<Badge type="dot" variant="success" />
					<div class="activity-content">
						<p>Temă matematică predată</p>
						<span class="activity-time">acum 2 ore</span>
					</div>
				</div>
				<div class="activity-item">
					<Badge type="dot" variant="warning" />
					<div class="activity-content">
						<p>Lecție de fizică adăugată</p>
						<span class="activity-time">acum 4 ore</span>
					</div>
				</div>
				<div class="activity-item">
					<Badge type="dot" variant="default" />
					<div class="activity-content">
						<p>Orar actualizat</p>
						<span class="activity-time">ieri</span>
					</div>
				</div>
			</div>
		</div>

		<div class="upcoming-tasks card-default">
			<h2>Sarcini apropiate</h2>
			<div class="tasks-list">
				<div class="task-item">
					<div class="task-info">
						<h3>Test de română</h3>
						<p>Mâine, ora 10:00</p>
					</div>
					<Badge type="number" value={1} variant="error" />
				</div>
				<div class="task-item">
					<div class="task-info">
						<h3>Temă de matematică</h3>
						<p>Vineri, ora 14:00</p>
					</div>
					<Badge type="number" value={2} variant="warning" />
				</div>
				<div class="task-item">
					<div class="task-info">
						<h3>Prezentare geografie</h3>
						<p>Luni viitoare</p>
					</div>
					<Badge type="number" value={3} variant="default" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	.dashboard-header {
		margin-bottom: 2rem;
	}

	.dashboard-header h1 {
		color: var(--color-text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}

	.dashboard-header p {
		color: var(--color-text-secondary);
		font-size: 1rem;
		margin: 0;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.card-elevated {
		background: var(--color-surface-elevated);
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	.card-default {
		background: var(--color-surface-default);
		border-radius: 12px;
		padding: 1.5rem;
		border: 1px solid var(--color-border-subtle);
	}

	:global(.quick-stats) {
		grid-column: span 2;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}

	.stat-item {
		text-align: center;
		padding: 1rem;
		background: var(--color-neutral-100);
		border-radius: 8px;
	}

	.stat-number {
		font-size: 2rem;
		font-weight: 700;
		color: var(--color-text-primary);
		margin-bottom: 0.5rem;
	}

	.stat-label {
		font-size: 0.9rem;
		color: var(--color-text-secondary);
	}

	.activity-list, .tasks-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.activity-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: var(--color-neutral-100);
		border-radius: 8px;
	}

	.activity-content p {
		color: var(--color-text-primary);
		font-size: 0.9rem;
		margin: 0 0 0.25rem 0;
	}

	.activity-time {
		color: var(--color-text-secondary);
		font-size: 0.8rem;
	}

	.task-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
		background: var(--color-neutral-100);
		border-radius: 8px;
	}

	.task-info h3 {
		color: var(--color-text-primary);
		font-size: 0.95rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}

	.task-info p {
		color: var(--color-text-secondary);
		font-size: 0.85rem;
		margin: 0;
	}

	h2 {
		color: var(--color-text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	@media (max-width: 768px) {
		:global(.quick-stats) {
			grid-column: span 1;
		}

		.stats-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>