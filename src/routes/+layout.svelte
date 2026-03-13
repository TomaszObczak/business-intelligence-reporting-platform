<script lang="ts">
  import "../app.css";
  import { onMount } from "svelte";
  import Sidebar from "$lib/components/layout/Sidebar.svelte";
  import TopNav from "$lib/components/layout/TopNav.svelte";

  let { children } = $props();
  let isDarkMode = $state(false);

  onMount(() => {
    // Check local storage or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      isDarkMode = true;
      document.documentElement.classList.add("dark");
    }
  });

  function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }
</script>

<div class="flex h-screen overflow-hidden bg-background">
  <!-- Sidebar -->
  <Sidebar />

  <!-- Main Content Area -->
  <div class="flex flex-col flex-1 overflow-hidden">
    <!-- Top Navigation -->
    <TopNav {isDarkMode} {toggleTheme} />

    <!-- Page Content -->
    <main class="flex-1 overflow-y-auto p-6 scroll-smooth">
      <div class="max-w-7xl mx-auto space-y-6">
        {@render children()}
      </div>
    </main>
  </div>
</div>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  }
</style>