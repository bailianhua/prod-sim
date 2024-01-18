<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { slot } from '$lib/model/factory';
	import AddItemCard from '$lib/components/AddItemCard.svelte';
	import { factoryStore, removeFactory, calculateMaterialsNeeded } from '$lib/model/factory';
	import * as Table from '$lib/components/ui/table';

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
		<Card.Title class="flex w-full align-middle">
			<div>
				{name}
				<AddItemCard factoryName={name} />
			</div>
			<Button on:click={() => calculateMaterialsNeeded(name)} size="sm" variant="ghost">
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
					class="lucide lucide-calculator"
					><rect width="16" height="20" x="4" y="2" rx="2" /><line
						x1="8"
						x2="16"
						y1="6"
						y2="6"
					/><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path
						d="M12 10h.01"
					/><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path
						d="M12 18h.01"
					/><path d="M8 18h.01" /></svg
				>
			</Button>
			<Button
				on:click={() => removeFactory(name)}
				size="icon"
				class="ml-auto bg-transparent text-red-500 hover:bg-destructive hover:text-destructive-foreground"
			>
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
					class="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
				>
			</Button></Card.Title
		>
		<Card.Description>{slots.length} items</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		{#if slots.length > 0}
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head class="w-[100px]">Item</Table.Head>
						<Table.Head>per QT</Table.Head>
						<Table.Head>Amount</Table.Head>
						<Table.Head class="text-right"></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each slots as slot, index (index)}
						<Table.Row>
							<Table.Cell class="font-medium">{slot.item}</Table.Cell>
							<Table.Cell>{slot.quantity}</Table.Cell>
							<Table.Cell>{slot.amount}</Table.Cell>
							<Table.Cell class="text-right">
								<Button
									on:click={() => removeItem(index)}
									variant="destructive_icon"
									size="icon"
									class="hover:decoration-blue-400"
								>
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
										class="lucide lucide-trash"
										><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path
											d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
										/></svg
									>
								</Button></Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/if}
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
