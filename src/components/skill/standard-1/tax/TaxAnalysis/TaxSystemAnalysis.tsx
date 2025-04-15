import ScenarioList from "./ScenarioList";
import TaxSystemHeader from "./TaxSystemHeader";
import { useTaxAnalysis } from "../hooks/useTaxAnalysis";

const TaxSystemAnalysis = ({ section, formData, setFormData }) => {
  const { analyses, handleSystemSelect, handleJustificationChange } =
    useTaxAnalysis(section.scenario, formData, setFormData);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <TaxSystemHeader />
        <ScenarioList
          scenarios={section.scenario}
          analyses={analyses}
          onSystemSelect={handleSystemSelect}
          onJustificationChange={handleJustificationChange}
        />
      </div>
    </div>
  );
};

export default TaxSystemAnalysis;
