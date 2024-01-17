<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import Label from './ui/label/label.svelte';
	import { items } from '$lib/items.json';
	import { factoryStore } from '$lib/model/factory';
	import type { FactoryInterface } from '$lib/model/factory';

	const overAllmaterials = [
		{
			name: 'Lumber',
			quantity: 0
		},
		{
			name: 'Stone',
			quantity: 0
		},
		{
			name: 'Iron ore',
			quantity: 0
		}
	];
	let factories: FactoryInterface[] = [];
	const unsubscribe = factoryStore.subscribe((value) => {
		factories = value;
		overAllmaterials.forEach((material) => {
			material.quantity = 0;
		});
		value.forEach((factory) => {
			factory.slots.forEach((slot) => {
				items.forEach((item) => {
					if (item.name === slot.item && slot.amount !== null) {
						console.log(overAllmaterials, item.name );
						const materialIndex = overAllmaterials.findIndex(
							(material) => material.name == item.name
						);
						console.log(materialIndex);
						if (materialIndex !== -1) {
							item.operate.forEach((operation) => {
								if (operation.material === slot.item && slot.amount !== null) {
									overAllmaterials[materialIndex].quantity += operation.amount * slot.amount;
								}
							});
						}
					}
				});
			});
		});
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
