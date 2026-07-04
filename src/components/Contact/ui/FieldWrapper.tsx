"use client";

import { memo, ReactNode } from "react";

interface FieldWrapperProps {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

function FieldWrapperComponent({
  label,
  htmlFor,
  error,
  required,
  children,
  className = "",
}: FieldWrapperProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <label
        htmlFor={htmlFor}
        className="
          text-[12px] font-medium
          text-[#0B3558]/80
          uppercase tracking-[0.12em]
          mb-2
        "
      >
        {label}
        {required && (
          <span className="text-[#C9A96A] ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-2 text-[12.5px] text-[#B84545] font-normal leading-snug"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export const FieldWrapper = memo(FieldWrapperComponent);
