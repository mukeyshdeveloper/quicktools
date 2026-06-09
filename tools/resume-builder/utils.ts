export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  technologies: string;
  link?: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  description?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string; // e.g. Native, Fluent, Conversational
}

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  languages: Language[];
  skills: string;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function getDefaultResume(): ResumeData {
  return {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    address: '',
    website: '',
    linkedin: '',
    github: '',
    summary: '',
    experience: [{ id: generateId(), company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    education: [{ id: generateId(), institution: '', degree: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    projects: [{ id: generateId(), name: '', technologies: '', link: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    certifications: [{ id: generateId(), name: '', issuer: '', date: '', link: '', description: '' }],
    languages: [{ id: generateId(), name: '', proficiency: '' }],
    skills: '',
  };
}

export function getSampleResume(): ResumeData {
  return {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Engineer',
    email: 'alex.morgan@email.com',
    phone: '+1 (555) 019-2834',
    address: 'San Francisco, CA',
    website: 'alexmorgan.dev',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    summary: 'Innovative and detail-oriented Senior Full Stack Engineer with 6+ years of experience building scalable web applications. Specialized in React, TypeScript, Next.js, and Node.js. Proven track record of improving application performance by 35% and leading cross-functional teams to deliver high-quality software products.',
    experience: [
      {
        id: generateId(),
        company: 'TechCorp Solutions',
        role: 'Senior Full Stack Engineer',
        startDate: '2023-03',
        endDate: '',
        isCurrent: true,
        description: '• Led development of a micro-frontend architecture using Next.js and Tailwind CSS, increasing page load speed by 35%.\n• Mentored 5 junior developers and implemented CI/CD pipelines, reducing deployment errors by 50%.\n• Designed and integrated secure RESTful APIs and GraphQL endpoints with Node.js and PostgreSQL.'
      },
      {
        id: generateId(),
        company: 'AppDev Studio',
        role: 'Software Engineer II',
        startDate: '2020-06',
        endDate: '2023-02',
        isCurrent: false,
        description: '• Developed and maintained 10+ responsive web applications using React and Redux.\n• Collaborated with UX/UI designers to implement highly interactive, accessible interfaces (WCAG compliant).\n• Reduced database query times by 20% through optimization and index tuning.'
      }
    ],
    education: [
      {
        id: generateId(),
        institution: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        startDate: '2016-09',
        endDate: '2020-05',
        isCurrent: false,
        description: 'Graduated with Honors (GPA: 3.8/4.0). Coursework: Data Structures, Algorithms, Database Management Systems, Software Engineering.'
      }
    ],
    projects: [
      {
        id: generateId(),
        name: 'E-Commerce Analytics Dashboard',
        technologies: 'Next.js, TypeScript, TailwindCSS, Chart.js',
        link: 'github.com/alexmorgan/dashboard',
        startDate: '2023-08',
        endDate: '2023-11',
        isCurrent: false,
        description: '• Created a real-time sales dashboard tracking key performance metrics for 5,000+ daily active users.\n• Optimized rendering using custom hooks and memoization, achieving a 60fps interaction rate.'
      },
      {
        id: generateId(),
        name: 'TaskFlow Project Manager',
        technologies: 'React, Node.js, Express, MongoDB, Socket.io',
        link: 'taskflow-demo.com',
        startDate: '2022-01',
        endDate: '2022-05',
        isCurrent: false,
        description: '• Built a collaborative task board featuring drag-and-drop mechanics and live websocket synchronization.'
      }
    ],
    certifications: [
      {
        id: generateId(),
        name: 'AWS Certified Solutions Architect – Associate',
        issuer: 'Amazon Web Services',
        date: '2024-01',
        link: '',
        description: 'Validation ID: AWS-ASA-99823'
      },
      {
        id: generateId(),
        name: 'React Advanced Certification',
        issuer: 'Meta',
        date: '2022-08',
        link: '',
        description: 'Focused on state management, concurrent rendering, and performance tuning.'
      }
    ],
    languages: [
      { id: generateId(), name: 'English', proficiency: 'Native' },
      { id: generateId(), name: 'Spanish', proficiency: 'Conversational' }
    ],
    skills: 'React, TypeScript, Next.js, Tailwind CSS, Node.js, Express, MongoDB, PostgreSQL, AWS, GraphQL, Git, Docker'
  };
}
