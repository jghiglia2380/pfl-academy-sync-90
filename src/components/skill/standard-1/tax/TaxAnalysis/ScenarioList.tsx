import React from "react";
import ScenarioAnalysis from "./ScenarioAnalysis";

interface ScenarioListProps {
  scenarios: any;
  analyses: any;
  onSystemSelect: (
    scenarioId: string,
    system: "progressive" | "regressive"
  ) => void;
  onJustificationChange: (scenarioId: string, text: string) => void;
}

const ScenarioList: React.FC<ScenarioListProps> = ({
  scenarios,
  analyses,
  onSystemSelect,
  onJustificationChange,
}) => {
  return (
    <div className="space-y-8">
      {scenarios.map((scenario, index) => (
        <ScenarioAnalysis
          key={scenario.id}
          scenario={scenario}
          index={index}
          analysis={analyses.find((a) => a.id === scenario.id)!}
          onSystemSelect={onSystemSelect}
          onJustificationChange={onJustificationChange}
        />
      ))}
    </div>
  );
};

export default ScenarioList;
