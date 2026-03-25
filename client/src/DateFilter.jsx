import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const RANGES = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'This Week', value: 'this_week' },
  { label: 'Last 7 Days', value: 'last_7' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last 30 Days', value: 'last_30' },
  { label: 'Last 3 Months', value: 'last_3m' },
  { label: 'All Time', value: 'all' },
];

export default function DateFilter({ value = 'this_month', onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = RANGES.find(r => r.value === value) || RANGES[4];

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-[12px] font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
      >
        <Calendar size={13} className="text-gray-400" />
        {selected.label}
        <ChevronDown size={12} className={`text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-900/5 py-1.5 z-20 min-w-[160px] animate-fade-in">
          {RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => { onChange?.(r.value); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2 text-[12px] font-medium transition-colors cursor-pointer ${
                r.value === value
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
