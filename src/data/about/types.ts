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

export interface PublicationItem {
  title: string;
  url?: string;
  description?: string;
  date?: string;
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
  publications: PublicationItem[];
  certifications: CertificationCategory[];
  misc?: MiscCategory[];
  hobbies?: HobbyItem[];
}
