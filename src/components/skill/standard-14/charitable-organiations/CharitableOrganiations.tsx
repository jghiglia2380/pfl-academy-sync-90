import { useState, useEffect } from "react";

import Header from "./Header";
import CharityForm from "./CharityForm";
import ScenarioAnalysis from "./ScenarioAnalysis";
import ActionPlan from "./ActionPlan";
import Reflection from "./Reflection";
import EvaluationTips from "./EvaluationTips";

function CharitableOrganiations({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    if (
      formData.reflection &&
      formData.aiResponse &&
      formData.analysis &&
      formData.aiAnalysisResponse &&
      formData.successMetrics !== "" &&
      formData.organization !== "" &&
      formData.mission !== "" &&
      formData.fundPercentage !== "" &&
      formData.actions[0] !== "" &&
      formData.actions[1] !== "" &&
      formData.actions[2] !== ""
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />

        <div className="space-y-8">
          <CharityForm formData={formData} setFormData={setFormData} />
          <ScenarioAnalysis formData={formData} setFormData={setFormData} />
          <ActionPlan formData={formData} setFormData={setFormData} />
          <Reflection formData={formData} setFormData={setFormData} />

          <EvaluationTips />
        </div>
      </div>
    </div>
  );
}

export default CharitableOrganiations;
