import { ExpandableInput } from "./ExpandableInput";
import { generateAiResponse } from "../../../utils/AIFeedback";
import { useState } from "react";
import { toast } from "react-toastify";

interface InvestmentTableProps {
  investments: any[];
  onInputChange: (
    id: string,
    field: "userRisk" | "userReturn",
    value: string
  ) => void;
  setFormData: (data: any) => void;
  formData: any;
}

export function InvestmentTable({
  investments,
  onInputChange,
  formData,
  setFormData,
}: InvestmentTableProps) {
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSubmitAll = async () => {
    // Check if all required fields are completed with more than 10 words
    for (const [id, investment] of Object.entries(formData.investments)) {
      if (
        !investment.userRisk ||
        investment.userRisk === "" ||
        !investment.userReturn ||
        investment.userReturn === ""
      ) {
        toast.warning(
          `Each field must have more than 3 words. Check your inputs.`,
          {
            position: "top-right",
            autoClose: 5000,
          }
        );
        return;
      }
    }

    setLoadingAi(true);
    const responses = await Promise.all(
      Object.entries(formData.investments).map(
        async ([id, investment]: any) => {
          const riskResponse = await generateAiResponse(
            investment.userRisk,
            investment.description
          );

          const returnResponse = await generateAiResponse(
            investment.userReturn,
            investment.description
          );
          return { id, riskResponse, returnResponse };
        }
      )
    );
    setLoadingAi(false);

    setFormData((prev) => ({
      ...prev,
      aiResponse: responses.reduce(
        (acc, { id, riskResponse, returnResponse }) => {
          acc[`${id}-userRisk`] = riskResponse;
          acc[`${id}-userReturn`] = returnResponse;
          return acc;
        },
        {}
      ),
    }));
  };

  return (
    <div className="overflow-x-auto p-6 bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
              Investment Option
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
              Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
              Your Risk Assessment
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase">
              Your Return Estimate
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {investments.map((investment, index) => (
            <>
              <tr key={investment.id} className="hover:bg-gray-50">
                <td className="px-2 py-4 text-sm font-medium text-gray-900 align-top">
                  {investment.option}
                </td>
                <td className="px-2 py-4 text-sm text-gray-600 align-top">
                  {investment.description}
                </td>
                <td className="px-2 py-4 text-sm text-gray-600 align-top">
                  <ExpandableInput
                    value={formData.investments?.[index]?.userRisk || ""}
                    onChange={(value) =>
                      onInputChange(investment.id, "userRisk", value)
                    }
                    placeholder="Enter risks..."
                  />
                  {formData.aiResponse?.[`${index}-userRisk`] && (
                    <p className="text-xs text-blue-900 mt-1 bg-blue-50 p-2 rounded-md">
                      <span className="font-semibold">AI Feedback:</span>{" "}
                      {formData.aiResponse[`${index}-userRisk`]}
                    </p>
                  )}
                </td>
                <td className="px-2 py-4 text-sm text-gray-600 align-top">
                  <ExpandableInput
                    value={formData.investments?.[index]?.userReturn || ""}
                    onChange={(value) =>
                      onInputChange(investment.id, "userReturn", value)
                    }
                    placeholder="Enter returns..."
                  />
                  {formData.aiResponse?.[`${index}-userReturn`] && (
                    <p className="text-xs text-blue-900 mt-1 p-2 bg-blue-50 rounded-md">
                      <span className="font-semibold">AI Feedback:</span>{" "}
                      {formData.aiResponse[`${index}-userReturn`]}
                    </p>
                  )}
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
      {formData.aiResponse && Object.keys(formData.aiResponse).length > 0 ? (
        <button
          onClick={() => {
            setFormData({ ...formData, aiResponse: {} });
            console.log("Revise answers", investments);
          }}
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Revise Answers
        </button>
      ) : (
        <button
          onClick={handleSubmitAll}
          disabled={loadingAi}
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
        >
          {loadingAi ? "Generating AI responses..." : "Submit Answers"}
        </button>
      )}
    </div>
  );
}
