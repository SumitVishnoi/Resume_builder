import { Resume } from "@/frontend/types/resume";

export interface ATSBreakdown {
  total: number;
  items: { label: string; points: number; earned: number; met: boolean }[];
}

export function calcATS(r: Resume): ATSBreakdown {
  const items = [
    {
      label: "Full name",
      points: 10,
      earned: r.personalInfo?.fullname ? 10 : 0,
      met: !!r.personalInfo?.fullname,
    },
    {
      label: "Email address",
      points: 10,
      earned: r.personalInfo?.email ? 10 : 0,
      met: !!r.personalInfo?.email,
    },
    {
      label: "Phone number",
      points: 5,
      earned: r.personalInfo?.mobile ? 5 : 0,
      met: !!r.personalInfo?.mobile,
    },
    {
      label: "Location",
      points: 5,
      earned: r.personalInfo?.location ? 5 : 0,
      met: !!r.personalInfo?.location,
    },
    {
      label: "LinkedIn profile",
      points: 5,
      earned: r.personalInfo?.linkedIn ? 5 : 0,
      met: !!r.personalInfo?.linkedIn,
    },
    {
      label: "Professional summary",
      points: 15,
      earned: r.summary && r.summary.trim().length > 50 ? 15 : r.summary ? 8 : 0,
      met: !!(r.summary && r.summary.trim().length > 50),
    },
    {
      label: "Work experience",
      points: 20,
      earned: (r.workExperience?.length ?? 0) >= 2
        ? 20
        : (r.workExperience?.length ?? 0) === 1
          ? 12
          : 0,
      met: (r.workExperience?.length ?? 0) >= 2,
    },
    {
      label: "Education",
      points: 10,
      earned: r.education?.length ? 10 : 0,
      met: !!(r.education?.length),
    },
    {
      label: "Skills (5+)",
      points: 10,
      earned: (r.skills?.filter(Boolean).length ?? 0) >= 5
        ? 10
        : (r.skills?.filter(Boolean).length ?? 0) > 0
          ? 5
          : 0,
      met: (r.skills?.filter(Boolean).length ?? 0) >= 5,
    },
    {
      label: "Projects",
      points: 10,
      earned: r.projects?.length ? 10 : 0,
      met: !!(r.projects?.length),
    },
  ];

  const total = items.reduce((sum, i) => sum + i.earned, 0);
  return { total, items };
}

export function atsLabel(score: number): {
  label: string;
  color: string;
  bg: string;
  ring: string;
} {
  if (score >= 85)
    return {
      label: "Excellent",
      color: "#10B981",
      bg: "#ECFDF5",
      ring: "#6EE7B7",
    };
  if (score >= 65)
    return {
      label: "Good",
      color: "#7C3AED",
      bg: "#F4F3FF",
      ring: "#C4B5FD",
    };
  if (score >= 40)
    return {
      label: "Fair",
      color: "#F59E0B",
      bg: "#FFFBEB",
      ring: "#FCD34D",
    };
  return { label: "Weak", color: "#EF4444", bg: "#FEF2F2", ring: "#FCA5A5" };
}