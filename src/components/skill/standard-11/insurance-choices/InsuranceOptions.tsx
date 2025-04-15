import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Scenario } from "./Scenario";
import { Reflection } from "./Reflection";

function InsuranceOptions({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  const [showExplanations, setShowExplanations] = useState({});

  // Initialize formData if not already set
  useEffect(() => {
    if (
      formData.reflection &&
      formData.currentAnswers?.[1] &&
      formData.currentAnswers?.[2] &&
      formData.currentAnswers?.[3] &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const handleAnswer = (scenarioId: number, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      currentAnswers: {
        ...prev.currentAnswers,
        [scenarioId]: answer,
      },
    }));
  };

  const toggleExplanation = (scenarioId: number) => {
    setShowExplanations((prev) => ({
      ...prev,
      [scenarioId]: !prev[scenarioId],
    }));
  };

  const getScore = () => {
    return Object.entries(formData.currentAnswers).reduce(
      (score, [_, answer]) => {
        const scenario = section.scenarios.find(
          (s) => s.correctAnswer === answer
        );
        return score + (scenario ? 1 : 0);
      },
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <Header />

            <div className="space-y-8">
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-blue-700">
                  Carefully read each description. Consider the risks involved
                  and the type of coverage that would best protect against those
                  risks.
                </p>
              </div>

              {section.scenarios.map((scenario) => (
                <Scenario
                  key={scenario.id}
                  {...scenario}
                  currentAnswer={formData.currentAnswers[scenario.id]}
                  onAnswer={handleAnswer}
                  showExplanation={showExplanations[scenario.id]}
                  onToggleExplanation={toggleExplanation}
                />
              ))}

              <span className="text-lg flex justify-end !mt-2 font-medium text-blue-600">
                Score: {getScore()}/{section.scenarios.length}
              </span>

              <Reflection formData={formData} setFormData={setFormData} />

              <div className="mt-6 border-t pt-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">
                    Educational Tips
                  </h3>
                </div>
                <div className="mt-4 space-y-3">
                  {Object.entries(section.insuranceTypes).map(
                    ([type, description]) => (
                      <div key={type} className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900">{type}</h4>
                        <p className="text-gray-600 text-sm mt-1">
                          {description}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceOptions;
