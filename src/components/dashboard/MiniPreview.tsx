import { Resume } from "@/frontend/types/resume";

export default function MiniPreview({ resume }: { resume: Resume }) {
  const name = resume.personalInfo?.fullname;
  const hasExp = (resume.workExperience?.length ?? 0) > 0;
  const hasEdu = (resume.education?.length ?? 0) > 0;
  const hasSkills = resume.skills?.filter(Boolean).length > 0;

  return (
    <div
      className="w-full h-full p-4 text-left overflow-hidden select-none"
      style={{ fontFamily: "Georgia, serif" }}
    >
      <div className="border-b border-[#E4E4E7] pb-2 mb-2">
        <div className="text-[11px] font-bold text-[#111318] truncate leading-tight">
          {name || (
            <span className="italic text-[#C4C4CC] font-normal">{resume.personalInfo.fullname}</span>
          )}
        </div>
        {resume.personalInfo?.email && (
          <div className="text-[8px] text-[#9CA3AF] truncate mt-0.5">
            {resume.personalInfo.email}
          </div>
        )}
      </div>
      <div className="space-y-2">
        {hasExp && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Experience
            </div>
            <div className="space-y-0.5">
              <div className="h-[4px] bg-[#E4E4E7] rounded-full w-4/5" />
              <div className="h-[4px] bg-[#F4F4F5] rounded-full w-3/5" />
            </div>
          </div>
        )}
        {hasEdu && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Education
            </div>
            <div className="h-[4px] bg-[#E4E4E7] rounded-full w-3/4" />
          </div>
        )}
        {hasSkills && (
          <div>
            <div className="text-[7px] font-bold uppercase tracking-widest text-[#7C3AED] mb-1">
              Skills
            </div>
            <div className="flex flex-wrap gap-0.5">
              {resume.skills
                .filter(Boolean)
                .slice(0, 4)
                .map((s, i) => (
                  <span
                    key={i}
                    className="text-[6px] px-1 py-0.5 bg-[#F4F3FF] text-[#7C3AED] rounded-full border border-[#DDD6FE]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {s}
                  </span>
                ))}
            </div>
          </div>
        )}
        {!hasExp && !hasEdu && !hasSkills && (
          <div className="space-y-1.5 mt-1">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[4px] bg-[#F4F4F5] rounded-full"
                style={{ width: `${90 - i * 15}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}