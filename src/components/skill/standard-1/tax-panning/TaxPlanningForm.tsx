import { useState } from "react";
import Header from "./Header";
import AgeGroupTabs from "./AgeGroupTabs";
import ComparisonTable from "./ComparisonTable";
import ScenarioActivity from "./ScenarioActivity";
import ReflectionSection from "./ReflectionSection";

export default function TaxPlanningForm({
  section,
  formData,
  setFormData,
  onReflectionComplete,
}) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Header />

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Age-Based Checklists
            </h2>
            <AgeGroupTabs
              groups={section.checklistData}
              formData={formData}
              setFormData={setFormData}
            />
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Age Group Comparison
            </h2>
            <ComparisonTable categories={section.comparisonData} />
          </section>

          <section>
            <ScenarioActivity
              scenario={section.scenario}
              formData={formData}
              setFormData={setFormData}
            />
          </section>

          <ReflectionSection
            formData={formData}
            setFormData={setFormData}
            onReflectionComplete={(value) => onReflectionComplete(value)}
          />
        </div>
      </div>
    </div>
  );
}
