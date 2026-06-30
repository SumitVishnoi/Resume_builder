import { Types } from "mongoose";

export interface IPersonalInfo {
  fullname: string;
  email: string;
  mobile: string;
  location: string;
  githubUrl: string;
  linkedIn: string;
  portfolio?: string;
}

export interface IWorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface IProjects {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  techStack: string[];
}

export interface IEducation {
  institute: string;
  degree: string;
  field: string;
  gpa: string;
  startDate: string;
  endDate: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
}

export interface IResume {
  _id?: string;
  user_id: Types.ObjectId;
  title: string;
  summary: string;
  personalInfo: IPersonalInfo;
  workExperience: IWorkExperience[];
  projects: IProjects[];
  skills: string[];
  education: IEducation[];
  certification?: Certificate[];
  createdAt?: Date;
  updatedAt?: Date;
}
