import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div
        className="px-4 py-5 sm:p-6 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {isOpen && <div className="px-4 pb-5 sm:px-6 sm:pb-6">{children}</div>}
    </div>
  );
}

export default CollapsibleSection;