<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import { FactoryCard } from '$lib/components';
	import { Factory } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	const frameworks = [
		{
			value: 'sveltekit',
			label: 'SvelteKit'
		},
		{
			value: 'next',
			label: 'Next.js'
		},
		{
			value: 'astro',
			label: 'Astro'
		},
		{
			value: 'nuxt',
			label: 'Nuxt.js'
		}
	];
</script>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content
		><Dialog.Header>
			<Dialog.Title>New Factory ?</Dialog.Title>
		</Dialog.Header>
		<form>
			<div class="grid w-full items-center gap-4">
				<div class="flex flex-col space-y-1.5">
					<Label for="name">Name</Label>
					<Input id="name" placeholder="Name of your factory" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label for="framework">Framework</Label>
					<Select.Root>
						<Select.Trigger id="framework">
							<Select.Value placeholder="Select" />
						</Select.Trigger>
						<Select.Content>
							{#each frameworks as framework}
								<Select.Item value={framework.value} label={framework.label}
									>{framework.label}</Select.Item
								>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
