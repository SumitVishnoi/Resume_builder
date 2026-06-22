import React from 'react'

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

export default function AIInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: Props) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#E4E4E7] rounded-xl
                 text-[#111318] placeholder:text-[#C4C4CC]
                 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/10
                 transition-all"
    />
  );
}