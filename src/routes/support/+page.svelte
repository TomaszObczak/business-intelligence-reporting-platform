<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import { HelpCircle } from "lucide-svelte";
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Support & Help</h1>
    <p class="text-muted-foreground mt-1">Get assistance with building and managing your BI reports.</p>
  </div>

  <Card class="p-12 flex flex-col items-center justify-center text-center space-y-4">
    <div class="p-4 bg-primary/10 rounded-full">
      <HelpCircle class="w-12 h-12 text-primary" />
    </div>
    <h2 class="text-2xl font-bold">Help Center</h2>
    <p class="text-muted-foreground max-w-md">
      Our documentation and support ticketing system is available for enterprise customers. Please contact your account manager for direct assistance.
    </p>
  </Card>
</div>