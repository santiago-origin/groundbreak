import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const schema = z.object({
  business_name: z.string().min(1, 'Business name is required'),
  owner_name: z.string().min(1, 'Owner name is required'),
  address: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
});

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA',
  'KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT',
  'VA','WA','WV','WI','WY',
];

export default function OnboardingForm() {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setStatus('submitting');
    try {
      const res = await fetch('/groundbreak-form/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 text-center">
        <CheckCircle className="mx-auto text-lime-500 mb-4" size={48} />
        <h2 className="text-xl font-semibold text-white mb-2">Submitted!</h2>
        <p className="text-neutral-400 text-sm mb-6">We'll be in touch soon.</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-lime-500 hover:text-lime-400 transition-colors cursor-pointer"
        >
          Submit another
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500 transition-colors';

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4"
    >
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 text-red-400 text-sm">
          <AlertCircle size={16} />
          Something went wrong. Please try again.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">Business Name *</label>
        <input {...register('business_name')} className={inputClass} placeholder="e.g. ABC Landscaping" />
        {errors.business_name && <p className="text-red-400 text-xs mt-1">{errors.business_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">Business Owner Name *</label>
        <input {...register('owner_name')} className={inputClass} placeholder="Full name" />
        {errors.owner_name && <p className="text-red-400 text-xs mt-1">{errors.owner_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1">Address</label>
        <input {...register('address')} className={inputClass} placeholder="Street address" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-neutral-300 mb-1">City *</label>
          <input {...register('city')} className={inputClass} placeholder="City" />
          {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-neutral-300 mb-1">State *</label>
          <select
            {...register('state')}
            className={`${inputClass} appearance-none`}
            defaultValue=""
          >
            <option value="" disabled>State</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-neutral-300 mb-1">ZIP</label>
          <input {...register('zip')} className={inputClass} placeholder="ZIP" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-lime-500 hover:bg-lime-400 disabled:bg-lime-500/50 text-neutral-950 font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}
