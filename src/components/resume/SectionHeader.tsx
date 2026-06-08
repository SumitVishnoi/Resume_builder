import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "default" | "optional";
  action?: React.ReactNode;
}

export default function SectionHeader({ icon: Icon, title, subtitle, badge, badgeVariant = "default", action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 bg-primary/10 border border-primary/15 rounded-2xl flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-bold text-ink tracking-tight">{title}</h1>
            {badge && (
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                badgeVariant === "optional"
                  ? "bg-warn/10 text-warn border border-warn/20"
                  : "bg-primary/10 text-primary border border-primary/20"
              }`}>
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-sm text-ink-secondary mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}