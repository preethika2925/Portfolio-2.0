export interface Project {
  id: string;
  number: string;
  title: string;
  category: 'Agriculture Technology' | 'Software Development' | 'Embedded Systems / IoT' | 'Electronics / Automation' | 'Programming / Data Structures';
  status: 'Concept & Architecture' | 'Implemented Software' | 'Hardware Engineering Concept' | 'Data Structure Implementation';
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  problemStatement: string;
  solutionArchitecture: string;
  visualTheme: 'green' | 'amber' | 'blue' | 'purple' | 'emerald';
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    description: string;
    category: string;
    highlight?: boolean;
  }[];
}

export interface JourneyMilestone {
  period: string;
  title: string;
  institution: string;
  type: 'Education' | 'Certification' | 'Professional Learning' | 'Technical Training';
  status: 'Completed' | 'In Progress' | 'Target 2029';
  details: string;
  verifiedDate?: string;
}

export interface ProfileData {
  name: string;
  preferredName: string;
  title: string;
  degree: string;
  institution: string;
  graduationYear: string;
  bioHeadline: string;
  bioParagraph1: string;
  bioParagraph2: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface EyeConfig {
  eyeFocusX: number; // percentage (0-100)
  eyeFocusY: number; // percentage (0-100)
  eyeZoom: number;   // zoom scale (e.g. 4.6)
  heroObjectPosition: string;
  portraitPath: string;
}
