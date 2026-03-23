import OnboardingForm from './OnboardingForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-tight">GroundBreak</h1>
          <p className="text-neutral-400 mt-2 text-sm">Client Onboarding</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}

export default App;
