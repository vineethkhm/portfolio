import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Code2, Cpu, Database, Layout, Server, Wrench } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  'Programming Languages': <Code2 className="w-3.5 h-3.5 text-cyan-400" />,
  'Frontend Development': <Layout className="w-3.5 h-3.5 text-sky-400" />,
  'Backend Development': <Server className="w-3.5 h-3.5 text-emerald-400" />,
  'Databases & Storage': <Database className="w-3.5 h-3.5 text-amber-400" />,
  'AI / Machine Learning': <Cpu className="w-3.5 h-3.5 text-purple-400" />,
  'Tools & DevOps': <Wrench className="w-3.5 h-3.5 text-rose-400" />,
};

export const SkillsOutput: React.FC = () => {
  return (
    <div className="my-3 space-y-3 font-mono">
      <div className="text-cyan-400 font-bold text-sm flex items-center gap-2">
        <span>TECHNICAL SKILLS MATRIX</span>
        <span className="text-[11px] text-slate-500 font-normal">--categorized</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {portfolioData.skills.map((skillGroup, idx) => (
          <div
            key={idx}
            className="bg-slate-900/60 border border-slate-800 rounded p-3 hover:border-slate-700 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-2 pb-1.5 border-b border-slate-800/80">
              {categoryIcons[skillGroup.category] || <Code2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span>{skillGroup.category}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillGroup.items.map((item, itemIdx) => (
                <span
                  key={itemIdx}
                  className="text-xs px-2 py-0.5 rounded bg-slate-950/80 text-emerald-300 border border-emerald-500/20 hover:border-emerald-500/40"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

