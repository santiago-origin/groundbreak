import { useState } from 'react';
import { Phone, CheckCircle, XCircle, DollarSign, AlertCircle, ExternalLink, Clock, User } from 'lucide-react';
import { todayAppointments, REVENUE_PER_SHOW } from './mockData';

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
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Today's Brief</h1>
          <p className="text-sm text-gray-400 mt-0.5">Wednesday, March 25 — {appointments.length} appointments</p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{shows}</p>
            <p className="text-[11px] text-green-600 font-medium">Shows</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{noShows}</p>
            <p className="text-[11px] text-red-500 font-medium">No-Shows</p>
          </div>
          <div className="h-8 w-px bg-gray-200" />
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">${revenue}</p>
            <p className="text-[11px] text-gray-400 font-medium">Earned</p>
          </div>
        </div>
      </div>

      {/* Appointment cards */}
      <div className="space-y-2.5">
        {appointments.map((a) => {
          const isDone = a.shown !== null;
          const isShown = a.shown === true;

          return (
            <div
              key={a.id}
              className={`bg-white rounded-xl border p-4 transition-all ${
                isShown ? 'border-green-200 bg-green-50/30' :
                a.shown === false ? 'border-red-200 bg-red-50/20' :
                'border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex items-center gap-5">
                {/* Time */}
                <div className="w-20 flex-shrink-0">
                  <p className="text-base font-semibold text-gray-900">{a.time}</p>
                </div>

                {/* Lead info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">{a.lead}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      a.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                      a.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                      a.status === 'no_answer' ? 'bg-red-100 text-red-600' :
                      a.status === 'shown' ? 'bg-green-100 text-green-700' :
                      a.status === 'no_show' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {a.status === 'no_answer' ? 'No Answer' : a.status === 'no_show' ? 'No-Show' : a.status.charAt(0).toUpperCase() + a.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-[12px] text-gray-400">
                    <span>{a.service}</span>
                    <span>{a.shop}</span>
                    <span className="flex items-center gap-1"><User size={10} />{a.setter.split(' ')[0]}</span>
                    <span>{a.source}</span>
                  </div>
                </div>

                {/* Phone + Call GHL */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[13px] text-gray-600 font-mono">{a.phone}</span>
                  <a
                    href="https://app.gohighlevel.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[12px] font-medium text-white bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Phone size={12} />
                    Call
                    <ExternalLink size={10} />
                  </a>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-gray-200 flex-shrink-0" />

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!isDone ? (
                    <>
                      <button
                        onClick={() => markShown(a.id)}
                        className="flex items-center gap-1.5 text-[12px] font-medium bg-green-600 hover:bg-green-700 text-white px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <CheckCircle size={13} />
                        Showed
                      </button>
                      <button
                        onClick={() => markNoShow(a.id)}
                        className="flex items-center gap-1.5 text-[12px] font-medium bg-white border border-red-200 text-red-600 hover:bg-red-50 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        <XCircle size={13} />
                        No-Show
                      </button>
                    </>
                  ) : isShown ? (
                    <div className="flex items-center gap-1.5 text-[12px] font-semibold text-green-700 bg-green-100 px-3.5 py-1.5 rounded-lg">
                      <CheckCircle size={13} />
                      +${REVENUE_PER_SHOW}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[12px] font-medium text-red-500 bg-red-50 px-3.5 py-1.5 rounded-lg">
                      <XCircle size={13} />
                      No-Show
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {pending > 0 && (
        <div className="mt-5 flex items-center gap-2 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
          <AlertCircle size={16} />
          <span><strong>{pending}</strong> appointment{pending > 1 ? 's' : ''} still need to be marked — call and confirm, then log results</span>
        </div>
      )}
    </div>
  );
}
