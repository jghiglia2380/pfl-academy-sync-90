import React, { useState } from "react";
import { sampleItems } from "./data/sampleData";

const SampleChecklist = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
      >
        <span className="mr-2">{isExpanded ? "−" : "+"}</span>
        View Sample Checklist
      </button>

      {isExpanded && (
        <div className="mt-4 p-4 bg-gray-50 rounded">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left pb-3 text-gray-700 font-medium">
                  Vulnerable Area
                </th>
                <th className="text-left pb-3 text-gray-700 font-medium">
                  Protection Strategy
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleItems.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 pr-4 text-gray-900">{item.area}</td>
                  <td className="py-3 text-gray-600">{item.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SampleChecklist;
