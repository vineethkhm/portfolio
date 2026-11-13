import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Coffee, Sparkles, Terminal as TerminalIcon, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const SudoHireMe: React.FC = () => {
  useEffect(() => {
    // Fire festive developer confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10B981', '#06B6D4', '#3B82F6', '#F59E0B', '#EC4899'],
      });
    } catch (e) {
      // fallback safe
    }
  }, []);

  return (
    <div className="my-3 p-4 bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 border border-emerald-500/40 rounded-lg text-slate-200">
      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base mb-2">
        <Sparkles className="w-5 h-5 text-emerald-400 animate-spin" />
        <span>[ACCESS GRANTED] OFFER EXTENDED!</span>
      </div>
      <div className="space-y-2 text-xs sm:text-sm font-mono leading-relaxed">
        <p className="text-emerald-300">
          root@vineeth-portfolio:~# chmod 777 hire_offer.sh && ./hire_offer.sh
        </p>
        <p>
          🎉 <strong className="text-white">Fantastic choice!</strong> Vineeth brings deep expertise in AI/ML engineering, PyTorch, LLMs, and modern full-stack development with React & FastAPI.
        </p>
        <div className="bg-slate-950/80 p-3 rounded border border-emerald-500/20 text-xs space-y-1.5">
          <div><span className="text-cyan-400 font-semibold">Candidate:</span> {portfolioData.developer.name}</div>
          <div><span className="text-cyan-400 font-semibold">Role:</span> {portfolioData.developer.role}</div>
          <div><span className="text-cyan-400 font-semibold">Availability:</span> {portfolioData.developer.status}</div>
          <div><span className="text-cyan-400 font-semibold">Direct Email:</span> <a href={`mailto:${portfolioData.developer.email}`} className="text-sky-400 underline break-all">{portfolioData.developer.email}</a></div>
          <div><span className="text-cyan-400 font-semibold">Phone:</span> <a href={`tel:${portfolioData.developer.phone}`} className="text-sky-400 underline">{portfolioData.developer.phoneFormatted}</a></div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="text-cyan-400 font-semibold shrink-0">LinkedIn:</span> <a href={portfolioData.developer.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-sky-400 hover:text-sky-300 underline font-medium inline-flex items-center gap-1 break-all">{portfolioData.developer.social.linkedin} <ExternalLink className="w-3 h-3 inline shrink-0" /></a></div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><span className="text-cyan-400 font-semibold shrink-0">GitHub:</span> <a href={portfolioData.developer.social.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 underline font-medium inline-flex items-center gap-1 break-all">{portfolioData.developer.social.github} <ExternalLink className="w-3 h-3 inline shrink-0" /></a></div>
        </div>
        <p className="text-slate-400 text-xs">
          Ready to schedule an interview or conversation? Type <span className="text-emerald-400 font-bold">contact</span> to reach out immediately!
        </p>
      </div>
    </div>
  );
};

export const CoffeeEasterEgg: React.FC = () => {
  return (
    <div className="my-2 p-3 bg-amber-950/20 border border-amber-500/30 rounded font-mono text-xs sm:text-sm">
      <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
        <Coffee className="w-4 h-4 text-amber-400" />
        <span>Brewing Fresh Developer Fuel...</span>
      </div>
      <pre className="text-amber-300/90 leading-tight text-[11px] sm:text-xs overflow-x-auto">
{`      ( (
       ) )
    .______.
    |   ☕  |]   Status: 100% Arabica
    \\      /    Caffeine Level: Optimal
     \`----'     Code Mode: Activated!
`}
      </pre>
      <p className="text-slate-300 text-xs mt-1">
        "Code is like humor. When you have to explain it, it’s bad." — Cory House
      </p>
    </div>
  );
};

export const MatrixRain: React.FC = () => {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワ0123456789ABCDEF';
    const interval = setInterval(() => {
      let line = '';
      for (let i = 0; i < 48; i++) {
        line += chars[Math.floor(Math.random() * chars.length)] + ' ';
      }
      setLines((prev) => [line, ...prev.slice(0, 9)]);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="my-2 p-3 bg-black/90 border border-emerald-500/50 rounded font-mono text-xs overflow-hidden">
      <div className="text-emerald-400 text-xs font-bold mb-1 flex items-center gap-2">
        <TerminalIcon className="w-3.5 h-3.5 animate-pulse" />
        <span>ENTERING THE MATRIX...</span>
      </div>
      <div className="text-emerald-500/80 font-mono text-[11px] sm:text-xs leading-none select-none tracking-wider opacity-90">
        {lines.map((l, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.08 }}>
            {l}
          </div>
        ))}
      </div>
      <div className="text-slate-400 text-[10px] mt-2">
        Press <span className="text-emerald-400">clear</span> to exit Matrix mode.
      </div>
    </div>
  );
};

export const FortuneCookie: React.FC = () => {
  const fortunes = [
    "“Any fool can write code that a computer can understand. Good programmers write code that humans can understand.” — Martin Fowler",
    "“First, solve the problem. Then, write the code.” — John Johnson",
    "“Experience is the name everyone gives to their mistakes.” — Oscar Wilde",
    "“In machine learning, there are no miracles, only loss gradients descending towards equilibrium.”",
    "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
    "“Talk is cheap. Show me the code.” — Linus Torvalds",
    "“The best error message is the one that never shows up.”",
    "“Multimodal systems reduce cognitive friction by synchronizing sensory pathways.” — IEEE CONECCT 26",
  ];

  const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];

  return (
    <div className="my-2 p-3 bg-purple-950/20 border border-purple-500/30 rounded font-mono text-xs sm:text-sm">
      <div className="text-purple-400 font-bold mb-1">🥠 Terminal Fortune Cookie</div>
      <blockquote className="text-slate-200 italic border-l-2 border-purple-400/60 pl-3 py-1">
        {randomFortune}
      </blockquote>
    </div>
  );
};

