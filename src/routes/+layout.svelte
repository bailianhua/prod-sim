<script>
  import "../app.pcss";
  import CreateFactoryCard from "$lib/components/CreateFactoryCard.svelte";
  import { clearFactoryStore } from "$lib/model/factory";
  import { Button } from "$lib/components/ui/button";
  import { Trash } from "lucide-svelte";
  import { tutorialStore } from "$lib/store/tutorial";
  import { TutorialDialog } from "$lib/components";
  import { onMount } from "svelte";

  function clearStore() {
    clearFactoryStore();
  }

  onMount(() => {
    tutorialStore.set(true);
  });
</script>

<div class="flex h-screen overflow-hidden bg-gray-100">
  <div class="flex w-0 flex-1 flex-col overflow-hidden">
    <nav class="relative z-10 flex h-16 flex-shrink-0 bg-white p-6 shadow">
      <div class="mr-6 flex flex-shrink-0 items-center">
        <span class="text-xl font-semibold tracking-tight">Production sim</span>
      </div>
      <div
        class="block w-full flex-grow lg:flex lg:w-auto lg:items-center"
      ></div>
    </nav>
    <main class=" relative mx-auto flex w-full flex-1 overflow-y-auto">
      <div class="w-64 bg-white pt-4">
        <CreateFactoryCard class="block w-full"></CreateFactoryCard>
        <div class="text-sm lg:flex-grow">
          <Button
            on:click={clearStore}
            variant="ghost"
            class="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground"
            ><Trash class="mr-2 h-4 w-4" /> Clear all data</Button
          >
        </div>
        <div class="border-b border-gray-300 my-4"></div>
        <TutorialDialog class="block w-full"></TutorialDialog>
      </div>
      <div class="flex flex-1 flex-col pl-4 pt-4">
        <slot />
      </div>
    </main>
    <footer class="flex-shrink-0 bg-gray-200 p-4">
      Develop by <a
        href="https://github.com/bailianhua"
        target="_blank"
        rel="noreferrer">Bai Lianhua</a
      >
      © {new Date().getFullYear()}
    </footer>
  </div>
</div>
