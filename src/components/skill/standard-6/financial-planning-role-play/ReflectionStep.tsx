type ReflectionStepProps = {
  reflection: string;
  setReflection: (text: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export function ReflectionStep({ reflection, setReflection, onSubmit }: ReflectionStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          If your character's financial goal were to change (e.g., shifting from a short-term to a long-term goal), 
          which of your choices would need to be adjusted and why?
        </label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Submit
      </button>
    </form>
  );
}