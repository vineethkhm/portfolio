export interface Project {
  id: string;
  number: string;
  title: string;
  technologies: string[];
  description: string;
  features: string[];
  impactOrPerf?: string;
  githubUrl: string;
  demoUrl: string;
}

export interface ResearchPaper {
  title: string;
  authors: string[];
  institution: string;
  conference: string;
  pdfUrl: string;
  fileName: string;
  abstract: string;
  metrics: { label: string; value: string }[];
}

export interface PortfolioData {
  developer: {
    name: string;
    alias: string;
    role: string;
    location: string;
    email: string;
    phone: string;
    phoneFormatted: string;
    introduction: string;
    interests: string[];
    status: string;
    social: {
      github: string;
      linkedin: string;
      portfolio: string;
    };
    resumePath: string;
  };
  education: {
    institution: string;
    degree: string;
    major: string;
    duration: string;
    location: string;
    cgpa: string;
  };
  experience: {
    company: string;
    role: string;
    duration: string;
    workMode: string;
    responsibilities: string[];
  };
  projects: Project[];
  researchPaper: ResearchPaper;
  skills: {
    category: string;
    items: string[];
  }[];
  achievements: string[];
  certifications: {
    name: string;
    provider: string;
    year: string;
  }[];
  coursework: string[];
}

