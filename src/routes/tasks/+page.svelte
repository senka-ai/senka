<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Badge from '$lib/components/Badge.svelte'
	import Button from '$lib/components/Button.svelte'

	type TaskStatus = 'pending' | 'in_progress' | 'completed'
	type TaskType = 'homework' | 'test' | 'project' | 'reading'

	interface Task {
		id: string
		title: string
		subject: string
		type: TaskType
		status: TaskStatus
		dueDate: string
		description: string
	}

	let tasks: Task[] = [
		{
			id: '1',
			title: 'Exerciții algebra',
			subject: 'Matematică',
			type: 'homework',
			status: 'pending',
			dueDate: '2024-12-20',
			description: 'Rezolvă exercițiile din manualul de matematică, capitolul 5'
		},
		{
			id: '2',
			title: 'Test de evaluare',
			subject: 'Română',
			type: 'test',
			status: 'pending',
			dueDate: '2024-12-21',
			description: 'Test asupra lecturii "Moara cu noroc" de Ioan Slavici'
		},
		{
			id: '3',
			title: 'Proiect de fizică',
			subject: 'Fizică',
			type: 'project',
			status: 'in_progress',
			dueDate: '2024-12-25',
			description: 'Realizează un experiment cu pendulul simplu'
		},
		{
			id: '4',
			title: 'Lectură obligatorie',
			subject: 'Literatură',
			type: 'reading',
			status: 'completed',
			dueDate: '2024-12-15',
			description: 'Citește capitolul 3 din "Moromeții"'
		}
	]

	function getStatusBadge(status: TaskStatus) {
		switch (status) {
			case 'pending': return { variant: 'warning', text: 'În așteptare' }
			case 'in_progress': return { variant: 'default', text: 'În progres' }
			case 'completed': return { variant: 'success', text: 'Completat' }
		}
	}

	function getTypeBadge(type: TaskType) {
		switch (type) {
			case 'homework': return { icon: '📝', text: 'Temă' }
			case 'test': return { icon: '📋', text: 'Test' }
			case 'project': return { icon: '🔬', text: 'Proiect' }
			case 'reading': return { icon: '📚', text: 'Lectură' }
		}
	}

	function toggleTaskStatus(taskId: string) {
		tasks = tasks.map(task => {
			if (task.id === taskId) {
				return {
					...task,
					status: task.status === 'completed' ? 'pending' : 'completed'
				}
			}
			return task
		})
	}
</script>

<div class="tasks-page">
	<header class="tasks-header">
		<h1>Sarcini</h1>
		<Button variant="primary" size="small">
			{#snippet children()}+ Adaugă sarcină{/snippet}
		</Button>
	</header>

	<div class="tasks-grid">
		{#each tasks as task}
			<Card variant="default" class="task-card">
				<div class="task-header">
					<div class="task-type">
						{getTypeBadge(task.type).icon}
						<span>{getTypeBadge(task.type).text}</span>
					</div>
					<Badge 
						type="dot" 
						variant={getStatusBadge(task.status).variant}
						size="small"
					/>
				</div>

				<div class="task-content">
					<h3>{task.title}</h3>
					<p class="task-subject">{task.subject}</p>
					<p class="task-description">{task.description}</p>
				</div>

				<div class="task-footer">
					<div class="task-due">
						<span>Termen limită: {new Date(task.dueDate).toLocaleDateString('ro-RO')}</span>
					</div>
					<div class="task-actions">
						<Button 
							variant="tertiary" 
							size="small"
							onclick={() => toggleTaskStatus(task.id)}
						>
							{#snippet children()}
								{task.status === 'completed' ? 'Marchează ca incomplet' : 'Marchează ca completat'}
							{/snippet}
						</Button>
					</div>
				</div>
			</Card>
		{/each}
	</div>

	{#if tasks.length === 0}
		<div class="empty-state">
			<Card variant="default" class="empty-card">
				<div class="empty-content">
					<div class="empty-icon">📝</div>
					<h2>Nu ai sarcini în acest moment</h2>
					<p>Când profesorii îți vor da teme sau teste, acestea vor apărea aici.</p>
				</div>
			</Card>
		</div>
	{/if}
</div>

<style>
	.tasks-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.tasks-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.tasks-header h1 {
		color: var(--color-text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}

	.tasks-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
		gap: 1.5rem;
	}

	.task-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.task-type {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.task-content h3 {
		color: var(--color-text-primary);
		font-size: 1.1rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.task-subject {
		color: var(--color-text-primary);
		font-size: 0.9rem;
		font-weight: 500;
		margin: 0 0 0.75rem 0;
	}

	.task-description {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.task-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.task-due span {
		color: var(--color-text-secondary);
		font-size: 0.85rem;
	}

	.empty-state {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 300px;
	}

	.empty-content {
		text-align: center;
		padding: 2rem;
	}

	.empty-icon {
		font-size: 4rem;
		margin-bottom: 1rem;
	}

	.empty-content h2 {
		color: var(--color-text-primary);
		font-size: 1.5rem;
		font-weight: 600;
		margin: 0 0 1rem 0;
	}

	.empty-content p {
		color: var(--color-text-secondary);
		font-size: 1rem;
		margin: 0;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.tasks-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.tasks-grid {
			grid-template-columns: 1fr;
		}

		.task-footer {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}
	}
</style>