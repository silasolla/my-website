export interface ExperienceItem {
  period: string;
  company: string;
  companyLink: string;
  role: string;
  description?: string;
}

export interface EducationItem {
  period: string;
  institution: string;
  degree?: string;
  description?: string;
}

export interface WritingItem {
  title: string;
  url?: string;
  description?: string;
  date?: string;
}

export interface WritingCategory {
  category: string;
  items: WritingItem[];
}

export interface CertificationItem {
  name: string;
  credlyUrl?: string;
  description?: string;
  date?: string;
  badgeImage?: string;
}

export interface CertificationCategory {
  category: string;
  items: CertificationItem[];
}

export interface HobbyItem {
  name: string;
  note?: string;
}

export interface MiscItem {
  name: string;
  url?: string;
  description?: string;
}

export interface MiscCategory {
  category: string;
  items: MiscItem[];
}

export interface AboutData {
  experiences: ExperienceItem[];
  educations: EducationItem[];
  writings: WritingCategory[];
  certifications: CertificationCategory[];
  misc?: MiscCategory[];
  hobbies?: HobbyItem[];
}
