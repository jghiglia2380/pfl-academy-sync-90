import React from 'react';
import { useStandard1Form } from '../../hooks/useStandard1Form';
import { formatCurrency } from '../../lib/formatters';

export default function Standard1Capstone() {
  const {
    form,
    loading,
    saving,
    assessment,
    feedback,
    saveDraft,
    submitAssessment,
    canSubmit,
    canEdit,
  } = useStandard1Form();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  const onSubmit = async (data) => {
    if (canSubmit) {
      await submitAssessment(data);
    }
  };

  const onSaveDraft = async (data) => {
    if (canEdit) {
      await saveDraft(data);
    }
  };

  const income = watch('content.budgetAnalysis.income');
  const expenses = watch('content.budgetAnalysis.expenses');
  const savings = watch('content.budgetAnalysis.savings');

  const totalIncome = (income?.salary || 0) + (income?.other || 0);
  const totalExpenses = (expenses?.fixed || 0) + (expenses?.variable || 0);
  const netSavings = totalIncome - totalExpenses;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Standard 1: Financial Planning Fundamentals</h1>
        <p className="text-gray-600">
          This capstone project focuses on developing a comprehensive financial plan based on provided client information.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Financial Goals Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Financial Goals</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short-term Goals (1-2 years)
              </label>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    {...register(`content.financialGoals.shortTerm.${i}`)}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                    placeholder={`Goal ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medium-term Goals (3-5 years)
              </label>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    {...register(`content.financialGoals.mediumTerm.${i}`)}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                    placeholder={`Goal ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-term Goals (5+ years)
              </label>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    {...register(`content.financialGoals.longTerm.${i}`)}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                    placeholder={`Goal ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Analysis Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Budget Analysis</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Income</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Salary
                  </label>
                  <input
                    type="number"
                    {...register('content.budgetAnalysis.income.salary', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Other Income
                  </label>
                  <input
                    type="number"
                    {...register('content.budgetAnalysis.income.other', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="font-medium">
                    Total Income: {formatCurrency(totalIncome)}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Expenses</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fixed Expenses
                  </label>
                  <input
                    type="number"
                    {...register('content.budgetAnalysis.expenses.fixed', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Variable Expenses
                  </label>
                  <input
                    type="number"
                    {...register('content.budgetAnalysis.expenses.variable', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div className="pt-2 border-t">
                  <p className="font-medium">
                    Total Expenses: {formatCurrency(totalExpenses)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            <p className="font-medium">
              Net Monthly Savings: {formatCurrency(netSavings)}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {netSavings >= 0
                ? 'You have a positive cash flow. Great job!'
                : 'You have a negative cash flow. Consider reviewing your expenses.'}
            </p>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short-term Recommendations
              </label>
              <textarea
                {...register('content.recommendations.shortTerm')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your recommendations for the next 1-2 years..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medium-term Recommendations
              </label>
              <textarea
                {...register('content.recommendations.mediumTerm')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your recommendations for the next 3-5 years..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-term Recommendations
              </label>
              <textarea
                {...register('content.recommendations.longTerm')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your recommendations for 5+ years..."
              />
            </div>
          </div>
        </div>

        {/* Submission Controls */}
        <div className="flex justify-end space-x-4">
          {canEdit && (
            <button
              type="button"
              onClick={handleSubmit(onSaveDraft)}
              disabled={saving}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
          )}
          
          {canSubmit && (
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </form>

      {/* Feedback Section */}
      {feedback.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Instructor Feedback</h2>
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-6">
                <div className="mb-4">
                  <h3 className="font-medium">Financial Goals</h3>
                  <p className="text-gray-600 mt-1">{item.content.financialGoals}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">Budget Analysis</h3>
                  <p className="text-gray-600 mt-1">{item.content.budgetAnalysis}</p>
                </div>
                <div>
                  <h3 className="font-medium">Recommendations</h3>
                  <p className="text-gray-600 mt-1">{item.content.recommendations}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 