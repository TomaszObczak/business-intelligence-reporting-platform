<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { cn } from "$lib/utils";

  let { 
    data, 
    xKey = "name", 
    yKey = "value", 
    colors = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
    height = 300,
    innerRadius = 0.6,
    class: className = ""
  } = $props<{ 
    data: any[], 
    xKey?: string, 
    yKey?: string, 
    colors?: string[],
    height?: number,
    innerRadius?: number,
    class?: string
  }>();

  let container: HTMLDivElement;
  let width = $state(0);
  let tooltipData = $state<any>(null);
  let tooltipPos = $state({ x: 0, y: 0 });

  $effect(() => {
    if (width > 0 && data.length > 0) {
      drawChart();
    }
  });

  function drawChart() {
    d3.select(container).selectAll("svg").remove();

    const svgWidth = width;
    const svgHeight = height;
    const radius = Math.min(svgWidth, svgHeight) / 2 - 40;

    const svg = d3.select(container)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .append("g")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d[xKey]))
      .range(colors);

    const pie = d3.pie<any>()
      .value(d => d[yKey])
      .sort(null);

    const arc = d3.arc<any>()
      .innerRadius(radius * innerRadius)
      .outerRadius(radius)
      .cornerRadius(4)
      .padAngle(0.02);

    const arcs = svg.selectAll(".arc")
      .data(pie(data))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcs.append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data[xKey]) as string)
      .attr("fill-opacity", 0.8)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).attr("fill-opacity", 1);
        tooltipData = d.data;
        const [mx, my] = d3.pointer(event, container);
        tooltipPos = { x: mx, y: my };
      })
      .on("mouseout", (event) => {
        d3.select(event.currentTarget).attr("fill-opacity", 0.8);
        tooltipData = null;
      });
  }

  function handleResize() {
    if (container) {
      width = container.clientWidth;
    }
  }

  onMount(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });
</script>

<div 
  bind:this={container} 
  class={cn("relative w-full overflow-hidden flex items-center justify-center", className)}
  style="height: {height}px;"
>
  {#if tooltipData}
    <div 
      class="chart-tooltip"
      style="left: {tooltipPos.x}px; top: {tooltipPos.y - 10}px; transform: translate(-50%, -100%);"
    >
      <div class="font-bold mb-1">{tooltipData[xKey]}</div>
      <div class="flex items-center gap-2">
        <span class="text-muted-foreground">{yKey}:</span>
        <span class="font-semibold">{d3.format("$,.2f")(tooltipData[yKey])}</span>
      </div>
    </div>
  {/if}

  <div class="absolute flex flex-col items-center justify-center pointer-events-none">
    <span class="text-xs text-muted-foreground uppercase font-semibold">Total</span>
    <span class="text-xl font-bold">
      {d3.format("$,.2s")(d3.sum(data, d => d[yKey]))}
    </span>
  </div>
</div>