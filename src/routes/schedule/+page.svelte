<script lang="ts">
	import Button from '$lib/components/Button.svelte'

	type ViewMode = 'day' | 'week'
	let viewMode = $state<ViewMode>('day')

	const schedule = {
		day: [
			{ time: '08:00 - 09:00', subject: 'Matematică', room: 'Sala 201' },
			{ time: '09:00 - 10:00', subject: 'Română', room: 'Sala 105' },
			{ time: '10:20 - 11:20', subject: 'Fizică', room: 'Laborator 1' },
			{ time: '11:20 - 12:20', subject: 'Chimie', room: 'Laborator 2' },
			{ time: '12:40 - 13:40', subject: 'Istorie', room: 'Sala 301' },
			{ time: '13:40 - 14:40', subject: 'Geografie', room: 'Sala 302' },
		],
		week: [
			{ day: 'Luni', subjects: ['Matematică', 'Română', 'Fizică', 'Chimie', 'Istorie', 'Geografie'] },
			{ day: 'Marți', subjects: ['Engleză', 'Matematică', 'Biologie', 'Sport', 'Română', 'Informatică'] },
			{ day: 'Miercuri', subjects: ['Fizică', 'Chimie', 'Matematică', 'Istorie', 'Geografie', 'Artă'] },
			{ day: 'Joi', subjects: ['Română', 'Engleză', 'Biologie', 'Matematică', 'Muzică', 'Sport'] },
			{ day: 'Vineri', subjects: ['Informatică', 'Fizică', 'Chimie', 'Română', 'Matematică', 'Consiliere'] },
		]
	}

	function setViewMode(mode: ViewMode) {
		viewMode = mode
	}
</script>

<div class="schedule-page">
	<header class="schedule-header">
		<h1>Orar</h1>
		<div class="view-toggle">
			<Button 
				variant={viewMode === 'day' ? 'primary' : 'tertiary'} 
				size="small"
				onclick={() => setViewMode('day')}
			>
				{#snippet children()}Ziua{/snippet}
			</Button>
			<Button 
				variant={viewMode === 'week' ? 'primary' : 'tertiary'} 
				size="small"
				onclick={() => setViewMode('week')}
			>
				{#snippet children()}Săptămâna{/snippet}
			</Button>
		</div>
	</header>

	{#if viewMode === 'day'}
		<div class="card">
			<h2>Programul zilei - Astăzi</h2>
			<div class="schedule-list">
				{#each schedule.day as item}
					<div class="schedule-item">
						<div class="schedule-time">
							{item.time}
						</div>
						<div class="schedule-content">
							<h3>{item.subject}</h3>
							<p>{item.room}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class="week-schedule">
			{#each schedule.week as daySchedule}
				<div class="card">
					<h2>{daySchedule.day}</h2>
					<div class="subjects-list">
						{#each daySchedule.subjects as subject, index}
							<div class="subject-item">
								<span class="subject-number">{index + 1}</span>
								<span class="subject-name">{subject}</span>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.schedule-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.schedule-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.schedule-header h1 {
		color: var(--color-text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}

	.view-toggle {
		display: flex;
		gap: 0.5rem;
	}

	.schedule-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: 1rem;
	}

	.schedule-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 1rem;
		background: var(--color-neutral-100);
		border-radius: 8px;
	}

	.schedule-time {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		min-width: 120px;
	}

	.schedule-content h3 {
		color: var(--color-text-primary);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 0.25rem 0;
	}

	.schedule-content p {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		margin: 0;
	}

	.week-schedule {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.subjects-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		margin-top: 1rem;
	}

	.subject-item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem;
		background: var(--color-neutral-100);
		border-radius: 6px;
	}

	.subject-number {
		background: var(--color-text-primary);
		color: var(--color-background);
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8rem;
		font-weight: 600;
		flex-shrink: 0;
	}

	.subject-name {
		color: var(--color-text-primary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	h2 {
		color: var(--color-text-primary);
		font-size: 1.25rem;
		font-weight: 600;
		margin: 0;
	}

	@media (max-width: 768px) {
		.schedule-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.schedule-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.schedule-time {
			min-width: auto;
		}

		.week-schedule {
			grid-template-columns: 1fr;
		}
	}
</style>