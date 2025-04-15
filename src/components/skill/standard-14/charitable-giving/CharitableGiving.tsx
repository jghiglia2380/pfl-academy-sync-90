import { useState, useEffect } from "react";
import Header from "./Header";
import CauseSelection from "./CauseSelection";
import ContributionType from "./ContributionType";
import ContributionGoal from "./ContributionGoal";
import Reflection from "./Reflection";
import Tips from "./Tips";

function CharitableGiving({
  section,
  onExerciseComplete,
  formData,
  setFormData,
}) {
  useEffect(() => {
    console.log(formData);
    if (
      formData.cause !== "" &&
      formData.contributionType !== "" &&
      formData.plan !== "" &&
      formData.reflection &&
      formData.aiResponse
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);

  const handleInputTypeChange = (e) => {
    const { name, value } = e.target;
    if (name === "contributionType") {
      setFormData((prev) => ({
        ...prev,
        amount: "",
        hours: "",
        inKindItems: "",
      }));
    }

    handleInputChange(e);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Header />

        <CauseSelection
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <ContributionType
          contributionTypes={section.contributionTypes}
          formData={formData}
          handleInputChange={handleInputTypeChange}
        />
        <ContributionGoal
          monetaryOptions={section.monetaryOptions}
          volunteerOptions={section.volunteerOptions}
          formData={formData}
          handleInputChange={handleInputChange}
        />
        <Reflection formData={formData} setFormData={setFormData} />
        <Tips />
      </div>
    </div>
  );
}

export default CharitableGiving;
