export interface PersonalInfo {
  fullname?: string;
  email?: string;
  mobile?: string;
  location?: string;
  linkedIn?: string;
  githubUrl?: string;
}

export interface Education {
  tempId?: string;
  institute?: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  gpa?: string;
}

export interface WorkExperience {
  tempId?: string;
  company?: string;
  position?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface Project {
  tempId?: string;
  title?: string;
  description?: string;
  techStack?: string;
  liveUrl?: string;
}

export interface Certification {
  tempId?: string;
  name?: string;
  issuer?: string;
  year?: string;
}

export interface Resume {
  _id: string;
  title: string;
  summary: string;
  personalInfo: PersonalInfo;
  education: Education[];
  workExperience: WorkExperience[];
  projects: Project[];
  skills: string[];
  certification: Certification[];
}

export type Section =
  | "personal"
  | "summary"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "certifications";

export type SaveState = "idle" | "saving" | "saved" | "error";