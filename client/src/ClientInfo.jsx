import { useState } from 'react';
import {
  User, Building2, MapPin, Globe, Clock, Phone, Mail, Wrench,
  Shield, Timer, Car, Award, Swords, CheckCircle, XCircle,
  ChevronRight, ArrowLeft, CalendarCheck, DollarSign
} from 'lucide-react';
import { clientDetails, REVENUE_PER_SHOW } from './mockData';

// Mock client list (agency has multiple clients)
const clients = [
  {
    ...clientDetails,
    id: 1,
    status: 'active',
    totalShows: 53,
    totalLeads: 126,
    monthlyAdSpend: 3200,
  },
  {
    id: 2,
    owner: 'Jason Tran',
    email: 'jason@deserttintpros.com',
    phone: '(602) 555-8901',
    business: 'Desert Tint Pros',
    legalAddress: '7890 E McDowell Rd, Scottsdale, AZ 85257',
    shopAddresses: ['7890 E McDowell Rd, Scottsdale, AZ 85257'],
    website: 'deserttintpros.com',
    mobileServices: true,
    hours: 'Mon-Fri 9am-5pm, Sat 9am-2pm',
    services: ['Window Tint', 'Ceramic Coating', 'PPF', 'Paint Correction'],
    brands: { wrap: 'N/A', ppf: 'SunTek', tint: 'Llumar, 3M', ceramic: 'Gtechniq Crystal Serum' },
    warranties: { wrap: 'N/A', ppf: '7 yr manufacturer', tint: 'Lifetime', ceramic: '9 yr Gtechniq' },
    installTimes: { wrap: 'N/A', ppf: '1-2 days', tint: '1-2 hrs', ceramic: '1 day', detail: '3-5 hrs' },
    logistics: { waitingArea: true, keyDrop: false, rideAssistance: true },
    dropoffInstructions: 'Park in the designated client spots. Check in at the front desk.',
    competitors: ['Tint World Scottsdale', 'Sun Stoppers AZ'],
    onboardedAt: '2026-02-20',
    status: 'active',
    totalShows: 38,
    totalLeads: 94,
    monthlyAdSpend: 2400,
  },
  {
    id: 3,
    owner: 'Samantha Cruz',
    email: 'sam@wrappedaz.com',
    phone: '(480) 555-4567',
    business: 'Wrapped AZ',
    legalAddress: '2200 N Scottsdale Rd, Tempe, AZ 85281',
    shopAddresses: ['2200 N Scottsdale Rd, Tempe, AZ 85281'],
    website: 'wrappedaz.com',
    mobileServices: false,
    hours: 'Mon-Sat 8am-7pm',
    services: ['Vinyl Wrap + PPF', 'Commercial Wraps', 'Chrome Delete', 'Brake Caliper Color Change'],
    brands: { wrap: 'Avery Dennison, KPMF', ppf: 'XPEL Stealth', tint: 'N/A', ceramic: 'N/A' },
    warranties: { wrap: '5 yr on premium films', ppf: '10 yr XPEL', tint: 'N/A', ceramic: 'N/A' },
    installTimes: { wrap: '4-7 days', ppf: '2-3 days', tint: 'N/A', ceramic: 'N/A', detail: 'N/A' },
    logistics: { waitingArea: false, keyDrop: true, rideAssistance: false },
    dropoffInstructions: 'Drop off anytime. Use the lockbox code we text you.',
    competitors: ['AZ Wrap Kings', 'Phoenix Vehicle Wraps'],
    onboardedAt: '2026-03-10',
    status: 'onboarding',
    totalShows: 12,
    totalLeads: 34,
    monthlyAdSpend: 1800,
  },
];

const statusStyles = {
  active: 'bg-green-50 text-green-700',
  onboarding: 'bg-amber-50 text-amber-700',
  paused: 'bg-gray-100 text-gray-500',
};

