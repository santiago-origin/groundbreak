import { useState, useRef, useEffect } from 'react';
import { Bell, UserPlus, CalendarCheck, PhoneIncoming, Star, AlertCircle, CheckCheck } from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, icon: UserPlus, color: 'text-blue-600 bg-blue-50', title: 'New lead: Tyler Morgan', desc: 'PPF Full Front · Google Ads', time: '2 min ago', unread: true },
  { id: 2, icon: UserPlus, color: 'text-blue-600 bg-blue-50', title: 'New lead: Priya Sharma', desc: 'Ceramic + Detail · Instagram', time: '8 min ago', unread: true },
  { id: 3, icon: CalendarCheck, color: 'text-green-600 bg-green-50', title: 'Appointment confirmed', desc: 'Marcus Thompson · 9:00 AM today', time: '15 min ago', unread: true },
  { id: 4, icon: PhoneIncoming, color: 'text-amber-600 bg-amber-50', title: 'Missed call from lead', desc: 'Brandon Lee · (623) 555-0842', time: '32 min ago', unread: false },
  { id: 5, icon: Star, color: 'text-purple-600 bg-purple-50', title: 'New Google review (5 stars)', desc: 'Elite Auto Wraps · "Amazing work on my M4"', time: '1 hr ago', unread: false },
  { id: 6, icon: CalendarCheck, color: 'text-green-600 bg-green-50', title: 'Appointment booked', desc: 'Sarah Chen · Ceramic Coating · Tomorrow', time: '2 hr ago', unread: false },
  { id: 7, icon: AlertCircle, color: 'text-red-600 bg-red-50', title: 'No-show: Jake Turner', desc: 'Window Tint · Was scheduled 2:00 PM', time: '3 hr ago', unread: false },
  { id: 8, icon: UserPlus, color: 'text-blue-600 bg-blue-50', title: 'New lead: Hannah Wilson', desc: 'PPF + Ceramic · Facebook', time: '4 hr ago', unread: false },
];

export default function NotificationsBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const ref = useRef(null);

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-1.5 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <Bell size={16} className="text-gray-400" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl shadow-gray-900/10 w-96 z-30 animate-fade-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-[11px] font-medium text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
              >
                <CheckCheck size={12} />
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/50 ${n.unread ? 'bg-blue-50/30' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${n.color}`}>
                  <n.icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-[13px] ${n.unread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>{n.title}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{n.desc}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                  {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
