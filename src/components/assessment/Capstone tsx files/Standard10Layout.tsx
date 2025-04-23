import React from 'react';
import { Card } from '@/components/ui/card';

interface Standard10LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Standard10Layout: React.FC<Standard10LayoutProps> = ({
  children,
  className = ''
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 ${className}`}>
      <div className="container mx-auto px-4">
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}; 