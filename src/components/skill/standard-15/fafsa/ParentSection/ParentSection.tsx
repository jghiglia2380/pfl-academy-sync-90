import ScenarioSelector from "./ScenarioSelector";
import ParentDefinition from "./ParentDefinition";
import ParentInfoNeeded from "./ParentInfoNeeded";
import TaxReturnInfo from "./TaxReturnInfo";
import IncomeQuestions from "./IncomeQuestions";
import BenefitsSection from "./BenefitsSection";
import FinancialItems from "./FinancialItems";
import NotesSection from "./NotesSection";

const ParentSection = ({ scenarios, formData, setFormData }) => {
  const handleScenarioSelect = (scenario) => {
    setFormData((prev) => ({
      ...prev,
      selectedScenario: scenario,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ScenarioSelector
        scenarios={scenarios}
        onSelect={handleScenarioSelect}
        selectedScenario={formData.selectedScenario?.id}
      />
      {formData.selectedScenario && (
        <div className="bg-white max-w-4xl mx-auto mb-8 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-purple-900 mb-4">
            Selected Scenario: {formData.selectedScenario.title}
          </h2>
          <div className="prose max-w-none">
            <h3>Parent Information</h3>
            <h4>Parent 1</h4>
            <ul>
              <li>Name: {formData.selectedScenario.parent1.name}</li>
              <li>SSN: {formData.selectedScenario.parent1.ssn}</li>
              <li>
                Date of Birth: {formData.selectedScenario.parent1.dateOfBirth}
              </li>
              <li>
                Dislocated Worker:{" "}
                {formData.selectedScenario.parent1.isDislocatedWorker
                  ? "Yes"
                  : "No"}
              </li>
            </ul>

            {formData.selectedScenario.parent2 && (
              <>
                <h4>Parent 2</h4>
                <ul>
                  <li>Name: {formData.selectedScenario.parent2.name}</li>
                  <li>SSN: {formData.selectedScenario.parent2.ssn}</li>
                  <li>
                    Date of Birth:{" "}
                    {formData.selectedScenario.parent2.dateOfBirth}
                  </li>
                  <li>
                    Dislocated Worker:{" "}
                    {formData.selectedScenario.parent2.isDislocatedWorker
                      ? "Yes"
                      : "No"}
                  </li>
                </ul>
              </>
            )}

            <h3>Financial Information</h3>
            <ul>
              <li>
                Adjusted Gross Income: $
                {formData.selectedScenario.adjustedGrossIncome.toLocaleString()}
              </li>
              <li>
                Parent 1 Income from Working: $
                {formData.selectedScenario.parent1.incomeFromWorking.toLocaleString()}
              </li>
              {formData.selectedScenario.parent2 && (
                <li>
                  Parent 2 Income from Working: $
                  {formData.selectedScenario.parent2.incomeFromWorking.toLocaleString()}
                </li>
              )}
            </ul>

            {formData.selectedScenario.benefits.length > 0 && (
              <>
                <h3>Benefits Received</h3>
                <ul>
                  {formData.selectedScenario.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </>
            )}

            {formData.selectedScenario.additionalFinancialInfo.length > 0 && (
              <>
                <h3>Additional Financial Information</h3>
                <ul>
                  {formData.selectedScenario.additionalFinancialInfo.map(
                    (item, index) => (
                      <li key={index}>
                        {item.type}: ${item.amount.toLocaleString()}
                      </li>
                    )
                  )}
                </ul>
              </>
            )}

            {formData.selectedScenario.untaxedIncome.length > 0 && (
              <>
                <h3>Untaxed Income</h3>
                <ul>
                  {formData.selectedScenario.untaxedIncome.map(
                    (item, index) => (
                      <li key={index}>
                        {item.type}: ${item.amount.toLocaleString()}
                      </li>
                    )
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
      <div className="bg-purple-200 p-3 mb-4">
        <h2 className="text-xl font-bold text-purple-900">
          SECTION 3 - PARENT INFORMATION
        </h2>
      </div>

      <div className="space-y-4">
        <ParentDefinition />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ParentInfoNeeded
            parent={1}
            formData={formData}
            setFormData={setFormData}
          />
          <ParentInfoNeeded
            parent={2}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
        <TaxReturnInfo formData={formData} setFormData={setFormData} />
        <IncomeQuestions formData={formData} setFormData={setFormData} />
        <BenefitsSection formData={formData} setFormData={setFormData} />
        <FinancialItems />

        <NotesSection formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
};

export default ParentSection;
