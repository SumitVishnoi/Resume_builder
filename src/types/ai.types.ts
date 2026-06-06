export interface GenerateSummaryBody {
    experience: string;
    skills: string[];
    jobTitle: string;
}

export interface GenerateSkillsBody {
    experience: string;
    jobTitle: string;
}

export interface GenerateExperienceDescription {
    experience: string;
    jobRole: string;
    yearsOfExperience: number; 
    techStack: string[];
}

export interface GenerateProjectDescription {
    techStack: string[];
    jobTitle: string,
    experience: string
}

export interface ImproveContentBody {
    content: string;
}