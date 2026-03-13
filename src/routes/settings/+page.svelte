<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import { Settings } from "lucide-svelte";
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
    <p class="text-muted-foreground mt-1">Manage your platform preferences and account settings.</p>
  </div>

  <Card class="p-12 flex flex-col items-center justify-center text-center space-y-4">
    <div class="p-4 bg-primary/10 rounded-full">
      <Settings class="w-12 h-12 text-primary" />
    </div>
    <h2 class="text-2xl font-bold">Settings Module</h2>
    <p class="text-muted-foreground max-w-md">
      This module is currently in development. In a real application, you would be able to configure data connections, user permissions, and global dashboard themes here.
    </p>
  </Card>
</div>