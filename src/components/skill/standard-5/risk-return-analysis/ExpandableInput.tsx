interface ExpandableInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function ExpandableInput({
  value,
  onChange,
  placeholder,
}: ExpandableInputProps) {
  return (
    <div className="relative">
      <textarea
        rows={4}
        className={`block w-full border-gray-300 rounded-md shadow-sm 
          focus:ring-blue-500 focus:border-blue-500 sm:text-sm
          transition-all duration-200 ease-in-out
       `}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}
