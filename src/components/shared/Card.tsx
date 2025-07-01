import React from 'react';
import { cn } from '../../utils/cn';

type CardProps = {
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  bgColor?: string;
  textColor?: string;
  shadow?: string;
  padding?: string;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  size = 'md',
  bgColor = 'bg-white',
  textColor = 'text-gray-800',
  shadow = 'shadow-md',
  padding = 'p-4',
  className,
}) => {
  const sizeClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-3xl',
    full: 'w-full',
  }[size];

  return (
    <div
      className={cn(
        'rounded-lg overflow-hidden',
        bgColor,
        textColor,
        shadow,
        padding,
        sizeClass,
        className
      )}
    >
      {title && <div className="text-lg font-semibold mb-2">{title}</div>}

      <div className="mb-2">
        {children}
      </div>

      {footer && <div className="mt-4 border-t pt-2">{footer}</div>}
    </div>
  );
};
