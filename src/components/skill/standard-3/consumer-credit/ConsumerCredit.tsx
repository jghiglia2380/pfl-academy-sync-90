import { useEffect, useState } from "react";

import CreditLawsTable from "./CreditLawsTable";
import ReflectionPrompt from "./ReflectionPrompt";
import Quiz from "./Quiz";
import ComparisonTool from "./ComparisonTool";

function ConsumerCredit({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.reflections?.question1 &&
      formData.reflections?.question2 &&
      formData.aiFeedback?.question1 &&
      formData.aiFeedback?.question2 &&
      formData.quizAnswers?.[1] &&
      formData.quizAnswers?.[2] &&
      formData.selectedLaws?.length === 2
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-indigo-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L2 7V9H22V7L12 2Z" fill="currentColor" />
                <path
                  d="M4 11V19H20V11"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M12 8V16M8 12H16"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path d="M2 20H22V22H2V20Z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Understanding Consumer Credit Laws
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn about key consumer protection laws, their purposes, and how
              they safeguard your rights in financial transactions. Master the
              essentials of credit regulations through interactive exercises.
            </p>
          </div>
          <CreditLawsTable creditLaws={section.creditLaws} />
          <ReflectionPrompt formData={formData} setFormData={setFormData} />
          <Quiz
            questions={section.questions}
            formData={formData}
            setFormData={setFormData}
          />
          <ComparisonTool
            laws={section.laws}
            formData={formData}
            setFormData={setFormData}
          />
          <footer className="mt-12 text-sm text-gray-500">
            <p className="mb-2">
              The information provided is for educational purposes and reflects
              current federal regulations. State laws may vary.
            </p>
            <p>
              Knowing your rights is the first step toward financial
              empowerment. Always stay informed about changes in credit laws.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default ConsumerCredit;
