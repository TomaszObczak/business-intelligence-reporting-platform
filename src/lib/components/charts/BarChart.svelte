<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { cn } from "$lib/utils";

  let { 
    data, 
    xKey = "name", 
    yKey = "value", 
    color = "var(--primary)",
    height = 300,
    class: className = ""
  } = $props<{ 
    data: any[], 
    xKey?: string, 
    yKey?: string, 
    color?: string,
    height?: number,
    class?: string
  }>();

  let container: HTMLDivElement;
  let width = $state(0);
  let tooltipData = $state<any>(null);
  let tooltipPos = $state({ x: 0, y: 0 });

  const margin = { top: 20, right: 30, bottom: 40, left: 50 };

  $effect(() => {
    if (width > 0 && data.length > 0) {
      drawChart();
    }
  });

  function drawChart() {
    d3.select(container).selectAll("svg").remove();

    const svgWidth = width;
    const svgHeight = height;
    const innerWidth = svgWidth - margin.left - margin.right;
    const innerHeight = svgHeight - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight)
      .attr("viewBox", `0 0 ${svgWidth} ${svgHeight}`)
      .attr("style", "max-width: 100%; height: auto;");

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Scales
    const x = d3.scaleBand()
      .domain(data.map(d => d[xKey]))
      .range([0, innerWidth])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yKey]) * 1.1])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(x)
      .tickSizeOuter(0);

    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d3.format("$.2s") as any);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground")
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").remove())
      .call(g => g.selectAll(".tick text").attr("dy", 10));

    g.append("g")
      .call(yAxis)
      .attr("class", "text-muted-foreground")
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "currentColor").attr("stroke-opacity", 0.1))
      .call(g => g.selectAll(".tick text").attr("x", -10));

    // Bars
    g.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d[xKey])!)
      .attr("y", d => y(d[yKey]))
      .attr("width", x.bandwidth())
      .attr("height", d => innerHeight - y(d[yKey]))
      .attr("fill", color)
      .attr("rx", 4)
      .attr("fill-opacity", 0.8)
      .on("mouseover", (event, d) => {
        d3.select(event.currentTarget).attr("fill-opacity", 1);
        tooltipData = d;
        tooltipPos = { 
          x: x(d[xKey])! + x.bandwidth() / 2 + margin.left, 
          y: y(d[yKey]) + margin.top 
        };
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
  class={cn("relative w-full overflow-hidden", className)}
  style="height: {height}px;"
>
  {#if tooltipData}
    <div 
      class="chart-tooltip"
      style="left: {tooltipPos.x}px; top: {tooltipPos.y - 10}px; transform: translate(-50%, -100%);"
    >
      <div class="font-bold mb-1">{tooltipData[xKey]}</div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" style="background-color: {color}"></div>
        <span class="text-muted-foreground">{yKey}:</span>
        <span class="font-semibold">{d3.format("$,.2f")(tooltipData[yKey])}</span>
      </div>
    </div>
  {/if}
</div>