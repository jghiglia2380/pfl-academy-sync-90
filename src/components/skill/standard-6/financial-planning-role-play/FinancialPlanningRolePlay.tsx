import React, { useEffect, useState } from "react";
import { LucideIcon } from "lucide-react";
import { Header } from "./Header";
import { ProgressIndicator } from "./ProgressIndicator";
import { CharacterStep } from "./CharacterStep";
import { PlanStep } from "./PlanStep";
import { ReflectionStep } from "./ReflectionStep";
import { ReviewStep } from "./ReviewStep";

type Character = {
  name: string;
  age: number;
  goal: string;
  icon: LucideIcon;
};

function FinancialPlanningRolePlay({
  section,
  onCompleteExercise,
  formData,
  setFormData,
}) {
  const [step, setStep] = useState(1);

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    if (
      formData.character &&
      formData.character.name &&
      formData.character.age &&
      formData.character.goal &&
      formData.investmentJustification &&
      formData.reflection &&
      formData.savingsJustification &&
      formData.selectedInvestment &&
      formData.selectedSavings
    ) {
      setStep(4);
    }
  }, [formData]);

  const handleCharacterSelect = (char: Character | null) => {
    setFormData((prev) => ({
      ...prev,
      character: char,
    }));
    handleNext();
  };

  const handleCustomCharacter = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customName && formData.customAge && formData.customGoal) {
      const Icon = () => null; // Placeholder icon
      setFormData((prev) => ({
        ...prev,
        character: {
          name: formData.customName,
          age: parseInt(formData.customAge),
          goal: formData.customGoal,
          icon: Icon,
        },
      }));
      handleNext();
    }
  };

  const handleFinancialPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.selectedSavings &&
      formData.selectedInvestment &&
      formData.savingsJustification &&
      formData.investmentJustification
    ) {
      handleNext();
    }
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.reflection) {
      handleNext();
    }
  };

  const handleReset = () => {
    setStep(1);
    setFormData({
      character: null,
      customName: "",
      customAge: "",
      customGoal: "",
      selectedSavings: "",
      selectedInvestment: "",
      savingsJustification: "",
      investmentJustification: "",
      reflection: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <Header />
          <div className="mb-8">
            <ProgressIndicator currentStep={step} />
          </div>

          {step === 1 && (
            <CharacterStep
              onCharacterSelect={handleCharacterSelect}
              customName={formData.customName}
              setCustomName={(val) =>
                setFormData((prev) => ({ ...prev, customName: val }))
              }
              customAge={formData.customAge}
              setCustomAge={(val) =>
                setFormData((prev) => ({ ...prev, customAge: val }))
              }
              customGoal={formData.customGoal}
              setCustomGoal={(val) =>
                setFormData((prev) => ({ ...prev, customGoal: val }))
              }
              onCustomSubmit={handleCustomCharacter}
            />
          )}

          {step === 2 && (
            <>
              <button
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
              >
                ← Back
              </button>
              <PlanStep
                selectedSavings={formData.selectedSavings}
                setSelectedSavings={(val) =>
                  setFormData((prev) => ({ ...prev, selectedSavings: val }))
                }
                selectedInvestment={formData.selectedInvestment}
                setSelectedInvestment={(val) =>
                  setFormData((prev) => ({ ...prev, selectedInvestment: val }))
                }
                savingsJustification={formData.savingsJustification}
                setSavingsJustification={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    savingsJustification: val,
                  }))
                }
                investmentJustification={formData.investmentJustification}
                setInvestmentJustification={(val) =>
                  setFormData((prev) => ({
                    ...prev,
                    investmentJustification: val,
                  }))
                }
                onSubmit={handleFinancialPlanSubmit}
              />
            </>
          )}

          {step === 3 && (
            <>
              <button
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
              >
                ← Back
              </button>
              <ReflectionStep
                reflection={formData.reflection}
                setReflection={(val) =>
                  setFormData((prev) => ({ ...prev, reflection: val }))
                }
                onSubmit={handleReflectionSubmit}
              />
            </>
          )}

          {step === 4 && formData.character && (
            <>
              <button
                onClick={handleBack}
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
              >
                ← Back
              </button>
              <ReviewStep
                character={formData.character}
                selectedSavings={formData.selectedSavings}
                savingsJustification={formData.savingsJustification}
                selectedInvestment={formData.selectedInvestment}
                investmentJustification={formData.investmentJustification}
                reflection={formData.reflection}
                onReset={handleReset}
                onCompleteExercise={() => onCompleteExercise(true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinancialPlanningRolePlay;
