<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Factory } from 'lucide-svelte';
	import { addFactory } from '$lib/model/factory';

	let name: string;
</script>

<Dialog.Root>
	<Dialog.Trigger class={$$restProps.class + ' ' + buttonVariants({ variant: 'outline' })}>
		<Factory class="mr-2 h-4 w-4" />Add Factory</Dialog.Trigger
	>
	<Dialog.Content
		><Dialog.Header>
			<Dialog.Title>New Factory</Dialog.Title>
		</Dialog.Header>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Name</Label>
					<Input placeholder="Name of your factory" bind:value={name} autocomplete="new-password" />
				</div>
			</div>
		</form>
		<Dialog.Footer>
			<Dialog.Close>
				<Button type="button" variant="destructive">Cancel</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button type="button" variant="default" on:click={() => addFactory(name)}>Create</Button>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
