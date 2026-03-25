import { useState } from 'react';
import { Phone, Mail, ChevronRight } from 'lucide-react';
import DateFilter from './DateFilter';
import { leads } from './mockData';

const STATUS_STYLES = {
  new: 'bg-blue-50 text-blue-700',
  contacted: 'bg-amber-50 text-amber-700',
  booked: 'bg-green-50 text-green-700',
  lost: 'bg-gray-100 text-gray-500',
};

export default function Leads() {
  const [filter, setFilter] = useState('all');
  const [range, setRange] = useState('this_month');
  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    booked: leads.filter(l => l.status === 'booked').length,
    lost: leads.filter(l => l.status === 'lost').length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-400 mt-0.5">{leads.length} total leads</p>
        </div>
        <DateFilter value={range} onChange={setRange} />
      </div>

      {/* Pipeline summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[['new', 'New', 'bg-blue-50 border-blue-100'], ['contacted', 'Contacted', 'bg-amber-50 border-amber-100'], ['booked', 'Booked', 'bg-green-50 border-green-100'], ['lost', 'Lost', 'bg-gray-50 border-gray-100']].map(([status, label, style]) => (
          <button
            key={status}
            onClick={() => setFilter(filter === status ? 'all' : status)}
            className={`rounded-2xl border p-4 text-center transition-all cursor-pointer ${filter === status ? 'ring-2 ring-gray-900/20' : ''} ${style}`}
          >
            <p className="text-2xl font-semibold text-gray-900">{counts[status]}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">{label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {[['all', 'All'], ['new', 'New'], ['contacted', 'Contacted'], ['booked', 'Booked'], ['lost', 'Lost']].map(([val, label]) => (
          <button
            key={val}
            onClick={() => setFilter(val)}
            className={`text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${filter === val ? 'bg-gray-900 text-white' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900'}`}
          >
            {label} ({counts[val]})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-3 border-b border-gray-50">
          <div className="grid grid-cols-12 gap-4 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Contact</div>
            <div className="col-span-2">Service</div>
            <div className="col-span-1">Source</div>
            <div className="col-span-2">Setter</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Date</div>
          </div>
        </div>
        <div className="divide-y divide-gray-50">
          {filtered.map(l => (
            <div key={l.id} className="px-5 py-3 grid grid-cols-12 gap-4 items-center hover:bg-gray-50/50 transition-colors">
              <div className="col-span-3">
                <p className="text-sm font-medium text-gray-900">{l.name}</p>
              </div>
              <div className="col-span-2">
                <div className="flex items-center gap-1.5 text-[12px] text-gray-600">
                  <Phone size={11} className="text-gray-400" />
                  {l.phone}
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                  <Mail size={10} className="text-gray-300" />
                  {l.email}
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-700">{l.service}</span>
              </div>
              <div className="col-span-1">
                <span className="text-[11px] text-gray-500">{l.source}</span>
              </div>
              <div className="col-span-2">
                <span className="text-[12px] text-gray-600">{l.setter || '—'}</span>
              </div>
              <div className="col-span-1">
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[l.status]}`}>
                  {l.status.charAt(0).toUpperCase() + l.status.slice(1)}
                </span>
              </div>
              <div className="col-span-1">
                <span className="text-[11px] text-gray-400">{l.createdAt.slice(5)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
