import OnboardingForm from './OnboardingForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0f2540] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="Ground Break Marketing" className="w-20 h-20 mx-auto mb-4 rounded-xl" />
          <h1 className="text-3xl font-bold tracking-tight">
            <span className="text-[#CC0000]">GROUND BREAK</span>{' '}
            <span className="text-white">MARKETING</span>
          </h1>
          <p className="text-slate-400 mt-2 text-sm">Client Onboarding</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}

export default App;
