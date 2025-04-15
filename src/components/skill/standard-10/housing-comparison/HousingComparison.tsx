import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Header from "./Header";
import ComparisonTable from "./ComparisonTable";
import ReflectionSection from "./ReflectionSection";

function HousingComparison({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  const handlePriorityChange = (index, value) => {
    setFormData((prev) => {
      const newPriorities = [...prev.priorities];
      newPriorities[index] = value;
      return { ...prev, priorities: newPriorities };
    });
  };

  const [showTableHints, setShowTableHints] = useState(false);

  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      formData.priorities.filter((p) => p).length > 0 &&
      formData.housingData.apartment.pro &&
      formData.housingData.apartment.con &&
      formData.housingData.condo.pro &&
      formData.housingData.condo.con &&
      formData.housingData.house.pro &&
      formData.housingData.house.con
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const handleHousingDataChange = (type, field, value) => {
    setFormData((prev) => ({
      ...prev,
      housingData: {
        ...prev.housingData,
        [type]: {
          ...prev.housingData[type],
          [field]: value,
        },
      },
    }));
  };

  const priorityData = formData.priorities
    .filter((p) => p)
    .map((priority, index) => ({
      name: priority,
      value: 3 - index,
    }));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header />
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Step 1: Choose Your Top Three Priorities
          </h2>
          <div className="space-y-4 mb-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="flex items-center">
                <label className="w-32 text-sm font-medium text-gray-700">
                  Priority {index + 1}:
                </label>
                <input
                  type="text"
                  value={formData.priorities[index]}
                  onChange={(e) => handlePriorityChange(index, e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your priority"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Step 2: Compare Housing Options
          </h2>
          <ComparisonTable
            housingData={formData.housingData}
            onDataChange={handleHousingDataChange}
            showHints={showTableHints}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setShowTableHints(!showTableHints)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              {showTableHints ? "Hide Table Hints" : "Show Table Hints"}
            </button>
          </div>
        </div>
        {formData.priorities.filter((p) => p).length > 0 && (
          <div className="bg-white shadow rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Priority Ranking
            </h2>
            <BarChart
              width={600}
              height={200}
              data={priorityData}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 3]} />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </div>
        )}
        <ReflectionSection formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

export default HousingComparison;
