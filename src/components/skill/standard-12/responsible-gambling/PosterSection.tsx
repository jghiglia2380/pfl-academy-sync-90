import { useState } from "react";

const PosterSection = ({ formData, setFormData }) => {
  const [showHints, setShowHints] = useState(false);

  const hints = {
    signs: [
      "Hiding gambling activity",
      "Borrowing money to gamble",
      "Chasing losses",
    ],
    tips: [
      "Talk openly about gambling habits",
      "Observe changes in behavior",
      "Note increased financial problems",
    ],
    resources: [
      "Local counseling centers",
      "National Problem Gambling Helpline",
      "Community programs and financial advisors",
    ],
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      posterSection: {
        ...prev.posterSection,
        [field]: value,
      },
    }));
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Step 4: Poster Activity—Identifying Problem Gambling
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Your Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                Common Signs to Look For
              </td>
              <td className="px-6 py-4">
                <textarea
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Write your observations here..."
                  value={formData.posterSection?.signs || ""}
                  onChange={(e) => handleChange("signs", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                Tips for Recognizing These Signs
              </td>
              <td className="px-6 py-4">
                <textarea
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  rows={3}
                  placeholder="Write your tips here..."
                  value={formData.posterSection?.tips || ""}
                  onChange={(e) => handleChange("tips", e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                Resources for Help
              </td>
              <td className="px-6 py-4">
                <textarea
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  rows={3}
                  placeholder="List helpful resources here..."
                  value={formData.posterSection?.resources || ""}
                  onChange={(e) => handleChange("resources", e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={() => setShowHints(!showHints)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
        >
          {showHints ? "Hide" : "Show"} Hints
        </button>

        {showHints && (
          <div className="mt-4 text-sm text-gray-600 text-left">
            <h3 className="font-medium mb-2">Example Signs:</h3>
            <ul className="list-disc pl-5 mb-3">
              {hints.signs.map((hint, index) => (
                <li key={`sign-${index}`}>{hint}</li>
              ))}
            </ul>

            <h3 className="font-medium mb-2">Example Tips:</h3>
            <ul className="list-disc pl-5 mb-3">
              {hints.tips.map((hint, index) => (
                <li key={`tip-${index}`}>{hint}</li>
              ))}
            </ul>

            <h3 className="font-medium mb-2">Example Resources:</h3>
            <ul className="list-disc pl-5">
              {hints.resources.map((hint, index) => (
                <li key={`resource-${index}`}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default PosterSection;
