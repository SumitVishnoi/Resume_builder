import { Plus } from "lucide-react";

export default function AddButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-[#E4E4E7] rounded-xl text-sm text-[#9CA3AF] hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#F4F3FF] transition-all"
    >
      <Plus size={14} /> {label}
    </button>
  );
}