export const overviewData = {
  kpis: [
    { title: "Total Revenue", value: "$1,284,500", change: "+12.5%", trend: "up", icon: "DollarSign" },
    { title: "Active Users", value: "48,293", change: "+8.2%", trend: "up", icon: "Users" },
    { title: "Avg. Session", value: "4m 32s", change: "-2.1%", trend: "down", icon: "Clock" },
    { title: "Conversion Rate", value: "3.24%", change: "+0.45%", trend: "up", icon: "Target" }
  ],
  revenueTrend: [
    { date: "2026-01-01", value: 120000, active: 45000 },
    { date: "2026-01-15", value: 145000, active: 48000 },
    { date: "2026-02-01", value: 132000, active: 46000 },
    { date: "2026-02-15", value: 158000, active: 52000 },
    { date: "2026-03-01", value: 165000, active: 55000 },
    { date: "2026-03-13", value: 182000, active: 58000 }
  ],
  recentActivity: [
    { id: 1, type: "Report Created", user: "John Smith", time: "2 hours ago", status: "Success" },
    { id: 2, type: "Data Export", user: "Sarah Johnson", time: "4 hours ago", status: "Success" },
    { id: 3, type: "Scheduled Update", user: "System", time: "6 hours ago", status: "Failed" },
    { id: 4, type: "New Dashboard", user: "Mike Brown", time: "1 day ago", status: "Success" }
  ]
};

export const salesData = {
  byRegion: [
    { name: "North America", value: 450000, growth: "+15%" },
    { name: "Europe", value: 320000, growth: "+8%" },
    { name: "Asia Pacific", value: 280000, growth: "+22%" },
    { name: "Latin America", value: 150000, growth: "-3%" }
  ],
  byCategory: [
    { name: "Software", value: 650000 },
    { name: "Hardware", value: 420000 },
    { name: "Services", value: 214500 }
  ],
  monthlyTarget: 1500000,
  monthlyActual: 1284500
};

export const marketingData = {
  campaignPerformance: [
    { name: "Social Media", spend: 45000, reach: 250000, conversion: 1.2 },
    { name: "Email Marketing", spend: 12000, reach: 80000, conversion: 3.8 },
    { name: "Search Ads", spend: 65000, reach: 120000, conversion: 2.5 },
    { name: "Display Ads", spend: 28000, reach: 500000, conversion: 0.8 }
  ],
  topChannels: [
    { channel: "Google", leads: 450, quality: 85 },
    { channel: "LinkedIn", leads: 280, quality: 92 },
    { channel: "Facebook", leads: 620, quality: 64 },
    { channel: "Direct", leads: 150, quality: 95 }
  ]
};

export const operationsData = {
  systemHealth: [
    { metric: "Server Uptime", value: "99.98%", status: "success" },
    { metric: "API Latency", value: "124ms", status: "success" },
    { metric: "Database Load", value: "42%", status: "warning" },
    { metric: "Error Rate", value: "0.02%", status: "success" }
  ],
  resourceUtilization: [
    { timestamp: "08:00", cpu: 32, ram: 45 },
    { timestamp: "10:00", cpu: 68, ram: 72 },
    { timestamp: "12:00", cpu: 84, ram: 78 },
    { timestamp: "14:00", cpu: 75, ram: 80 },
    { timestamp: "16:00", cpu: 45, ram: 65 },
    { timestamp: "18:00", cpu: 28, ram: 50 }
  ]
};