<script lang="ts">
	import Card from '$lib/components/Card.svelte'
	import Badge from '$lib/components/Badge.svelte'
	import Button from '$lib/components/Button.svelte'

	interface Lesson {
		id: string
		title: string
		subject: string
		description: string
		duration: string
		status: 'new' | 'in_progress' | 'completed'
		materials: string[]
	}

	let lessons: Lesson[] = [
		{
			id: '1',
			title: 'Ecuații de gradul al II-lea',
			subject: 'Matematică',
			description: 'Învață să rezolvi ecuații de gradul al II-lea folosind formula și discriminantul',
			duration: '45 min',
			status: 'new',
			materials: ['Video explicativ', 'Fișă de lucru', 'Exemple rezolvate']
		},
		{
			id: '2',
			title: 'Moara cu noroc - Analiza personajelor',
			subject: 'Română',
			description: 'Analizează personajele principale din nuvela lui Ioan Slavici',
			duration: '30 min',
			status: 'in_progress',
			materials: ['Text integral', 'Schemă de analiză', 'Întrebări ghid']
		},
		{
			id: '3',
			title: 'Legile lui Newton',
			subject: 'Fizică',
			description: 'Explorează cele trei legi fundamentale ale dinamicii',
			duration: '60 min',
			status: 'completed',
			materials: ['Simulare interactivă', 'Probleme rezolvate', 'Formule esențiale']
		},
		{
			id: '4',
			title: 'Tabelul periodic',
			subject: 'Chimie',
			description: 'Înțelege structura și organizarea tabelului periodic al elementelor',
			duration: '40 min',
			status: 'new',
			materials: ['Tabel interactiv', 'Joc educativ', 'Fișă de memorare']
		}
	]

	function getStatusBadge(status: Lesson['status']) {
		switch (status) {
			case 'new': return { variant: 'default', text: 'Nou' }
			case 'in_progress': return { variant: 'warning', text: 'În progres' }
			case 'completed': return { variant: 'success', text: 'Completat' }
		}
	}

	function startLesson(lessonId: string) {
		lessons = lessons.map(lesson => {
			if (lesson.id === lessonId && lesson.status === 'new') {
				return { ...lesson, status: 'in_progress' }
			}
			return lesson
		})
	}

	function completeLesson(lessonId: string) {
		lessons = lessons.map(lesson => {
			if (lesson.id === lessonId) {
				return { ...lesson, status: 'completed' }
			}
			return lesson
		})
	}
</script>

<div class="lessons-page">
	<header class="lessons-header">
		<h1>Lecții</h1>
		<Button variant="primary" size="small">
			{#snippet children()}+ Adaugă lecție{/snippet}
		</Button>
	</header>

	<div class="lessons-grid">
		{#each lessons as lesson}
			<Card variant="default" class="lesson-card">
				<div class="lesson-header">
					<div class="lesson-subject">
						<Badge type="dot" variant="default" size="small" />
						<span>{lesson.subject}</span>
					</div>
					<Badge 
						type="dot" 
						variant={getStatusBadge(lesson.status).variant}
						size="small"
					/>
				</div>

				<div class="lesson-content">
					<h3>{lesson.title}</h3>
					<p class="lesson-description">{lesson.description}</p>
					<div class="lesson-duration">
						<span>⏱️ {lesson.duration}</span>
					</div>
				</div>

				<div class="lesson-materials">
					<h4>Materiale disponibile:</h4>
					<ul>
						{#each lesson.materials as material}
							<li>{material}</li>
						{/each}
					</ul>
				</div>

				<div class="lesson-actions">
					{#if lesson.status === 'new'}
						<Button 
							variant="primary" 
							size="small"
							onclick={() => startLesson(lesson.id)}
						>
							{#snippet children()}Începe lecția{/snippet}
						</Button>
					{:else if lesson.status === 'in_progress'}
						<Button 
							variant="secondary" 
							size="small"
						>
							{#snippet children()}Continuă lecția{/snippet}
						</Button>
						<Button 
							variant="tertiary" 
							size="small"
							onclick={() => completeLesson(lesson.id)}
						>
							{#snippet children()}Marchează ca completat{/snippet}
						</Button>
					{:else}
						<Button 
							variant="tertiary" 
							size="small"
						>
							{#snippet children()}Revizuiește{/snippet}
						</Button>
					{/if}
				</div>
			</Card>
		{/each}
	</div>

	{#if lessons.length === 0}
		<div class="empty-state">
			<Card variant="default" class="empty-card">
				<div class="empty-content">
					<div class="empty-icon">📖</div>
					<h2>Nu ai lecții disponibile</h2>
					<p>Când profesorii vor adăuga lecții noi, acestea vor apărea aici.</p>
				</div>
			</Card>
		</div>
	{/if}
</div>

<style>
	.lessons-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.lessons-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
	}

	.lessons-header h1 {
		color: var(--color-text-primary);
		font-size: 2rem;
		font-weight: 700;
		margin: 0;
	}

	.lessons-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
		gap: 1.5rem;
	}

	.lesson-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.lesson-subject {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
	}

	.lesson-content h3 {
		color: var(--color-text-primary);
		font-size: 1.2rem;
		font-weight: 600;
		margin: 0 0 0.75rem 0;
	}

	.lesson-description {
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		line-height: 1.5;
		margin: 0 0 1rem 0;
	}

	.lesson-duration {
		color: var(--color-text-secondary);
		font-size: 0.85rem;
		margin-bottom: 1rem;
	}

	.lesson-materials {
		margin-bottom: 1.5rem;
	}

	.lesson-materials h4 {
		color: var(--color-text-primary);
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0 0 0.5rem 0;
	}

	.lesson-materials ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.lesson-materials li {
		color: var(--color-text-secondary);
		font-size: 0.85rem;
		padding: 0.25rem 0;
		padding-left: 1rem;
		position: relative;
	}

	.lesson-materials li::before {
		content: '📄';
		position: absolute;
		left: 0;
		top: 0.25rem;
	}

	.lesson-actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
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
		.lessons-header {
			flex-direction: column;
			gap: 1rem;
			align-items: flex-start;
		}

		.lessons-grid {
			grid-template-columns: 1fr;
		}

		.lesson-actions {
			flex-direction: column;
		}
	}
</style>