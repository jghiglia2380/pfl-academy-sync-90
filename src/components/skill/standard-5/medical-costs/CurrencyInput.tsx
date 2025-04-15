function CurrencyInput({ value, onChange, placeholder = '0.00', ...props }) {
  const formatNumberWithCommas = (value) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleChange = (e) => {
    const rawValue = e.target.value.replace(/[^\d.]/g, '');
    onChange(rawValue);
  };

  const displayValue = value ? formatNumberWithCommas(value) : '';

  return (
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-gray-500 sm:text-sm">$</span>
      </div>
      <input
        type="text"
        value={displayValue}
        onChange={handleChange}
        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export default CurrencyInput;