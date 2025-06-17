// components/ui/Textarea.tsx
import React from 'react';
import { cn } from '../../utils/cn';

type TextareaProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  className?: string;
  rows?: number;
  disabled?: boolean;
  required?: boolean;
};

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helperText,
  className,
  rows = 4,
  disabled = false,
  required = false,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={cn(
          'w-full px-4 py-2 border rounded-md text-sm transition focus:outline-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-2 focus:ring-blue-500',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        )}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      {!error && helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>}
    </div>
  );
};
