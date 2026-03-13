<script lang="ts">
  import Card from "./Card.svelte";
  import Badge from "./Badge.svelte";
  import { TrendingUp, TrendingDown, Minus } from "lucide-svelte";
  import { cn } from "$lib/utils";

  let { 
    title, 
    value, 
    change, 
    trend, 
    icon: IconComponent, 
    subtitle = "" 
  } = $props<{ 
    title: string, 
    value: string, 
    change: string, 
    trend: "up" | "down" | "neutral", 
    icon: any, 
    subtitle?: string 
  }>();

  const trendStyles = {
    up: { variant: "success" as const, icon: TrendingUp, color: "text-emerald-500" },
    down: { variant: "danger" as const, icon: TrendingDown, color: "text-rose-500" },
    neutral: { variant: "info" as const, icon: Minus, color: "text-sky-500" }
  };

  const currentTrend = $derived(trendStyles[trend]);
</script>

<Card class="p-6 transition-all duration-300 hover:shadow-md hover:border-primary/20 group">
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p class="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
      <h3 class="text-3xl font-bold tracking-tight">{value}</h3>
      {#if subtitle}
        <p class="text-xs text-muted-foreground mt-1">{subtitle}</p>
      {/if}
    </div>
    <div class="p-3 rounded-lg bg-primary/5 group-hover:bg-primary/10 transition-colors">
      <IconComponent class="w-6 h-6 text-primary" />
    </div>
  </div>
  
  <div class="mt-4 flex items-center gap-2">
    <Badge variant={currentTrend.variant} class="flex items-center gap-1">
      <currentTrend.icon class="w-3 h-3" />
      {change}
    </Badge>
    <span class="text-xs text-muted-foreground">vs last month</span>
  </div>
</Card>