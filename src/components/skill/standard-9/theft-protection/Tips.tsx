import React, { useState } from 'react';

const Tips = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        <span className="mr-2">{isExpanded ? '−' : '+'}</span>
        Additional Identity Theft Prevention Tips
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <ul className="space-y-3 text-gray-600">
            <li>• Shred documents with personal information before discarding</li>
            <li>• Be cautious about sharing personal details on social media</li>
            <li>• Use secure Wi-Fi connections, especially when accessing sensitive accounts</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tips;