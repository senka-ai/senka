Svelte 4 vs Svelte 5

We should use Svelte 5

Reactivity syntax changes
At the heart of Svelte 5 is the new runes API. Runes are basically compiler instructions that inform Svelte about reactivity. Syntactically, runes are functions starting with a dollar-sign.

let → $state
In Svelte 4, a let declaration at the top level of a component was implicitly reactive. In Svelte 5, things are more explicit: a variable is reactive when created using the $state rune. Let’s migrate the counter to runes mode by wrapping the counter in $state:

<script>
	let count = $state(0);
</script>

Nothing else changes. count is still the number itself, and you read and write directly to it, without a wrapper like .value or getCount().

$: → $derived/$effect
In Svelte 4, a $: statement at the top level of a component could be used to declare a derivation, i.e. state that is entirely defined through a computation of other state. In Svelte 5, this is achieved using the $derived rune:

<script>
	let count = $state(0);
	const double = $derived(count * 2);
</script>

As with $state, nothing else changes. double is still the number itself, and you read it directly, without a wrapper like .value or getDouble().

A $: statement could also be used to create side effects. In Svelte 5, this is achieved using the $effect rune:

<script>
	let count = $state(0);

	$effect(() => {
		if (count > 5) {
			alert('Count is too high!');
		}
	});
</script>

Note that when $effect runs is different than when $: runs.

export let → $props
In Svelte 4, properties of a component were declared using export let. Each property was one declaration. In Svelte 5, all properties are declared through the $props rune, through destructuring:

Svelte 4:

<script>
	export let optional = 'unset';
	export let required;
</script>

Svelte 5:

<script>
	let { optional = 'unset', required } = $props();
</script>

There are multiple cases where declaring properties becomes less straightforward than having a few export let declarations:

you want to rename the property, for example because the name is a reserved identifier (e.g. class)
you don’t know which other properties to expect in advance
you want to forward every property to another component
All these cases need special syntax in Svelte 4:

renaming: export { klass as class}
other properties: $$restProps
all properties $$props
In Svelte 5, the $props rune makes this straightforward without any additional Svelte-specific syntax:

renaming: use property renaming let { class: klass } = $props();
other properties: use spreading let { foo, bar, ...rest } = $props();
all properties: don’t destructure let props = $props();

Svelte 4:

<script>
	let klass = '';
	export { klass as class};
</script>

<button class={klass} {...$$restProps}>click me</button>

Svelte 5:

<script>
	let { class: klass, ...rest } = $props();
</script>

<button class={klass} {...rest}>click me</button>

# Event changes

Event handlers have been given a facelift in Svelte 5. Whereas in Svelte 4 we use the on: directive to attach an event listener to an element, in Svelte 5 they are properties like any other (in other words - remove the colon):

Svelte 5:

<script>
	let count = $state(0);

	function onclick() {
		count++;
	}
</script>

<button {onclick}>
clicks: {count}
</button>

...though when using a named event handler function it’s usually better to use a more descriptive name.

# Component events

In Svelte 4, components could emit events by creating a dispatcher with createEventDispatcher.

This function is deprecated in Svelte 5. Instead, components should accept callback props - which means you then pass functions as properties to these components:

Svelte 4:

<script lang="ts">
	import Pump from './Pump.svelte';

	let size = $state(15);
	let burst = $state(false);

	function reset() {
		size = 15;
		burst = false;
	}
</script>

<Pump
on:inflate={(power) => {
size += power.detail;
if (size > 75) burst = true;
}}
on:deflate={(power) => {
if (size > 0) size -= power.detail;
}}
/>

