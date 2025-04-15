import { useEffect } from "react";
import BankStatement from "./BankStatement";
import CheckRegister from "./CheckRegister";
import { validateEntries } from "./utils/checkRegisterValidation";
import { sampleTransactions } from "./data/sampleTransactions";

function Exercise({ formData, setFormData, onExerciseComplete }) {
  useEffect(() => {
    if (validateEntries(formData.checkRegister, sampleTransactions)) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <svg
              className="w-16 h-16 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M21 4H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H3V6h18v12zm-6-8c0-1.1-.9-2-2-2H7c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-4zm-8 4V10h6v4H7z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bank Statement Reconciliation Exercise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practice reconciling your bank statement with your check register.
            Learn how to track deposits, withdrawals, and maintain accurate
            financial records.
          </p>
        </div>
        <BankStatement />
        <CheckRegister formData={formData} setFormData={setFormData} />
      </div>
    </div>
  );
}

export default Exercise;
