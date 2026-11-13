import React from 'react';
import { portfolioData, Project } from '../data/portfolioData';
import { ExternalLink, Layers, Zap, Terminal } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-[#101725]/80 border border-slate-700/80 hover:border-cyan-500/40 rounded-lg p-4 transition-all">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            {project.number}
          </span>
          <h3 className="text-base sm:text-lg font-bold text-cyan-300">
            {project.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400 pt-1 sm:pt-0">
          {project.githubUrl && project.githubUrl !== '#' ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-slate-300 hover:text-emerald-400 transition-colors underline"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-300" />
              <span>Source Code</span>
            </a>
          ) : (
            <span className="flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 italic">[GitHub: In Progress]</span>
            </span>
          )}

          {project.demoUrl && project.demoUrl !== '#' ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors underline"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-slate-500 italic">[Demo: Internal / Configurable]</span>
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="mt-3 flex flex-wrap gap-1.5 items-center">
        <span className="text-[11px] text-slate-400 font-semibold mr-1 flex items-center gap-1">
          <Layers className="w-3 h-3 text-cyan-400" /> Stack:
        </span>
        {project.technologies.map((tech, idx) => (
          <span
            key={idx}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-cyan-300 border border-slate-700/60"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Key Features */}
      <div className="mt-3 space-y-1">
        <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
          Key Features:
        </div>
        <ul className="text-xs text-slate-300 space-y-1 pl-1">
          {project.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-1.5">
              <span className="text-emerald-400 font-bold select-none">▸</span>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Impact / Performance Metric */}
      {project.impactOrPerf && (
        <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center gap-2 text-xs text-emerald-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-emerald-400">Impact / Performance:</span>
          <span>{project.impactOrPerf}</span>
        </div>
      )}
    </div>
  );
};

export const ProjectsOutput: React.FC = () => {
  return (
    <div className="my-3 space-y-4">
      <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
        <Terminal className="w-4 h-4 text-cyan-400" />
        <span>FEATURED ENGINEERING PROJECTS ({portfolioData.projects.length})</span>
      </div>
      <div className="space-y-4">
        {portfolioData.projects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} />
        ))}
      </div>
      <p className="text-[11px] text-slate-500 italic">
        Tip: Type 'research paper' to inspect the IEEE research publication on Agentic DBMS!
      </p>
    </div>
  );
};

