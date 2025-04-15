import { predefinedCharacters } from "./constants";

type CharacterStepProps = {
  onCharacterSelect: (char: any) => void;
  customName: string;
  setCustomName: (name: string) => void;
  customAge: string;
  setCustomAge: (age: string) => void;
  customGoal: string;
  setCustomGoal: (goal: string) => void;
  onCustomSubmit: (e: React.FormEvent) => void;
};

export function CharacterStep({
  onCharacterSelect,
  customName,
  setCustomName,
  customAge,
  setCustomAge,
  customGoal,
  setCustomGoal,
  onCustomSubmit
}: CharacterStepProps) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Choose a Character</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predefinedCharacters.map((char) => {
            const Icon = char.icon;
            return (
              <button
                key={char.name}
                onClick={() => onCharacterSelect(char)}
                className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-left flex items-center space-x-3"
              >
                <Icon className="w-6 h-6" />
                <div>
                  <div className="font-medium">{char.name}</div>
                  <div className="text-sm text-gray-600">Age {char.age}, {char.goal}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">Or Create Your Own</h3>
        <form onSubmit={onCustomSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              value={customAge}
              onChange={(e) => setCustomAge(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              min="16"
              max="99"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Financial Goal</label>
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Character
          </button>
        </form>
      </div>
    </div>
  );
}