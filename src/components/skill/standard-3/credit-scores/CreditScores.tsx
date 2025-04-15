import { useState, useEffect } from "react";
import { AlertCircle, CreditCard } from "lucide-react";
import { PieChart } from "./PieChart";
import { CategoryCard } from "./CategoryCard";
import { ReflectionSection } from "./ReflectionSection";

function CreditScores({ section, onExerciseComplete, formData, setFormData }) {
  const [openCategory, setOpenCategory] = useState<number | null>(null);

  useEffect(() => {
    if (formData.reflection && formData.aiResponse) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Understanding Credit Score Categories
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn how different factors affect your credit score and get tips
            for improvement. Practice analyzing credit score components through
            this interactive exercise.
          </p>
        </div>
        <PieChart categories={section.categories} />

        <div className="space-y-4">
          {section.categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              isOpen={openCategory === index}
              onToggle={() =>
                setOpenCategory(openCategory === index ? null : index)
              }
            />
          ))}
        </div>

        <ReflectionSection formData={formData} setFormData={setFormData} />

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
            <p className="text-sm text-gray-600">
              Credit scores are calculated based on individual credit history
              and lender-specific algorithms. This exercise is for educational
              purposes only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditScores;
