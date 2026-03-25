import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, Users, Phone, UserCircle,
  Bell, Search, ChevronRight
} from 'lucide-react';

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Overview' },
  { to: '/today', icon: CalendarCheck, label: "Today's Brief" },
  { to: '/appointments', icon: CalendarCheck, label: 'Appointments' },
  { to: '/leads', icon: Users, label: 'Leads' },
  { to: '/performance', icon: Phone, label: 'Call Center' },
  { to: '/clients', icon: UserCircle, label: 'Clients' },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col fixed h-screen">
        <div className="px-5 py-5 border-b border-gray-100 flex items-center gap-3">
          <img src="/logo-icon.png" alt="GB" className="w-8 h-8" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-gray-900 tracking-tight">Ground Break</p>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">Marketing</p>
          </div>
        </div>

        <nav className="flex-1 py-3 px-3 space-y-0.5">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <item.icon size={16} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold">JP</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-900 truncate">Jeremiah Ponce</p>
              <p className="text-[11px] text-gray-400 truncate">Ground Break Marketing</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-60">
        <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center justify-between px-8 py-3.5">
            <div />
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[13px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 w-48"
                />
              </div>
              <button className="relative p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <Bell size={16} className="text-gray-400" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
