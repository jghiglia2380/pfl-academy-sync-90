import { useEffect, useRef } from "react";
import Quiz from "./Quiz";
import Results from "./Results";
import MatchingActivity from "./MatchingActivity";
import ReflectionForm from "./ReflectionForm";
import Header from "./Header";

function RiskToleranceAssessmentForm({
  section,
  formData,
  setFormData,
  onExerciseComplete,
}) {
  const headerRef = useRef(null);

  useEffect(() => {
    if (
      formData.showResults &&
      formData.quizScore &&
      formData.showMatchingFeedback &&
      formData.reflection &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  useEffect(() => {
    if (formData.showResults && headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [formData.showResults]);

  const handleQuizComplete = (score) => {
    setFormData((prev) => ({
      ...prev,
      quizScore: score,
      showResults: true,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4" ref={headerRef}>
        <Header />

        {!formData.showResults ? (
          <Quiz questions={section.questions} onComplete={handleQuizComplete} />
        ) : (
          <>
            <Results
              score={formData.quizScore}
              formData={formData}
              setFormData={setFormData}
            />
            <MatchingActivity
              investments={section.investments}
              formData={formData}
              setFormData={setFormData}
            />
            <ReflectionForm formData={formData} setFormData={setFormData} />
          </>
        )}
      </div>
    </div>
  );
}

export default RiskToleranceAssessmentForm;
