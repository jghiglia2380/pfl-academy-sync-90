import { useState } from "react";
import { Shield, ChevronDown, ChevronUp } from "lucide-react";

export function KeyTakeaways() {
  const [showTakeaways, setShowTakeaways] = useState(false);

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-8">
      <button
        className="flex items-center justify-between w-full text-left"
        onClick={() => setShowTakeaways(!showTakeaways)}
      >
        <h2 className="text-xl font-semibold">Key Takeaways</h2>
        {showTakeaways ? (
          <ChevronUp className="w-5 h-5 transition-transform" />
        ) : (
          <ChevronDown className="w-5 h-5 transition-transform" />
        )}
      </button>
      {showTakeaways && (
        <div className="mt-4 space-y-2">
          <p className="flex items-center text-gray-700">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            Check the sender's email address carefully
          </p>
          <p className="flex items-center text-gray-700">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            Avoid clicking on links or attachments from unknown sources
          </p>
          <p className="flex items-center text-gray-700">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            If in doubt, contact the company directly using verified contact
            information
          </p>
          <p className="flex items-center text-gray-700">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            Report phishing attempts to help protect others
          </p>
        </div>
      )}
    </section>
  );
}
