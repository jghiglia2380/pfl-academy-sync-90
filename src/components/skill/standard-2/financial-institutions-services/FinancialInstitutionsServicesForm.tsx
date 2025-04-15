import Header from "./Header";
import QuestionCard from "./QuestionCard";
import ScenarioCard from ".//ScenarioCard";
import { useEffect } from "react";

export default function FinancialInstitutionsServicesForm({
  section,
  formData,
  setFormData,
  onExerciseComplete,
}) {
  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      formData["financial-institutions"].answers?.length > 0 &&
      formData["non-cash"]?.answers &&
      formData["online-banking"].answers?.length > 0 &&
      formData["payment-methods"].answers?.length > 0
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Comprehension Questions
            </h2>
            {section.questionsData.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                formData={formData}
                setFormData={setFormData}
              />
            ))}
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Scenario Analysis
            </h2>
            <ScenarioCard
              scenario={section.scenarioData}
              formData={formData}
              setFormData={setFormData}
            />
          </section>
        </div>
      </div>
    </div>
  );
}
