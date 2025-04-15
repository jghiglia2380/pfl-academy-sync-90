import React, { useState, useEffect } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import DocumentSection from "./DocumentSection";
import { toast } from "react-toastify";
import { generateAiResponse } from "../../../utils/AIFeedback";

interface FormData {
  w2: {
    screenshot: string;
    description: string;
    importance: string;
  };
  form1099: {
    screenshot: string;
    description: string;
    importance: string;
  };
  form1040: {
    screenshot: string;
    description: string;
    importance: string;
  };
  reflection: string;
}

function TaxDocumentationScavengerHuntForm({
  formData,
  setFormData,
  onFormValid,
}) {
  const [loadingAi, setLoadingAi] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const prompt = {
    w2Form:
      "The W-2 form is provided by employers to employees. It reports wages earned and taxes withheld during the year.",
    form1099:
      "The 1099 form is issued to independent contractors or individuals who received income outside of regular employment.",
    form1040:
      "The 1040 form is used by individuals to file their annual income tax returns with the IRS.",
    reflection:
      "Reflect on how these documents are used together during tax season. What do you think would happen if someone failed to include one of these forms in their tax filing?",
  };

  const handleInputChange = (
    section: keyof FormData,
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]:
        typeof prev[section] === "object"
          ? { ...prev[section], [field]: value }
          : value,
    }));

    if (field === "reflection") {
      setWordCount(value.split(/\s/).filter((w) => w !== "").length);
    }
  };

  const handleImageUpload = (
    section: keyof Omit<FormData, "reflection">,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange(section, "screenshot", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const isFormComplete = () => {
    const sections = ["w2", "form1099", "form1040"] as (keyof Omit<
      FormData,
      "reflection"
    >)[];
    for (const section of sections) {
      const { screenshot, description, importance } = formData[section];
      if (!screenshot || !description || !importance) {
        return false;
      }
    }
    return !!formData.reflection.trim() && !!formData.aiResponse.trim();
  };

  const handleRevise = () => {
    setFormData({ ...formData, reflection: "", aiResponse: "" });
  };

  const handleSubmit = async () => {
    if (wordCount < 15) {
      toast.warning("Please write at least 15 words before submitting.", {
        position: "top-right",
        autoClose: 5000,
      });
      return;
    }
    setLoadingAi(true);
    const response = await generateAiResponse(
      formData.reflection,
      JSON.stringify(prompt)
    );
    setLoadingAi(false);

    setFormData({ ...formData, aiResponse: response });
  };

  useEffect(() => {
    // Notify parent about form validity
    onFormValid(isFormComplete());
  }, [formData, onFormValid]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Tax Documentation Scavenger Hunt
          </h1>
          <p className="text-lg text-gray-600">
            Understanding tax documents is an essential part of financial
            literacy. In this activity, you'll search for and learn about three
            key tax documents: W-2, 1099, and 1040. For each document, take a
            screenshot of an example, provide a brief description of what it is,
            and explain why it's important.
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="flex">
            <AlertCircle className="h-6 w-6 text-blue-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Important Note
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                When taking screenshots of tax documents, ensure you use sample
                or redacted forms to protect sensitive information.
              </p>
            </div>
          </div>
        </div>

        <DocumentSection
          title="W-2 Form"
          description="The W-2 form is provided by employers to employees. It reports wages earned and taxes withheld during the year."
          section="w2"
          formData={formData.w2}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
        />

        <DocumentSection
          title="1099 Form"
          description="The 1099 form is issued to independent contractors or individuals who received income outside of regular employment."
          section="form1099"
          formData={formData.form1099}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
        />

        <DocumentSection
          title="1040 Form"
          description="The 1040 form is used by individuals to file their annual income tax returns with the IRS."
          section="form1040"
          formData={formData.form1040}
          handleInputChange={handleInputChange}
          handleImageUpload={handleImageUpload}
        />

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">Reflection</h2>
          <p className="text-gray-600 mb-4">
            Reflect on how these documents are used together during tax season.
            What do you think would happen if someone failed to include one of
            these forms in their tax filing?
          </p>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={5}
            value={formData.reflection}
            onChange={(e) =>
              handleInputChange("reflection", "reflection", e.target.value)
            }
            placeholder="Enter your reflection here..."
          />

          {formData.reflection && formData.aiResponse ? (
            <div>
              <div className="flex w-full mb-4">
                <button
                  onClick={handleRevise}
                  className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Revise Response
                </button>
              </div>
              {/* AI Response Box */}
              {loadingAi ? (
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                  <p className="text-gray-700">Generating AI feedback...</p>
                </div>
              ) : (
                formData.aiResponse && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      AI Feedback
                    </h4>
                    <p className="text-gray-700 mt-2">{formData.aiResponse}</p>
                  </div>
                )
              )}
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loadingAi}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loadingAi ? "Generating AI response..." : "Submit Reflection"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaxDocumentationScavengerHuntForm;
