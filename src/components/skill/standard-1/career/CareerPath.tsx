import { useState, useEffect } from "react";
import { GoalSelector } from "./GoalSelector";
import { StepProgress } from "../StepProgress";
import { CompletionSummary } from "./CompletionSummary";
import {
  saveSkillBuilder,
  getSkillBuilder,
} from "../../../utils/supabaseHelpers";
import useUserStore from "../../../stores/user";

export function CareerPath({ skillBuilder, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<
    Record<string, Record<string, string>>
  >({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existingData, setExistingData] = useState<any>(null);

  const user = useUserStore((state) => state.user);

  const timeFrames = skillBuilder.sections.map((section) => ({
    id: section.id,
    label: section.title,
  }));

  const handleSelection = (
    sectionId: string,
    category: string,
    value: string
  ) => {
    setSelections((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [category]: value,
      },
    }));
  };

  const isStepComplete = () => {
    const section = skillBuilder.sections[currentStep];
    if (!selections[section.id]) return false;
    return Object.keys(section.categories).every(
      (category) => selections[section.id]?.[category]
    );
  };

  const fetchData = async () => {
    const response = await getSkillBuilder(user?.id, skillBuilder.id);
    if (response) {
      setExistingData(response);
      setSelections(JSON.parse(response.skillbuilder_json)); // Prefill selections if data exists
    }
  };

  useEffect(() => {
    if (user?.id && skillBuilder?.id) fetchData();
  }, [user?.id, skillBuilder?.id]);

  const handleNext = async () => {
    if (currentStep < skillBuilder.sections.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);

      // Save selections to Supabase when skill builder is completed
      setSaving(true);
      const updatedData = await saveSkillBuilder(
        existingData, // Current skill builder data (can be null for a new entry)
        JSON.stringify(selections), // Convert selections to JSON
        user?.id, // User ID
        skillBuilder.id // Skill builder ID
      );
      setSaving(false);

      if (updatedData) {
        setExistingData(updatedData);
        onComplete({
          completed: true,
          selections: updatedData.skillbuilder_json,
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
    setCurrentStep(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    return (
      <CompletionSummary
        goals={selections}
        timeFrames={timeFrames}
        categories={Object.entries(skillBuilder.sections[0].categories).map(
          ([id, cat]) => ({
            id,
            label: cat.label,
          })
        )}
        onRestart={handleRestart}
      />
    );
  }

  const steps = skillBuilder.sections;
  const currentSection = skillBuilder.sections[currentStep];
  const stepTitles = skillBuilder.sections.map((s) => s.title);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {skillBuilder.title}
        </h3>
        <p className="text-gray-600">{skillBuilder.description}</p>
      </div>

      {steps.length > 1 && (
        <StepProgress
          currentStep={currentStep}
          totalSteps={skillBuilder.sections.length}
          stepTitles={stepTitles}
        />
      )}

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          {currentSection.title}
        </h4>

        <GoalSelector
          categories={currentSection.categories}
          selectedGoals={selections[currentSection.id] || {}}
          onSelect={(category, value) =>
            handleSelection(currentSection.id, category, value)
          }
        />
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
        {/* <button
          onClick={handleNext}
          disabled={!isStepComplete()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {currentStep < skillBuilder.sections.length - 1
            ? "Next Step"
            : "Complete"}
        </button> */}
        <button
          onClick={handleNext}
          disabled={!isStepComplete() || saving}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {saving
            ? "Saving..."
            : currentStep < skillBuilder.sections.length - 1
            ? "Next Step"
            : "Complete"}
        </button>
      </div>
    </div>
  );
}
