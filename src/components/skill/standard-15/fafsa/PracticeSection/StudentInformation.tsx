import { ScenarioCard } from "./ScenarioCard";
import { ScenarioDetails } from "./ScenarioDetails";

interface StudentInformationProps {
  formData: any;
  setFormData: (data: any) => void;
  scenarios: any[];
}

export function StudentInformation({
  formData,
  setFormData,
  scenarios,
}: StudentInformationProps) {
  const handleRandomScenario = () => {
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    setFormData((prev) => ({
      ...prev,
      practiceSelectedScenario: scenarios[randomIndex].id,
    }));
  };

  const handleCheckboxChange = (section: string, key: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: !prev[section]?.[key], // Toggle checkbox
      },
    }));
  };

  const handleTaxReturnChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      practiceTaxReturnStatus: value,
    }));
  };

  const getPreviousTaxYear = () => new Date().getFullYear() - 1;

  const financialItemsMapping = {
    "American Opportunity Tax Credit or Lifetime Learning Tax Credit":
      "taxCredit",
    "Child support paid": "childSupportPaid",
    "Taxable earnings from work-study, assistantships or fellowships":
      "workStudy",
    "Taxable college grant and scholarship aid reported to the IRS as income":
      "scholarshipAid",
    "Combat pay or special combat pay": "combatPay",
    "Cooperative education program earnings": "coopEarnings",
  };

  const untaxedIncomeMapping = {
    "Payments to tax-deferred pension and retirement savings plans":
      "pensionSavings",
    "Child support received": "childSupportReceived",
    "IRA deductions and payments to self-employed SEP, SIMPLE and Keogh":
      "iraDeductions",
    "Tax exempt interest income": "taxExemptInterest",
    "Untaxed portions of IRA distributions and pensions": "untaxedIRA",
    "Housing, food and other living allowances paid to members of the military, clergy and others":
      "housingAllowance",
    "Veterans noneducation benefits": "veteransBenefits",
    "Other income not reported, such as workers' compensation, disability benefits, or untaxed foreign income not earned from work":
      "otherUntaxedIncome",
    "Money received or paid on your behalf": "moneyReceived",
  };

  const benefitsMapping = {
    Medicaid: "medicaid",
    "Free or Reduced Price School Lunch": "schoolLunch",
    "Supplemental Security Income (SSI)": "ssi",
    "Temporary Assistance for Needy Families (TANF)": "tanf",
    "Supplemental Nutrition Assistance Program (SNAP)": "snap",
    "Special Supplemental Nutrition Program for Women, Infants, and Children (WIC)":
      "wic",
  };

  return (
    <div className="max-w-[1000px] mx-auto border border-black font-sans">
      <div className="bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-purple-800 mb-4">
            FAFSA Practice Scenarios
          </h1>

          <button
            onClick={handleRandomScenario}
            className="mb-6 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Get Random Scenario
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((scenario) => (
              <ScenarioCard
                key={scenario.id}
                title={scenario.title}
                description={scenario.description}
                isSelected={formData.practiceSelectedScenario === scenario.id}
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    practiceSelectedScenario: scenario.id,
                  }))
                }
              />
            ))}
          </div>

          {formData.practiceSelectedScenario && (
            <ScenarioDetails
              data={
                scenarios.find(
                  (s) => s.id === formData.practiceSelectedScenario
                )?.data
              }
            />
          )}
        </div>
      </div>

      <div className="bg-gray-300 p-2 font-bold text-base">
        SECTION 4 - STUDENT INFORMATION
      </div>

      <div className="flex border border-black my-4">
        <div className="flex-1 p-4 border-r border-black">
          <h3 className="font-bold text-sm mb-2">Did you know?</h3>
          <p className="text-sm">
            If you file a federal tax return, you may be able to use the IRS
            Data Retrieval Tool. This tool enables you to easily, accurately,
            and securely transfer your tax information into the FAFSA form.
          </p>
        </div>
        <div className="flex-1 p-4">
          <h3 className="font-bold text-sm mb-2">
            Did you file or will you file a {getPreviousTaxYear()} income tax
            return?
          </h3>
          <div className="flex flex-col gap-2">
            {["completed", "will-file", "not-filing"].map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="taxReturnStatus"
                  value={status}
                  checked={formData.practiceTaxReturnStatus === status}
                  onChange={() => handleTaxReturnChange(status)}
                />
                {status === "completed"
                  ? "I have already completed my tax return"
                  : status === "will-file"
                  ? "I will file, but I have not completed my tax return"
                  : "I'm not going to file an income tax return"}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Adjusted Gross Income */}
      <div className="p-4 border border-black">
        <h3 className="font-bold text-sm mb-2">
          What was your (and spouse's) adjusted gross income for{" "}
          {getPreviousTaxYear()}?
        </h3>
        <p className="text-xs mb-2">
          Skip this question if you or your spouse did not file taxes. Adjusted
          gross income is on IRS Form 1040—line 11.
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold">$</span>
          <input
            type="text"
            className="border border-black w-32 p-1 text-right"
            value={formData.practiceAdjustedGrossIncome || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                practiceAdjustedGrossIncome: e.target.value,
              }))
            }
          />
        </div>
      </div>

      {/* Earnings and Work Status */}
      <div className="p-4 border border-black">
        <p className="text-sm mb-4">
          The following questions ask about earnings (wages, salaries, tips,
          etc.) in {getPreviousTaxYear()}. Answer the questions whether or not a
          tax return was filed. This information may be found on the W-2 forms
          or by adding up the following items: IRS Form 1040—line 1 (or IRS Form
          1040-NR—line 1a) + Schedule 1—lines 3 + 6 + Schedule K-1 (IRS Form
          1065)—Box 14 (Code A).
        </p>
        <h3 className="font-bold text-sm mb-2">
          How much did you earn from working in {getPreviousTaxYear()}?
        </h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.practiceIsDislocatedWorker || false}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                practiceIsDislocatedWorker: !prev.practiceIsDislocatedWorker,
              }))
            }
          />
          Check here if you are a dislocated worker
        </label>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">$</span>
          <input
            type="text"
            className="border border-black w-32 p-1 text-right"
            value={formData.practiceStudentIncome || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                practiceStudentIncome: e.target.value,
              }))
            }
          />
        </div>

        <h3 className="font-bold text-sm mb-2 mt-4">
          How much did your spouse earn from working in {getPreviousTaxYear()}?
        </h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.practiceIsSpouseDislocatedWorker || false}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                practiceIsSpouseDislocatedWorker:
                  !prev.practiceIsSpouseDislocatedWorker,
              }))
            }
          />
          Check here if your spouse is a dislocated worker
        </label>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold">$</span>
          <input
            type="text"
            className="border border-black w-32 p-1 text-right"
            value={formData.practiceSpouseIncome || ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                practiceSpouseIncome: e.target.value,
              }))
            }
          />
        </div>
      </div>

      <div className="p-4 border border-black">
        <h3 className="font-bold text-sm mb-2">
          In {getPreviousTaxYear()} or {new Date().getFullYear()}, did anyone in
          your household receive: (Check all that apply.)
        </h3>
        <div className="grid grid-cols-1 gap-2 my-4 md:grid-cols-2">
          {Object.entries(benefitsMapping).map(([label, key]) => (
            <label
              key={key}
              className="grid grid-cols-[20px,1fr] items-center gap-2"
            >
              <input
                type="checkbox"
                checked={formData.practiceBenefits?.[key] || false}
                onChange={() => handleCheckboxChange("practiceBenefits", key)}
              />
              {label}
            </label>
          ))}
        </div>
        <p className="text-xs italic">
          Note: TANF may have a different name in your state. Call
          1-800-433-3243 to find out the name of the state's program.
        </p>
      </div>

      <div className="p-4 border border-black">
        <h3 className="font-bold text-sm mb-2">
          Did you or your spouse have any of the following items in{" "}
          {getPreviousTaxYear()}?
        </h3>
        <p className="text-xs mb-4">
          Check all that apply. Once online, you may be asked to report amounts
          paid or received.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="font-bold text-sm mb-2">
              Additional Financial Information
            </h4>
            <div>
              {Object.entries(financialItemsMapping).map(([label, key]) => (
                <label
                  key={key}
                  className="grid grid-cols-[20px,1fr] items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={formData.practiceFinancialItems?.[key] || false}
                    onChange={() =>
                      handleCheckboxChange("practiceFinancialItems", key)
                    }
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm mb-2">Untaxed Income</h4>
            {Object.entries(untaxedIncomeMapping).map(([label, key]) => (
              <label
                key={key}
                className="grid grid-cols-[20px,1fr] items-center gap-2"
              >
                <input
                  type="checkbox"
                  checked={formData.practiceUntaxedIncome?.[key] || false}
                  onChange={() =>
                    handleCheckboxChange("practiceUntaxedIncome", key)
                  }
                />
                {label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-300 p-4 text-xs">
        <p>
          You may be asked to provide more information about your (and your
          spouse's) assets.
        </p>
        <p>
          You may need to report the net worth of current businesses and/or
          investment farms.
        </p>
      </div>
      <div className="p-4 border border-black">
        <h3 className="font-bold text-sm mb-2">NOTES:</h3>
        <textarea
          rows={6}
          className="w-full border border-black mt-2"
          value={formData.practiceNotes || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, practiceNotes: e.target.value }))
          }
        />
      </div>
      <div className="bg-gray-300 p-4 text-center">
        <p className="font-bold text-sm mb-2">
          Do not mail this Worksheet. Go to fafsa.gov to complete and submit
          your application.
        </p>
        <p className="text-xs">
          For more information on federal student aid, visit StudentAid.gov.
        </p>
        <p className="text-xs mb-2">
          You can also talk with your college's financial aid office about other
          types of student aid that may be available.
        </p>
        <div className="flex justify-between text-xs">
          <span>For Help — 1-800-433-3243</span>
          <span>2023-2024 FAFSA ON THE WEB WORKSHEET</span>
          <span>PAGE 4</span>
        </div>
      </div>
    </div>
  );
}
