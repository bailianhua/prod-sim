<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import Label from './ui/label/label.svelte';
	import { getOverAllmaterials, calculate, factoryStore } from '$lib/model/factory';

	let overAllmaterials = getOverAllmaterials();
	const unsubscribe = factoryStore.subscribe((value) => {
		calculate();
		overAllmaterials = getOverAllmaterials();
	});
</script>

<main>
	<Alert.Root>
		<Alert.Title>Material Balance Sheet</Alert.Title>
		<Alert.Description class="flex pt-4">
			{#if overAllmaterials.length > 0}
				{#each overAllmaterials as material}
					<div
						class="grid w-full max-w-sm items-center gap-1.5"
						class:text-destructive={material.quantity < 0}
					>
						<Label class="text-default"
							>{material.name}
							<span
								class="relative rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold"
							>
								{material.quantity} 
							</span>
						</Label>
					</div>
				{/each}
			{:else}
				<p>No Excess Material</p>
			{/if}
		</Alert.Description>
	</Alert.Root>
</main>
