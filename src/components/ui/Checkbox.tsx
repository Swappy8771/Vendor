// components/ui/Checkbox.tsx
import React from 'react';
import { cn } from '../../utils/cn';

type CheckboxProps = {
  id: string;
  name: string;
  label?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
};

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  name,
  label,
  checked,
  onChange,
  disabled = false,
  error,
  className = '',
}) => {
  return (
    <div className={cn("flex items-start space-x-2", className)}>
      <div className="flex items-center h-5">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className={cn(
            "h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500",
            disabled && "cursor-not-allowed opacity-50"
          )}
        />
      </div>
      {label && (
        <label htmlFor={id} className="text-sm text-gray-700 select-none">
          {label}
        </label>
      )}
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
};
