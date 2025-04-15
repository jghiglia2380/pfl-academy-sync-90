import { Eye } from "lucide-react";

interface ShowAnswersButtonProps {
  onClick: () => void;
}

export function ShowAnswersButton({ onClick }: ShowAnswersButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Eye className="mr-2 h-4 w-4" />
      Show Possible Answers
    </button>
  );
}
