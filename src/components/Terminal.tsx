import React, { useState, useRef, useEffect } from 'react';
import { TerminalHeader } from './TerminalHeader';
import { WelcomeScreen } from './WelcomeScreen';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { processCommand } from './CommandProcessor';
import { CommandOutputItem } from '../types/terminal';
import { HelpCircle, Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export const Terminal: React.FC = () => {
  const [outputHistory, setOutputHistory] = useState<CommandOutputItem[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [isBootDone, setIsBootDone] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom whenever output updates
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [outputHistory, isBootDone]);

  // Focus input on initial load or terminal click
  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleExecuteCommand = (rawCommand: string) => {
    const trimmed = rawCommand.trim();
    if (!trimmed) return;

    // Handle 'clear' command
    if (trimmed.toLowerCase() === 'clear' || trimmed.toLowerCase() === 'cls') {
      setOutputHistory([]);
      setCommandHistory((prev) => [...prev, trimmed]);
      return;
    }

    // Process output
    const outputContent = processCommand(trimmed, handleExecuteCommand, {
      history: [...commandHistory, trimmed],
      toggleScanlines: () => setScanlinesEnabled((prev) => !prev),
    });

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newEntry: CommandOutputItem = {
      id: `${Date.now()}-${Math.random()}`,
      command: trimmed,
      output: outputContent,
      timestamp: timeStr,
    };

    setOutputHistory((prev) => [...prev, newEntry]);
    setCommandHistory((prev) => [...prev, trimmed]);

    setTimeout(scrollToBottom, 50);
  };

  const handleClear = () => {
    setOutputHistory([]);
  };

  const handleHelp = () => {
    handleExecuteCommand('help');
  };

  const quickPills = [
    { label: 'help', cmd: 'help' },
    { label: 'about', cmd: 'about' },
    { label: 'projects', cmd: 'projects' },
    { label: 'research paper', cmd: 'research paper' },
    { label: 'skills', cmd: 'skills' },
    { label: 'experience', cmd: 'experience' },
    { label: 'education', cmd: 'education' },
    { label: 'resume', cmd: 'resume' },
    { label: 'contact', cmd: 'contact' },
    { label: 'neofetch', cmd: 'neofetch' },
    { label: 'hire me!', cmd: 'sudo hire me' },
  ];

  return (
    <div
      className={`relative w-full mx-auto transition-all duration-300 flex flex-col ${
        isMaximized
          ? 'fixed inset-0 z-50 rounded-none h-[100dvh] p-0'
          : 'max-w-5xl sm:my-6 sm:px-3 h-[100dvh] sm:h-auto'
      }`}
    >
      {/* Outer Glow Terminal Shell */}
      <div
        onClick={focusInput}
        className={`w-full bg-[#0B0F14]/95 border-0 sm:border border-slate-800/90 shadow-2xl rounded-none sm:rounded-xl flex flex-col backdrop-blur-md overflow-hidden glow-emerald transition-all ${
          isMaximized ? 'h-full rounded-none border-none' : 'h-full sm:min-h-[82vh] sm:max-h-[88vh]'
        } ${scanlinesEnabled ? 'scanlines' : ''}`}
      >
        {/* Terminal Titlebar Header */}
        <TerminalHeader
          onClear={handleClear}
          onHelp={handleHelp}
          isMaximized={isMaximized}
          onToggleMaximize={() => setIsMaximized(!isMaximized)}
          scanlinesEnabled={scanlinesEnabled}
          onToggleScanlines={() => setScanlinesEnabled(!scanlinesEnabled)}
        />

        {/* Terminal Main Body */}
        <div
          ref={terminalBodyRef}
          className="flex-1 p-3 sm:p-6 overflow-y-auto font-mono text-slate-200 select-text space-y-4 touch-pan-y overscroll-contain"
        >
          {/* Startup & Welcome Screen */}
          <WelcomeScreen
            onComplete={() => setIsBootDone(true)}
            onExecuteCommand={handleExecuteCommand}
          />

          {/* Executed Commands and outputs */}
          <TerminalOutput items={outputHistory} />

          {/* Interactive Command Input line */}
          <TerminalInput
            onExecute={handleExecuteCommand}
            history={commandHistory}
            inputRef={inputRef}
            disabled={!isBootDone}
          />
        </div>

        {/* Bottom Helper Bar for Recruiters and Visitors */}
        <div className="bg-[#0e141f] border-t border-slate-800/80 px-2.5 sm:px-3 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 select-none text-[11px] font-mono text-slate-400 shrink-0">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="hidden sm:inline">
                Not familiar with terminal commands? Type <span className="text-emerald-400 font-bold">'help'</span> or click:
              </span>
              <span className="sm:hidden text-slate-300 font-semibold text-[11px]">Quick Tap:</span>
            </div>
            <span className="text-[10px] text-slate-500 sm:hidden">Swipe ⇾</span>
          </div>

          {/* Quick command buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none touch-pan-x">
            {quickPills.map((pill) => (
              <button
                key={pill.cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExecuteCommand(pill.cmd);
                }}
                className={`px-2.5 py-1 sm:py-0.5 rounded text-[11px] whitespace-nowrap transition-all border active:scale-95 touch-manipulation font-mono ${
                  pill.cmd === 'sudo hire me'
                    ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900 active:bg-emerald-800'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-cyan-500/50 hover:text-cyan-300 active:bg-slate-800'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info (Desktop) */}
      {!isMaximized && (
        <div className="hidden sm:flex mt-3 text-center text-xs text-slate-500 font-mono items-center justify-center gap-2">
          <span>Vineeth KHM Portfolio</span>
          <span>•</span>
          <span>Designed & Built with React, Tailwind & Vite</span>
          <span>•</span>
          <span className="text-emerald-500 font-semibold">Ready for Recruiter Review</span>
        </div>
      )}
    </div>
  );
};

