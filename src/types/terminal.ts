import React from 'react';

export interface CommandOutputItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
  isError?: boolean;
}

export interface CommandSuggestion {
  command: string;
  description: string;
}

export const COMMAND_LIST: CommandSuggestion[] = [
  { command: 'help', description: 'Display all available commands' },
  { command: 'about', description: 'Display developer profile and intro' },
  { command: 'projects', description: 'View featured software & AI projects' },
  { command: 'research paper', description: 'View published IEEE research paper' },
  { command: 'skills', description: 'Technical skills and technologies' },
  { command: 'experience', description: 'Internship and professional experience' },
  { command: 'education', description: 'Educational qualifications & college' },
  { command: 'achievements', description: 'Hackathons, awards & languages' },
  { command: 'certifications', description: 'Completed verified certifications' },
  { command: 'coursework', description: 'Computer science core coursework' },
  { command: 'contact', description: 'Email, phone, and direct contact' },
  { command: 'social', description: 'LinkedIn and GitHub profiles' },
  { command: 'resume', description: 'View or download resume PDF' },
  { command: 'whoami', description: 'Compact developer identity' },
  { command: 'neofetch', description: 'System info and developer stats' },
  { command: 'ls', description: 'List portfolio virtual file system' },
  { command: 'cat', description: 'Read file contents (e.g. cat about.txt)' },
  { command: 'date', description: 'Show current system date & time' },
  { command: 'clear', description: 'Clear terminal screen' },
  { command: 'history', description: 'View executed command history' },
  { command: 'matrix', description: 'Matrix rain stream animation' },
  { command: 'coffee', description: 'Grab a cup of virtual coffee' },
  { command: 'fortune', description: 'Developer fortune cookie' },
  { command: 'pwd', description: 'Print working directory' },
  { command: 'uname', description: 'Display operating system and architecture' },
  { command: 'crt', description: 'Toggle vintage CRT scanline effect' },
  { command: 'sudo hire me', description: 'Recruiter special trigger' },
];

export const COMMAND_ALIASES: Record<string, string> = {
  bio: 'about',
  info: 'about',
  edu: 'education',
  college: 'education',
  exp: 'experience',
  work: 'experience',
  internship: 'experience',
  job: 'experience',
  proj: 'projects',
  project: 'projects',
  skill: 'skills',
  tech: 'skills',
  stack: 'skills',
  'research paper': 'research',
  'research-paper': 'research',
  research: 'research',
  paper: 'research',
  papers: 'research',
  publication: 'research',
  publications: 'research',
  ieee: 'research',
  mail: 'contact',
  email: 'contact',
  phone: 'contact',
  github: 'social',
  linkedin: 'social',
  cv: 'resume',
  cls: 'clear',
  dir: 'ls',
  ll: 'ls',
  scanlines: 'crt',
};

