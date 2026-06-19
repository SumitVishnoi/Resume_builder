import { Loader2, Trash2 } from "lucide-react";

export default function DeleteModal({
  title,
  onConfirm,
  onCancel,
  loading,
}: {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-[360px]">
        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mb-4">
          <Trash2 size={18} className="text-red-500" />
        </div>
        <h3 className="text-base font-semibold text-[#111318] mb-1">
          Delete this resume?
        </h3>
        <p className="text-sm text-[#6B7280] mb-6">
          `{title || "Untitled resume"}` will be permanently removed. This
          cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 border border-[#E4E4E7] rounded-xl text-sm font-medium text-[#374151] hover:bg-[#F4F4F5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 disabled:opacity-60 flex items-center justify-center gap-2 transition-colors"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}