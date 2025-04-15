import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { Header } from "./Header";
import { InvestmentTable } from "./InvestmentTable";
import { ReflectionSection } from "./ReflectionSection";
import { ShowAnswersButton } from "./ShowAnswersButton";

function RiskReturnAnalysis({ section, formData, setFormData }) {
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      investments: section.initialInvestments,
      reflection: prev.reflection || "",
    }));
  }, [section.initialInvestments, setFormData]);

  const handleInputChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      investments: prev.investments.map((inv) =>
        inv.id === id ? { ...inv, [field]: value } : inv
      ),
    }));
  };

  const handleReflectionChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      reflection: value,
    }));
  };

  const handleComplete = async () => {
    setFormData((prev) => ({
      ...prev,
      completed: true,
    }));
  };

  return (
    <div className="min-h-screen h-auto bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <Header />

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Investment Options
              </h2>
              <InvestmentTable
                investments={formData.investments || []}
                onInputChange={handleInputChange}
                formData={formData}
                setFormData={setFormData}
              />
              <div className="mt-2 w-full">
                <ShowAnswersButton
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      showAnswers: !prev.showAnswers,
                    }))
                  }
                />
              </div>
              {formData.showAnswers && (
                <div className="mt-8">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                      <AlertCircle className="h-5 w-5 text-green-400" />
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">
                          Answer Key
                        </h3>
                        <div className="mt-2 text-sm text-green-700">
                          {formData.investments?.map((investment) => (
                            <div key={investment.id} className="mb-4">
                              <p className="font-medium">{investment.option}</p>
                              <p>Risks: {investment.actualRisk}</p>
                              <p>Returns: {investment.actualReturn}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <ReflectionSection formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RiskReturnAnalysis;
