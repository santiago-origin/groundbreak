import {
  User, Building2, MapPin, Globe, Clock, Phone, Mail, Wrench,
  Shield, Timer, Car, Award, Swords, CheckCircle, XCircle, CalendarCheck
} from 'lucide-react';
import { clientDetails } from './mockData';

const c = clientDetails;

export default function ClientInfo() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Client Information</h1>
        <p className="text-sm text-gray-400 mt-0.5">Onboarded {c.onboardedAt} — from onboarding form</p>
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
            <InfoRow label="Business Name" value={c.business} />
            <InfoRow label="Website" value={c.website} icon={<Globe size={12} className="text-gray-400" />} />
            <InfoRow label="Hours" value={c.hours} icon={<Clock size={12} className="text-gray-400" />} />
            <InfoRow label="Mobile Services" value={c.mobileServices ? 'Yes' : 'No'} />
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
            {c.shopAddresses.map((addr, i) => (
              <p key={i} className="text-sm text-gray-900">{addr}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Wrench size={14} /> Services Offered</h3>
        <div className="flex flex-wrap gap-2">
          {c.services.map(s => (
            <span key={s} className="text-[12px] font-medium bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg">{s}</span>
          ))}
        </div>
      </div>

      {/* Brands & Warranties */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Award size={14} /> Brands & Certifications</h3>
          <div className="space-y-3">
            <InfoRow label="Wrap" value={c.brands.wrap} />
            <InfoRow label="PPF" value={c.brands.ppf} />
            <InfoRow label="Tint" value={c.brands.tint} />
            <InfoRow label="Ceramic" value={c.brands.ceramic} />
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Shield size={14} /> Warranties</h3>
          <div className="space-y-3">
            <InfoRow label="Wrap" value={c.warranties.wrap} />
            <InfoRow label="PPF" value={c.warranties.ppf} />
            <InfoRow label="Tint" value={c.warranties.tint} />
            <InfoRow label="Ceramic" value={c.warranties.ceramic} />
          </div>
        </div>
      </div>

      {/* Install Times & Logistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Timer size={14} /> Average Install Times</h3>
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
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2 mb-4"><Car size={14} /> Client Logistics</h3>
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
          {c.competitors.map(comp => (
            <span key={comp} className="text-[12px] font-medium bg-red-50 text-red-700 px-3 py-1.5 rounded-lg">{comp}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex items-start justify-between">
      <span className="text-[11px] text-gray-400 uppercase tracking-wide flex-shrink-0">{label}</span>
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
