import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Dashboard from './Dashboard';
import TodayBrief from './TodayBrief';
import Appointments from './Appointments';
import Leads from './Leads';
import Performance from './Performance';
import ClientInfo from './ClientInfo';
import OnboardingForm from './OnboardingForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Dashboard pages with shared layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/today" element={<TodayBrief />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/clients" element={<ClientInfo />} />
        </Route>

        {/* Standalone form (no sidebar) */}
        <Route path="/form" element={
          <div className="min-h-screen bg-[#f8f8f8]">
            <OnboardingForm />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
