import { Resume } from "@/frontend/types/resume";

export function ResumePreview({ resume }: { resume: Resume }) {
  const p = resume.personalInfo || {};
  return (
    <div
      className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] p-10 font-serif text-[#111318] text-sm leading-relaxed max-w-[680px] mx-auto"
      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
    >
      {/* Header */}
      <div className="mb-6 pb-5 border-b-2 border-[#111318]">
        <h1 className="text-3xl font-bold tracking-tight mb-1">
          {p.fullname || (
            <span className="text-[#C4C4CC] italic font-normal">{p.fullname}</span>
          )}
        </h1>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#6B7280] mt-2">
          {p.email && <span>{p.email}</span>}
          {p.mobile && <span>{p.mobile}</span>}
          {p.location && <span>{p.location}</span>}
          {p.linkedIn && <span className="text-[#7C3AED]">{p.linkedIn}</span>}
          {p.githubUrl && <span className="text-[#7C3AED]">{p.githubUrl}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Profile
          </h2>
          <p className="text-[13px] text-[#374151] leading-relaxed">
            {resume.summary}
          </p>
        </div>
      )}

      {/* Experience */}
      {resume.workExperience?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {resume.workExperience.map((w, tempId) => (
              <div key={tempId}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-bold text-[13px]">
                      {w.position && <em className="text-[#C4C4CC]">{w.position}</em>}
                    </p>
                    <p className="text-[12px] text-[#6B7280]">
                      {w.company && <em className="text-[#C4C4CC]">{w.company}</em>}
                    </p>
                  </div>
                  <p className="text-[11px] text-[#9CA3AF] whitespace-nowrap">
                    {w.startDate} {w.startDate && "–"}{" "}
                    {w.current ? "Present" : w.endDate}
                  </p>
                </div>
                {w.description && (
                  <p className="mt-1.5 text-[12px] text-[#374151]">
                    {w.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {resume.education.map((e) => (
              <div key={e.tempId} className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-[13px]">
                    {e.institute || (
                      <em className="text-[#C4C4CC]">institute</em>
                    )}
                  </p>
                  <p className="text-[12px] text-[#6B7280]">
                    {[e.degree, e.field].filter(Boolean).join(", ")}
                  </p>
                  {e.gpa && (
                    <p className="text-[11px] text-[#9CA3AF]">GPA: {e.gpa}</p>
                  )}
                </div>
                <p className="text-[11px] text-[#9CA3AF] whitespace-nowrap">
                  {e.startDate} {e.startDate && "–"} {e.endDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {resume.projects.map((proj) => (
              <div key={proj.tempId}>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-[13px]">
                    {proj.title || <em className="text-[#C4C4CC]">Project</em>}
                  </p>
                  {proj.liveUrl && (
                    <span className="text-[11px] text-[#7C3AED]">
                      {proj.liveUrl}
                    </span>
                  )}
                </div>
                {proj.techStack && (
                  <p className="text-[11px] text-[#9CA3AF] mt-0.5">
                    {proj.techStack}
                  </p>
                )}
                {proj.description && (
                  <p className="text-[12px] text-[#374151] mt-1">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {resume.skills?.filter(Boolean).length > 0 && (
        <div className="mb-5">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.filter(Boolean).map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-[#F4F3FF] text-[#7C3AED] text-[11px] rounded-full border border-[#DDD6FE]"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {resume.certification?.length > 0 && (
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7C3AED] mb-2">
            Certifications
          </h2>
          <div className="space-y-1.5">
            {resume.certification.map((c) => (
              <div key={c.tempId} className="flex items-center justify-between">
                <p className="text-[13px] font-semibold">{c.name}</p>
                <p className="text-[11px] text-[#9CA3AF]">
                  {c.issuer} {c.year && `· ${c.year}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}