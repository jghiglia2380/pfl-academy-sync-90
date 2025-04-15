interface ReflectionInputProps {
  questionId: number;
  value: string;
  onChange: (id: number, value: string) => void;
  placeholder?: string;
}

export function ReflectionInput({ questionId, value, onChange, placeholder }: ReflectionInputProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(questionId, e.target.value)}
      placeholder={placeholder}
      className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      rows={3}
    />
  );
}