import React from 'react';

interface CheckboxItemProps {
  text: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxItem: React.FC<CheckboxItemProps> = ({ text, checked, onChange }) => {
  return (
    <div className="border border-gray-300 bg-white p-4">
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1"
        />
        <span className="text-sm">{text}</span>
      </label>
    </div>
  );
};