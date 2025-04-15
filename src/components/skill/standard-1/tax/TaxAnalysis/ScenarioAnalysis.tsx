import React from "react";
import ScenarioDetails from "./ScenarioDetails";
import TaxSystemSelector from "./TaxSystemSelector";
import JustificationInput from "./JustificationInput";

interface ScenarioAnalysisProps {
  scenario: any;
  index: number;
  analysis: any;
  onSystemSelect: (
    scenarioId: string,
    system: "progressive" | "regressive"
  ) => void;
  onJustificationChange: (scenarioId: string, text: string) => void;
}

const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({
  scenario,
  index,
  analysis,
  onSystemSelect,
  onJustificationChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <ScenarioDetails scenario={scenario} index={index} />
      <div className="space-y-6 mt-6">
        <TaxSystemSelector
          selectedSystem={analysis.selectedSystem}
          onSelect={(system) => onSystemSelect(scenario.id, system)}
        />
        <JustificationInput
          value={analysis.justification}
          onChange={(text) => onJustificationChange(scenario.id, text)}
          isValid={analysis.justification.split(".").length >= 2}
        />
      </div>
    </div>
  );
};

export default ScenarioAnalysis;
