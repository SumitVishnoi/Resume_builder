"use client";

import React from "react";

interface FormInputProps {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
}

export default function FormInput({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-text">
        {label}
        {required && <span className="text-danger ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        className="w-full px-3.5 py-2.5 bg-white border border-border rounded-lg text-sm text-text
          placeholder:text-text-muted
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          disabled:bg-surface-alt disabled:cursor-not-allowed
          transition-base"
      />
    </div>
  );
}

// Textarea variant
export function FormTextarea({
  label,
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  maxLength,
}: {
  label: string;
  id: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  maxLength?: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium text-text">
          {label}
        </label>
        {maxLength && (
          <span className="text-xs text-text-muted">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        maxLength={maxLength}
        className="w-full px-3.5 py-2.5 bg-white border border-border rounded-lg text-sm text-text
          placeholder:text-text-muted resize-none
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          transition-base"
      />
    </div>
  );
}
