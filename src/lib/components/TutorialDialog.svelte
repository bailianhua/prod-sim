<script>
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button, buttonVariants } from "$lib/components/ui/button";
  export let dialogOpen = false;
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger
    class={$$restProps.class + " " + buttonVariants({ variant: "outline" })}
    >How to use this app?
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>How to use</Dialog.Title>
      <Dialog.Description>the data save into your local storage (browser's cookies) there's no need to login and there's no data send to server</Dialog.Description>
    </Dialog.Header>
    <ol class="list-decimal">
      <li>
        click <code>
          <Button variant="ghost">
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
              class="lucide lucide-factory mr-2 h-4 w-4"
              ><path
                d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"
              /><path d="M17 18h1" /><path d="M12 18h1" /><path
                d="M7 18h1"
              /></svg
            >
            Add factory</Button
          >
        </code> name something unique from each other
      </li>

      <li>
        click <Button variant="ghost"
          ><svg
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
            ><path d="m5 11 4-7" /><path d="m19 11-4-7" /><path
              d="M2 11h20"
            /><path
              d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"
            /><path d="m9 11 1 9" /><path d="M4.5 15.5h15" /><path
              d="m15 11-1 9"
            /></svg
          >Add Item</Button
        > select from dropdown and set amount (at the moment I provide only fixed
        production speed but the ratio should be the same as long as you keep all
        your base the same effiiency)
      </li>
      <li>Check Material Balance Sheet for what you need</li>
      <li>
        Click <Button size="sm" variant="ghost">
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
            /><line x1="16" x2="16" y1="14" y2="18" /><path
              d="M16 10h.01"
            /><path d="M12 10h.01" /><path d="M8 10h.01" /><path
              d="M12 14h.01"
            /><path d="M8 14h.01" /><path d="M12 18h.01" /><path
              d="M8 18h.01"
            /></svg
          >
        </Button> to auto add the item you lack
      </li>
    </ol>
  </Dialog.Content>
</Dialog.Root>