{#if burst}
<button onclick={reset}>new balloon</button>
<span class="boom">💥</span>
{:else}
<span class="balloon" style="scale: {0.01 * size}">
🎈
</span>
{/if}

Svelte 5:

<script lang="ts">
	let { inflate, deflate } = $props();
	let power = $state(5);
</script>

<button onclick={() => inflate(power)}>
inflate
</button>
<button onclick={() => deflate(power)}>
deflate
</button>
<button onclick={() => power--}>-</button>
Pump power: {power}
<button onclick={() => power++}>+</button>

# Bubbling events

Instead of doing <button on:click> to ‘forward’ the event from the element to the component, the component should accept an onclick callback prop:

<script>
	let { onclick } = $props();
</script>

<button {onclick}>
click me
</button>

Note that this also means you can ‘spread’ event handlers onto the element along with other props instead of tediously forwarding each event separately:

<script>
	let props = $props();
</script>

<button {...props}>
click me
</button>

# Event modifiers

In Svelte 4, you can add event modifiers to handlers:

<button on:click|once|preventDefault={handler}>...</button>

Modifiers are specific to on: and as such do not work with modern event handlers. Adding things like event.preventDefault() inside the handler itself is preferable, since all the logic lives in one place rather than being split between handler and modifiers.

Since event handlers are just functions, you can create your own wrappers as necessary:

<script>
	function once(fn) {
		return function (event) {
			if (fn) fn.call(this, event);
			fn = null;
		};
	}

	function preventDefault(fn) {
		return function (event) {
			event.preventDefault();
			fn.call(this, event);
		};
	}
</script>

<button onclick={once(preventDefault(handler))}>...</button>
There are three modifiers — capture, passive and nonpassive — that can’t be expressed as wrapper functions, since they need to be applied when the event handler is bound rather than when it runs.

For capture, we add the modifier to the event name:

<button onclickcapture={...}>...</button>
Changing the passive option of an event handler, meanwhile, is not something to be done lightly. If you have a use case for it — and you probably don’t! — then you will need to use an action to apply the event handler yourself.

# Snippets instead of slots

In Svelte 4, content can be passed to components using slots. Svelte 5 replaces them with snippets which are more powerful and flexible, and as such slots are deprecated in Svelte 5.

They continue to work, however, and you can pass snippets to a component that uses slots:

Child

<slot />
<hr />
<slot name="foo" message="hello" />
Parent

<script lang="ts">
	import Child from './Child.svelte';
</script>

<Child>
	default child content

    {#snippet foo({ message })}
    	message from child: {message}
    {/snippet}

</Child>
(The reverse is not true — you cannot pass slotted content to a component that uses {@render ...} tags.)

When using custom elements, you should still use <slot /> like before. In a future version, when Svelte removes its internal version of slots, it will leave those slots as-is, i.e. output a regular DOM tag instead of transforming it.

## Default content

In Svelte 4, the easiest way to pass a piece of UI to the child was using a <slot />.

In Svelte 5, this is done using the children prop instead, which is then shown with {@render children()}:

<script>
	let { children } = $props();
</script>

{@render children?.()}

## Multiple content placeholders

If you wanted multiple UI placeholders, you had to use named slots. In Svelte 5, use props instead, name them however you like and {@render ...} them:

Svelte 4:

<header>
	<slot name="header" />
</header>

<main>
	<slot name="main" />
</main>

<footer>
	<slot name="footer" />
</footer>

Svelte 5:

<script>
	let { header, main, footer } = $props();
</script>

<header>
	{@render header()}
</header>

<main>
	{@render main()}
</main>

<footer>
	{@render footer()}
</footer>

## Passing data back up

In Svelte 4, you would pass data to a <slot /> and then retrieve it with let: in the parent component. In Svelte 5, snippets take on that responsibility:

Svelte 4:

App.svelte

<script lang="ts">
	import List from './List.svelte';
</script>

<List items={['one', 'two', 'three']} let:item>
<span>{text}</span>
<span slot="empty">No items yet</span>
</List>

List.svelte
{#if items.length}

<ul>
{#each items as entry}
<li>
<slot item={entry} />
</li>
{/each}
</ul>
{:else}
<slot name="empty" />
{/if}

Svelte 5:

App.svelte

<script lang="ts">
	import List from './List.svelte';
</script>

<List items={['one', 'two', 'three']}>
{#snippet item(text)}
<span>{text}</span>
{/snippet}
{#snippet empty()}
<span>No items yet</span>
{/snippet}
</List>

List.svelte

<script lang="ts">
	let { items, item, empty } = $props();
</script>

{#if items.length}

<ul>
{#each items as entry}
<li>
{@render item(entry)}
</li>
{/each}
</ul>
{:else}
{@render empty?.()}
{/if}

# Comments

Don't use inline comments like this {/_ this is a comment _/}

# $derived.by

Sometimes you need to create complex derivations that don’t fit inside a short expression. In these cases, you can use $derived.by which accepts a function as its argument.

<script>
	let numbers = $state([1, 2, 3]);
	let total = $derived.by(() => {
		let total = 0;
		for (const n of numbers) {
			total += n;
		}
		return total;
	});
</script>
