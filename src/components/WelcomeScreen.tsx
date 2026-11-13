import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Sparkles, Terminal, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
  onExecuteCommand: (cmd: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete, onExecuteCommand }) => {
  const [bootStep, setBootStep] = useState(0);

  const bootSequence = [
    "Initializing Vineeth's Portfolio...",
    "Loading developer profile...",
    "Loading projects...",
    "Establishing connection...",
    "System ready.",
  ];

  useEffect(() => {
    if (bootStep < bootSequence.length) {
      const timer = setTimeout(() => {
        setBootStep((prev) => prev + 1);
      }, 220); // crisp and responsive startup
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [bootStep]);

  return (
    <div className="font-mono text-xs sm:text-sm space-y-3 mb-4 select-text">
      {/* Boot Logs */}
      <div className="space-y-1 text-slate-400">
        {bootSequence.slice(0, bootStep).map((line, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-slate-600 select-none">[{idx + 1}/5]</span>
            <span className={idx === bootSequence.length - 1 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
              {line}
            </span>
          </div>
        ))}
      </div>

      {/* Main Welcome Message */}
      {bootStep >= bootSequence.length && (
        <div className="pt-2 border-t border-slate-800/80 space-y-2.5 animate-fadeIn">
          {/* Banner */}
          <div className="text-cyan-400 font-bold text-sm sm:text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Welcome to Vineeth's Portfolio!</span>
          </div>

          <div className="space-y-1 text-slate-200">
            <div className="text-base sm:text-lg font-bold text-white">
              Hi, I'm <span className="text-emerald-400 text-glow-green">Vineeth KHM</span>.
            </div>
            <div className="text-cyan-300 font-semibold text-xs sm:text-sm">
              {portfolioData.developer.role}
            </div>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-2xl pt-1">
              A developer interested in building intelligent applications, AI-powered systems, and practical software solutions.
            </p>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800/90 rounded-lg text-xs space-y-2">
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />
              <span>Type <span className="text-white bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 font-bold">'help'</span> to explore my portfolio.</span>
            </div>
            <div className="text-slate-400 text-[11px]">
              Not familiar with terminal commands? Click any quick shortcut below:
            </div>
            
            {/* Quick interactive shortcut chips for recruiters */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['about', 'projects', 'research paper', 'skills', 'experience', 'education', 'resume', 'contact'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => onExecuteCommand(cmd)}
                  className="px-2.5 py-1 text-xs rounded-md bg-slate-800/90 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-700/80 hover:border-emerald-500/50 transition-all font-mono"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

