import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { COMMAND_ALIASES, COMMAND_LIST } from '../types/terminal';
import { ProjectsOutput, ProjectCard } from './ProjectOutput';
import { SkillsOutput } from './SkillsOutput';
import { ResearchPaperCard } from './ResearchPaperCard';
import { SudoHireMe, CoffeeEasterEgg, MatrixRain, FortuneCookie } from './EasterEggs';
import {
  User,
  GraduationCap,
  Briefcase,
  Terminal,
  Trophy,
  Award,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  FileText,
  Download,
  ExternalLink,
  Folder,
  FileCode,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export interface ProcessCommandExtras {
  history?: string[];
  toggleScanlines?: () => void;
}

export const processCommand = (
  rawInput: string,
  onExecuteSuggested?: (cmd: string) => void,
  extras?: ProcessCommandExtras
): React.ReactNode => {
  const trimmed = rawInput.trim();
  const lower = trimmed.toLowerCase();
  const parts = trimmed.split(' ');
  const mainCmd = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1).join(' ').trim();

  // Normalize aliases (matches full multi-word string like "research paper" first, then first token)
  const cmd = COMMAND_ALIASES[lower] || COMMAND_ALIASES[mainCmd] || mainCmd;

  // Handle 'cat <filename>'
  if (cmd === 'cat') {
    return handleCatCommand(args.toLowerCase(), onExecuteSuggested);
  }

  // Handle 'sudo hire me' or 'sudo'
  if (lower === 'sudo hire me' || (parts[0]?.toLowerCase() === 'sudo' && parts.slice(1).join(' ').toLowerCase() === 'hire me')) {
    return <SudoHireMe />;
  }

  switch (cmd) {
    case 'help':
      return (
        <div className="my-2 space-y-3 font-mono text-xs sm:text-sm">
          <div className="text-cyan-400 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>AVAILABLE TERMINAL COMMANDS</span>
          </div>
          <div className="text-slate-400 text-xs">
            Type any command below or click to execute immediately:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 pt-1">
            {COMMAND_LIST.map((c) => (
              <div
                key={c.command}
                className="flex items-center justify-between group hover:bg-slate-900/60 px-2 py-1 rounded transition-colors"
              >
                <button
                  type="button"
                  onClick={() => onExecuteSuggested && onExecuteSuggested(c.command)}
                  className="text-emerald-400 font-semibold hover:text-emerald-300 hover:underline flex items-center gap-1.5 text-left"
                >
                  <span className="text-slate-600 select-none">$</span>
                  <span>{c.command}</span>
                </button>
                <span className="text-slate-400 text-[11px] sm:text-xs text-right">
                  {c.description}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
            <span className="text-cyan-400 font-semibold">Shortcuts: </span>
            <span>Tab = Autocomplete | ↑ / ↓ = History | Ctrl+L / clear = Clear</span>
          </div>
        </div>
      );

    case 'about':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>DEVELOPER BIOGRAPHY</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-slate-500">Name: </span>
              <strong className="text-slate-200">{portfolioData.developer.name}</strong>
            </div>
            <div>
              <span className="text-slate-500">Location: </span>
              <span className="text-slate-200">{portfolioData.developer.location}</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-500">Role: </span>
              <span className="text-emerald-400 font-semibold">{portfolioData.developer.role}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-cyan-400 font-semibold text-xs mb-1">Introduction:</div>
            <p className="text-slate-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm">
              {portfolioData.developer.introduction}
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <div className="text-cyan-400 font-semibold text-xs mb-1.5">Core Interests:</div>
            <div className="flex flex-wrap gap-1.5">
              {portfolioData.developer.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[11px] border border-cyan-500/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      );

    case 'education':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span>ACADEMIC BACKGROUND</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-slate-100">
              {portfolioData.education.institution}
            </h3>
            <p className="text-emerald-400 font-semibold text-xs">
              {portfolioData.education.degree}
            </p>
            <p className="text-slate-300 text-xs">
              {portfolioData.education.major}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-400 text-xs pt-1">
              <span>📅 {portfolioData.education.duration}</span>
              <span>📍 {portfolioData.education.location}</span>
              <span className="text-cyan-300 font-semibold">
                🎯 CGPA: {portfolioData.education.cgpa}
              </span>
            </div>
          </div>
        </div>
      );

    case 'experience':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>PROFESSIONAL & INTERNSHIP EXPERIENCE</span>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <h3 className="text-sm sm:text-base font-bold text-slate-100">
                {portfolioData.experience.company}
              </h3>
              <span className="text-xs text-slate-400">
                {portfolioData.experience.duration}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold mt-0.5">
              <span>{portfolioData.experience.role}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{portfolioData.experience.workMode}</span>
            </div>
            <div className="mt-3">
              <div className="text-xs text-cyan-400 font-semibold mb-1">Responsibilities:</div>
              <ul className="space-y-1 text-xs text-slate-300 pl-1">
                {portfolioData.experience.responsibilities.map((resp, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 select-none">▸</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );

    case 'projects':
      return <ProjectsOutput />;

    case 'skills':
      return <SkillsOutput />;

    case 'research':
      return <ResearchPaperCard />;

    case 'achievements':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>ACHIEVEMENTS & HONORS</span>
          </div>
          <ul className="space-y-2 text-slate-300 text-xs sm:text-sm pt-1">
            {portfolioData.achievements.map((ach, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 font-bold select-none">★</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'certifications':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>VERIFIED CERTIFICATIONS</span>
          </div>
          <div className="space-y-2.5 pt-1">
            {portfolioData.certifications.map((cert, idx) => (
              <div key={idx} className="bg-slate-950/70 p-2.5 rounded border border-slate-800 text-xs">
                <div className="font-semibold text-slate-200">{cert.name}</div>
                <div className="text-slate-400 flex items-center justify-between mt-1">
                  <span>Provider: <strong className="text-cyan-400 font-medium">{cert.provider}</strong></span>
                  <span className="text-slate-500">Year: {cert.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'coursework':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-2 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>RELEVANT COMPUTER SCIENCE COURSEWORK</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {portfolioData.coursework.map((course, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-950/80 border border-slate-800 text-slate-300 text-xs"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 select-none"></span>
                <span>{course}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'contact':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>CONTACT & SOCIAL CHANNELS</span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-slate-400 w-20">Email:</span>
              <a
                href={`mailto:${portfolioData.developer.email}`}
                className="text-sky-400 hover:text-sky-300 underline font-semibold transition-colors"
              >
                {portfolioData.developer.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-400 w-20">Phone:</span>
              <a
                href={`tel:${portfolioData.developer.phone}`}
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors"
              >
                {portfolioData.developer.phoneFormatted}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400 w-20 shrink-0">LinkedIn:</span>
              <a
                href={portfolioData.developer.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline font-semibold transition-colors flex items-center gap-1.5 break-all text-xs"
              >
                <span>{portfolioData.developer.social.linkedin}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <GithubIcon className="w-4 h-4 text-slate-200 shrink-0" />
              <span className="text-slate-400 w-20 shrink-0">GitHub:</span>
              <a
                href={portfolioData.developer.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-semibold transition-colors flex items-center gap-1.5 break-all text-xs"
              >
                <span>{portfolioData.developer.social.github}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
              <span className="text-slate-400 w-20">Location:</span>
              <span className="text-slate-200">{portfolioData.developer.location}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500">
            Clickable links provided for direct connection via Mail, Phone, LinkedIn, and GitHub.
          </div>
        </div>
      );

    case 'social':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-bold border-b border-slate-800 pb-2">
            <ExternalLink className="w-4 h-4 text-cyan-400" />
            <span>SOCIAL & DEVELOPER PROFILES</span>
          </div>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <LinkedinIcon className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-slate-400 w-20 shrink-0">LinkedIn:</span>
              <a
                href={portfolioData.developer.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300 underline font-medium flex items-center gap-1.5 break-all text-xs"
              >
                <span>{portfolioData.developer.social.linkedin}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </div>
            <div className="flex items-center gap-3">
              <GithubIcon className="w-4 h-4 text-slate-200 shrink-0" />
              <span className="text-slate-400 w-20 shrink-0">GitHub:</span>
              <a
                href={portfolioData.developer.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-medium flex items-center gap-1.5 break-all text-xs"
              >
                <span>{portfolioData.developer.social.github}</span>
                <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      );

    case 'resume':
      return (
        <div className="my-2 p-4 bg-slate-900/50 border border-slate-800 rounded-lg space-y-3 font-mono text-xs sm:text-sm">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>RESUME / CURRICULUM VITAE</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              PDF Document
            </span>
          </div>

          <p className="text-slate-300 text-xs sm:text-sm">
            Resume is available for direct preview in browser or downloading to your local device.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={portfolioData.developer.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs shadow transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </a>
            <a
              href={portfolioData.developer.resumePath}
              download="Vineeth_KHM_Resume.pdf"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          </div>

          <div className="bg-slate-950/80 p-2.5 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
            <div><span className="text-cyan-400 font-semibold">Configured Path:</span> <code className="text-slate-300">{portfolioData.developer.resumePath}</code></div>
            <div><span className="text-cyan-400 font-semibold">Asset Location:</span> Place updated PDF files inside <code className="text-slate-300">public/resume.pdf</code>.</div>
          </div>
        </div>
      );

    case 'whoami':
      return (
        <div className="my-2 p-3 bg-slate-900/60 border border-slate-800 rounded font-mono text-xs sm:text-sm space-y-1">
          <div className="text-emerald-400 font-bold">vineeth@portfolio</div>
          <div className="text-slate-300">
            <span className="text-cyan-400">Name:</span> {portfolioData.developer.name}
          </div>
          <div className="text-slate-300">
            <span className="text-cyan-400">Role:</span> {portfolioData.developer.role}
          </div>
          <div className="text-slate-300">
            <span className="text-cyan-400">Education:</span> BE in CSE (AIML), Sahyadri College
          </div>
          <div className="text-slate-300">
            <span className="text-cyan-400">Status:</span> {portfolioData.developer.status}
          </div>
          <div className="text-slate-400 text-[11px] pt-1">
            "Building intelligent systems with engineering rigor and thoughtful design."
          </div>
        </div>
      );

    case 'ls':
      return (
        <div className="my-2 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
          <div className="text-cyan-400 font-bold mb-1">/home/vineeth</div>
          <pre className="text-slate-300 text-xs sm:text-sm whitespace-pre font-mono overflow-x-auto">
{`├── about.txt
├── education.txt
├── experience.txt
├── projects/
│   ├── agentic-dbms/
│   ├── fastprotect/
│   └── automatalab/
├── skills.txt
├── achievements.txt
├── certifications.txt
├── publications/
│   └── multimodal-database-modeling.pdf
├── resume.pdf
└── contact.txt`}
          </pre>
          <div className="text-slate-500 text-[11px] mt-2">
            Tip: Try <span className="text-emerald-400 font-mono">cat about.txt</span> or <span className="text-emerald-400 font-mono">cat resume.pdf</span>
          </div>
        </div>
      );

    case 'date':
      return (
        <div className="my-1 font-mono text-xs sm:text-sm text-slate-300 flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>{new Date().toString()}</span>
        </div>
      );

    case 'neofetch':
      return (
        <div className="my-2 p-3 bg-slate-900/60 border border-slate-800 rounded font-mono text-xs sm:text-sm">
          <div className="flex flex-col md:flex-row gap-4 items-start">
            {/* ASCII Logo */}
            <div className="text-emerald-400 font-bold select-none leading-none text-xs sm:text-sm">
              <pre className="text-emerald-400 text-[11px] sm:text-xs">
{`    _   __ _____ _   _ 
   | | / /|  ___| | | |
   | |/ / | |__ | |_| |
   |    \\ |  __||  _  |
   | |\\  \\| |___| | | |
   \\_| \\_/\\____/\\_| |_/
`}
              </pre>
              <div className="text-cyan-400 text-center font-mono text-[10px] tracking-widest mt-1">
                [VINEETH OS]
              </div>
            </div>

            {/* System Info specs */}
            <div className="space-y-1 text-xs">
              <div className="text-cyan-400 font-bold border-b border-slate-800 pb-1">
                vineeth@portfolio-os
              </div>
              <div><span className="text-emerald-400 font-semibold">OS:</span> Vineeth Portfolio OS (x86_64)</div>
              <div><span className="text-emerald-400 font-semibold">Host:</span> Developer Terminal</div>
              <div><span className="text-emerald-400 font-semibold">Role:</span> AI/ML & Full-Stack Developer</div>
              <div><span className="text-emerald-400 font-semibold">Education:</span> BE CSE (AI & ML)</div>
              <div><span className="text-emerald-400 font-semibold">College:</span> Sahyadri College of Engineering</div>
              <div><span className="text-emerald-400 font-semibold">Projects:</span> 3 Featured Systems</div>
              <div><span className="text-emerald-400 font-semibold">Publications:</span> IEEE CONECCT 26</div>
              <div><span className="text-emerald-400 font-semibold">Languages:</span> Python, Java, JavaScript, C, SQL</div>
              <div><span className="text-emerald-400 font-semibold">Uptime:</span> Continuous Learning</div>
              <div><span className="text-emerald-400 font-semibold">Status:</span> Open to Internship Opportunities</div>
              {/* Terminal color blocks */}
              <div className="flex gap-1 pt-1.5">
                {['#EF4444', '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', '#EC4899', '#F1F5F9'].map((c, i) => (
                  <span key={i} className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'history':
      return (
        <div className="my-2 p-3 bg-slate-900/60 border border-slate-800 rounded font-mono text-xs space-y-1">
          <div className="text-cyan-400 font-bold mb-1 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMAND EXECUTION HISTORY</span>
          </div>
          {extras?.history && extras.history.length > 0 ? (
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
              {extras.history.map((h, i) => (
                <div key={i} className="flex items-center gap-3 text-slate-300">
                  <span className="text-slate-600 w-6 text-right select-none">{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => onExecuteSuggested && onExecuteSuggested(h)}
                    className="hover:text-emerald-400 hover:underline text-left"
                  >
                    {h}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-slate-400">No commands in history yet.</div>
          )}
        </div>
      );

    case 'pwd':
      return (
        <div className="my-1 font-mono text-xs sm:text-sm text-emerald-400">
          /home/vineeth
        </div>
      );

    case 'uname':
      return (
        <div className="my-1 font-mono text-xs sm:text-sm text-slate-300">
          Linux vineeth-portfolio 6.8.0-generic #42-Ubuntu SMP x86_64 GNU/Linux
        </div>
      );

    case 'crt':
    case 'scanlines':
      if (extras?.toggleScanlines) {
        extras.toggleScanlines();
        return (
          <div className="my-1 font-mono text-xs sm:text-sm text-cyan-400">
            Toggled CRT scanlines display effect.
          </div>
        );
      }
      return (
        <div className="my-1 font-mono text-xs sm:text-sm text-cyan-400">
          CRT scanlines toggled via screen header control.
        </div>
      );

    case 'coffee':
      return <CoffeeEasterEgg />;

    case 'matrix':
      return <MatrixRain />;

    case 'fortune':
      return <FortuneCookie />;

    case 'echo':
      return (
        <div className="my-1 font-mono text-xs sm:text-sm text-slate-300">
          {args || ''}
        </div>
      );

    default:
      return (
        <div className="my-1 font-mono text-xs sm:text-sm space-y-1">
          <div className="text-rose-400 font-semibold">
            Command not found: <span className="text-white underline">{rawInput}</span>
          </div>
          <div className="text-slate-400 text-xs">
            Type <button onClick={() => onExecuteSuggested && onExecuteSuggested('help')} className="text-emerald-400 font-semibold underline hover:text-emerald-300">'help'</button> to see the list of available commands.
          </div>
        </div>
      );
  }
};

const handleCatCommand = (target: string, onExecuteSuggested?: (cmd: string) => void): React.ReactNode => {
  if (!target) {
    return (
      <div className="text-amber-400 font-mono text-xs my-1">
        Usage: cat &lt;filename&gt; (e.g. cat about.txt, cat resume.pdf, cat projects/agentic-dbms)
      </div>
    );
  }

  const clean = target.replace(/^\.\//, '').replace(/^\/home\/vineeth\//, '');

  if (clean === 'about.txt') {
    return processCommand('about', onExecuteSuggested);
  }
  if (clean === 'education.txt') {
    return processCommand('education', onExecuteSuggested);
  }
  if (clean === 'experience.txt') {
    return processCommand('experience', onExecuteSuggested);
  }
  if (clean === 'skills.txt') {
    return processCommand('skills', onExecuteSuggested);
  }
  if (clean === 'achievements.txt') {
    return processCommand('achievements', onExecuteSuggested);
  }
  if (clean === 'certifications.txt') {
    return processCommand('certifications', onExecuteSuggested);
  }
  if (clean === 'contact.txt') {
    return processCommand('contact', onExecuteSuggested);
  }
  if (clean === 'resume.pdf' || clean === 'ress.pdf') {
    return processCommand('resume', onExecuteSuggested);
  }
  if (
    clean === 'multimodal-database-modeling.pdf' ||
    clean === 'publications/multimodal-database-modeling.pdf' ||
    clean === 'multimodaldatabasemodeling.pdf'
  ) {
    return processCommand('research', onExecuteSuggested);
  }
  if (clean === 'projects' || clean === 'projects/' || clean === 'projects.txt') {
    return processCommand('projects', onExecuteSuggested);
  }

  // Check if target is a specific project
  const projectSlug = clean.replace(/^projects\//, '').replace(/\.txt$/, '').toLowerCase();
  const matchedProject = portfolioData.projects.find(
    (p) => p.id.toLowerCase() === projectSlug || p.title.toLowerCase().replace(/[^a-z0-9]/g, '') === projectSlug.replace(/[^a-z0-9]/g, '')
  );

  if (matchedProject) {
    return (
      <div className="my-2 space-y-2">
        <div className="text-cyan-400 text-xs font-mono">Viewing project file: /home/vineeth/projects/{matchedProject.id}</div>
        <ProjectCard project={matchedProject} />
      </div>
    );
  }

  return (
    <div className="text-rose-400 font-mono text-xs my-1">
      cat: {target}: No such file or directory. Type <span className="text-emerald-400 font-bold">ls</span> to view available files.
    </div>
  );
};

