import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import OnboardingForm from './OnboardingForm';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
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
