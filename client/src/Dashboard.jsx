import {
  DollarSign, CalendarCheck, Users, TrendingUp, ArrowUpRight,
  ArrowDownRight, Eye, EyeOff, ChevronRight, Clock
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import DateFilter from './DateFilter';
import {
  monthlyRevenue, dailyRevenue, todayAppointments, sourceBreakdown,
  setters, REVENUE_PER_SHOW
} from './mockData';

const todayShows = todayAppointments.filter(a => a.status === 'confirmed').length;
const totalBooked = todayAppointments.length;
const monthShows = monthlyRevenue[5].shows;
const monthRevenue = monthlyRevenue[5].revenue;
const lastMonthRevenue = monthlyRevenue[4].revenue;
const revenueChange = ((monthRevenue - lastMonthRevenue) / lastMonthRevenue * 100).toFixed(1);
const totalLeadsMTD = monthlyRevenue[5].leads;
const bookingRate = ((monthlyRevenue[5].booked / monthlyRevenue[5].leads) * 100).toFixed(0);
const showRate = ((monthShows / monthlyRevenue[5].booked) * 100).toFixed(0);

export default function Dashboard() {
  const [range, setRange] = useState('this_month');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">Performance at a glance</p>
        </div>
        <DateFilter value={range} onChange={setRange} />
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Kpi title="Revenue (MTD)" value={`$${monthRevenue.toLocaleString()}`} change={`${revenueChange > 0 ? '+' : ''}${revenueChange}%`} positive={revenueChange > 0} icon={DollarSign} sub={`${monthShows} shows @ $${REVENUE_PER_SHOW}`} />
        <Kpi title="Today's Appointments" value={totalBooked} change={`${todayShows} confirmed`} positive icon={CalendarCheck} sub="Tap to view brief" link="/today" />
        <Kpi title="Leads (MTD)" value={totalLeadsMTD} change={`${bookingRate}% booking rate`} positive icon={Users} sub={`${monthlyRevenue[5].booked} booked`} />
        <Kpi title="Show Rate" value={`${showRate}%`} change={showRate >= 75 ? 'On target' : 'Below target'} positive={showRate >= 75} icon={Eye} sub={`${monthShows} of ${monthlyRevenue[5].booked} showed`} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Revenue trend */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Monthly Revenue</h3>
              <p className="text-xs text-gray-400 mt-0.5">$100 per show</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} />
              +24% avg
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#111" stopOpacity={0.08} />
                  <stop offset="100%" stopColor="#111" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: 12 }} formatter={(v) => [`$${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#111" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Source breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">Lead Sources</h3>
          <p className="text-xs text-gray-400 mb-3">This month</p>
          <ResponsiveContainer width="100%" height={120}>
            <PieChart>
              <Pie data={sourceBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={55} paddingAngle={2} dataKey="value">
                {sourceBreakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {sourceBreakdown.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="text-gray-600">{s.name}</span>
                </div>
                <span className="font-medium text-gray-900">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* This week's revenue + Setter leaderboard */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">This Week</h3>
          <p className="text-xs text-gray-400 mb-4">Daily shows & revenue</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#999' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #eee', fontSize: 12 }} />
              <Bar dataKey="shows" fill="#111" radius={[4, 4, 0, 0]} barSize={28} name="Shows" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
            <span className="text-xs text-gray-500">Week total</span>
            <span className="text-sm font-semibold text-gray-900">$500 <span className="text-xs font-normal text-gray-400">(5 shows)</span></span>
          </div>
        </div>

        {/* Setter leaderboard */}
        <div className="col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Setter Leaderboard</h3>
              <p className="text-xs text-gray-400 mt-0.5">This month's performance</p>
            </div>
            <Link to="/performance" className="text-xs font-medium text-gray-400 hover:text-gray-900 flex items-center gap-0.5 transition-colors">
              Details <ChevronRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {setters.map((s, i) => (
              <div key={s.name} className="flex items-center gap-4 p-3 rounded-xl bg-gray-50/60">
                <span className="text-lg font-bold text-gray-300 w-5 text-center">#{i + 1}</span>
                <div className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-[10px] font-bold">{s.avatar}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{s.name}</p>
                  <p className="text-[11px] text-gray-400">{s.stats.callsMade} calls · {s.stats.booked} booked</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{s.stats.shows} shows</p>
                  <p className="text-[11px] text-green-600 font-medium">${s.stats.shows * REVENUE_PER_SHOW}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick view: Today's appointments */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Today's Appointments</h3>
            <p className="text-xs text-gray-400 mt-0.5">{totalBooked} total · {todayShows} confirmed</p>
          </div>
          <Link to="/today" className="text-xs font-medium text-gray-400 hover:text-gray-900 flex items-center gap-0.5 transition-colors">
            Open brief <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {todayAppointments.slice(0, 4).map((a) => (
            <div key={a.id} className="border border-gray-100 rounded-xl p-3.5 hover:border-gray-200 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">{a.time}</span>
                <StatusBadge status={a.status} />
              </div>
              <p className="text-sm font-medium text-gray-900">{a.lead}</p>
              <p className="text-[11px] text-gray-400 mt-0.5">{a.service}</p>
              <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1"><Clock size={10} />{a.shop}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value, change, positive, icon: Icon, sub, link }) {
  const Wrapper = link ? Link : 'div';
  return (
    <Wrapper to={link} className="bg-white rounded-2xl border border-gray-100 p-4 block hover:border-gray-200 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wide">{title}</span>
        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
          <Icon size={14} className="text-gray-400" />
        </div>
      </div>
      <p className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className={`text-[11px] font-medium flex items-center gap-0.5 ${positive ? 'text-green-600' : 'text-red-500'}`}>
          {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {change}
        </span>
      </div>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </Wrapper>
  );
}

export function StatusBadge({ status }) {
  const styles = {
    confirmed: 'bg-green-50 text-green-700',
    pending: 'bg-amber-50 text-amber-700',
    no_answer: 'bg-red-50 text-red-600',
    shown: 'bg-green-50 text-green-700',
    no_show: 'bg-red-50 text-red-600',
    cancelled: 'bg-gray-100 text-gray-500',
  };
  const labels = {
    confirmed: 'Confirmed', pending: 'Pending', no_answer: 'No Answer',
    shown: 'Shown', no_show: 'No Show', cancelled: 'Cancelled',
  };
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles[status] || 'bg-gray-100 text-gray-500'}`}>
      {labels[status] || status}
    </span>
  );
}
