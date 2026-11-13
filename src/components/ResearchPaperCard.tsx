import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { FileText, Save, ExternalLink, Check, Award, BookOpen } from 'lucide-react';

export const ResearchPaperCard: React.FC = () => {
  const paper = portfolioData.researchPaper;
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = paper.pdfUrl;
    link.download = paper.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="my-3 space-y-3 font-sans">
      {/* Exact Card matching the requested style */}
      <div className="bg-[#0f172a]/95 border border-cyan-500/30 hover:border-cyan-400/50 rounded-lg p-4 sm:p-5 shadow-lg transition-all duration-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Left: PDF Icon + Info */}
          <div className="flex items-start gap-4 flex-1">
            {/* PDF Red Badge Icon matching the uploaded image */}
            <div className="shrink-0 w-12 h-14 bg-gradient-to-b from-red-500 to-rose-600 rounded-md flex flex-col items-center justify-center text-white shadow-md border border-red-400/30">
              <div className="w-5 h-6 border-2 border-white/90 rounded-sm mb-1 flex items-center justify-center">
                <span className="w-2.5 h-0.5 bg-white/90"></span>
              </div>
              <span className="text-[10px] font-black tracking-wider uppercase">PDF</span>
            </div>

            {/* Paper Details */}
            <div className="space-y-1">
              <a
                href={paper.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base sm:text-lg font-bold text-sky-400 hover:text-sky-300 underline decoration-sky-400/60 hover:decoration-sky-300 leading-snug transition-colors block"
              >
                {paper.title}
              </a>

              <p className="text-xs sm:text-sm text-slate-300">
                {paper.authors.map((author, idx) => (
                  <span key={idx}>
                    {author === 'Vineeth KHM' ? (
                      <strong className="text-emerald-400 font-semibold underline decoration-emerald-500/50">{author}</strong>
                    ) : (
                      <span>{author}</span>
                    )}
                    {idx < paper.authors.length - 1 && ', '}
                  </span>
                ))}
              </p>

              <p className="text-xs italic text-slate-400 flex items-center gap-1.5 font-medium">
                <Award className="w-3.5 h-3.5 text-amber-400 inline" />
                <span>{paper.conference}</span>
                <span className="text-slate-500 font-normal">• Sahyadri College of Engineering & Management</span>
              </p>
            </div>
          </div>

          {/* Right: Action Buttons matching the image */}
          <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-28 pt-2 sm:pt-0">
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-600/80 rounded transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-sky-400" />
              <span>Open</span>
            </a>

            <button
              onClick={handleDownload}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-600/80 rounded transition-all shadow-sm"
              title="Save PDF to device"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Terminal Analysis / Metrics strip */}
      <div className="font-mono text-xs bg-slate-900/60 border border-slate-800 rounded p-3 text-slate-300">
        <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5" />
          <span>RESEARCH HIGHLIGHTS & EMPIRICAL STUDY (N = 15)</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
          {paper.metrics.map((m, idx) => (
            <div key={idx} className="bg-slate-950/70 p-2 rounded border border-slate-800/80">
              <div className="text-emerald-400 font-bold text-sm">{m.value}</div>
              <div className="text-[11px] text-slate-400 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed">
          <span className="text-slate-300 font-semibold">Keywords: </span>
          Multimodal Interfaces, Database Schema Design, Voice-Augmented Visual Interfaces, Human-Computer Interaction (HCI), Cognitive Load Theory, Large Language Models (LLMs).
        </p>
      </div>
    </div>
  );
};

