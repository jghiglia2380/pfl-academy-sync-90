import { useState, useEffect } from "react";
import Header from "./Header";
import LifeExpectancy from "./LifeExpectancy";
import AnnualExpenses from "./AnnualExpenses";
import InflationRate from "./InflationRate";
import RetirementSavings from "./RetirementSavings";
import PlanSummary from "./PlanSummary";
import Tips from "./Tips";

function LongevityAndRetirement({ onExerciseComplete, formData, setFormData }) {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const [calculations, setCalculations] = useState({
    futureExpenses: 0,
    totalSavingsNeeded: 0,
    yearsUntilRetirement: 0,
    yearsInRetirement: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setHasSubmitted(false);
  };

  useEffect(() => {
    if (
      formData.annualExpenses &&
      formData.inflationRate &&
      formData.lifeExpectancy &&
      formData.currentAge &&
      formData.retirementAge
    ) {
      const yearsUntilRetirement =
        parseInt(formData.retirementAge) - parseInt(formData.currentAge);
      const yearsInRetirement =
        parseInt(formData.lifeExpectancy) - parseInt(formData.retirementAge);
      const inflationRate = parseFloat(formData.inflationRate) / 100;
      const returnRate = parseFloat(formData.returnRate) / 100;

      // Calculate future expenses
      const futureExpenses =
        parseFloat(formData.annualExpenses) *
        Math.pow(1 + inflationRate, yearsUntilRetirement);

      // Calculate total savings needed using present value of annuity formula
      const totalSavingsNeeded =
        (futureExpenses * (1 - Math.pow(1 + returnRate, -yearsInRetirement))) /
        returnRate;

      setCalculations({
        futureExpenses: Math.round(futureExpenses),
        totalSavingsNeeded: Math.round(totalSavingsNeeded),
        yearsUntilRetirement,
        yearsInRetirement,
      });
    }

    if (
      formData.lifeExpectancy &&
      formData.currentAge &&
      formData.retirementAge &&
      formData.annualExpenses &&
      formData.inflationRate &&
      formData.returnRate &&
      formData.reflection &&
      formData.planSummary &&
      formData.aiResponse
    ) {
      setIsCompleted(true);
      onExerciseComplete(true);
    } else {
      setIsCompleted(false);
      onExerciseComplete(false);
    }
  }, [formData]);
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <LifeExpectancy
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <AnnualExpenses
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <InflationRate
          formData={formData}
          handleInputChange={handleInputChange}
          futureExpenses={calculations.futureExpenses}
          yearsUntilRetirement={calculations.yearsUntilRetirement}
        />
        <RetirementSavings
          formData={formData}
          handleInputChange={handleInputChange}
          calculations={calculations}
        />
        <PlanSummary formData={formData} setFormData={setFormData} />
        <Tips />
      </div>
    </div>
  );
}

export default LongevityAndRetirement;
