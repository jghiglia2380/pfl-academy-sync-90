import React, { useState } from "react";
import { FormHeader } from "./FormHeader";
import { PersonalInfo } from "./PersonalInfo";
import { MultipleJobs } from "./MultipleJobs";
import { Dependents } from "./Dependents";
import { OtherAdjustments } from "./OtherAdjustments";
import { SignHere } from "./SignHere";
import { TaxFormTable } from "./TaxFormTable";
import { ExerciseHeader } from "./ExerciseHeader";
import { ActionButtons } from "./ActionButtons";
import { ScenarioDisplay } from "./ScenarioDisplay";
import { FormInstructions } from "./FormInstructions";

export function FormExercise({ section, formData, setFormData }) {
  const randomScenario =
    section.scenarios[Math.floor(Math.random() * section.scenarios.length)];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-[800px] mx-auto">
        <ExerciseHeader />
        {randomScenario && <ScenarioDisplay scenario={randomScenario} />}
        <TaxFormTable taxForms={section.taxForms} />
        <FormInstructions />
        <div className="bg-white shadow-lg rounded-lg p-6 border-2 border-gray-200">
          <div className="border border-gray-300">
            <FormHeader />
            <PersonalInfo
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <MultipleJobs
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <Dependents
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <OtherAdjustments
              formData={formData}
              handleInputChange={handleInputChange}
            />
            <SignHere
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
