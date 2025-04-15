import React, { useState, useEffect } from "react";
import { FileQuestion } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import TextInput from "./TextInput";

const charityExamples = [
  {
    name: "Habitat for Humanity",
    description: "Building homes and communities",
  },
  {
    name: "World Wildlife Fund",
    description: "Conservation and reducing human impact on the environment",
  },
  {
    name: "St. Jude Children's Research Hospital",
    description: "Advancing cures for pediatric diseases",
  },
];

function CharityForm({ formData, setFormData }) {
  const [showExamples, setShowExamples] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <CollapsibleSection title="Step 1: Choose a Charitable Organization">
      <div className="space-y-6">
        <div>
          <TextInput
            label="Select a charitable organization that interests you"
            id="organization"
            name="organization"
            className={showExamples ? "mb-2" : ""}
            value={formData.organization}
            onChange={handleChange}
            placeholder="Enter organization name"
          />

          <button
            type="button"
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => setShowExamples(!showExamples)}
          >
            <FileQuestion className="h-5 w-5 mr-2 text-blue-500" />
            Show Examples
          </button>

          {showExamples && (
            <div className="mt-4 bg-blue-50 p-4 rounded-md">
              <h4 className="text-sm font-medium text-blue-800 mb-2">
                Example Organizations
              </h4>
              <ul className="space-y-2">
                {charityExamples.map((example, index) => (
                  <li key={index} className="text-blue-700">
                    <span className="font-medium">{example.name}</span>
                    <span className="text-blue-600">
                      {" "}
                      - {example.description}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div>
          <label
            htmlFor="mission"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What is the organization's mission?
          </label>
          <textarea
            name="mission"
            id="mission"
            rows={4}
            className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md p-3"
            value={formData.mission}
            onChange={handleChange}
          />
        </div>

        <TextInput
          label="What percentage of their funds is used directly for programs?"
          id="fundPercentage"
          name="fundPercentage"
          value={formData.fundPercentage}
          onChange={(e) => {
            let value = e.target.value.replace(/^0+/, ""); // Remove leading zeros
            if (value === "") value = "0"; // Ensure the field is not empty
            if (/^\d{1,3}$/.test(value) && Number(value) <= 100) {
              handleChange({ target: { name: "fundPercentage", value } });
            }
          }}
          placeholder="Enter percentage"
          type="text" // Use text to control formatting
          inputMode="numeric" // Mobile users get a numeric keyboard
          maxLength={3} // Limit input length
        />

        <div>
          <label
            htmlFor="successMetrics"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            How does the organization measure its success?
          </label>
          <textarea
            name="successMetrics"
            id="successMetrics"
            rows={4}
            className="shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-2 border-gray-300 rounded-md p-3"
            value={formData.successMetrics}
            onChange={handleChange}
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-md">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Helpful Resources
          </h4>
          <ul className="list-disc pl-5 text-sm text-blue-700">
            <li>
              <a
                href="https://www.guidestar.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                GuideStar
              </a>
            </li>
            <li>
              <a
                href="https://www.charitynavigator.org"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-900"
              >
                Charity Navigator
              </a>
            </li>
          </ul>
        </div>
      </div>
    </CollapsibleSection>
  );
}

export default CharityForm;
