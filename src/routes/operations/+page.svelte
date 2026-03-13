<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import LineChart from "$lib/components/charts/LineChart.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import { operationsData } from "$lib/data/mockData";
  import { Activity, ShieldCheck, Database, Zap } from "lucide-svelte";
  import KPICard from "$lib/components/ui/KPICard.svelte";

  const cpuData = operationsData.resourceUtilization.map(u => ({
    date: u.timestamp,
    value: u.cpu
  }));

  const ramData = operationsData.resourceUtilization.map(u => ({
    date: u.timestamp,
    value: u.ram
  }));
</script>

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight">Operations Metrics</h1>
    <p class="text-muted-foreground mt-1">Real-time system health and resource utilization.</p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <KPICard 
      title="API Latency" 
      value="124ms" 
      change="-5ms" 
      trend="up" 
      icon={Zap} 
    />
    <KPICard 
      title="Database Load" 
      value="42%" 
      change="+2%" 
      trend="down" 
      icon={Database} 
    />
    <KPICard 
      title="Security Score" 
      value="98.5" 
      change="+0.2" 
      trend="up" 
      icon={ShieldCheck} 
    />
    <KPICard 
      title="Avg. Throughput" 
      value="12.4k req/s" 
      change="+1.2k" 
      trend="up" 
      icon={Activity} 
    />
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <Card class="lg:col-span-2 p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold">Resource Utilization (CPU %)</h3>
        <Badge variant="success">Online</Badge>
      </div>
      <LineChart data={cpuData} height={350} color="#8b5cf6" yKey="value" xKey="date" />
    </Card>

    <Card class="p-6">
      <h3 class="text-lg font-bold mb-6">System Health</h3>
      <div class="space-y-6">
        {#each operationsData.systemHealth as health}
          <div class="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border transition-colors hover:bg-muted">
            <div class="space-y-1">
              <p class="text-sm font-medium">{health.metric}</p>
              <p class="text-2xl font-bold tracking-tight">{health.value}</p>
            </div>
            <Badge variant={health.status as any}>
              {health.status === "success" ? "Healthy" : "Attention"}
            </Badge>
          </div>
        {/each}
      </div>
    </Card>
  </div>
</div>