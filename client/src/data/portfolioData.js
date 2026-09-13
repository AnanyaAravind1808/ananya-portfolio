// ============================================================
// Centralized portfolio content.
// Edit values here to update the site — no component changes needed.
// ============================================================

export const profile = { 
  name: 'A Ananya',
  title: 'Computer Science Engineering Student',
  tagline:
    "I'm a Computer Science Engineering student interested in software development, emerging technologies, and research. I enjoy learning through hands-on projects and building practical solutions to real-world problems.",
  email: 'ananya.aravindlp@gmail.com',
  location: 'India',
  leetcodeUrl: 'https://leetcode.com/', // TODO: replace with real LeetCode profile URL
  githubUrl: 'https://github.com/AnanyaAravind1808', // TODO: replace with real GitHub URL
  linkedinUrl: 'https://www.linkedin.com/in/ananya-aravind-3481b8383/', // TODO: replace with real LinkedIn URL
  resumeFile: '/Ananya_Resume.pdf',
};

export const aboutCards = [
  {
    id: 'software-development',
    title: 'Software Development',
    description:
      'I enjoy building full-stack applications and learning how to write clean, maintainable code.',
  },
  {
    id: 'research',
    title: 'Research',
    description:
      'I am curious about emerging technologies and enjoy exploring how they can solve real problems.',
  },
  {
    id: 'continuous-learning',
    title: 'Continuous Learning',
    description:
      'I am always exploring new tools, languages, and frameworks to grow as a developer.',
  },
];

export const skillCategories = [
  {
    category: 'Programming',
    skills: ['Python', 'Java', 'C', 'JavaScript'],
  },
  {
    category: 'Web Development',
    skills: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js'],
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
];

// Editable education record — update freely.
export const education = {
    degree: 'B.E.',
    branch: 'Computer Science and Engineering',
    status: 'Second-year student',
    startYear: '2025',
    expectedGraduation: '2029',
    coursework: [
      'Data Structures & Algorithms',
      'Object-Oriented Programming',
      'Database Management Systems',
      'Operating Systems',
      'Computer Networks',
    ]
  }

// Projects are rendered dynamically via ProjectCard.
// Add a new project by adding an object here — no new component needed.
export const projects = [
  {
    id: 'automatic-night-light',
    title: 'Automatic Night Light',
    description:
      'An automated lighting system that uses an LDR sensor to detect ambient light and control lighting accordingly, helping reduce unnecessary electricity usage.',
    technologies: ['Arduino', 'LDR', 'LED', 'Sensors'],
    category: 'Embedded Systems / Clean Energy',
    image: '/images/placeholder-project.svg',
    github: '',
    demo: '',
  },
];

export const experience = [
  {
    id: '1m1b-green-internship',
    role: '1M1B Green Internship',
    description:
      'Participated in the 1M1B Green Internship, gaining exposure to sustainability, green skills, and professional development. I was selected as the Top Intern and was also selected for a 5-day workplace experience at 1M1B Office, Bangalore.',
    technologies: [],
  },
  {
    id: 'thiranex-internship',
    role: 'Intern – Full Stack Development',
    company: 'Thiranex',
    startDate: '',
    endDate: '',
    description:
      'Hands-on experience focused on full-stack development, real-world projects, learning new technologies, and improving practical software development skills.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];
