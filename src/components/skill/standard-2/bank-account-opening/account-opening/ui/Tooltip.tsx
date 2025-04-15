import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group">
      <div className="cursor-help">
        {children}
      </div>
      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-sm rounded px-2 py-1 bottom-full mb-2 min-w-max">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}