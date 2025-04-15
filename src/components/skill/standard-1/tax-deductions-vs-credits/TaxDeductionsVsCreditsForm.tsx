import { BookOpen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { toast } from "react-toastify";
import ComparisonChart from "./ComparisonChart";
import ScenarioCalculator from "./ScenarioCalculator";
import {
  calculateDeductionBenefit,
  calculateCreditBenefit,
} from "./utils/calculations";

export default function TaxDeductionsVsCreditsForm({
  section,
  formData,
  setFormData,
  onReflectionComplete,
}) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Handle reflection input and update global formData
  const handleReflectionChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      reflection: e.target.value,
    }));

    setWordCount(e.target.value.split(/\s/).filter((w) => w !== "").length);
  };

  // Handle scenario 1 calculations and update global formData
  const handleScenario1Calculate = (inputs: Record<string, number>) => {
    const deductionBenefit = calculateDeductionBenefit(
      inputs.jobExpenses,
      inputs.income
    );
    const creditBenefit = calculateCreditBenefit(2500);

    const scenario1Results = {
      deductionBenefit,
      creditBenefit,
      betterOption: creditBenefit > deductionBenefit ? "credit" : "deduction",
      difference: Math.abs(creditBenefit - deductionBenefit),
    };

    // Update global formData
    setFormData((prevData) => ({
      ...prevData,
      scenario1: scenario1Results,
    }));

    return scenario1Results;
  };

  // Handle scenario 2 calculations and update global formData
  const handleScenario2Calculate = (inputs: Record<string, number>) => {
    const deductionBenefit = calculateDeductionBenefit(
      inputs.mortgageInterest + inputs.propertyTaxes,
      inputs.income
    );
    const creditBenefit = calculateCreditBenefit(
      inputs.childcareExpenses * 0.35
    );

    const scenario2Results = {
      deductionBenefit,
      creditBenefit,
      betterOption: creditBenefit > deductionBenefit ? "credit" : "deduction",
      difference: Math.abs(creditBenefit - deductionBenefit),
    };

    // Update global formData
    setFormData((prevData) => ({
      ...prevData,
      scenario2: scenario2Results,
    }));

    return scenario2Results;
  };

  const aiPrompt =
    "Based on what you've learned, which tax strategy—deduction or credit—do you think is more beneficial for individuals and families? Why? Provide a specific example to support your answer.";

  const handleSubmitReflection = async () => {
    if (wordCount < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(formData.reflection, aiPrompt);
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
    onReflectionComplete(true);
  };

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onReflectionComplete(true);
    } else {
      onReflectionComplete(false);
    }
  }, [formData]);

  // Handle revise action
  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Tax Deduction vs. Tax Credit Comparison Chart
          </h1>
          <p className="text-lg text-gray-600">
            Understanding the difference between tax deductions and tax credits
            is essential for maximizing tax benefits. This Skill Builder
            includes a comparison chart to highlight key differences and
            scenarios where you'll calculate and compare the impact of
            deductions versus credits.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <BookOpen className="h-6 w-6 text-blue-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Instructions
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Review the comparison chart below to understand the distinctions
                between tax deductions and tax credits. Click each category to
                expand and read more details.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <ComparisonChart categories={section.comparisonData} />

        <h2 className="text-2xl font-bold text-blue-900 mt-12 mb-6">
          Real-World Scenarios
        </h2>

        {/* Scenario 1 Calculator */}
        <ScenarioCalculator
          scenario={section.scenarios[0]}
          formData={formData}
          setFormData={setFormData}
          onCalculate={handleScenario1Calculate}
        />

        {/* Scenario 2 Calculator */}
        <ScenarioCalculator
          scenario={section.scenarios[1]}
          formData={formData}
          setFormData={setFormData}
          onCalculate={handleScenario2Calculate}
        />

        {/* Reflection Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Reflection</h2>
          <p className="text-gray-600 mb-4">
            Based on what you've learned, which tax strategy—deduction or
            credit—do you think is more beneficial for individuals and families?
            Why? Provide a specific example to support your answer.
          </p>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            value={formData.reflection || ""}
            onChange={handleReflectionChange}
            placeholder="Enter your reflection here..."
          />
          {formData.reflection && formData.aiResponse ? (
            <div>
              <div className="flex w-full mb-4">
                <button
                  onClick={handleRevise}
                  className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Revise Response
                </button>
              </div>
              {/* AI Response Box */}
              {loadingAi ? (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                  <p className="text-gray-700">Generating AI feedback...</p>
                </div>
              ) : (
                formData.aiResponse && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      AI Feedback
                    </h4>
                    <p className="text-gray-700 mt-2">{formData.aiResponse}</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <button
              onClick={handleSubmitReflection}
              disabled={loadingAi}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loadingAi ? "Generating AI response..." : "Submit Reflection"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