export const portfolioData: PortfolioData = {
  developer: {
    name: "Vineeth KHM",
    alias: "vineeth",
    role: "AI/ML Developer | Full-Stack Developer",
    location: "Davanagere, Karnataka, India",
    email: "vineethkhm2004@gmail.com",
    phone: "+91 7892880996",
    phoneFormatted: "+91 7892880996",
    introduction:
      "I am a Computer Science Engineering student specializing in Artificial Intelligence and Machine Learning. I enjoy developing intelligent systems, building full-stack applications, and exploring practical applications of AI and machine learning.\n\nMy interests include Artificial Intelligence, Machine Learning, Deep Learning, Computer Vision, Backend Development, and building useful developer tools.",
    interests: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Backend Development",
      "Developer Tools & LLM Systems",
    ],
    status: "Open to Internship Opportunities",
    social: {
      github: "https://github.com/vineethkhm/",
      linkedin: "https://www.linkedin.com/in/vineeth-khm-9704aa289/",
      portfolio: "https://vineeth-portfolio.dev",
    },
    resumePath: "/resume.pdf", // Place your resume PDF at public/resume.pdf
  },
  education: {
    institution: "Sahyadri College of Engineering and Management",
    degree: "Bachelor of Engineering (B.E.)",
    major: "Computer Science and Engineering – Artificial Intelligence and Machine Learning",
    duration: "2023 – 2027",
    location: "Mangalore, Karnataka",
    cgpa: "8.1",
  },
  experience: {
    company: "Amdox Technologies",
    role: "Full-Stack Web Developer Intern",
    duration: "February 2026 – April 2026",
    workMode: "Remote",
    responsibilities: [
      "Developed full-stack MERN web applications using React.js, Node.js, Express.js, and MongoDB.",
      "Designed and developed a Job Listing Portal featuring authentication, profile management, job posting, search, and application tracking.",
      "Integrated RESTful APIs with MongoDB for secure and efficient data management.",
    ],
  },
  projects: [
    {
      id: "agentic-dbms",
      number: "PROJECT 01",
      title: "Agentic DBMS",
      technologies: [
        "React.js",
        "FastAPI",
        "PostgreSQL",
        "Python",
        "Qwen 2.5-Coder",
        "RAG",
      ],
      description:
        "An AI-powered no-code database management system that enables visual schema design and real-time PostgreSQL synchronization.",
      features: [
        "Visual database schema design on infinite canvas",
        "Real-time PostgreSQL synchronization",
        "Natural language to SQL generation via local LLM",
        "Qwen 2.5-Coder model integration",
        "Retrieval-Augmented Generation (RAG) for live schema context",
        "Autonomous SQL error detection and autonomic query correction loop",
        "Schema-aware database interactions with Bezier curve relations",
      ],
      impactOrPerf: "Reduced schema setup time by an estimated 60%.",
      githubUrl: "#", // Placeholder: update when repository is public
      demoUrl: "#",   // Placeholder: update when live demo is hosted
    },
    {
      id: "fastprotect",
      number: "PROJECT 02",
      title: "Region-Aware FastProtect",
      technologies: [
        "Python",
        "PyTorch",
        "OpenCV",
        "ResNet U-Net",
        "ArcFace",
        "FaceNet",
        "LPIPS",
      ],
      description:
        "A real-time facial identity cloaking system designed to protect user privacy against AI-based facial recognition models.",
      features: [
        "Adversarial machine learning for biometric protection",
        "Landmark-guided region-aware perturbations",
        "Custom ResNet U-Net deep learning architecture",
        "Facial identity protection against black-box recognition",
        "Perceptual visual quality evaluation using LPIPS",
      ],
      impactOrPerf: "Achieved 30+ FPS real-time processing on standard hardware.",
      githubUrl: "#", // Placeholder: update when repository is public
      demoUrl: "#",   // Placeholder: update when live demo is hosted
    },
    {
      id: "automatalab",
      number: "PROJECT 03",
      title: "AutoMataLab",
      technologies: ["React.js", "React Flow", "JavaScript", "HTML", "CSS"],
      description:
        "An interactive web application for designing and simulating Deterministic Finite Automata (DFA).",
      features: [
        "Drag-and-drop DFA visual canvas editor",
        "Real-time state transitions and active state highlighting",
        "Execution step-by-step tracing",
        "Symbol-by-symbol input string simulation",
        "Acceptance and rejection state visualization",
      ],
      impactOrPerf: "Enhances automata learning and theoretical CS pedagogy.",
      githubUrl: "#", // Placeholder: update when repository is public
      demoUrl: "#",   // Placeholder: update when live demo is hosted
    },
  ],
  researchPaper: {
    title: "Multimodal Database Modeling: Mitigating Cognitive Load in Schema Prototyping via Voice-Augmented Visual Interfaces",
    authors: [
      "Rahul Pai",
      "Vineeth KHM",
      "Chirag Shetty",
      "Gautham Nayak",
      "Chaithrika Aditya",
    ],
    institution: "Department of CSE(AIML), Sahyadri College of Engineering & Management, Mangalore, India",
    conference: "IEEE CONECCT 26",
    pdfUrl: "/MultimodalDatabaseModeling.pdf",
    fileName: "MultimodalDatabaseModeling.pdf",
    abstract:
      "Database schema design remains a cognitively demanding task that imposes substantial mental workload on developers and data architects. Traditional workflows necessitate frequent context-switching between high-abstraction visual diagramming tools and low-abstraction SQL code editors, resulting in elevated cognitive load, increased error rates, and diminished productivity. This paper introduces the Agentic DBMS, a novel multimodal system that integrates a No-Code Visual Schema Designer with an AI-powered Voice/Chat Agent to create a unified, low-friction prototyping environment. User study (N = 15) demonstrated significant improvements across all core dimensions.",
    metrics: [
      { label: "Time-to-Completion Reduction", value: "73.1%" },
      { label: "Syntax & Logical Error Reduction", value: "90.0%" },
      { label: "NASA-TLX Cognitive Load Drop", value: "-43.5 pts" },
      { label: "Frustration Dimension Drop", value: "-78.1%" },
    ],
  },
  skills: [
    {
      category: "Programming Languages",
      items: ["Python", "Java", "JavaScript", "C", "SQL"],
    },
    {
      category: "Frontend Development",
      items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "React Flow"],
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    },
    {
      category: "Databases & Storage",
      items: ["PostgreSQL", "MySQL", "MongoDB"],
    },
    {
      category: "AI / Machine Learning",
      items: [
        "Machine Learning",
        "Deep Learning",
        "Computer Vision",
        "PyTorch",
        "OpenCV",
        "RAG",
        "LLMs",
      ],
    },
    {
      category: "Tools & DevOps",
      items: ["Git", "GitHub", "Docker", "VS Code", "Linux / Bash"],
    },
  ],
  achievements: [
    "Secured 2nd Place in the Tether X Hackathon at VIT Chennai.",
    "Finished among the Top 10 teams out of 100+ teams in the Mandya Hackathon.",
    "Participated in multiple national-level hackathons, including Smart India Hackathon.",
    "Gained foundational speaking and reading skills in Japanese, enhancing cross-cultural communication.",
  ],
  certifications: [
    {
      name: "Database Management Systems",
      provider: "Infosys Springboard",
      year: "2025",
    },
    {
      name: "Introduction to Artificial Intelligence",
      provider: "Infosys Springboard",
      year: "2025",
    },
    {
      name: "Git & GitHub: Working with Repositories",
      provider: "Infosys Springboard",
      year: "2025",
    },
  ],
  coursework: [
    "Data Structures and Algorithms",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Natural Language Processing",
    "Image Processing",
  ],
};

