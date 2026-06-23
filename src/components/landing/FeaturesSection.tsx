import { ElementType } from "react";
import Reveal from "./Reveal";
import { FEATURES } from "@/constants/landing";

function FeatureCard({
  icon: Icon,
  title,
  body,
  delay,
}: {
  icon: ElementType;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="group h-full bg-white border border-[#E4E4E7] rounded-2xl p-6 transition-all duration-300 hover:border-[#7C3AED]/40 hover:shadow-[0_4px_24px_rgba(124,58,237,0.08)] hover:bg-[#FDFCFF]">
        <div className="w-10 h-10 rounded-xl bg-[#F4F3FF] group-hover:bg-[#EDE9FE] flex items-center justify-center mb-4 transition-colors">
          <Icon size={17} className="text-[#7C3AED]" />
        </div>
        <h3 className="text-sm font-semibold text-[#111318] mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-[#6B7280] leading-relaxed">{body}</p>
      </div>
    </Reveal>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-3">
              What's included
            </p>
            <h2
              className="text-3xl font-bold tracking-tight text-[#111318]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Everything you need.
              <br />
              Nothing you don't.
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, idx) => (
            <FeatureCard
              key={f.title}
              icon={f.icon}
              title={f.title}
              body={f.body}
              delay={(idx % 3) * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}