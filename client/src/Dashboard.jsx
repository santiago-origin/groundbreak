import {
  BarChart3, Users, CalendarCheck, DollarSign, TrendingUp, Phone,
  MessageSquare, Star, ArrowUpRight, ArrowDownRight, Clock, MapPin,
  ChevronRight, Bell, Search, Settings, LayoutDashboard, Calendar,
  UserCircle, FileText, Megaphone, BarChart2
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

const revenueData = [
  { month: 'Oct', revenue: 32400 },
  { month: 'Nov', revenue: 38100 },
  { month: 'Dec', revenue: 29800 },
  { month: 'Jan', revenue: 41200 },
  { month: 'Feb', revenue: 45600 },
  { month: 'Mar', revenue: 52300 },
];

const leadsData = [
  { week: 'W1', leads: 28, booked: 18 },
  { week: 'W2', leads: 35, booked: 22 },
  { week: 'W3', leads: 31, booked: 19 },
  { week: 'W4', leads: 42, booked: 28 },
];

const serviceBreakdown = [
  { name: 'Vinyl Wrap', value: 35, color: '#111' },
  { name: 'PPF', value: 25, color: '#444' },
  { name: 'Ceramic', value: 20, color: '#888' },
  { name: 'Tint', value: 12, color: '#bbb' },
  { name: 'Other', value: 8, color: '#ddd' },
];

const recentLeads = [
  { name: 'Marcus Thompson', service: 'Full Body PPF', source: 'Google Ads', time: '12 min ago', status: 'New' },
  { name: 'Sarah Chen', service: 'Ceramic Coating', source: 'Instagram', time: '1 hr ago', status: 'Contacted' },
  { name: 'David Reeves', service: 'Color Change Wrap', source: 'Google Ads', time: '2 hr ago', status: 'Booked' },
  { name: 'Jessica Park', service: 'Window Tint', source: 'Referral', time: '3 hr ago', status: 'Booked' },
  { name: 'Ryan Mitchell', service: 'Commercial Wrap', source: 'Website', time: '5 hr ago', status: 'Contacted' },
];

const upcomingJobs = [
  { client: 'James Foster', vehicle: '2024 BMW M4', service: 'Full Body PPF', date: 'Tomorrow, 8:00 AM', duration: '2 days' },
  { client: 'Amanda Liu', vehicle: '2023 Porsche 911', service: 'Ceramic Coating', date: 'Tomorrow, 10:00 AM', duration: '1 day' },
  { client: 'Carlos Mendez', vehicle: '2025 Ford F-150', service: 'Commercial Wrap', date: 'Wed, 9:00 AM', duration: '3 days' },
];

const statusColors = {
  New: 'bg-blue-50 text-blue-700',
  Contacted: 'bg-amber-50 text-amber-700',
  Booked: 'bg-green-50 text-green-700',
};

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Users, label: 'Leads' },
  { icon: Calendar, label: 'Calendar' },
  { icon: MessageSquare, label: 'Conversations' },
  { icon: Megaphone, label: 'Campaigns' },
  { icon: BarChart2, label: 'Reports' },
  { icon: FileText, label: 'Invoices' },
  { icon: Settings, label: 'Settings' },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-screen">
        <div className="p-6 border-b border-gray-100">
          <img src="/logo-dark.png" alt="Ground Break Marketing" className="h-6" />
        </div>

        <nav className="flex-1 py-4 px-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-colors mb-0.5 ${
                item.active
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">MR</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">Mike Rodriguez</p>
              <p className="text-xs text-gray-400 truncate">Elite Auto Wraps</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-400">Welcome back, Mike</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 w-56"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell size={18} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <KpiCard
              title="Revenue (MTD)"
              value="$52,300"
              change="+14.7%"
              positive
              icon={DollarSign}
              subtitle="vs $45,600 last month"
            />
            <KpiCard
              title="New Leads"
              value="136"
              change="+23.6%"
              positive
              icon={Users}
              subtitle="42 this week"
            />
            <KpiCard
              title="Booked Jobs"
              value="87"
              change="+8.2%"
              positive
              icon={CalendarCheck}
              subtitle="28 this week"
            />
            <KpiCard
              title="Avg. Ticket"
              value="$1,847"
              change="-2.1%"
              positive={false}
              icon={BarChart3}
              subtitle="Down from $1,887"
            />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Revenue Chart */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Revenue</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Last 6 months</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
                  <TrendingUp size={12} />
                  +24.3%
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#111" stopOpacity={0.08} />
                      <stop offset="100%" stopColor="#111" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: 13 }}
                    formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#111" strokeWidth={2} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Service Breakdown */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Service Breakdown</h3>
              <p className="text-xs text-gray-400 mb-4">By revenue share</p>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={serviceBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {serviceBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {serviceBreakdown.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-gray-600">{s.name}</span>
                    </div>
                    <span className="font-medium text-gray-900">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leads vs Booked */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Leads vs Booked</h3>
              <p className="text-xs text-gray-400 mb-4">This month by week</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={leadsData} barGap={4}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#999' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: 13 }}
                  />
                  <Bar dataKey="leads" fill="#ddd" radius={[4, 4, 0, 0]} barSize={20} name="Leads" />
                  <Bar dataKey="booked" fill="#111" radius={[4, 4, 0, 0]} barSize={20} name="Booked" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Leads */}
            <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Recent Leads</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Latest incoming leads</p>
                </div>
                <button className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                  View all <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {recentLeads.map((lead, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                        <UserCircle size={18} className="text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                        <p className="text-xs text-gray-400">{lead.service} · {lead.source}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400">{lead.time}</span>
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[lead.status]}`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Jobs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900">Upcoming Jobs</h3>
                <p className="text-xs text-gray-400 mt-0.5">Scheduled this week</p>
              </div>
              <button className="text-xs font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1 transition-colors">
                View calendar <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {upcomingJobs.map((job, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-gray-900 bg-gray-100 px-2.5 py-1 rounded-full">{job.service}</span>
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={12} />{job.duration}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">{job.client}</p>
                  <p className="text-xs text-gray-400 mt-1">{job.vehicle}</p>
                  <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-500">
                    <Calendar size={12} />
                    {job.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function KpiCard({ title, value, change, positive, icon: Icon, subtitle }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{title}</span>
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
          <Icon size={16} className="text-gray-400" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      <div className="flex items-center gap-2 mt-1.5">
        <span className={`text-xs font-medium flex items-center gap-0.5 ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {change}
        </span>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
    </div>
  );
}
