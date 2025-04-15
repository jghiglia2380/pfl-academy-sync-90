import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "./Header";
import { ComparisonChart } from "./ComparisonChart";
import { toast } from "react-toastify";
import supabase from "../../../utils/supabase";

function SavingVsInvestingExercise({
  section,
  formData,
  setFormData,
  onExerciseComplete,
}) {
  // Ensure global state is initialized
  const defaultState = {
    userAnswers: section.correctAnswers.map((item) => ({
      category: item.category,
      saving: "",
      investing: "",
    })),
    quizAnswers: section.quizQuestions.map(() => ""), // Ensures quizAnswers is an array
    reflection: "",
    aiFeedback: [],
    quizFeedback: [],
  };

  // Ensure form data exists & initialize missing values
  const exerciseData = {
    ...defaultState,
    ...formData.savingVsInvestingExercise, // Merge existing data
  };

  const { userAnswers, quizAnswers, reflection, aiFeedback, quizFeedback } =
    exerciseData;

  const [showAnswers, setShowAnswers] = useState(false);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // Handle user input for comparison chart
  const handleInputChange = (index, field, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = { ...updatedAnswers[index], [field]: value };

    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        userAnswers: updatedAnswers,
      },
    }));
  };

  // Handle quiz answer input safely
  const handleQuizAnswerChange = (index, value) => {
    const updatedQuizAnswers = [...quizAnswers];
    updatedQuizAnswers[index] = value;

    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        quizAnswers: updatedQuizAnswers,
      },
    }));
  };

  // Handle reflection input safely
  const handleChangeReflection = (e) => {
    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        reflection: e.target.value,
      },
    }));
  };

  // Generate AI feedback for user responses
  const generateAiFeedback = async () => {
    setLoadingFeedback(true);

    const prompts = userAnswers.map(
      (answer) =>
        `Category: ${answer.category}
        User's response for Saving: "${answer.saving}"
        User's response for Investing: "${answer.investing}"
        Provide constructive feedback. Keep it under 100 words.`
    );

    try {
      const feedbackResponses = await Promise.all(
        prompts.map(async (prompt) => {
          const { data, error } = await supabase.functions.invoke("openai", {
            body: JSON.stringify({ prompt: prompt }),
            method: "POST",
          });

          if (error) {
            throw new Error(`HTTP error! Status: ${error}`);
          }

          return data.message || "Error generating feedback.";
        })
      );

      setFormData((prev) => ({
        ...prev,
        savingVsInvestingExercise: {
          ...prev.savingVsInvestingExercise,
          aiFeedback: feedbackResponses,
        },
      }));
    } catch (error) {
      console.error("Error generating AI feedback:", error);
    }

    setLoadingFeedback(false);
  };

  // Validate Quiz Answers
  const validateQuizAnswers = () => {
    const quizFeedbackResults = quizAnswers.map((answer, index) => {
      return answer.trim().toLowerCase() ===
        section.quizQuestions[index].answer.toLowerCase()
        ? "✅ Correct!"
        : `❌ Incorrect. Correct answer: ${section.quizQuestions[index].answer}`;
    });

    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        quizFeedback: quizFeedbackResults,
      },
    }));
  };

  // Handle final submission
  const handleSubmitAnswers = () => {
    if (userAnswers.some((a) => !a.saving || !a.investing)) {
      toast.error("Please complete all fields before submitting.");
    } else {
      generateAiFeedback();
    }
  };

  // Handle revise action
  const handleRevise = () => {
    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        userAnswers: defaultState.userAnswers,
        aiFeedback: [],
      },
    }));
  };

  const handleSubmitReflection = async () => {
    if (reflection.length < 15) {
      toast.error("Please write at least 15 words before submitting.");
      return;
    }

    setLoadingFeedback(true);

    const prompts = [
      `
      Reflection: Based on the chart and your financial goals, when would you choose saving over investing, and why?
      User input: ${reflection}
      Provide feedback on the reflection. Keep it under 50 words.
      Tell the user what they did well and how they can improve.
      `,
    ];

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompts[0] }],
      });

      setFormData((prev) => ({
        ...prev,
        savingVsInvestingExercise: {
          ...prev.savingVsInvestingExercise,
          aiResponse: response.choices[0].message.content,
        },
      }));
    } catch (error) {
      console.error("Error generating AI response:", error);
    }

    setLoadingFeedback(false);
  };

  const handleReviseReflection = () => {
    setFormData((prev) => ({
      ...prev,
      savingVsInvestingExercise: {
        ...prev.savingVsInvestingExercise,
        reflection: "",
        aiResponse: "",
      },
    }));
  };

  useEffect(() => {
    if (
      formData?.savingVsInvestingExercise?.reflection &&
      formData?.savingVsInvestingExercise?.userAnswers &&
      formData?.savingVsInvestingExercise?.userAnswers.length === 8 &&
      formData?.savingVsInvestingExercise?.aiFeedback &&
      formData?.savingVsInvestingExercise?.aiResponse &&
      formData?.savingVsInvestingExercise?.aiFeedback.length === 8 &&
      formData?.savingVsInvestingExercise?.quizAnswers &&
      formData?.savingVsInvestingExercise?.quizAnswers.length === 3 &&
      formData?.savingVsInvestingExercise?.quizAnswers.every(
        (answer) => answer !== ""
      )
    ) {
      onExerciseComplete(true);
    } else {
      onExerciseComplete(false);
    }
  }, [formData]);
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border-2 border-gray-200 p-8">
          <Header />

          <p className="text-lg text-gray-600 mb-8 text-center whitespace-nowrap">
            Complete the chart below by comparing saving and investing across
            different categories.
          </p>

          <ComparisonChart
            userAnswers={userAnswers}
            onInputChange={handleInputChange}
            aiFeedback={aiFeedback}
          />

          <div className="flex justify-between mb-10">
            <button
              onClick={() => setShowAnswers(!showAnswers)}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              {showAnswers ? (
                <EyeOff className="w-5 h-5 mr-2" />
              ) : (
                <Eye className="w-5 h-5 mr-2" />
              )}
              {showAnswers ? "Hide Answers" : "Show Answers"}
            </button>
            {formData.savingVsInvestingExercise?.aiFeedback &&
            formData.savingVsInvestingExercise?.aiFeedback.length > 0 ? (
              <div>
                <div className="flex w-full">
                  <button
                    onClick={handleRevise}
                    className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
                  >
                    Revise Response
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSubmitAnswers}
                disabled={loadingFeedback}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
              >
                {loadingFeedback
                  ? "Generating AI response..."
                  : "Submit Answers"}
              </button>
            )}
          </div>

          {showAnswers && (
            <div className="mb-10 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Correct Answers
              </h2>
              {section.correctAnswers.map((answer) => (
                <div key={answer.category} className="mb-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-3">
                    {answer.category}
                  </h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <span className="font-semibold text-gray-700">
                        Saving:
                      </span>
                      <p className="text-gray-600 mt-1">{answer.saving}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">
                        Investing:
                      </span>
                      <p className="text-gray-600 mt-1">{answer.investing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Quick Quiz
            </h2>
            {section.quizQuestions.map((q, index) => (
              <div key={index} className="mb-6">
                <p className="text-lg font-semibold text-gray-700 mb-3">
                  {q.question}
                </p>
                <input
                  type="text"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  value={quizAnswers[index] || ""} // ✅ Prevents crashing if undefined
                  onChange={(e) =>
                    handleQuizAnswerChange(index, e.target.value)
                  }
                />
                {quizFeedback[index] && (
                  <div className="mt-3 text-gray-600">
                    <span className="font-semibold">{quizFeedback[index]}</span>
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={validateQuizAnswers}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
            >
              Check Quiz Answers
            </button>
          </div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Reflection
            </h2>
            <p className="text-lg text-gray-600 mb-3">
              Based on the chart and your financial goals, when would you choose
              saving over investing, and why?
            </p>
            <textarea
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              rows={4}
              value={reflection}
              onChange={handleChangeReflection}
            />
            {formData.savingVsInvestingExercise?.reflection &&
            formData.savingVsInvestingExercise?.aiResponse ? (
              <div>
                <div className="flex w-full mb-4">
                  <button
                    onClick={handleReviseReflection}
                    className="bg-indigo-600 w-full text-white px-4 py-2 rounded hover:bg-indigo-700"
                  >
                    Revise Response
                  </button>
                </div>
                {/* AI Response Box */}
                {loadingFeedback ? (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                    <p className="text-gray-700">Generating AI feedback...</p>
                  </div>
                ) : (
                  formData.savingVsInvestingExercise?.aiResponse && (
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mt-4">
                      <h4 className="text-lg font-bold text-gray-900">
                        AI Feedback
                      </h4>
                      <p className="text-gray-700 mt-2">
                        {formData.savingVsInvestingExercise.aiResponse}
                      </p>
                    </div>
                  )
                )}
              </div>
            ) : (
              <button
                onClick={handleSubmitReflection}
                disabled={loadingFeedback}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500"
              >
                {loadingFeedback
                  ? "Generating AI response..."
                  : "Submit Reflection"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavingVsInvestingExercise;
