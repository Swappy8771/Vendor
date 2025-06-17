// components/ui/Select.tsx
import React from 'react';
import { cn } from '../../utils/cn';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  placeholder?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  error,
  className,
  disabled,
  required,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={cn(
          'w-full px-4 py-2 border rounded-md text-sm transition focus:outline-none',
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-2 focus:ring-blue-500',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
