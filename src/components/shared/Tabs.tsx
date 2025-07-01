import React from 'react';
import { cn } from '../../utils/cn';


type TabItem = {
  label: string;
  value: string;
};

type TabsProps = {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
};

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("flex gap-2 border-b overflow-x-auto", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={cn(
            "px-4 py-2 font-medium border-b-2 transition-all whitespace-nowrap",
            activeTab === tab.value
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-600 hover:text-blue-500 hover:border-blue-300"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
