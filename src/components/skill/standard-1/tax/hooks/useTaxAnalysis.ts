export const useTaxAnalysis = (TAX_SCENARIOS, formData, setFormData) => {
  // Ensure formData.analyses exists, or initialize it
  if (!formData.analyses) {
    setFormData({
      ...formData,
      analyses: TAX_SCENARIOS.map((scenario) => ({
        id: scenario.id,
        selectedSystem: null,
        justification: "",
      })),
    });
  }

  const handleSystemSelect = (scenarioId, system) => {
    setFormData((prev) => ({
      ...prev,
      analyses: prev.analyses.map((analysis) =>
        analysis.id === scenarioId
          ? { ...analysis, selectedSystem: system }
          : analysis
      ),
    }));
  };

  const handleJustificationChange = (scenarioId, text) => {
    setFormData((prev) => ({
      ...prev,
      analyses: prev.analyses.map((analysis) =>
        analysis.id === scenarioId
          ? { ...analysis, justification: text }
          : analysis
      ),
    }));
  };

  return {
    analyses: formData.analyses || [],
    handleSystemSelect,
    handleJustificationChange,
  };
};
