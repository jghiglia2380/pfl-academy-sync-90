import React, { useEffect } from "react";
import Header from "./Header";
import RiskTypeSelector from "./RiskTypeSelector";
import ScenarioBuilder from "./ScenarioBuilder";
import StrategySelector from "./StrategySelector";
import ReflectionPrompt from "./ReflectionPrompt";

function RiskScenarioAnalysis({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.selectedRiskType &&
      formData.scenario &&
      formData.selectedStrategy &&
      formData.strategyExplanation &&
      formData.reflection &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
    console.log(formData);
  }, [formData]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <Header />

          <form className="space-y-8">
            <RiskTypeSelector
              riskTypes={section.riskTypes}
              selectedRiskType={formData.selectedRiskType}
              onSelect={(value) =>
                setFormData((prev) => ({ ...prev, selectedRiskType: value }))
              }
            />

            <ScenarioBuilder
              scenario={formData.scenario}
              onChange={(value) =>
                setFormData((prev) => ({ ...prev, scenario: value }))
              }
            />

            <StrategySelector
              strategies={section.strategies}
              selectedStrategy={formData.selectedStrategy}
              explanation={formData.strategyExplanation}
              onStrategySelect={(value) =>
                setFormData((prev) => ({ ...prev, selectedStrategy: value }))
              }
              onExplanationChange={(value) =>
                setFormData((prev) => ({ ...prev, strategyExplanation: value }))
              }
            />

            <ReflectionPrompt formData={formData} setFormData={setFormData} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default RiskScenarioAnalysis;
