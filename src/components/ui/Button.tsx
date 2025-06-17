// components/ui/Button.tsx
import React from 'react';
import { cn } from '../../utils/cn'; // Optional helper to merge Tailwind classes

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outlined' | 'text' | 'icon';
  children?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const baseStyles =
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
  secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  outlined: 'border border-gray-400 text-gray-700 bg-transparent hover:bg-gray-100 focus:ring-gray-300',
  text: 'bg-transparent text-blue-600 hover:underline focus:ring-blue-300',
  icon: 'p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full focus:ring-gray-300',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        baseStyles,
        variantStyles[variant],
        isLoading ? 'opacity-80 cursor-wait' : '',
        className
      )}
    >
      {isLoading && (
        <svg
          className="mr-2 h-4 w-4 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
      )}
      {icon && variant === 'icon' ? icon : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};
