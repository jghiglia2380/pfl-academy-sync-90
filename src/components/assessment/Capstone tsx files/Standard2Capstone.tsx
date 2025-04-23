import React from 'react';
import { useStandard2Form } from '../../hooks/useStandard2Form';
import { formatCurrency, formatPercent } from '../../lib/formatters';

export default function Standard2Capstone() {
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
  } = useStandard2Form();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
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

  const spendingAnalysis = watch('content.spendingAnalysis');
  const savingsPlan = watch('content.savingsPlan');

  const updateCategoryPercentage = (index: number) => {
    const amount = spendingAnalysis.categories[index].amount;
    const total = spendingAnalysis.total;
    const percentage = total > 0 ? (amount / total) * 100 : 0;
    setValue(`content.spendingAnalysis.categories.${index}.percentage`, percentage);
  };

  const updateTotal = () => {
    const total = spendingAnalysis.categories.reduce(
      (sum, category) => sum + category.amount,
      0
    );
    setValue('content.spendingAnalysis.total', total);
    spendingAnalysis.categories.forEach((_, index) => updateCategoryPercentage(index));
  };

  const calculateSavingsTimeline = () => {
    const { currentSavings, monthlyContribution, targetAmount } = savingsPlan;
    if (monthlyContribution <= 0) return 0;
    const remaining = targetAmount - currentSavings;
    return Math.ceil(remaining / monthlyContribution);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Standard 2: Spending Analysis and Savings Planning</h1>
        <p className="text-gray-600">
          This capstone project focuses on analyzing spending patterns and developing a comprehensive savings plan.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Spending Analysis Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Spending Analysis</h2>
          
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Percentage
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {spendingAnalysis.categories.map((category, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="number"
                          {...register(`content.spendingAnalysis.categories.${index}.amount`, {
                            valueAsNumber: true,
                          })}
                          className="w-full p-2 border rounded-md"
                          disabled={!canEdit}
                          onChange={(e) => {
                            setValue(
                              `content.spendingAnalysis.categories.${index}.amount`,
                              parseFloat(e.target.value) || 0
                            );
                            updateTotal();
                          }}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatPercent(category.percentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-50">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Total
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(spendingAnalysis.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      100%
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Savings Plan Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Savings Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Current Status</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Savings
                  </label>
                  <input
                    type="number"
                    {...register('content.savingsPlan.currentSavings', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Contribution
                  </label>
                  <input
                    type="number"
                    {...register('content.savingsPlan.monthlyContribution', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Goals</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Amount
                  </label>
                  <input
                    type="number"
                    {...register('content.savingsPlan.targetAmount', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timeline (months)
                  </label>
                  <input
                    type="number"
                    value={calculateSavingsTimeline()}
                    className="w-full p-2 border rounded-md bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spending Recommendations
              </label>
              <textarea
                {...register('content.recommendations.spending')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your recommendations for optimizing spending..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Savings Recommendations
              </label>
              <textarea
                {...register('content.recommendations.savings')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your recommendations for improving savings..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Implementation Plan
              </label>
              <textarea
                {...register('content.recommendations.implementation')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Enter your implementation plan..."
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
                  <h3 className="font-medium">Spending Analysis</h3>
                  <p className="text-gray-600 mt-1">{item.content.spendingAnalysis}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">Savings Plan</h3>
                  <p className="text-gray-600 mt-1">{item.content.savingsPlan}</p>
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