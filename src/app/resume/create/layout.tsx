import StepSidebar from "@/components/resume/StepSidebar";


export default function ResumeCreateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-brand-bg">
      <StepSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-8 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}