<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import BarChart from "$lib/components/charts/BarChart.svelte";
  import PieChart from "$lib/components/charts/PieChart.svelte";
  import { salesData } from "$lib/data/mockData";
  import * as d3 from "d3";
  import { TrendingUp, Target, ShoppingBag, Globe } from "lucide-svelte";
  import KPICard from "$lib/components/ui/KPICard.svelte";

  const progress = (salesData.monthlyActual / salesData.monthlyTarget) * 100;
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Sales Performance</h1>
    <p class="text-muted-foreground mt-1">Deep dive into revenue streams and regional sales targets.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <KPICard 
      title="Monthly Actual" 
      value={d3.format("$,.0f")(salesData.monthlyActual)} 
      change="+5.2%" 
      trend="up" 
      icon={ShoppingBag} 
    />
    <KPICard 
      title="Monthly Target" 
      value={d3.format("$,.0f")(salesData.monthlyTarget)} 
      change="92% reached" 
      trend="neutral" 
      icon={Target} 
    />
    <KPICard 
      title="Avg. Order Value" 
      value="$245.80" 
      change="+12.4%" 
      trend="up" 
      icon={TrendingUp} 
    />
    <KPICard 
      title="Global Reach" 
      value="142 Countries" 
      change="+3 new" 
      trend="up" 
      icon={Globe} 
    />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card class="p-6">
      <h3 class="text-lg font-bold mb-6">Revenue by Region</h3>
      <BarChart data={salesData.byRegion} height={400} color="#10b981" />
    </Card>

    <Card class="p-6">
      <h3 class="text-lg font-bold mb-6">Sales by Product Category</h3>
      <PieChart data={salesData.byCategory} height={400} />
    </Card>
  </div>

  <Card class="p-6">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h3 class="text-lg font-bold">Monthly Target Progress</h3>
        <p class="text-sm text-muted-foreground">Overall progress towards the $1.5M monthly goal</p>
      </div>
      <span class="text-2xl font-bold text-primary">{progress.toFixed(1)}%</span>
    </div>
    
    <div class="w-full h-4 bg-muted rounded-full overflow-hidden">
      <div 
        class="h-full bg-primary transition-all duration-1000 ease-out"
        style="width: {progress}%"
      ></div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
      <div class="space-y-1">
        <p class="text-sm text-muted-foreground">Remaining to Goal</p>
        <p class="text-xl font-bold">{d3.format("$,.0f")(salesData.monthlyTarget - salesData.monthlyActual)}</p>
      </div>
      <div class="space-y-1">
        <p class="text-sm text-muted-foreground">Days Remaining</p>
        <p class="text-xl font-bold">12 Days</p>
      </div>
      <div class="space-y-1">
        <p class="text-sm text-muted-foreground">Required Daily Run Rate</p>
        <p class="text-xl font-bold">$17,958</p>
      </div>
    </div>
  </Card>
</div>