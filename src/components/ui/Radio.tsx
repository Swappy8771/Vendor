// components/ui/Radio.tsx
import React from 'react';
import { cn } from '../../utils/cn';

type Option = {
  label: string;
  value: string;
  disabled?: boolean;
};

type RadioProps = {
  name: string;
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  disabled?: boolean;
};

export const Radio: React.FC<RadioProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  error,
  className,
  disabled = false,
}) => {
  return (
    <div className={cn("w-full", className)}>
      {label && (
        <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      )}

      <div className="flex flex-col space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center space-x-2 text-sm",
              (disabled || option.disabled) && "opacity-50 cursor-not-allowed"
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              disabled={disabled || option.disabled}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
