import React from 'react';
import { Terminal, Maximize2, Minimize2, Trash2, HelpCircle, Monitor, Sparkles } from 'lucide-react';

interface TerminalHeaderProps {
  onClear: () => void;
  onHelp: () => void;
  isMaximized: boolean;
  onToggleMaximize: () => void;
  scanlinesEnabled: boolean;
  onToggleScanlines: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  onClear,
  onHelp,
  isMaximized,
  onToggleMaximize,
  scanlinesEnabled,
  onToggleScanlines,
}) => {
  return (
    <div className="bg-[#121824] border-b border-slate-800/90 px-2.5 sm:px-3 py-2 sm:py-2.5 flex items-center justify-between select-none rounded-none sm:rounded-t-xl transition-colors shrink-0">
      {/* Left: Window Controls */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5 mr-1 sm:mr-2">
          <button
            onClick={onClear}
            className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition-colors cursor-pointer group relative touch-manipulation"
            title="Clear screen (clear)"
          >
            <span className="sr-only">Close / Clear</span>
          </button>
          <button
            onClick={() => onHelp()}
            className="w-3 h-3 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer touch-manipulation"
            title="Help & Commands"
          >
            <span className="sr-only">Help</span>
          </button>
          <button
            onClick={onToggleMaximize}
            className="w-3 h-3 rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer touch-manipulation"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            <span className="sr-only">Maximize</span>
          </button>
        </div>

        {/* Title */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-300">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">vineeth@portfolio:</span>
          <span className="text-cyan-400 font-semibold">~</span>
          <span className="text-slate-500"> — bash</span>
        </div>
      </div>

      {/* Center: System Online Status */}
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-mono">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-emerald-400 font-semibold tracking-wider text-[10px] sm:text-[11px]">
          <span className="hidden xs:inline">SYSTEM </span>ONLINE
        </span>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-0.5 sm:gap-1 text-slate-400 text-xs font-mono">
        <button
          onClick={onToggleScanlines}
          className={`p-1.5 rounded hover:bg-slate-800 transition-colors flex items-center gap-1 touch-manipulation active:bg-slate-800 ${
            scanlinesEnabled ? 'text-cyan-400' : 'text-slate-500'
          }`}
          title="Toggle CRT Scanline Effect"
        >
          <Monitor className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-[10px]">CRT</span>
        </button>

        <button
          onClick={onHelp}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors flex items-center gap-1 touch-manipulation active:bg-slate-800"
          title="Show Commands (help)"
        >
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden md:inline text-[10px]">help</span>
        </button>

        <button
          onClick={onClear}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-rose-400 transition-colors flex items-center gap-1 touch-manipulation active:bg-slate-800"
          title="Clear screen (clear)"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden md:inline text-[10px]">clear</span>
        </button>

        <button
          onClick={onToggleMaximize}
          className="p-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition-colors touch-manipulation active:bg-slate-800 hidden sm:block"
          title={isMaximized ? "Restore window" : "Maximize window"}
        >
          {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};

