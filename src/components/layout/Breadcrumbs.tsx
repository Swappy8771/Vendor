import { cn } from '../../utils/cn';
import { Link } from "react-router-dom"; // or "next/link" for Next.js

type Crumb = {
  label: string;
  href?: string; // If no href, treat as current
};

type BreadcrumbProps = {
  items: Crumb[];
  separator?: string;
  className?: string;
};

export const Breadcrumb = ({ items, separator = "/", className }: BreadcrumbProps) => {
  return (
    <nav className={cn("flex items-center text-sm text-gray-600", className)} aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2">{separator}</span>}

            {isLast || !item.href ? (
              <span className="font-medium text-gray-800">{item.label}</span>
            ) : (
              <Link
                to={item.href}
                className="hover:underline text-blue-600 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
