import React from 'react';

interface TimeLimitSectionProps {
  value: string;
  onChange: (value: string) => void;
}

const TimeLimitSection: React.FC<TimeLimitSectionProps> = ({ value, onChange }) => {
  const timeOptions = ['1 hour', '2 hours', '3 hours', '4 hours'];

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Establish a Time Limit</h2>
      
      <p className="text-gray-600 mb-4">
        Set a specific time limit for your casino visit. Use a timer or reminder to stick to this limit.
      </p>

      <div className="space-y-4">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="">Select a time limit</option>
          {timeOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
    </section>
  );
};

export default TimeLimitSection;