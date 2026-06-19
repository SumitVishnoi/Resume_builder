import { Certification, Education, Project, WorkExperience } from "@/frontend/types/resume";

export const uid = () => Math.random().toString(36).slice(2, 9);

export const emptyExperience = (): WorkExperience => ({
  tempId: uid(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
});

export const emptyEducation = (): Education => ({
  tempId: uid(),
  institute: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
});

export const emptyProject = (): Project => ({
  tempId: uid(),
  title: "",
  description: "",
  techStack: "",
  liveUrl: "",
});

export const emptyCert = (): Certification => ({
  tempId: uid(),
  name: "",
  issuer: "",
  year: "",
});