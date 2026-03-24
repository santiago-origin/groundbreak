import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle, Loader2, ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';

const SERVICES = [
  'Vinyl Wrap + PPF',
  'Window Tint',
  'Ceramic Coating',
  'Detailing',
  'Paint Correction',
  'Chrome Delete',
  'Brake Caliper Color Change',
  'Commercial Wraps',
  'Headlight / Brake Light Tinting',
];

const schema = z.object({
  owner_names: z.string().min(1, 'Required'),
  owner_email: z.string().email('Enter a valid email').min(1, 'Required'),
  owner_phone: z.string().min(1, 'Required'),
  legal_business_name: z.string().min(1, 'Required'),
  legal_business_address: z.string().min(1, 'Required'),
  shop_address: z.string().min(1, 'Required'),
  mobile_services: z.string().min(1, 'Required'),
  operating_hours: z.string().min(1, 'Required'),
  website: z.string().optional(),
  services: z.array(z.string()).min(1, 'Select at least one service'),
  services_other: z.string().optional(),
  wrap_brands: z.string().optional(),
  ppf_brands: z.string().optional(),
  tint_brands: z.string().optional(),
  ceramic_brands: z.string().optional(),
  wrap_warranty: z.string().optional(),
  ppf_warranty: z.string().optional(),
  tint_warranty: z.string().optional(),
  ceramic_warranty: z.string().optional(),
  wrap_install_time: z.string().optional(),
  ppf_install_time: z.string().optional(),
  tint_install_time: z.string().optional(),
  ceramic_install_time: z.string().optional(),
  detail_install_time: z.string().optional(),
  waiting_area: z.string().optional(),
  key_drop: z.string().optional(),
  ride_assistance: z.string().optional(),
  dropoff_instructions: z.string().optional(),
  competitors: z.string().min(1, 'Required'),
});

const TOTAL_PAGES = 7;

const PAGE_TITLES = [
  null,
  'Business Information',
  'Services Offered',
  'Materials & Brands',
  'Warranty Details',
  'Install Times & Logistics',
  'Almost Done...',
];

const PAGE_DESCRIPTIONS = [
  null,
  "First thing's first — let's cover all of our basics!",
  'Include any other core services in the "other" section (ex: starlight headliner, audio, etc)',
  'Please list all brands that you use. If you are also certified with the brand — please mention it!',
  'If you offer different warranties for different products — please explain!',
  null,
  null,
];

