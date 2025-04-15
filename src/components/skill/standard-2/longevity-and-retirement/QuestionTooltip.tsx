import { MessageCircleQuestion } from "lucide-react";

export function QuestionTooltip({ text }) {
  return (
    <div className="group relative">
      <MessageCircleQuestion className="h-5 w-5 text-gray-400" />
      <div className="hidden group-hover:block absolute z-10 w-48 p-2 mt-1 text-sm text-white bg-gray-900 rounded-lg -right-2">
        {text}
      </div>
    </div>
  );
}