export default function Clients() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <ClientDetail client={selected} onBack={() => setSelected(null)} />;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
        <p className="text-sm text-gray-400 mt-0.5">{clients.length} active clients</p>
      </div>

      <div className="space-y-3">
        {clients.map(c => (
          <button
            key={c.id}
            onClick={() => setSelected(c)}
            className="w-full bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:border-gray-200 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{c.business.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{c.business}</p>
                <p className="text-[12px] text-gray-400">{c.owner} · {c.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">{c.totalShows} shows</p>
                <p className="text-[11px] text-green-600">${c.totalShows * REVENUE_PER_SHOW} revenue</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-700">{c.totalLeads} leads</p>
                <p className="text-[11px] text-gray-400">${c.monthlyAdSpend}/mo ad spend</p>
              </div>
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full capitalize ${statusStyles[c.status]}`}>
                {c.status}
              </span>
              <ChevronRight size={16} className="text-gray-300" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function ClientDetail({ client: c, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors cursor-pointer">
        <ArrowLeft size={14} />
        Back to clients
      </button>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
            <span className="text-white text-sm font-bold">{c.business.split(' ').map(w => w[0]).join('').slice(0, 3)}</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{c.business}</h1>
            <p className="text-sm text-gray-400">Onboarded {c.onboardedAt}</p>
          </div>
        </div>
        <span className={`text-[11px] font-medium px-3 py-1 rounded-full capitalize ${statusStyles[c.status]}`}>
          {c.status}
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4 mb-5">
        <MiniStat icon={DollarSign} label="Revenue" value={`$${(c.totalShows * REVENUE_PER_SHOW).toLocaleString()}`} />
        <MiniStat icon={CalendarCheck} label="Shows" value={c.totalShows} />
        <MiniStat icon={User} label="Leads" value={c.totalLeads} />
        <MiniStat icon={DollarSign} label="Ad Spend" value={`$${c.monthlyAdSpend}/mo`} />
      </div>

      {/* Owner & Business */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><User size={14} /> Owner</h3>
          <div className="space-y-3">
            <InfoRow label="Name" value={c.owner} />
            <InfoRow label="Email" value={c.email} icon={<Mail size={12} className="text-gray-400" />} />
            <InfoRow label="Phone" value={c.phone} icon={<Phone size={12} className="text-gray-400" />} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Building2 size={14} /> Business</h3>
          <div className="space-y-3">
            <InfoRow label="Business" value={c.business} />
            <InfoRow label="Website" value={c.website} icon={<Globe size={12} className="text-gray-400" />} />
            <InfoRow label="Hours" value={c.hours} icon={<Clock size={12} className="text-gray-400" />} />
            <InfoRow label="Mobile" value={c.mobileServices ? 'Yes' : 'No'} />
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><MapPin size={14} /> Locations</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">Legal Address</p>
            <p className="text-sm text-gray-900">{c.legalAddress}</p>
          </div>
          <div>
            <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">Shop Locations</p>
            {c.shopAddresses.map((addr, i) => <p key={i} className="text-sm text-gray-900">{addr}</p>)}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Wrench size={14} /> Services</h3>
        <div className="flex flex-wrap gap-2">
          {c.services.map(s => <span key={s} className="text-[12px] font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">{s}</span>)}
        </div>
      </div>

      {/* Brands & Warranties */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Award size={14} /> Brands</h3>
          <div className="space-y-3">
            {Object.entries(c.brands).map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Shield size={14} /> Warranties</h3>
          <div className="space-y-3">
            {Object.entries(c.warranties).map(([k, v]) => <InfoRow key={k} label={k} value={v} />)}
          </div>
        </div>
      </div>

      {/* Install Times & Logistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Timer size={14} /> Install Times</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(c.installTimes).map(([k, v]) => (
              <div key={k} className="bg-gray-50 rounded-xl p-3">
                <p className="text-[11px] text-gray-400 capitalize">{k}</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{v}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Car size={14} /> Logistics</h3>
          <div className="space-y-3">
            <LogisticRow label="Waiting Area" value={c.logistics.waitingArea} />
            <LogisticRow label="Key Drop" value={c.logistics.keyDrop} />
            <LogisticRow label="Ride Assistance" value={c.logistics.rideAssistance} />
          </div>
          {c.dropoffInstructions && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-[11px] text-gray-400 uppercase tracking-wide mb-1">Drop-off Instructions</p>
              <p className="text-sm text-gray-700 leading-relaxed">{c.dropoffInstructions}</p>
            </div>
          )}
        </div>
      </div>

      {/* Competitors */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Swords size={14} /> Competitors</h3>
        <div className="flex flex-wrap gap-2">
          {c.competitors.map(comp => <span key={comp} className="text-[12px] font-medium bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">{comp}</span>)}
        </div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
      <Icon size={14} className="mx-auto mb-1.5 text-gray-300" />
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <p className="text-[11px] text-gray-400">{label}</p>
    </div>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-[11px] text-gray-400 uppercase tracking-wide flex-shrink-0 capitalize">{label}</span>
      <span className="text-sm text-gray-900 text-right flex items-center gap-1.5">{icon}{value}</span>
    </div>
  );
}

function LogisticRow({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-700">{label}</span>
      {value ? (
        <span className="flex items-center gap-1 text-[12px] font-medium text-green-600"><CheckCircle size={12} /> Yes</span>
      ) : (
        <span className="flex items-center gap-1 text-[12px] font-medium text-gray-400"><XCircle size={12} /> No</span>
      )}
    </div>
  );
}
