import HorizontalFormLayout from "./HorizontalFormLayout";
import { useEffect, useState } from "react";

export default function ApplicationForm({
  scenario,
  formData,
  setFormData,
  onComplete,
}) {
  const [isValid, setIsValid] = useState(false);
  // Get stored values from global formData or use defaults
  const applicationData = formData?.bankApplication || scenario;

  useEffect(() => {
    // Check if form is valid (based on required fields)
    const isValid =
      applicationData?.student?.personalInfo?.firstName &&
      applicationData?.student?.personalInfo?.lastName &&
      applicationData?.student?.personalInfo?.dateOfBirth &&
      applicationData?.student?.personalInfo?.ssn &&
      applicationData?.student?.personalInfo?.termsAgreed &&
      applicationData?.guardian?.personalInfo?.firstName &&
      applicationData?.guardian?.personalInfo?.lastName &&
      applicationData?.guardian?.personalInfo?.dateOfBirth &&
      applicationData?.guardian?.personalInfo?.ssn &&
      applicationData?.guardian?.personalInfo?.termsAgreed;

    setIsValid(isValid);
    onComplete(isValid);
  }, [applicationData]);

  // Handle form updates
  const handleFormChange = (newData) => {
    setFormData((prev) => ({
      ...prev,
      bankApplication: newData,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <HorizontalFormLayout
        formData={applicationData}
        onChange={handleFormChange} // ✅ Save form updates globally
      />

      <div className="border-t border-gray-200 p-8">
        <div className="flex flex-col items-center">
          <p className="mt-4 text-sm text-gray-500 max-w-md text-center">
            Important: Please review all information carefully before
            proceeding. You won't be able to modify this information after
            submission.
          </p>
        </div>
      </div>
    </div>
  );
}
