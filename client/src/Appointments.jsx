import { useState } from 'react';
import { CalendarCheck, Filter, Phone } from 'lucide-react';
import DateFilter from './DateFilter';
import { weeklyAppointments, REVENUE_PER_SHOW } from './mockData';
import { StatusBadge } from './Dashboard';

const DAYS = ['2026-03-23', '2026-03-24', '2026-03-25', '2026-03-26', '2026-03-27'];
const DAY_LABELS = { '2026-03-23': 'Mon 3/23', '2026-03-24': 'Tue 3/24', '2026-03-25': 'Wed 3/25 (Today)', '2026-03-26': 'Thu 3/26', '2026-03-27': 'Fri 3/27' };

export default function Appointments() {
  const [filter, setFilter] = useState('all');
  const [range, setRange] = useState('this_week');

  const filtered = filter === 'all' ? weeklyAppointments : weeklyAppointments.filter(a => a.status === filter);
  const totalShows = weeklyAppointments.filter(a => a.status === 'shown').length;
  const totalNoShows = weeklyAppointments.filter(a => a.status === 'no_show').length;
  const totalCancelled = weeklyAppointments.filter(a => a.status === 'cancelled').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Appointments</h1>
          <p className="text-sm text-gray-400 mt-0.5">Week of March 23–27, 2026</p>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <DateFilter value={range} onChange={setRange} />
          <span className="text-gray-400">{weeklyAppointments.length} total</span>
          <span className="text-green-600 font-medium">{totalShows} shows (${totalShows * REVENUE_PER_SHOW})</span>
          <span className="text-red-500">{totalNoShows} no-shows</span>
          <span className="text-gray-400">{totalCancelled} cancelled</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-5">
        {[['all', 'All'], ['confirmed', 'Confirmed'], ['shown', 'Shown'], ['no_show', 'No-Show'], ['pending', 'Pending'], ['cancelled', 'Cancelled']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filter === val ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grouped by day */}
      {DAYS.map(day => {
        const dayAppts = filtered.filter(a => a.date === day);
        if (dayAppts.length === 0) return null;
        const dayShows = dayAppts.filter(a => a.status === 'shown').length;
        return (
          <div key={day} className="mb-5">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-gray-900">{DAY_LABELS[day]}</h3>
              <span className="text-[11px] text-gray-400">{dayAppts.length} appts · {dayShows} shows · ${dayShows * REVENUE_PER_SHOW}</span>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {dayAppts.map(a => (
                <div key={a.id} className={`px-5 py-3 flex items-center justify-between ${a.status === 'shown' ? 'bg-green-50/30' : a.status === 'no_show' ? 'bg-red-50/20' : ''}`}>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-900 w-16">{a.time}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{a.lead}</p>
                      <p className="text-[11px] text-gray-400">{a.service} · {a.shop}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-gray-400">{a.setter}</span>
                    <span className="text-[11px] text-gray-400">{a.source}</span>
                    <StatusBadge status={a.status} />
                    {a.status === 'shown' && <span className="text-[11px] font-medium text-green-600">+$100</span>}
                    {(a.status === 'confirmed' || a.status === 'pending') && (
                      <a href="https://app.gohighlevel.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded-lg transition-colors">
                        <Phone size={10} />GHL
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
