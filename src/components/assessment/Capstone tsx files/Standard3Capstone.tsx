import React from 'react';
import { useStandard3Form } from '../../hooks/useStandard3Form';
import { formatCurrency, formatPercent } from '../../lib/formatters';

export default function Standard3Capstone() {
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
  } = useStandard3Form();

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

  const creditScoreAnalysis = watch('creditScoreAnalysis');
  const creditReportAnalysis = watch('creditReportAnalysis');
  const creditManagementPlan = watch('creditManagementPlan');

  const calculateTotalScoreFactors = () => {
    const factors = creditScoreAnalysis.scoreFactors;
    return Object.values(factors).reduce((sum, value) => sum + value, 0);
  };

  const addAccount = () => {
    const accounts = [...creditReportAnalysis.accounts];
    accounts.push({
      type: '',
      balance: 0,
      limit: 0,
      status: '',
      openedDate: '',
    });
    setValue('creditReportAnalysis.accounts', accounts);
  };

  const addInquiry = () => {
    const inquiries = [...creditReportAnalysis.inquiries];
    inquiries.push({
      date: '',
      type: '',
      company: '',
    });
    setValue('creditReportAnalysis.inquiries', inquiries);
  };

  const addPublicRecord = () => {
    const records = [...creditReportAnalysis.publicRecords];
    records.push({
      type: '',
      date: '',
      amount: 0,
    });
    setValue('creditReportAnalysis.publicRecords', records);
  };

  const addShortTermGoal = () => {
    const goals = [...creditManagementPlan.goals.shortTerm];
    goals.push('');
    setValue('creditManagementPlan.goals.shortTerm', goals);
  };

  const addLongTermGoal = () => {
    const goals = [...creditManagementPlan.goals.longTerm];
    goals.push('');
    setValue('creditManagementPlan.goals.longTerm', goals);
  };

  const addMilestone = () => {
    const milestones = [...creditManagementPlan.timeline.milestones];
    milestones.push({
      date: '',
      goal: '',
      action: '',
    });
    setValue('creditManagementPlan.timeline.milestones', milestones);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Standard 3: Credit Management</h1>
        <p className="text-gray-600">
          This capstone project focuses on analyzing credit scores, credit reports, and developing a comprehensive credit management plan.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Credit Score Analysis Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Score Analysis</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Credit Score
              </label>
              <input
                type="number"
                {...register('creditScoreAnalysis.currentScore', {
                  valueAsNumber: true,
                })}
                className="w-full p-2 border rounded-md"
                disabled={!canEdit}
              />
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Score Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment History
                  </label>
                  <input
                    type="number"
                    {...register('creditScoreAnalysis.scoreFactors.paymentHistory', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Utilization
                  </label>
                  <input
                    type="number"
                    {...register('creditScoreAnalysis.scoreFactors.creditUtilization', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Length of Credit
                  </label>
                  <input
                    type="number"
                    {...register('creditScoreAnalysis.scoreFactors.lengthOfCredit', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Credit
                  </label>
                  <input
                    type="number"
                    {...register('creditScoreAnalysis.scoreFactors.newCredit', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Mix
                  </label>
                  <input
                    type="number"
                    {...register('creditScoreAnalysis.scoreFactors.creditMix', {
                      valueAsNumber: true,
                    })}
                    className="w-full p-2 border rounded-md"
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Total Score Factors
                  </label>
                  <input
                    type="number"
                    value={calculateTotalScoreFactors()}
                    className="w-full p-2 border rounded-md bg-gray-100"
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Score Impact Analysis
              </label>
              <textarea
                {...register('creditScoreAnalysis.scoreImpact')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Analyze how each factor impacts your credit score..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Improvement Plan
              </label>
              <textarea
                {...register('creditScoreAnalysis.improvementPlan')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Outline your plan to improve your credit score..."
              />
            </div>
          </div>
        </div>

        {/* Credit Report Analysis Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Report Analysis</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Accounts</h3>
              <div className="space-y-4">
                {creditReportAnalysis.accounts.map((account, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <input
                        type="text"
                        {...register(`creditReportAnalysis.accounts.${index}.type`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Balance
                      </label>
                      <input
                        type="number"
                        {...register(`creditReportAnalysis.accounts.${index}.balance`, {
                          valueAsNumber: true,
                        })}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Credit Limit
                      </label>
                      <input
                        type="number"
                        {...register(`creditReportAnalysis.accounts.${index}.limit`, {
                          valueAsNumber: true,
                        })}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <input
                        type="text"
                        {...register(`creditReportAnalysis.accounts.${index}.status`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Opened Date
                      </label>
                      <input
                        type="date"
                        {...register(`creditReportAnalysis.accounts.${index}.openedDate`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                ))}
                {canEdit && (
                  <button
                    type="button"
                    onClick={addAccount}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Account
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Credit Inquiries</h3>
              <div className="space-y-4">
                {creditReportAnalysis.inquiries.map((inquiry, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        {...register(`creditReportAnalysis.inquiries.${index}.date`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <input
                        type="text"
                        {...register(`creditReportAnalysis.inquiries.${index}.type`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        {...register(`creditReportAnalysis.inquiries.${index}.company`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                ))}
                {canEdit && (
                  <button
                    type="button"
                    onClick={addInquiry}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Inquiry
                  </button>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Public Records</h3>
              <div className="space-y-4">
                {creditReportAnalysis.publicRecords.map((record, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type
                      </label>
                      <input
                        type="text"
                        {...register(`creditReportAnalysis.publicRecords.${index}.type`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        {...register(`creditReportAnalysis.publicRecords.${index}.date`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount
                      </label>
                      <input
                        type="number"
                        {...register(`creditReportAnalysis.publicRecords.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                ))}
                {canEdit && (
                  <button
                    type="button"
                    onClick={addPublicRecord}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    + Add Public Record
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Report Analysis
              </label>
              <textarea
                {...register('creditReportAnalysis.analysis')}
                className="w-full p-2 border rounded-md h-32"
                disabled={!canEdit}
                placeholder="Analyze your credit report findings..."
              />
            </div>
          </div>
        </div>

        {/* Credit Management Plan Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Credit Management Plan</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Goals</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Short-term Goals</h4>
                  <div className="space-y-2">
                    {creditManagementPlan.goals.shortTerm.map((goal, index) => (
                      <input
                        key={index}
                        type="text"
                        {...register(`creditManagementPlan.goals.shortTerm.${index}`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                        placeholder="Enter a short-term goal"
                      />
                    ))}
                    {canEdit && (
                      <button
                        type="button"
                        onClick={addShortTermGoal}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Short-term Goal
                      </button>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Long-term Goals</h4>
                  <div className="space-y-2">
                    {creditManagementPlan.goals.longTerm.map((goal, index) => (
                      <input
                        key={index}
                        type="text"
                        {...register(`creditManagementPlan.goals.longTerm.${index}`)}
                        className="w-full p-2 border rounded-md"
                        disabled={!canEdit}
                        placeholder="Enter a long-term goal"
                      />
                    ))}
                    {canEdit && (
                      <button
                        type="button"
                        onClick={addLongTermGoal}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Long-term Goal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Strategies</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Debt Reduction Strategy
                  </label>
                  <textarea
                    {...register('creditManagementPlan.strategies.debtReduction')}
                    className="w-full p-2 border rounded-md h-32"
                    disabled={!canEdit}
                    placeholder="Outline your debt reduction strategy..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Building Strategy
                  </label>
                  <textarea
                    {...register('creditManagementPlan.strategies.creditBuilding')}
                    className="w-full p-2 border rounded-md h-32"
                    disabled={!canEdit}
                    placeholder="Outline your credit building strategy..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Credit Utilization Strategy
                  </label>
                  <textarea
                    {...register('creditManagementPlan.strategies.utilization')}
                    className="w-full p-2 border rounded-md h-32"
                    disabled={!canEdit}
                    placeholder="Outline your credit utilization strategy..."
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Timeline</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Credit Score
                    </label>
                    <input
                      type="number"
                      {...register('creditManagementPlan.timeline.targetScore', {
                        valueAsNumber: true,
                      })}
                      className="w-full p-2 border rounded-md"
                      disabled={!canEdit}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Target Date
                    </label>
                    <input
                      type="date"
                      {...register('creditManagementPlan.timeline.targetDate')}
                      className="w-full p-2 border rounded-md"
                      disabled={!canEdit}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Milestones</h4>
                  <div className="space-y-4">
                    {creditManagementPlan.timeline.milestones.map((milestone, index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                          </label>
                          <input
                            type="date"
                            {...register(`creditManagementPlan.timeline.milestones.${index}.date`)}
                            className="w-full p-2 border rounded-md"
                            disabled={!canEdit}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Goal
                          </label>
                          <input
                            type="text"
                            {...register(`creditManagementPlan.timeline.milestones.${index}.goal`)}
                            className="w-full p-2 border rounded-md"
                            disabled={!canEdit}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Action
                          </label>
                          <input
                            type="text"
                            {...register(`creditManagementPlan.timeline.milestones.${index}.action`)}
                            className="w-full p-2 border rounded-md"
                            disabled={!canEdit}
                          />
                        </div>
                      </div>
                    ))}
                    {canEdit && (
                      <button
                        type="button"
                        onClick={addMilestone}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        + Add Milestone
                      </button>
                    )}
                  </div>
                </div>
              </div>
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
                  <h3 className="font-medium">Credit Score Analysis</h3>
                  <p className="text-gray-600 mt-1">{item.content.creditScoreAnalysis}</p>
                </div>
                <div className="mb-4">
                  <h3 className="font-medium">Credit Report Analysis</h3>
                  <p className="text-gray-600 mt-1">{item.content.creditReportAnalysis}</p>
                </div>
                <div>
                  <h3 className="font-medium">Credit Management Plan</h3>
                  <p className="text-gray-600 mt-1">{item.content.creditManagementPlan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 