import { Building2 } from "lucide-react";
import ApplicationForm from "./account-opening/ApplicationForm";

export default function BankAccountOpeningForm({
  formData,
  setFormData,
  onComplete,
}) {
  // Initialize default form structure in formData if missing
  const defaultScenario = {
    student: {
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        ssn: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      },
      employmentInfo: {
        status: "part-time",
        employer: "",
        position: "",
        startDate: "",
        annualIncome: 0,
      },
      accountInfo: {
        initialDeposit: 0,
        depositMethod: "debit",
        accountType: "student-checking",
      },
    },
    guardian: {
      personalInfo: {
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        ssn: "",
        email: "",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
        },
      },
      employmentInfo: {
        status: "full-time",
        employer: "",
        position: "",
        startDate: "",
        annualIncome: 0,
      },
      relationship: "",
      consentProvided: false,
    },
  };

  const scenario = formData.bankApplication || defaultScenario;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Building2 className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mock Bank Account Opening Exercise
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Practice opening a bank account using our interactive simulation.
            You'll learn about the required information, documentation, and
            steps involved in the process.
          </p>
        </div>

        {/* Scenario Description */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="px-8 py-6 bg-blue-50 border-b border-blue-100">
            <h2 className="text-xl font-semibold text-blue-900">
              Your Scenario
            </h2>
            <p className="mt-1 text-sm text-blue-700">
              Use this information to complete the application below.
            </p>
          </div>
          <div className="p-8">
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 mb-6">
                Taylor Johnson (born April 15, 2007, SSN: 123-45-6789) is a
                16-year-old high school student looking to open their first bank
                account. Taylor lives with their mother at 123 Maple Street,
                Anytown, CA 12345. They can be reached at (555) 123-4567 or via
                email at taylor.j@example.com. Taylor recently started working
                part-time as a barista at Local Coffee Shop, earning
                approximately $4,500 annually.
              </p>
              <p className="text-gray-700">
                Their mother, Jamie Johnson (born June 20, 1980, SSN:
                987-65-4321), resides at the same address and can be contacted
                at (555) 987-6543 or jamie.j@example.com. Jamie works as a
                Senior Manager at Tech Solutions Inc., with an annual income of
                $65,000.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <ApplicationForm
          scenario={scenario}
          formData={formData}
          setFormData={setFormData}
          onComplete={(val) => {
            onComplete(val);
          }}
        />
      </div>
    </div>
  );
}
