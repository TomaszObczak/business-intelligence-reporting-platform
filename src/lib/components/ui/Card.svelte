<script lang="ts">
  import { cn } from "$lib/utils";
  
  let { children, class: className = "" } = $props<{ children: any, class?: string }>();
</script>

<div class={cn("bg-card border border-border rounded-xl shadow-sm overflow-hidden", className)}>
  {@render children()}
</div>