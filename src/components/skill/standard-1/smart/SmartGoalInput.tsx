interface SmartGoalInputProps {
  id: string;
  title: string;
  prompt: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
}

export function SmartGoalInput({
  id,
  title,
  prompt,
  placeholder,
  value,
  onChange,
  error
}: SmartGoalInputProps) {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <label htmlFor={id} className="block text-sm font-medium text-gray-600 mb-2">
        {prompt}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none
          ${error ? 'border-red-500' : 'border-gray-300'}`}
        rows={4}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">
          Please complete this section
        </p>
      )}
    </div>
  );
}