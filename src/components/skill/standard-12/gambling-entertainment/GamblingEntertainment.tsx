import { useEffect, useState } from "react";
import { Header } from "./Header";
import { EducationalTips } from "./EducationalTips";
import { GamblingTypeInput } from "./GamblingTypeInput";
import { Analysis } from "./Analysis";
import { Reflection } from "./Reflection";

function GamblingEntertainment({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    if (
      formData.reflection &&
      formData.analysis &&
      formData.aiResponse &&
      formData.aiAnalysisResponse &&
      (formData.gamblingTypes?.[0]?.type ||
        formData.gamblingTypes?.[1]?.type ||
        formData.gamblingTypes?.[2]?.type)
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        {/* Step 1: Identify Types */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Step 1: Identify Types of Gambling
          </h2>
          <p className="text-gray-600 mb-4">
            Think about different types of gambling or games of chance that you
            are familiar with. Add at least three types to the chart below.
          </p>
          <GamblingTypeInput
            types={formData.gamblingTypes}
            onChange={(types) =>
              setFormData((prev) => ({ ...prev, gamblingTypes: types }))
            }
          />
        </section>

        {/* Step 2: Analysis */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Step 2: Write Your Analysis
          </h2>
          <Analysis formData={formData} setFormData={setFormData} />
        </section>

        {/* Step 3: Reflection */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Step 3: Final Reflection
          </h2>
          <Reflection formData={formData} setFormData={setFormData} />
        </section>
        {/* Educational Tips */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <EducationalTips
            isOpen={showTips}
            onToggle={() =>
              setShowTips((prev) => {
                return !prev;
              })
            }
          />
        </section>
      </div>
    </div>
  );
}

export default GamblingEntertainment;
