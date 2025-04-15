import { useEffect } from "react";
import { ShoppingCartIcon } from "lucide-react";

import ComparisonTable from "./ComparisonTable";
import ScenarioSelector from "./ScenarioSelector";
import ReflectionPrompt from "./ReflectionPrompt";

function OnlineVsInStore({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      selectedFactors: prev.selectedFactors || [],
      scenario: prev.scenario || "default",
    }));
  }, []);

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCartIcon className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Online vs. In-Store Purchase Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Compare online and in-store shopping options to make informed
            purchasing decisions. Analyze factors like price, convenience, and
            delivery time to understand the trade-offs between different
            shopping methods.
          </p>
        </header>

        <main>
          <ScenarioSelector
            currentScenario={formData.scenario}
            onScenarioChange={(value) =>
              setFormData((prev) => ({ ...prev, scenario: value }))
            }
          />

          <ComparisonTable
            factors={section.factors}
            selectedFactors={formData.selectedFactors}
            onFactorSelect={(value) =>
              setFormData((prev) => ({ ...prev, selectedFactors: value }))
            }
          />

          <ReflectionPrompt formData={formData} setFormData={setFormData} />
        </main>

        <footer className="mt-4 text-center text-sm text-gray-500">
          <p className="mb-2">
            All amounts and scenarios are fictional and used for educational
            purposes only.
          </p>
          <p>
            Smart shopping involves balancing cost, convenience, and your unique
            needs. Always evaluate multiple factors before making a purchase.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default OnlineVsInStore;
