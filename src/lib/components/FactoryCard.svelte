<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { slot } from '$lib/model/factory';
	import AddItemCard from '$lib/components/AddItemCard.svelte';
	import Input from './ui/input/input.svelte';
	import Label from './ui/label/label.svelte';
	import { Trash } from 'lucide-svelte';
	import { factoryStore } from '$lib/model/factory';

	export let name: string;
	export let slots: slot[];

	function removeItem(index: number) {
		factoryStore.update((value) => {
			const existingFactory = value.find((factory) => factory.name === name);

			if (existingFactory) {
				const updatedSlots = [
					...existingFactory.slots.slice(0, index),
					...existingFactory.slots.slice(index + 1)
				];
				const updatedFactory = { ...existingFactory, slots: updatedSlots };
				return value.map((factory) => (factory.name === name ? updatedFactory : factory));
			}

			return value;
		});
	}
</script>

<Card.Root class="w-[380px]">
	<Card.Header>
		<Card.Title>{name} <AddItemCard factoryName={name} /></Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if slots.length > 0}
			<div>
				{#each slots as slot, index (index)}
					<div class="flex w-full max-w-sm items-center gap-1.5">
						<Label class="w-4/5" for="item">{slot.item}</Label>
						<Input class="w-1/5" type="text" id="item" value={slot.amount} readonly />
						<Button on:click={() => removeItem(index)} variant="destructive_icon" size="icon" class="hover:decoration-blue-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="lucide lucide-x"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</Button>
					</div>
				{/each}
			</div>
		{/if}
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
