import { useState } from 'react';
import { Phone, CalendarCheck, Eye, EyeOff, TrendingUp, Clock } from 'lucide-react';
import DateFilter from './DateFilter';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { setters, REVENUE_PER_SHOW } from './mockData';

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

export default function Performance() {
  const [range, setRange] = useState('this_month');
  const totalCalls = setters.reduce((s, a) => s + a.stats.callsMade, 0);
  const totalBooked = setters.reduce((s, a) => s + a.stats.booked, 0);
  const totalShows = setters.reduce((s, a) => s + a.stats.shows, 0);
  const totalRevenue = totalShows * REVENUE_PER_SHOW;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Call Center Performance</h1>
          <p className="text-sm text-gray-400 mt-0.5">Setter metrics</p>
        </div>
        <DateFilter value={range} onChange={setRange} />
      </div>

      {/* Team totals */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon={Phone} label="Total Calls" value={totalCalls} />
        <StatCard icon={CalendarCheck} label="Total Booked" value={totalBooked} />
        <StatCard icon={Eye} label="Total Shows" value={totalShows} />
        <StatCard icon={TrendingUp} label="Revenue Generated" value={`$${totalRevenue.toLocaleString()}`} accent />
      </div>

      {/* Per-setter breakdown */}
      <div className="space-y-4">
        {setters.map((setter) => {
          const contactRate = ((setter.stats.contacted / setter.stats.leadsAssigned) * 100).toFixed(0);
          const bookingRate = ((setter.stats.booked / setter.stats.contacted) * 100).toFixed(0);
          const showRate = ((setter.stats.shows / setter.stats.booked) * 100).toFixed(0);
          const revenue = setter.stats.shows * REVENUE_PER_SHOW;
          const chartData = setter.weeklyBookings.map((v, i) => ({ day: DAY_LABELS[i], bookings: v }));

          return (
            <div key={setter.name} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{setter.avatar}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{setter.name}</p>
                    <p className="text-[11px] text-gray-400">{setter.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">${revenue}</p>
                  <p className="text-[11px] text-gray-400">{setter.stats.shows} shows</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                {/* Stats */}
                <div className="col-span-3 grid grid-cols-3 gap-3">
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Leads Assigned</p>
                    <p className="text-lg font-semibold text-gray-900">{setter.stats.leadsAssigned}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{contactRate}% contacted</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Calls Made</p>
                    <p className="text-lg font-semibold text-gray-900">{setter.stats.callsMade}</p>
                    <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
                      <Clock size={10} />
                      Avg {setter.stats.avgCallDuration}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Booked</p>
                    <p className="text-lg font-semibold text-gray-900">{setter.stats.booked}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">{bookingRate}% booking rate</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3">
                    <p className="text-[11px] text-green-600 mb-1">Shows</p>
                    <p className="text-lg font-semibold text-green-700">{setter.stats.shows}</p>
                    <p className="text-[11px] text-green-600 mt-0.5">{showRate}% show rate</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-3">
                    <p className="text-[11px] text-red-500 mb-1">No-Shows</p>
                    <p className="text-lg font-semibold text-red-600">{setter.stats.noShows}</p>
                    <p className="text-[11px] text-red-400 mt-0.5">{100 - parseInt(showRate)}% no-show rate</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[11px] text-gray-400 mb-1">Revenue</p>
                    <p className="text-lg font-semibold text-gray-900">${revenue}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">${REVENUE_PER_SHOW}/show</p>
                  </div>
                </div>

                {/* Weekly chart */}
                <div className="flex flex-col">
                  <p className="text-[11px] text-gray-400 mb-2">Weekly Bookings</p>
                  <div className="flex-1">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData}>
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#999' }} />
                        <Bar dataKey="bookings" fill="#111" radius={[3, 3, 0, 0]} barSize={16} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }) {
  return (
    <div className={`rounded-2xl border p-4 text-center ${accent ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-100'}`}>
      <Icon size={16} className={`mx-auto mb-2 ${accent ? 'text-gray-400' : 'text-gray-300'}`} />
      <p className={`text-xl font-semibold ${accent ? 'text-white' : 'text-gray-900'}`}>{value}</p>
      <p className={`text-[11px] mt-0.5 ${accent ? 'text-gray-400' : 'text-gray-400'}`}>{label}</p>
    </div>
  );
}
