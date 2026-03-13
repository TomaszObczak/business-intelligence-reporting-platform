<script lang="ts">
  import KPICard from "$lib/components/ui/KPICard.svelte";
  import Card from "$lib/components/ui/Card.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import LineChart from "$lib/components/charts/LineChart.svelte";
  import BarChart from "$lib/components/charts/BarChart.svelte";
  import PieChart from "$lib/components/charts/PieChart.svelte";
  import { overviewData, salesData } from "$lib/data/mockData";
  import * as d3 from "d3";
  import { 
    DollarSign, 
    Users, 
    Clock, 
    Target, 
    ArrowUpRight, 
    MoreHorizontal,
    Download
  } from "lucide-svelte";

  const iconMap: Record<string, any> = {
    DollarSign,
    Users,
    Clock,
    Target
  };
</script>

<div class="space-y-8">
  <!-- Header -->
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Executive Overview</h1>
      <p class="text-muted-foreground mt-1">Welcome back, Jane. Here's what's happening with your business today.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
        <Download class="w-4 h-4" />
        Export CSV
      </button>
      <button class="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
        Generate Report
      </button>
    </div>
  </div>

  <!-- KPI Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {#each overviewData.kpis as kpi}
      <KPICard 
        title={kpi.title} 
        value={kpi.value} 
        change={kpi.change} 
        trend={kpi.trend as any} 
        icon={iconMap[kpi.icon]} 
      />
    {/each}
  </div>

  <!-- Main Charts Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Revenue Trend -->
    <Card class="lg:col-span-2 p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-bold">Revenue & Growth</h3>
          <p class="text-sm text-muted-foreground">Monthly revenue performance vs active user growth</p>
        </div>
        <select class="bg-muted border-none rounded-md text-xs font-medium px-2 py-1 focus:ring-1 focus:ring-primary/20">
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Year to Date</option>
        </select>
      </div>
      <LineChart data={overviewData.revenueTrend} xKey="date" yKey="value" height={350} />
    </Card>

    <!-- Regional Performance -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h3 class="text-lg font-bold">Regional Performance</h3>
          <p class="text-sm text-muted-foreground">Revenue by global regions</p>
        </div>
        <button class="p-1 hover:bg-accent rounded-md transition-colors">
          <MoreHorizontal class="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <BarChart data={salesData.byRegion} xKey="name" yKey="value" height={350} />
    </Card>
  </div>

  <!-- Bottom Section -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Recent Activity -->
    <Card class="lg:col-span-2">
      <div class="p-6 border-b border-border flex items-center justify-between">
        <h3 class="text-lg font-bold">Recent Activity</h3>
        <button class="text-primary text-sm font-semibold hover:underline">View all</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <th class="px-6 py-3">Activity</th>
              <th class="px-6 py-3">User</th>
              <th class="px-6 py-3">Time</th>
              <th class="px-6 py-3">Status</th>
              <th class="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border">
            {#each overviewData.recentActivity as activity}
              <tr class="hover:bg-muted/30 transition-colors group">
                <td class="px-6 py-4 text-sm font-medium">{activity.type}</td>
                <td class="px-6 py-4 text-sm text-muted-foreground">{activity.user}</td>
                <td class="px-6 py-4 text-sm text-muted-foreground">{activity.time}</td>
                <td class="px-6 py-4">
                  <Badge variant={activity.status === "Success" ? "success" : "danger"}>
                    {activity.status}
                  </Badge>
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight class="w-4 h-4 text-primary" />
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>

    <!-- Category Breakdown -->
    <Card class="p-6">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-bold">Sales by Category</h3>
        <button class="p-1 hover:bg-accent rounded-md transition-colors">
          <MoreHorizontal class="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <PieChart data={salesData.byCategory} height={300} />
      <div class="mt-6 space-y-3">
        {#each salesData.byCategory as cat, i}
          <div class="flex items-center justify-between text-sm">
            <div class="flex items-center gap-2">
              <div class="w-3 h-3 rounded-full" style="background-color: {['#3b82f6', '#10b981', '#f59e0b'][i]}"></div>
              <span>{cat.name}</span>
            </div>
            <span class="font-semibold">{d3.format("$,.0f")(cat.value)}</span>
          </div>
        {/each}
      </div>
    </Card>
  </div>
</div>