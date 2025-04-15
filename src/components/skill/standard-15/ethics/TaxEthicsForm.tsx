import { Scale, FileWarning, Receipt } from "lucide-react";
import { CaseStudies } from "./CaseStudies";
import { ReflectionForm } from "./ReflectionForm";
import { DiscussionQuestions } from "./DiscussionQuestions";

function TaxEthicsForm({ formData, setFormData, onReflectionComplete }) {
  const handleReflectionComplete = (value) => {
    onReflectionComplete(value);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header Section - Matching example style */}
      <div className="flex flex-col items-center pt-16 pb-12">
        <Scale className="w-12 h-12 text-blue-500 mb-6" />
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Understanding Tax Ethics
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl text-center">
          Explore the critical differences between tax evasion and legal tax
          avoidance through real-world examples
        </p>
      </div>

      {/* Case Studies Section */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h2 className="text-2xl font-semibold text-slate-900 mb-8">
          Select a Case Study
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-2 rounded-lg mr-4">
                <FileWarning className="w-6 h-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Tax Evasion
              </h3>
            </div>
            <p className="text-slate-600">
              Illegal non-payment or underpayment of taxes
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-2 rounded-lg mr-4">
                <Receipt className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">
                Tax Avoidance
              </h3>
            </div>
            <p className="text-slate-600">
              Legal methods to reduce tax liability
            </p>
          </div>
        </div>

        <CaseStudies />
        <ReflectionForm
          formData={formData}
          setFormData={setFormData}
          onReflectionComplete={handleReflectionComplete}
        />
        <DiscussionQuestions />
      </div>
    </div>
  );
}

export default TaxEthicsForm;
