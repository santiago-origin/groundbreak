// ============================================
// MOCK DATA — Ground Break Marketing Dashboard
// Revenue model: $100 per appointment SHOW
// ============================================

export const REVENUE_PER_SHOW = 100;

// --- TODAY'S APPOINTMENTS (Daily Brief) ---
export const todayAppointments = [
  { id: 1, lead: 'Marcus Thompson', phone: '(480) 555-0142', service: 'Full Body PPF', time: '9:00 AM', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Google Ads', status: 'confirmed', shown: null },
  { id: 2, lead: 'Sarah Chen', phone: '(602) 555-0198', service: 'Ceramic Coating', time: '10:30 AM', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Instagram', status: 'confirmed', shown: null },
  { id: 3, lead: 'David Reeves', phone: '(480) 555-0267', service: 'Color Change Wrap', time: '11:00 AM', shop: 'Desert Tint Pros', setter: 'Maria Santos', source: 'Google Ads', status: 'pending', shown: null },
  { id: 4, lead: 'Jessica Park', phone: '(623) 555-0334', service: 'Window Tint', time: '1:00 PM', shop: 'Elite Auto Wraps', setter: 'Jordan Blake', source: 'Facebook', status: 'confirmed', shown: null },
  { id: 5, lead: 'Ryan Mitchell', phone: '(480) 555-0411', service: 'PPF Front End', time: '2:00 PM', shop: 'Desert Tint Pros', setter: 'Alex Rivera', source: 'Referral', status: 'pending', shown: null },
  { id: 6, lead: 'Amanda Liu', phone: '(602) 555-0488', service: 'Full Detail + Ceramic', time: '3:30 PM', shop: 'Elite Auto Wraps', setter: 'Maria Santos', source: 'Google Ads', status: 'confirmed', shown: null },
  { id: 7, lead: 'Carlos Mendez', phone: '(480) 555-0556', service: 'Commercial Wrap', time: '4:00 PM', shop: 'Elite Auto Wraps', setter: 'Jordan Blake', source: 'Website', status: 'no_answer', shown: null },
  { id: 8, lead: 'Brittany Hayes', phone: '(623) 555-0623', service: 'Chrome Delete', time: '5:00 PM', shop: 'Desert Tint Pros', setter: 'Alex Rivera', source: 'Instagram', status: 'confirmed', shown: null },
];

// --- WEEKLY APPOINTMENTS (for tracker) ---
export const weeklyAppointments = [
  // Monday
  { id: 101, lead: 'Tom Brady', phone: '(480) 555-1001', service: 'Full Wrap', time: '9:00 AM', date: '2026-03-23', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Google Ads', status: 'shown' },
  { id: 102, lead: 'Lisa Wong', phone: '(602) 555-1002', service: 'Ceramic', time: '11:00 AM', date: '2026-03-23', shop: 'Elite Auto Wraps', setter: 'Maria Santos', source: 'Instagram', status: 'shown' },
  { id: 103, lead: 'Jake Turner', phone: '(480) 555-1003', service: 'Tint', time: '2:00 PM', date: '2026-03-23', shop: 'Desert Tint Pros', setter: 'Jordan Blake', source: 'Google Ads', status: 'no_show' },
  // Tuesday
  { id: 104, lead: 'Emily Ross', phone: '(623) 555-1004', service: 'PPF', time: '10:00 AM', date: '2026-03-24', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Facebook', status: 'shown' },
  { id: 105, lead: 'Derek Hall', phone: '(480) 555-1005', service: 'Detail', time: '1:00 PM', date: '2026-03-24', shop: 'Desert Tint Pros', setter: 'Maria Santos', source: 'Google Ads', status: 'shown' },
  { id: 106, lead: 'Nina Patel', phone: '(602) 555-1006', service: 'Wrap + PPF', time: '3:00 PM', date: '2026-03-24', shop: 'Elite Auto Wraps', setter: 'Jordan Blake', source: 'Referral', status: 'cancelled' },
  // Wednesday (today)
  ...todayAppointments.map(a => ({ ...a, date: '2026-03-25' })),
  // Thursday
  { id: 201, lead: 'Kevin Brooks', phone: '(480) 555-2001', service: 'Full Wrap', time: '9:00 AM', date: '2026-03-26', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Google Ads', status: 'confirmed' },
  { id: 202, lead: 'Rachel Kim', phone: '(602) 555-2002', service: 'Ceramic', time: '11:00 AM', date: '2026-03-26', shop: 'Desert Tint Pros', setter: 'Maria Santos', source: 'Instagram', status: 'confirmed' },
  { id: 203, lead: 'James Foster', phone: '(623) 555-2003', service: 'PPF', time: '2:00 PM', date: '2026-03-26', shop: 'Elite Auto Wraps', setter: 'Jordan Blake', source: 'Google Ads', status: 'pending' },
  // Friday
  { id: 204, lead: 'Samantha Cruz', phone: '(480) 555-2004', service: 'Tint + Ceramic', time: '10:00 AM', date: '2026-03-27', shop: 'Elite Auto Wraps', setter: 'Alex Rivera', source: 'Facebook', status: 'confirmed' },
  { id: 205, lead: 'Mike O\'Brien', phone: '(602) 555-2005', service: 'Commercial Wrap', time: '1:00 PM', date: '2026-03-27', shop: 'Desert Tint Pros', setter: 'Maria Santos', source: 'Website', status: 'pending' },
];

// --- LEADS ---
export const leads = [
  { id: 1, name: 'Marcus Thompson', phone: '(480) 555-0142', email: 'marcus.t@email.com', source: 'Google Ads', service: 'Full Body PPF', status: 'booked', createdAt: '2026-03-24', setter: 'Alex Rivera' },
  { id: 2, name: 'Sarah Chen', phone: '(602) 555-0198', email: 'sarah.c@email.com', source: 'Instagram', service: 'Ceramic Coating', status: 'booked', createdAt: '2026-03-24', setter: 'Alex Rivera' },
  { id: 3, name: 'David Reeves', phone: '(480) 555-0267', email: 'david.r@email.com', source: 'Google Ads', service: 'Color Change Wrap', status: 'booked', createdAt: '2026-03-23', setter: 'Maria Santos' },
  { id: 4, name: 'Jessica Park', phone: '(623) 555-0334', email: 'jess.p@email.com', source: 'Facebook', service: 'Window Tint', status: 'booked', createdAt: '2026-03-23', setter: 'Jordan Blake' },
  { id: 5, name: 'Tyler Morgan', phone: '(480) 555-0700', email: 'tyler.m@email.com', source: 'Google Ads', service: 'PPF Full Front', status: 'contacted', createdAt: '2026-03-25', setter: 'Alex Rivera' },
  { id: 6, name: 'Priya Sharma', phone: '(602) 555-0771', email: 'priya.s@email.com', source: 'Instagram', service: 'Ceramic + Detail', status: 'new', createdAt: '2026-03-25', setter: null },
  { id: 7, name: 'Brandon Lee', phone: '(623) 555-0842', email: 'brandon.l@email.com', source: 'Google Ads', service: 'Commercial Wrap', status: 'new', createdAt: '2026-03-25', setter: null },
  { id: 8, name: 'Olivia Martin', phone: '(480) 555-0913', email: 'olivia.m@email.com', source: 'Website', service: 'Color Change Wrap', status: 'contacted', createdAt: '2026-03-24', setter: 'Maria Santos' },
  { id: 9, name: 'Chris Nguyen', phone: '(602) 555-0984', email: 'chris.n@email.com', source: 'Referral', service: 'Window Tint', status: 'lost', createdAt: '2026-03-20', setter: 'Jordan Blake' },
  { id: 10, name: 'Hannah Wilson', phone: '(480) 555-1055', email: 'hannah.w@email.com', source: 'Facebook', service: 'PPF + Ceramic', status: 'contacted', createdAt: '2026-03-25', setter: 'Alex Rivera' },
];

// --- SETTER/AGENT PERFORMANCE ---
export const setters = [
  {
    name: 'Alex Rivera', role: 'Senior Setter', avatar: 'AR',
    stats: { leadsAssigned: 48, contacted: 44, booked: 28, shows: 22, noShows: 6, callsMade: 156, avgCallDuration: '2:34' },
    weeklyBookings: [6, 5, 7, 4, 6],
  },
  {
    name: 'Maria Santos', role: 'Setter', avatar: 'MS',
    stats: { leadsAssigned: 42, contacted: 38, booked: 22, shows: 17, noShows: 5, callsMade: 134, avgCallDuration: '3:12' },
    weeklyBookings: [4, 5, 4, 5, 4],
  },
  {
    name: 'Jordan Blake', role: 'Setter', avatar: 'JB',
    stats: { leadsAssigned: 36, contacted: 30, booked: 18, shows: 14, noShows: 4, callsMade: 112, avgCallDuration: '2:48' },
    weeklyBookings: [3, 4, 3, 4, 4],
  },
];

// --- REVENUE DATA ---
export const monthlyRevenue = [
  { month: 'Oct', shows: 52, revenue: 5200, leads: 98, booked: 68 },
  { month: 'Nov', shows: 61, revenue: 6100, leads: 112, booked: 78 },
  { month: 'Dec', shows: 48, revenue: 4800, leads: 85, booked: 62 },
  { month: 'Jan', shows: 67, revenue: 6700, leads: 124, booked: 86 },
  { month: 'Feb', shows: 74, revenue: 7400, leads: 136, booked: 94 },
  { month: 'Mar', shows: 53, revenue: 5300, leads: 126, booked: 68 },
];

export const dailyRevenue = [
  { day: 'Mon', shows: 2, revenue: 200 },
  { day: 'Tue', shows: 3, revenue: 300 },
  { day: 'Wed', shows: 0, revenue: 0 },
  { day: 'Thu', shows: 0, revenue: 0 },
  { day: 'Fri', shows: 0, revenue: 0 },
];

// --- CLIENT DETAILS (from onboarding) ---
export const clientDetails = {
  owner: 'Mike Rodriguez',
  email: 'mike@eliteautowraps.com',
  phone: '(480) 555-1234',
  business: 'Elite Auto Wraps LLC',
  legalAddress: '4521 W Camelback Rd, Phoenix, AZ 85031',
  shopAddresses: ['4521 W Camelback Rd, Phoenix, AZ 85031', '1200 E University Dr, Tempe, AZ 85281'],
  website: 'eliteautowraps.com',
  mobileServices: false,
  hours: 'Mon-Sat 8am-6pm',
  services: ['Vinyl Wrap + PPF', 'Window Tint', 'Ceramic Coating', 'Detailing', 'Paint Correction', 'Chrome Delete', 'Commercial Wraps'],
  brands: {
    wrap: '3M 2080, Avery Dennison SW900 (Certified)',
    ppf: 'XPEL Ultimate Plus (Certified)',
    tint: 'XPEL XR Plus, Llumar CTX',
    ceramic: 'Ceramic Pro 9H (Certified)',
  },
  warranties: {
    wrap: '5 yr color change, 3 yr commercial',
    ppf: '10 yr manufacturer warranty',
    tint: 'Lifetime on ceramic tint',
    ceramic: 'Lifetime Gold pkg, 5 yr Silver',
  },
  installTimes: {
    wrap: '3-5 days', ppf: '1-2 days', tint: '2-3 hrs', ceramic: '1-2 days', detail: '4-6 hrs',
  },
  logistics: { waitingArea: true, keyDrop: true, rideAssistance: false },
  dropoffInstructions: 'Enter through the back gate, leave keys in the lockbox by the side door. Text us when you drop off.',
  competitors: ['Arizona Auto Wraps', 'Scottsdale PPF Pros', 'Desert Tint Masters'],
  onboardedAt: '2026-03-15',
};

// --- SOURCE BREAKDOWN ---
export const sourceBreakdown = [
  { name: 'Google Ads', value: 45, color: '#111' },
  { name: 'Instagram', value: 22, color: '#555' },
  { name: 'Facebook', value: 18, color: '#999' },
  { name: 'Website', value: 10, color: '#bbb' },
  { name: 'Referral', value: 5, color: '#ddd' },
];
