<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { cn } from "$lib/utils";

  let { 
    data, 
    xKey = "date", 
    yKey = "value", 
    color = "var(--primary)",
    height = 300,
    showArea = true,
    class: className = ""
  } = $props<{ 
    data: any[], 
    xKey?: string, 
    yKey?: string, 
    color?: string,
    height?: number,
    showArea?: boolean,
    class?: string
  }>();

  let container: HTMLDivElement;
  let width = $state(0);
  let tooltipData = $state<any>(null);
  let tooltipPos = $state({ x: 0, y: 0 });

  const margin = { top: 20, right: 30, bottom: 30, left: 50 };

  $effect(() => {
    if (width > 0 && data.length > 0) {
      drawChart();
    }
  });

  function drawChart() {
    // Clear previous
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

    // Parse dates if needed
    const parseDate = d3.isoParse;
    const processedData = data.map(d => ({
      ...d,
      [xKey]: typeof d[xKey] === 'string' ? parseDate(d[xKey]) : d[xKey]
    }));

    // Scales
    const x = d3.scaleTime()
      .domain(d3.extent(processedData, d => d[xKey]) as [Date, Date])
      .range([0, innerWidth]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(processedData, d => d[yKey]) * 1.1])
      .range([innerHeight, 0]);

    // Axes
    const xAxis = d3.axisBottom(x)
      .ticks(width < 500 ? 4 : 8)
      .tickSizeOuter(0)
      .tickFormat(d3.timeFormat("%b %d") as any);

    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickFormat(d3.format("$.2s") as any);

    g.append("g")
      .attr("transform", `translate(0,${innerHeight})`)
      .call(xAxis)
      .attr("class", "text-muted-foreground")
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "currentColor").attr("stroke-opacity", 0.1));

    g.append("g")
      .call(yAxis)
      .attr("class", "text-muted-foreground")
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").attr("stroke", "currentColor").attr("stroke-opacity", 0.1))
      .call(g => g.selectAll(".tick text").attr("x", -10));

    // Area
    if (showArea) {
      const area = d3.area<any>()
        .x(d => x(d[xKey]))
        .y0(innerHeight)
        .y1(d => y(d[yKey]))
        .curve(d3.curveMonotoneX);

      g.append("path")
        .datum(processedData)
        .attr("fill", color)
        .attr("fill-opacity", 0.1)
        .attr("d", area);
    }

    // Line
    const line = d3.line<any>()
      .x(d => x(d[xKey]))
      .y(d => y(d[yKey]))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(processedData)
      .attr("fill", "none")
      .attr("stroke", color)
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round")
      .attr("stroke-linejoin", "round")
      .attr("d", line);

    // Overlay for interaction
    const overlay = g.append("rect")
      .attr("width", innerWidth)
      .attr("height", innerHeight)
      .attr("fill", "transparent");

    overlay.on("mousemove", (event) => {
      const [mx] = d3.pointer(event);
      const date = x.invert(mx);
      const bisect = d3.bisector((d: any) => d[xKey]).left;
      const index = bisect(processedData, date);
      const d0 = processedData[index - 1];
      const d1 = processedData[index];
      const d = !d0 ? d1 : !d1 ? d0 : date.getTime() - d0[xKey].getTime() > d1[xKey].getTime() - date.getTime() ? d1 : d0;

      tooltipData = d;
      tooltipPos = { 
        x: x(d[xKey]) + margin.left, 
        y: y(d[yKey]) + margin.top 
      };
    });

    overlay.on("mouseleave", () => {
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
      style="left: {tooltipPos.x}px; top: {tooltipPos.y - 40}px; transform: translate(-50%, -100%);"
    >
      <div class="font-bold mb-1">{d3.timeFormat("%B %d, %Y")(tooltipData[xKey])}</div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" style="background-color: {color}"></div>
        <span class="text-muted-foreground">{yKey}:</span>
        <span class="font-semibold">{d3.format("$,.2f")(tooltipData[yKey])}</span>
      </div>
    </div>
    
    <!-- Tooltip Line Marker -->
    <div 
      class="absolute top-0 bottom-0 w-px bg-primary/20 pointer-events-none"
      style="left: {tooltipPos.x}px; top: {margin.top}px; height: {height - margin.top - margin.bottom}px"
    ></div>
    <div 
      class="absolute w-3 h-3 rounded-full border-2 border-white bg-primary pointer-events-none shadow-md"
      style="left: {tooltipPos.x}px; top: {tooltipPos.y}px; transform: translate(-50%, -50%);"
    ></div>
  {/if}
</div>