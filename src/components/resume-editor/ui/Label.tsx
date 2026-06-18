export default function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] font-semibold text-[#6B7280] uppercase tracking-widest mb-1.5">
      {children}
    </label>
  );
}