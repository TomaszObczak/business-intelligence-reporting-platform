<script lang="ts">
  import { 
    Search, 
    Bell, 
    Calendar, 
    Download, 
    Sun, 
    Moon, 
    Filter,
    ChevronDown
  } from "lucide-svelte";

  let { isDarkMode, toggleTheme } = $props<{ isDarkMode: boolean, toggleTheme: () => void }>();
  let searchQuery = $state("");
  let selectedDateRange = $state("Last 30 Days");

  const dateRanges = ["Today", "Last 7 Days", "Last 30 Days", "This Quarter", "Custom Range"];
</script>

<header class="h-16 border-b border-border bg-card/80 backdrop-blur-md px-8 flex items-center justify-between z-10 sticky top-0">
  <div class="flex items-center gap-6 flex-1">
    <!-- Search Bar -->
    <div class="relative w-full max-w-md">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        bind:value={searchQuery}
        placeholder="Search analytics, reports, or users..."
        class="w-full bg-muted border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground"
      />
    </div>

    <!-- Date Filter -->
    <div class="hidden lg:flex items-center gap-2 text-sm border border-border rounded-md px-3 py-1.5 bg-background hover:bg-accent transition-colors cursor-pointer group">
      <Calendar class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span class="font-medium">{selectedDateRange}</span>
      <ChevronDown class="w-3 h-3 text-muted-foreground" />
    </div>

    <button class="hidden lg:flex items-center gap-2 text-sm border border-border rounded-md px-3 py-1.5 bg-background hover:bg-accent transition-colors group">
      <Filter class="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
      <span class="font-medium">Filters</span>
    </button>
  </div>

  <div class="flex items-center gap-4">
    <!-- Export Button -->
    <button class="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
      <Download class="w-4 h-4" />
      <span>Export</span>
    </button>

    <!-- Theme Toggle -->
    <button
      onclick={toggleTheme}
      class="p-2 rounded-full border border-border hover:bg-accent transition-all duration-200"
      aria-label="Toggle theme"
    >
      {#if isDarkMode}
        <Sun class="w-4 h-4 text-yellow-500" />
      {:else}
        <Moon class="w-4 h-4 text-blue-500" />
      {/if}
    </button>

    <!-- Notifications -->
    <button class="p-2 rounded-full border border-border hover:bg-accent transition-colors relative">
      <Bell class="w-4 h-4 text-muted-foreground" />
      <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
    </button>

    <!-- User Profile -->
    <div class="flex items-center gap-3 pl-4 border-l border-border">
      <div class="text-right hidden sm:block">
        <p class="text-sm font-semibold leading-none">Jane Doe</p>
        <p class="text-xs text-muted-foreground mt-1">Data Analyst</p>
      </div>
      <div class="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold">
        JD
      </div>
    </div>
  </div>
</header>