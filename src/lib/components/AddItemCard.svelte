<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Check, ChevronsUpDown, ShoppingBasket } from 'lucide-svelte';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { tick } from 'svelte';
	import Input from './ui/input/input.svelte';
	import { items } from '$lib/items.json';
	import { factoryStore } from '$lib/model/factory';
	import type { slot } from '$lib/model/factory';
	let open = false;
	let value = '';
	export let factoryName: string;
	let item: slot = { item: '', amount: 0 };
	$: selectedValue = items.find((f) => f.name === value)?.name ?? 'Select a item...';
	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
	function addItem() {
		factoryStore.update((value) => {
			// Check if the factory already exists in the store
			const existingFactory = value.find((factory) => factory.name === factoryName);

			if (existingFactory) {
				// If the factory exists, add the new slot to its slots array
				const updatedFactory = {
					...existingFactory,
					slots: [...existingFactory.slots, { item: item.item, amount: item.amount }]
				};

				// Replace the existing factory with the updated factory in the array
				return value.map((factory) => (factory.name === factoryName ? updatedFactory : factory));
			} else {
				// If the factory doesn't exist, create a new factory object and add it to the array
				const newFactory = {
					name: factoryName,
					slots: [{ item: item.item, amount: item.amount }]
				};

				return [...value, newFactory];
			}
		});
		resetItem();
	}

	function resetItem() {
		item = { item: '', amount: 0 };
		selectedValue = 'Select a item...';
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' }) + ' text-cyan-800'}>
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
			class="lucide lucide-shopping-basket mr-2 h-4 w-4"
			><path d="m5 11 4-7" /><path d="m19 11-4-7" /><path d="M2 11h20" /><path
				d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"
			/><path d="m9 11 1 9" /><path d="M4.5 15.5h15" /><path d="m15 11-1 9" /></svg
		>Add Item</Dialog.Trigger
	>
	<Dialog.Content
		><Dialog.Header>
			<Dialog.Title>Add item</Dialog.Title>
		</Dialog.Header>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex w-3/4 gap-4">
					<Popover.Root bind:open let:ids>
						<Popover.Trigger asChild let:builder>
							<Button
								builders={[builder]}
								variant="outline"
								role="combobox"
								aria-expanded={open}
								class="w-[200px] justify-between"
							>
								{selectedValue}
								<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
							</Button>
						</Popover.Trigger>
						<Popover.Content class="w-[200px] p-0">
							<Command.Root>
								<Command.Input placeholder="Search item..." />
								<Command.Empty>No item found.</Command.Empty>
								<Command.Group>
									{#each items as DDLitem}
										<Command.Item
											value={DDLitem.name}
											onSelect={(currentValue: string) => {
												value = currentValue;
												item.item = currentValue;
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											{DDLitem.name}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
					<Input
						class="w-1/5 flex-auto"
						id="amount"
						type="number"
						autocomplete="off"
						bind:value={item.amount}
						on:focus={() => (item.amount = Number(item.amount) < 1 ? null : Number(item.amount))}
					/>
				</div>
			</div>
		</form>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="button" variant="destructive" on:click={resetItem}>Cancel</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button type="button" variant="default" on:click={addItem}>Add</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
