<script lang="ts">
  import Card from "$lib/components/ui/Card.svelte";
  import Badge from "$lib/components/ui/Badge.svelte";
  import LineChart from "$lib/components/charts/LineChart.svelte";
  import BarChart from "$lib/components/charts/BarChart.svelte";
  import PieChart from "$lib/components/charts/PieChart.svelte";
  import { overviewData, salesData } from "$lib/data/mockData";
  import { 
    Layout, 
    Database, 
    BarChart3, 
    Save, 
    Plus, 
    Trash2,
    Settings2,
    Eye
  } from "lucide-svelte";

  let selectedSource = $state("Revenue Trend");
  let selectedChart = $state("Line Chart");
  let reportTitle = $state("New Custom Report");

  const sources = [
    { name: "Revenue Trend", data: overviewData.revenueTrend },
    { name: "Regional Sales", data: salesData.byRegion },
    { name: "Product Categories", data: salesData.byCategory }
  ];

  const charts = ["Line Chart", "Bar Chart", "Pie Chart"];

  let currentData = $derived(sources.find(s => s.name === selectedSource)?.data || []);
</script>

<div class="space-y-8 pb-20">
  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Report Builder</h1>
      <p class="text-muted-foreground mt-1">Design and customize your own business intelligence dashboards.</p>
    </div>
    <div class="flex items-center gap-3">
      <button class="flex items-center gap-2 border border-border px-4 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors">
        <Eye class="w-4 h-4" />
        Preview
      </button>
      <button class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
        <Save class="w-4 h-4" />
        Save Report
      </button>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
    <!-- Sidebar Controls -->
    <div class="space-y-6 lg:sticky lg:top-24">
      <Card class="p-6 space-y-6">
        <div class="space-y-2">
          <label for="title" class="text-xs font-bold uppercase text-muted-foreground tracking-wider">Report Title</label>
          <input 
            id="title"
            type="text" 
            bind:value={reportTitle}
            class="w-full bg-muted border-none rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary/20"
          />
        </div>

        <div class="space-y-2">
          <p class="text-xs font-bold uppercase text-muted-foreground tracking-wider">Data Source</p>
          <div class="grid grid-cols-1 gap-2">
            {#each sources as source}
              <button 
                onclick={() => selectedSource = source.name}
                class="flex items-center gap-3 p-3 rounded-lg border text-sm font-medium transition-all {
                  selectedSource === source.name 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border hover:bg-accent text-muted-foreground'
                }"
              >
                <Database class="w-4 h-4" />
                {source.name}
              </button>
            {/each}
          </div>
        </div>

        <div class="space-y-2">
          <p class="text-xs font-bold uppercase text-muted-foreground tracking-wider">Visualization</p>
          <div class="grid grid-cols-1 gap-2">
            {#each charts as chart}
              <button 
                onclick={() => selectedChart = chart}
                class="flex items-center gap-3 p-3 rounded-lg border text-sm font-medium transition-all {
                  selectedChart === chart 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-border hover:bg-accent text-muted-foreground'
                }"
              >
                <BarChart3 class="w-4 h-4" />
                {chart}
              </button>
            {/each}
          </div>
        </div>

        <div class="pt-4 border-t border-border">
          <button class="w-full flex items-center justify-center gap-2 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors">
            <Settings2 class="w-4 h-4" />
            Advanced Settings
          </button>
        </div>
      </Card>
    </div>

    <!-- Main Builder Canvas -->
    <div class="lg:col-span-3 space-y-6">
      <Card class="p-8 min-h-[600px] flex flex-col bg-muted/20 border-dashed border-2">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold">{reportTitle}</h2>
          <div class="flex items-center gap-2">
            <button class="p-2 hover:bg-rose-500/10 hover:text-rose-500 rounded-md transition-colors text-muted-foreground">
              <Trash2 class="w-4 h-4" />
            </button>
            <button class="p-2 hover:bg-accent rounded-md transition-colors text-muted-foreground">
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col items-center justify-center">
          <Card class="w-full p-6 bg-background shadow-lg">
            <div class="mb-4 flex items-center justify-between">
              <h3 class="font-bold text-muted-foreground">{selectedSource}</h3>
              <Badge variant="info">{selectedChart}</Badge>
            </div>
            
            <div class="min-h-[400px]">
              {#if selectedChart === "Line Chart"}
                <LineChart data={currentData} height={400} />
              {:else if selectedChart === "Bar Chart"}
                <BarChart data={currentData} height={400} />
              {:else if selectedChart === "Pie Chart"}
                <PieChart data={currentData} height={400} />
              {/if}
            </div>
          </Card>
        </div>

        <div class="mt-8 p-4 bg-primary/5 border border-primary/10 rounded-lg flex items-center gap-4">
          <div class="p-2 bg-primary/10 rounded-full">
            <Layout class="w-4 h-4 text-primary" />
          </div>
          <div>
            <p class="text-sm font-bold">Auto-layout enabled</p>
            <p class="text-xs text-muted-foreground">The builder is automatically optimizing your chart for enterprise reporting standards.</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</div>