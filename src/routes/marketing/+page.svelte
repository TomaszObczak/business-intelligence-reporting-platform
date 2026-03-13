<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import BarChart from "$lib/components/charts/BarChart.svelte";
  import { marketingData } from "$lib/data/mockData";
  import { Users, MousePointer2, Megaphone, Target } from "lucide-svelte";
  import KPICard from "$lib/components/ui/KPICard.svelte";

  const campaigns = marketingData.campaignPerformance.map(c => ({
    name: c.name,
    value: c.conversion
  }));
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Marketing Analytics</h1>
    <p class="text-muted-foreground mt-1">Track campaign performance, conversion rates, and user acquisition channels.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <KPICard 
      title="Total Reach" 
      value="1.2M" 
      change="+15.8%" 
      trend="up" 
      icon={Megaphone} 
    />
    <KPICard 
      title="Avg. CTR" 
      value="2.84%" 
      change="+0.5%" 
      trend="up" 
      icon={MousePointer2} 
    />
    <KPICard 
      title="Lead Quality" 
      value="78.2" 
      change="+4.2" 
      trend="up" 
      icon={Target} 
    />
    <KPICard 
      title="New Customers" 
      value="1,245" 
      change="+8.4%" 
      trend="up" 
      icon={Users} 
    />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <Card class="p-6">
      <h3 class="text-lg font-bold mb-6">Campaign Conversion Rates (%)</h3>
      <BarChart data={campaigns} yKey="value" height={400} color="#f59e0b" />
    </Card>

    <Card class="p-6">
      <h3 class="text-lg font-bold mb-6">Top Acquisition Channels</h3>
      <div class="space-y-6 mt-4">
        {#each marketingData.topChannels as channel}
          <div class="space-y-2">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium">{channel.channel}</span>
              <span class="text-muted-foreground">{channel.leads} leads ({channel.quality}% quality)</span>
            </div>
            <div class="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div 
                class="h-full bg-primary"
                style="width: {(channel.leads / 620) * 100}%"
              ></div>
            </div>
          </div>
        {/each}
      </div>
    </Card>
  </div>
</div>