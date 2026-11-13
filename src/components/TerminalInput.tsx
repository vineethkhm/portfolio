import React, { useRef, useEffect, useState } from 'react';
import { COMMAND_LIST, COMMAND_ALIASES } from '../types/terminal';

interface TerminalInputProps {
  onExecute: (command: string) => void;
  history: string[];
  inputRef: React.RefObject<HTMLInputElement | null>;
  disabled?: boolean;
}

export const TerminalInput: React.FC<TerminalInputProps> = ({
  onExecute,
  history,
  inputRef,
  disabled = false,
}) => {
  const [value, setValue] = useState('');
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [suggestion, setSuggestion] = useState<string>('');

  // Find autocomplete suggestion
  useEffect(() => {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
      setSuggestion('');
      return;
    }

    // Check direct command matches
    const allKnown = [
      ...COMMAND_LIST.map((c) => c.command),
      ...Object.keys(COMMAND_ALIASES),
      'clear',
      'sudo hire me',
    ];

    const match = allKnown.find((c) => c.startsWith(trimmed) && c !== trimmed);
    if (match) {
      setSuggestion(match);
    } else {
      setSuggestion('');
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        onExecute(trimmed);
        setValue('');
        setHistoryIndex(null);
        setSuggestion('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIndex === null) {
        const newIndex = history.length - 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      } else if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === null) return;

      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      } else {
        setHistoryIndex(null);
        setValue('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setValue(suggestion);
        setSuggestion('');
      } else {
        // Find best match
        const trimmed = value.trim().toLowerCase();
        const match = COMMAND_LIST.find((c) => c.command.startsWith(trimmed));
        if (match) {
          setValue(match.command);
        }
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      onExecute('clear');
    } else if (e.ctrlKey && (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'u')) {
      e.preventDefault();
      setValue('');
      setSuggestion('');
    }
  };

  return (
    <div className="relative font-mono text-xs sm:text-sm pt-2">
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
        {/* Terminal Prompt */}
        <div className="flex items-center shrink-0 select-none text-xs sm:text-sm">
          <span className="text-emerald-400 font-bold">vineeth</span>
          <span className="text-slate-400 hidden xs:inline">@portfolio</span>
          <span className="text-slate-400">:</span>
          <span className="text-cyan-400 font-semibold">~</span>
          <span className="text-slate-200 ml-1 font-bold">$</span>
        </div>

        {/* Input Wrapper with Ghost Autocomplete */}
        <div className="relative flex-1 min-w-[120px] sm:min-w-[200px] flex items-center">
          {/* Ghost Suggestion text */}
          {suggestion && value && (
            <div
              className="absolute inset-y-0 left-0 flex items-center text-slate-600 pointer-events-none select-none pl-1 text-[16px] sm:text-sm"
              aria-hidden="true"
            >
              <span className="opacity-0">{value}</span>
              <span>{suggestion.slice(value.length)}</span>
              <span className="ml-2 text-[10px] text-slate-500 bg-slate-900 px-1 rounded border border-slate-800 hidden sm:inline-block">
                Tab ⇥
              </span>
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            value={value}
            disabled={disabled}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            enterKeyHint="go"
            className="w-full bg-transparent text-slate-100 outline-none border-none pl-1 py-1 font-mono focus:ring-0 placeholder:text-slate-600 text-[16px] sm:text-sm"
            placeholder={history.length === 0 ? "type 'help' or tap buttons below..." : ""}
          />
        </div>
      </div>

      {/* Suggested Quick Match Chips if user is typing */}
      {value.trim().length > 0 && (
        <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-slate-400 pl-1 sm:pl-6 overflow-x-auto scrollbar-none">
          <span className="text-slate-500 text-[10px] shrink-0">Match:</span>
          {COMMAND_LIST.filter((c) =>
            c.command.startsWith(value.trim().toLowerCase())
          ).slice(0, 4).map((c) => (
            <button
              key={c.command}
              type="button"
              onClick={() => {
                setValue(c.command);
                inputRef.current?.focus();
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 text-[11px] shrink-0 touch-manipulation"
            >
              {c.command}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

