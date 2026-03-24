import OnboardingForm from './OnboardingForm';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 font-[Inter]">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="Ground Break Marketing" className="h-10 mx-auto mb-4" />
          <p className="text-gray-500 mt-1 text-sm">Client Onboarding</p>
        </div>
        <OnboardingForm />
      </div>
    </div>
  );
}

export default App;
