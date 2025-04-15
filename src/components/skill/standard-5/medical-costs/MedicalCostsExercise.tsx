import { useState, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { StepProgress } from "../StepProgress";
import MedicalCosts from "./MedicalCosts";
import {
  saveSkillBuilder,
  getSkillBuilder,
} from "../../../utils/supabaseHelpers";
import useUserStore from "../../../stores/user";

export function MedicalCostsExercise({ skillBuilder, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [responses, setResponses] = useState({});
  const [isFormValid, setIsFormValid] = useState(false); // New state for form validation
  const [existingData, setExistingData] = useState<any>(null);
  const [formData, setFormData] = useState({});
  const user = useUserStore((state) => state.user);

  const steps = skillBuilder.sections;
  const stepTitles = skillBuilder.sections.map((section) => section.title);

  const fetchData = async () => {
    if (!user) return;
    const response = await getSkillBuilder(user?.id, skillBuilder.id);
    if (response) {
      setExistingData(response);
      setFormData(JSON.parse(response.skillbuilder_json)); // Prefill selections if data exists
    }
  };

  useEffect(() => {
    if (user?.id && skillBuilder?.id) fetchData();
  }, [user?.id, skillBuilder?.id]);

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      // Save selections to Supabase when skill builder is completed
      const updatedData = await saveSkillBuilder(
        existingData, // Current skill builder data (can be null for a new entry)
        JSON.stringify(formData), // Convert selections to JSON
        user?.id, // User ID
        skillBuilder.id // Skill builder ID
      );

      if (updatedData) {
        setExistingData(updatedData);
        onComplete({
          completed: true,
          responses,
        });
      } else {
        console.error("Failed to save skill builder data.");
        setExistingData(null);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentStep(0);
    setResponses({});
    setIsFormValid(false);
  };

  const handleExerciseComplete = (value) => {
    setResponses((prev) => ({ ...prev, [steps[currentStep].id]: value }));

    setIsFormValid(value);
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Skill Builder Completed!
          </h3>
          <p className="text-gray-600 mb-6">
            Great job completing this skill-building activity.
          </p>
          <button
            onClick={handleRestart}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1000px] mx-auto py-8">
      <h1 className="text-2xl font-bold text-center mb-4">
        {skillBuilder.title}
      </h1>
      <p className="text-center text-gray-600 mb-6">
        {skillBuilder.description}
      </p>

      {steps.length > 1 && (
        <StepProgress
          currentStep={currentStep}
          totalSteps={skillBuilder.sections.length}
          stepTitles={stepTitles}
        />
      )}

      <div className="mb-8">
        {currentStep === 0 && (
          <MedicalCosts
            section={steps[currentStep]}
            onExerciseComplete={handleExerciseComplete}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>

      <div
        className={
          steps.length > 1 ? "flex justify-between" : "flex justify-end"
        }
      >
        {steps.length > 1 && (
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Previous Step
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {currentStep < steps.length - 1 ? "Next Step" : "Complete"}
        </button>
      </div>
    </div>
  );
}
