import React from 'react';
import { CommandOutputItem } from '../types/terminal';

interface TerminalOutputProps {
  items: CommandOutputItem[];
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="font-mono text-xs sm:text-sm">
          {/* Previous Prompt Line */}
          <div className="flex items-center justify-between text-slate-400 pb-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-emerald-400 font-bold">vineeth@portfolio</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyan-400 font-semibold">~</span>
              <span className="text-slate-300 font-bold">$</span>
              <span className="text-white font-semibold pl-1">{item.command}</span>
            </div>
            <span className="text-[10px] text-slate-600 hidden sm:inline select-none">
              {item.timestamp}
            </span>
          </div>

          {/* Rendered Command Output */}
          <div className="text-slate-200 pl-0 sm:pl-2">
            {item.output}
          </div>
        </div>
      ))}
    </div>
  );
};