export default function OnboardingForm() {
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState('idle');

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { services: [], mobile_services: '', waiting_area: '', key_drop: '', ride_assistance: '' },
  });

  const services = watch('services') || [];

  const fieldsPerPage = [
    [],
    ['owner_names', 'owner_email', 'owner_phone', 'legal_business_name', 'legal_business_address', 'shop_address', 'mobile_services', 'operating_hours'],
    ['services'],
    [],
    [],
    [],
    ['competitors'],
  ];

  const goNext = async () => {
    const fields = fieldsPerPage[page];
    if (fields.length > 0) {
      const valid = await trigger(fields);
      if (!valid) return;
    }
    setPage((p) => Math.min(p + 1, TOTAL_PAGES - 1));
  };

  const goBack = () => setPage((p) => Math.max(p - 1, 0));

  const onSubmit = async (data) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center px-4">
        <div className="w-full max-w-xl text-center animate-fade-in">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">You're all set!</h2>
            <p className="text-gray-500 text-base leading-relaxed max-w-sm mx-auto">
              Thank you for completing the onboarding form. Our team will review your information and reach out shortly.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const inputClass =
    'w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-300 transition-all';
  const textareaClass = `${inputClass} resize-none`;
  const labelClass = 'block text-sm font-medium text-gray-700 mb-2';
  const errorClass = 'text-red-500 text-xs mt-1.5';

  const progress = page / (TOTAL_PAGES - 1);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <img src="/logo-dark.png" alt="Ground Break Marketing" className="h-7" />
          {page > 0 && (
            <span className="text-xs font-medium text-gray-400 tracking-wide uppercase">
              Step {page} of {TOTAL_PAGES - 1}
            </span>
          )}
        </div>
        {/* Progress bar */}
        <div className="h-[2px] bg-gray-100">
          <div
            className="h-full bg-gray-900 transition-all duration-500 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl animate-fade-in" key={page}>
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* PAGE 0 — Intro */}
            {page === 0 && (
              <div className="text-center py-12">
                <img src="/logo-dark.png" alt="Ground Break Marketing" className="h-12 mx-auto mb-10" />
                <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 tracking-tight leading-tight mb-5">
                  Onboarding Form
                </h1>
                <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-lg mx-auto mb-12">
                  This survey is important to ensuring we have a successful marketing campaign. Please take the time to give thorough responses to ensure we get a complete understanding of you and your business!
                </p>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium px-8 py-3.5 rounded-xl text-[15px] transition-colors cursor-pointer"
                >
                  Get Started
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* PAGE 1 — Business Information */}
            {page === 1 && (
              <FormSection title={PAGE_TITLES[1]} description={PAGE_DESCRIPTIONS[1]}>
                <Field label="Owner(s) Name(s)" required error={errors.owner_names}>
                  <input {...register('owner_names')} className={inputClass} placeholder="John Smith" />
                </Field>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Owner Email" required error={errors.owner_email}>
                    <input {...register('owner_email')} type="email" className={inputClass} placeholder="john@example.com" />
                  </Field>
                  <Field label="Owner Phone" required error={errors.owner_phone}>
                    <input {...register('owner_phone')} type="tel" className={inputClass} placeholder="(555) 123-4567" />
                  </Field>
                </div>
                <Field label="Legal Business Name" required error={errors.legal_business_name}>
                  <input {...register('legal_business_name')} className={inputClass} placeholder="Smith Auto Detailing LLC" />
                </Field>
                <Field label="Legal Business Address" required error={errors.legal_business_address} hint="May be different from shop address">
                  <input {...register('legal_business_address')} className={inputClass} placeholder="123 Main St, Phoenix, AZ 85001" />
                </Field>
                <Field label="Shop Address" required error={errors.shop_address} hint="Add all shop locations if there are multiple">
                  <textarea {...register('shop_address')} className={textareaClass} rows={3} placeholder="123 Main St, Phoenix, AZ 85001" />
                </Field>
                <Field label="Do you offer mobile / at-home services?" required error={errors.mobile_services}>
                  <RadioGroup name="mobile_services" options={['Yes', 'No']} register={register} />
                </Field>
                <Field label="Operating Days + Hours" required error={errors.operating_hours}>
                  <textarea {...register('operating_hours')} className={textareaClass} rows={2} placeholder="Mon-Sat 7am-7pm" />
                </Field>
                <Field label="Website" hint="If any">
                  <input {...register('website')} className={inputClass} placeholder="https://yoursite.com" />
                </Field>
              </FormSection>
            )}

            {/* PAGE 2 — Services Offered */}
            {page === 2 && (
              <FormSection title={PAGE_TITLES[2]} description={PAGE_DESCRIPTIONS[2]}>
                <Field label="Which services do you offer?" required error={errors.services}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SERVICES.map((s) => (
                      <label
                        key={s}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border cursor-pointer transition-all text-[15px] ${
                          services.includes(s)
                            ? 'bg-gray-900 border-gray-900 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="checkbox"
                          value={s}
                          {...register('services')}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          services.includes(s) ? 'bg-white border-white' : 'border-gray-300'
                        }`}>
                          {services.includes(s) && (
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        {s}
                      </label>
                    ))}
                  </div>
                </Field>
                <Field label="Other Services" hint="Anything not listed above">
                  <textarea {...register('services_other')} className={textareaClass} rows={3} placeholder="Starlight headliner, audio installation, etc." />
                </Field>
              </FormSection>
            )}

            {/* PAGE 3 — Materials and Brands */}
            {page === 3 && (
              <FormSection title={PAGE_TITLES[3]} description={PAGE_DESCRIPTIONS[3]}>
                <Field label="Wrap Brand(s)">
                  <textarea {...register('wrap_brands')} className={textareaClass} rows={2} placeholder="3M, Avery Dennison, XPEL, etc." />
                </Field>
                <Field label="PPF Brand(s)">
                  <textarea {...register('ppf_brands')} className={textareaClass} rows={2} placeholder="XPEL, SunTek, etc." />
                </Field>
                <Field label="Tint Brand(s)">
                  <textarea {...register('tint_brands')} className={textareaClass} rows={2} placeholder="XPEL, Llumar, etc." />
                </Field>
                <Field label="Ceramic Coating Brand(s)">
                  <textarea {...register('ceramic_brands')} className={textareaClass} rows={2} placeholder="Ceramic Pro, Gtechniq, etc." />
                </Field>
              </FormSection>
            )}

            {/* PAGE 4 — Warranty Details */}
            {page === 4 && (
              <FormSection title={PAGE_TITLES[4]} description={PAGE_DESCRIPTIONS[4]}>
                <Field label="Vinyl Wrap Warranty">
                  <textarea {...register('wrap_warranty')} className={textareaClass} rows={2} placeholder="e.g. 5 years on color change wraps" />
                </Field>
                <Field label="PPF Warranty">
                  <textarea {...register('ppf_warranty')} className={textareaClass} rows={2} placeholder="e.g. 10 year manufacturer warranty" />
                </Field>
                <Field label="Tint Warranty">
                  <textarea {...register('tint_warranty')} className={textareaClass} rows={2} placeholder="e.g. Lifetime warranty on ceramic tint" />
                </Field>
                <Field label="Ceramic Coating Warranty">
                  <textarea {...register('ceramic_warranty')} className={textareaClass} rows={2} placeholder="e.g. 5 year coating package" />
                </Field>
              </FormSection>
            )}

            {/* PAGE 5 — Install Times & Logistics */}
            {page === 5 && (
              <FormSection title={PAGE_TITLES[5]}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0">
                  <Field label="Avg. Vinyl Wrap Install Time">
                    <input {...register('wrap_install_time')} className={inputClass} placeholder="e.g. 3-5 days" />
                  </Field>
                  <Field label="Avg. PPF Install Time">
                    <input {...register('ppf_install_time')} className={inputClass} placeholder="e.g. 1-2 days" />
                  </Field>
                  <Field label="Avg. Tint Install Time">
                    <input {...register('tint_install_time')} className={inputClass} placeholder="e.g. 2-3 hours" />
                  </Field>
                  <Field label="Avg. Ceramic Coating Time">
                    <input {...register('ceramic_install_time')} className={inputClass} placeholder="e.g. 1-2 days" />
                  </Field>
                  <Field label="Avg. Detailing Time">
                    <input {...register('detail_install_time')} className={inputClass} placeholder="e.g. 4-6 hours" />
                  </Field>
                </div>

                <div className="border-t border-gray-100 pt-6 mt-2 space-y-5">
                  <Field label="Waiting area available?">
                    <RadioGroup name="waiting_area" options={['Yes', 'No']} register={register} />
                  </Field>
                  <Field label="Key drop available?">
                    <RadioGroup name="key_drop" options={['Yes', 'No']} register={register} />
                  </Field>
                  <Field label="Ride assistance available? (Uber/shuttle)">
                    <RadioGroup name="ride_assistance" options={['Yes', 'No']} register={register} />
                  </Field>
                  <Field label="Special drop-off instructions to mention when booking?">
                    <textarea {...register('dropoff_instructions')} className={textareaClass} rows={3} placeholder="Any specific instructions for clients..." />
                  </Field>
                </div>
              </FormSection>
            )}

            {/* PAGE 6 — Competitors */}
            {page === 6 && (
              <FormSection title={PAGE_TITLES[6]}>
                <Field
                  label="List your company's competitors"
                  required
                  error={errors.competitors}
                  hint="We'll use this to scope out your direct competitors and see what's working / not working for them"
                >
                  <textarea {...register('competitors')} className={textareaClass} rows={5} placeholder="Competitor 1, Competitor 2, etc." />
                </Field>
              </FormSection>
            )}

            {/* Navigation */}
            {page > 0 && (
              <div className="flex items-center justify-between mt-10">
                <button
                  type="button"
                  onClick={goBack}
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-900 font-medium text-[15px] transition-colors cursor-pointer py-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                {page < TOTAL_PAGES - 1 ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 text-white font-medium px-7 py-3.5 rounded-xl text-[15px] transition-colors cursor-pointer"
                  >
                    Continue
                    <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="flex items-center gap-2.5 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium px-7 py-3.5 rounded-xl text-[15px] transition-colors cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}

            {status === 'error' && page === TOTAL_PAGES - 1 && (
              <p className="text-red-500 text-sm mt-4 text-right">Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

function FormSection({ title, description, children }) {
  return (
    <div>
      {title && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">{title}</h2>
          {description && <p className="text-gray-500 mt-2 text-[15px] leading-relaxed">{description}</p>}
        </div>
      )}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5">
        {children}
      </div>
    </div>
  );
}

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {hint && <p className="text-gray-400 text-xs mb-2">{hint}</p>}
      {children}
      {error && <p className="text-red-500 text-xs mt-1.5">{error.message}</p>}
    </div>
  );
}

function RadioGroup({ name, options, register }) {
  return (
    <div className="flex gap-3">
      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-gray-200 cursor-pointer hover:border-gray-300 transition-all text-[15px] text-gray-700 has-[:checked]:bg-gray-900 has-[:checked]:border-gray-900 has-[:checked]:text-white"
        >
          <input
            type="radio"
            value={opt}
            {...register(name)}
            className="sr-only"
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
