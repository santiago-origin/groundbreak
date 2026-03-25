import { useState } from 'react';
import { Phone, CheckCircle, XCircle, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { todayAppointments, REVENUE_PER_SHOW } from './mockData';
import { StatusBadge } from './Dashboard';

export default function TodayBrief() {
  const [appointments, setAppointments] = useState(todayAppointments);

  const markShown = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, shown: true, status: 'shown' } : a));
  };
  const markNoShow = (id) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, shown: false, status: 'no_show' } : a));
  };

  const shows = appointments.filter(a => a.shown === true).length;
  const noShows = appointments.filter(a => a.shown === false).length;
  const pending = appointments.filter(a => a.shown === null).length;
  const revenue = shows * REVENUE_PER_SHOW;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Today's Brief</h1>
        <p className="text-sm text-gray-400 mt-0.5">Wednesday, March 25 — Call and confirm, then mark results</p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-semibold text-gray-900">{appointments.length}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Total Appointments</p>
        </div>
        <div className="bg-green-50 rounded-2xl border border-green-100 p-4 text-center">
          <p className="text-2xl font-semibold text-green-700">{shows}</p>
          <p className="text-[11px] text-green-600 mt-0.5">Shows</p>
        </div>
        <div className="bg-red-50 rounded-2xl border border-red-100 p-4 text-center">
          <p className="text-2xl font-semibold text-red-600">{noShows}</p>
          <p className="text-[11px] text-red-500 mt-0.5">No-Shows</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <p className="text-2xl font-semibold text-gray-900">${revenue}</p>
          <p className="text-[11px] text-gray-400 mt-0.5">Revenue Earned</p>
        </div>
      </div>

      {/* Appointment list */}
      <div className="bg-white rounded-2xl border border-gray-100">
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="grid grid-cols-12 gap-4 text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            <div className="col-span-1">Time</div>
            <div className="col-span-2">Lead</div>
            <div className="col-span-2">Phone</div>
            <div className="col-span-2">Service</div>
            <div className="col-span-1">Setter</div>
            <div className="col-span-1">Source</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {appointments.map((a) => (
            <div key={a.id} className={`px-5 py-3.5 grid grid-cols-12 gap-4 items-center transition-colors ${a.shown === true ? 'bg-green-50/40' : a.shown === false ? 'bg-red-50/30' : 'hover:bg-gray-50/50'}`}>
              <div className="col-span-1">
                <span className="text-sm font-medium text-gray-900">{a.time}</span>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-gray-900">{a.lead}</p>
                <p className="text-[11px] text-gray-400">{a.shop}</p>
              </div>
              <div className="col-span-2">
                <a href={`tel:${a.phone}`} className="text-sm text-gray-700 hover:text-gray-900 flex items-center gap-1.5 transition-colors">
                  <Phone size={12} className="text-gray-400" />
                  {a.phone}
                </a>
              </div>
              <div className="col-span-2">
                <span className="text-sm text-gray-700">{a.service}</span>
              </div>
              <div className="col-span-1">
                <span className="text-[11px] text-gray-500">{a.setter.split(' ')[0]}</span>
              </div>
              <div className="col-span-1">
                <span className="text-[11px] text-gray-500">{a.source}</span>
              </div>
              <div className="col-span-1">
                <StatusBadge status={a.status} />
              </div>
              <div className="col-span-2 flex items-center justify-end gap-2">
                {a.shown === null ? (
                  <>
                    <button
                      onClick={() => markShown(a.id)}
                      className="flex items-center gap-1 text-[11px] font-medium text-green-700 bg-green-50 hover:bg-green-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <CheckCircle size={12} />
                      Show
                    </button>
                    <button
                      onClick={() => markNoShow(a.id)}
                      className="flex items-center gap-1 text-[11px] font-medium text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      <XCircle size={12} />
                      No-Show
                    </button>
                  </>
                ) : a.shown ? (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-green-700">
                    <CheckCircle size={12} />
                    Showed — +${REVENUE_PER_SHOW}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-medium text-red-500">
                    <XCircle size={12} />
                    No-Show
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {pending > 0 && (
        <div className="mt-4 flex items-center gap-2 text-sm text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
          <AlertCircle size={16} />
          {pending} appointment{pending > 1 ? 's' : ''} still pending — call to confirm and mark results
        </div>
      )}
    </div>
  );
}
