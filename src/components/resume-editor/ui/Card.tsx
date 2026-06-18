import { X } from "lucide-react";

export default function Card({
  children,
  onRemove,
}: {
  children: React.ReactNode;
  onRemove: () => void;
}) {
  return (
    <div className="relative bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl p-4 space-y-3">
      <button
        onClick={onRemove}
        className="absolute top-3.5 right-3.5 p-1 rounded-lg text-[#C4C4CC] hover:text-red-400 hover:bg-red-50 transition-colors"
      >
        <X size={14} />
      </button>
      {children}
    </div>
  );
}