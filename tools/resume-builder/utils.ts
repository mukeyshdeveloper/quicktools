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

export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  summary: string;
  experience: Experience[];
  education: Education[];
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
    summary: '',
    experience: [{ id: generateId(), company: '', role: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    education: [{ id: generateId(), institution: '', degree: '', startDate: '', endDate: '', isCurrent: false, description: '' }],
    skills: '',
  };
}
