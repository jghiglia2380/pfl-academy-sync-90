import React from 'react';

interface NumericInputProps {
  value: string;
  onChange: (value: string) => void;
  type: 'currency' | 'number';
  placeholder: string;
  className?: string;
}

const NumericInput: React.FC<NumericInputProps> = ({
  value,
  onChange,
  type,
  placeholder,
  className = ''
}) => {

  const formatCurrency = (value: string): string => {
    // Remove non-numeric characters
    const numericValue = value.replace(/[^\d]/g, '');
    
    // Convert to number and format with commas and currency symbol
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(numericValue));
  
    return formatted;
  };
  
  const formatNumber = (value: string): string => {
    // Remove non-numeric characters
    return value.replace(/[^\d]/g, '');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (type === 'currency') {
      onChange(formatCurrency(newValue).replace(/[^\d]/g, ''));
    } else {
      onChange(formatNumber(newValue));
    }
  };

  const displayValue = type === 'currency' 
    ? formatCurrency(value)
    : value;

  return (
    <input
      type="text"
      value={displayValue}
      onChange={handleChange}
      placeholder={placeholder}
      className={`w-full p-1 border rounded ${className}`}
    />
  );
};

export default NumericInput;