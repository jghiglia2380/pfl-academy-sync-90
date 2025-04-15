import React from 'react';

interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const CurrencyInput = ({ value, onChange, className = '' }: CurrencyInputProps) => {
  const formatValue = (val: string): string => {
    // Remove any non-digits
    const numbers = val.replace(/[^\d]/g, '');
    // Convert to number and format with commas
    return numbers === '' ? '' : Number(numbers).toLocaleString();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any non-digits and commas before updating state
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    onChange(rawValue);
  };

  return (
    <div className="flex items-center">
      <span className="mr-2">$</span>
      <input
        type="text"
        value={formatValue(value)}
        onChange={handleChange}
        className={`border border-gray-300 px-2 py-1 w-32 text-right ${className}`}
        pattern="\d*"
        inputMode="numeric"
      />
    </div>
  );
}

export default CurrencyInput;