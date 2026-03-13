<script lang="ts">
  import { cn } from "$lib/utils";
  
  let { children, variant = "default", class: className = "" } = $props<{ 
    children: any, 
    variant?: "default" | "success" | "danger" | "warning" | "info", 
    class?: string 
  }>();

  const variants = {
    default: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20",
    danger: "bg-rose-500/10 text-rose-500 border border-rose-500/20",
    warning: "bg-amber-500/10 text-amber-500 border border-amber-500/20",
    info: "bg-sky-500/10 text-sky-500 border border-sky-500/20",
  };
</script>

<span class={cn("px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap", variants[variant], className)}>
  {@render children()}
</span>