import React from 'react';
import { Terminal } from './components/Terminal';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-[#070A0E] text-slate-100 flex flex-col justify-center items-center relative overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Background ambient gradient grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.08),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a15_1px,transparent_1px),linear-gradient(to_bottom,#0f172a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Main Terminal Interface */}
      <main className="w-full flex-1 flex flex-col justify-center items-center z-10 px-0 sm:px-4">
        <Terminal />
      </main>
    </div>
  );
};

export default App;

