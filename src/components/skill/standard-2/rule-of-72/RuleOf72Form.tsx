import React, { useEffect } from "react";
import { Header } from "./Header";
import { InvestmentCalculator } from "./InvestmentCalculator";
import { RuleOf72 } from "./RuleOf72";

export default function RuleOf72Form({ formData, setFormData }) {
  const defaultValues = {
    initialInvestment: 500,
    monthlyContribution: 50,
    annualInterest: 5,
    timeHorizon: 10,
    totalWithoutInterest: 0,
    totalWithInterest: 0,
    interestGained: 0,
  };

  const data = { ...defaultValues, ...formData };

  const calculateResults = () => {
    // Calculate total without interest
    const withoutInterest =
      data.initialInvestment + data.monthlyContribution * 12 * data.timeHorizon;

    // Calculate total with compound interest
    const monthlyRate = data.annualInterest / 100 / 12;
    let total = data.initialInvestment;

    for (let i = 0; i < data.timeHorizon * 12; i++) {
      total += data.monthlyContribution;
      total *= 1 + monthlyRate;
    }

    setFormData((prev) => ({
      ...prev,
      totalWithoutInterest: withoutInterest,
      totalWithInterest: total,
      interestGained: total - withoutInterest,
    }));
  };

  useEffect(() => {
    calculateResults();
  }, [
    data.initialInvestment,
    data.monthlyContribution,
    data.annualInterest,
    data.timeHorizon,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? 0 : parseFloat(value),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Header
          title="Investment Growth & Rule of 72 Analysis"
          description="Complete the tables below to calculate the growth of an investment over time and analyze how different interest rates affect the doubling time of your savings."
        />
        <InvestmentCalculator
          values={data}
          onChange={handleInputChange}
          results={{
            totalWithoutInterest: data.totalWithoutInterest,
            totalWithInterest: data.totalWithInterest,
            interestGained: data.interestGained,
          }}
        />
        <RuleOf72 formData={data} setFormData={setFormData} />
      </div>
    </div>
  );
}
