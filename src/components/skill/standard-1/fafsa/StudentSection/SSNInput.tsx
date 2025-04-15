export function SSNInput({ value, onChange }) {
  const formatSSN = (value) => {
    const numbers = value.replace(/[^\d]/g, ""); // Remove non-numeric characters

    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 5)
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(
      5,
      9
    )}`;
  };

  const handleChange = (e) => {
    const formatted = formatSSN(e.target.value);
    if (formatted.replace(/-/g, "").length <= 9) {
      onChange(formatted); // Send formatted SSN to parent component
    }
  };

  return (
    <input
      type="text"
      value={value} // Use the value from props
      onChange={handleChange}
      placeholder="XXX-XX-XXXX"
      className="w-full border border-black p-1"
      maxLength={11}
    />
  );
}
