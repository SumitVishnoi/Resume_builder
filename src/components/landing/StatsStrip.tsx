import { STATS } from "@/constants/landing";

export default function StatsStrip() {
  return (
    <section className="border-y border-[#E4E4E7] bg-white">
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map(({ value, unit, label }, i) => (
            <div
              key={label}
              className={`text-center px-4 py-2 ${
                i < STATS.length - 1
                  ? "border-r border-[#F4F4F5]"
                  : ""
              }`}
            >
              <p
                className="text-2xl font-bold tracking-tight text-[#111318]"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {value}
                <span className="text-sm font-normal text-[#9CA3AF]">
                  {unit}
                </span>
              </p>
              <p className="text-xs mt-0.5 text-[#9CA3AF]">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}