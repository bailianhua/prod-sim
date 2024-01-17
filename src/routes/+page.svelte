<script lang="ts">
	import { factoryStore } from '$lib/model/factory';
	import type { FactoryInterface } from '$lib/model/factory';
	import FactoryCard from '$lib/components/FactoryCard.svelte';
	import ExcessMaterial from '$lib/components/ExcessMaterial.svelte';

	let factories: FactoryInterface[] = [];
	const unsubscribe = factoryStore.subscribe((value) => {
		factories = value;
	});
</script>

<main>
	<ExcessMaterial />
	{#if factories.length !== 0}
		<div class="my-4 flex gap-4">
			{#each factories as factory (factory.name)}
				<FactoryCard name={factory.name} slots={factory.slots} />
			{/each}
		</div>
	{/if}
</main>
