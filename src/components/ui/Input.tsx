// components/ui/Input.tsx
import React from 'react';
import { cn } from '../../utils/cn'; // Optional helper to merge Tailwind classes

type InputProps = {
  label?: string;
  name: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export const Input: React.FC<InputProps> = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  helperText,
  className = '',
  disabled = false,
  required = false,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label
          htmlFor={name}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={cn(
          "w-full px-4 py-2 border rounded-md text-sm transition focus:outline-none",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-2 focus:ring-blue-500",
          disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
        )}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};
