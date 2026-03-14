<script lang="ts">
  import { page } from "$app/stores";
  import { base } from "$app/paths";
  import { 
    LayoutDashboard, 
    TrendingUp, 
    Users, 
    BarChart3, 
    FileEdit, 
    Settings, 
    HelpCircle,
    Package
  } from "lucide-svelte";

  const navItems = [
    { name: "Overview", href: `${base}/`, icon: LayoutDashboard },
    { name: "Sales Performance", href: `${base}/sales`, icon: TrendingUp },
    { name: "Marketing Analytics", href: `${base}/marketing`, icon: Users },
    { name: "Operations Metrics", href: `${base}/operations`, icon: BarChart3 },
    { name: "Report Builder", href: `${base}/builder`, icon: FileEdit },
  ];

  const secondaryNavItems = [
    { name: "Settings", href: `${base}/settings`, icon: Settings },
    { name: "Support", href: `${base}/support`, icon: HelpCircle },
  ];

  const techStack = [
    { name: "Svelte 5", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
    { name: "D3.js", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    { name: "Go", color: "bg-sky-500/10 text-sky-500 border-sky-500/20" },
    { name: "ClickHouse", color: "bg-rose-500/10 text-rose-500 border-rose-500/20" },
  ];
</script>

<aside class="w-64 bg-card border-r border-border flex flex-col h-full transition-all duration-300">
  <div class="p-6 flex items-center gap-3">
    <div class="bg-primary p-2 rounded-lg">
      <Package class="w-6 h-6 text-primary-foreground" />
    </div>
    <span class="font-bold text-lg tracking-tight">BI Platform</span>
  </div>

  <nav class="flex-1 px-4 space-y-1 mt-4 overflow-y-auto">
    <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">Main Menu</p>
    {#each navItems as item}
      <a
        href={item.href}
        class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors {
          $page.url.pathname === item.href
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        }"
      >
        <item.icon class="w-4 h-4" />
        {item.name}
      </a>
    {/each}

    <div class="mt-8 px-2 space-y-3">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Portfolio Tech Stack</p>
      <div class="flex flex-wrap gap-2">
        {#each techStack as tech}
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold border {tech.color}">
            {tech.name}
          </span>
        {/each}
      </div>
    </div>
  </nav>

  <div class="px-4 py-6 border-t border-border space-y-4">
    <div class="space-y-1">
      <p class="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-2">System</p>
      {#each secondaryNavItems as item}
        <a
          href={item.href}
          class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors {
            $page.url.pathname === item.href
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }"
        >
          <item.icon class="w-4 h-4" />
          {item.name}
        </a>
      {/each}
    </div>

    <a 
      href="https://github.com/your-username/your-repo-name" 
      target="_blank"
      class="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-lg text-sm font-bold hover:bg-primary/90 transition-all shadow-md group"
    >
      <span>Live Demo</span>
      <TrendingUp class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </a>
  </div>
</aside>