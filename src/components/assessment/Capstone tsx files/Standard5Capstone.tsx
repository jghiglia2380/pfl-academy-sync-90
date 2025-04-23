import React from 'react';
import { useStandard5Form } from '../../hooks/useStandard5Form';
import { formatDate } from '../../utils/formatters';

export default function Standard5Capstone() {
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
  } = useStandard5Form();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Risk Management Capstone</h1>

      <form onSubmit={handleSubmit(submitAssessment)} className="space-y-8">
        {/* Risk Assessment Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Risk Assessment</h2>

          {/* Personal Risk */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Risk</h3>

            {/* Health Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Health Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.personalRisk.health.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.personalRisk.health.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.personalRisk.health.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Disability Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Disability Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.personalRisk.disability.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.personalRisk.disability.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.personalRisk.disability.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Life Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Life Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.personalRisk.lifeInsurance.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.personalRisk.lifeInsurance.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.personalRisk.lifeInsurance.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Long-term Care Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Long-term Care Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.personalRisk.longTermCare.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.personalRisk.longTermCare.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.personalRisk.longTermCare.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>

          {/* Property Risk */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Risk</h3>

            {/* Home Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Home Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.home.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.home.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.home.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Auto Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Auto Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.auto.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.auto.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.auto.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Other Property Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Other Property Insurance</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.otherProperty.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.otherProperty.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.propertyRisk.otherProperty.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>

          {/* Liability Risk */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Liability Risk</h3>

            {/* Personal Liability */}
            <div className="space-y-2">
              <h4 className="font-medium">Personal Liability</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.personal.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.personal.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.personal.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Professional Liability */}
            <div className="space-y-2">
              <h4 className="font-medium">Professional Liability</h4>
              <div>
                <label className="block mb-2">Current Coverage</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.professional.currentCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Coverage Gaps</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.professional.gaps')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Recommendations</label>
                <textarea
                  {...register('riskAssessment.liabilityRisk.professional.recommendations')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Risk Management Plan Section */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Risk Management Plan</h2>

          {/* Insurance Strategy */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Insurance Strategy</h3>

            {/* Health Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Health Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.health.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.health.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.insuranceStrategy.health.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Disability Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Disability Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.disability.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.disability.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.insuranceStrategy.disability.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Life Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Life Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.lifeInsurance.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.lifeInsurance.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.insuranceStrategy.lifeInsurance.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Long-term Care Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Long-term Care Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.longTermCare.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.insuranceStrategy.longTermCare.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.insuranceStrategy.longTermCare.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>

          {/* Property Protection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Protection</h3>

            {/* Home Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Home Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.home.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.home.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.propertyProtection.home.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Auto Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Auto Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.auto.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.auto.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.propertyProtection.auto.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Other Property Insurance */}
            <div className="space-y-2">
              <h4 className="font-medium">Other Property Insurance</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.otherProperty.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.propertyProtection.otherProperty.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.propertyProtection.otherProperty.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>

          {/* Liability Protection */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Liability Protection</h3>

            {/* Personal Liability */}
            <div className="space-y-2">
              <h4 className="font-medium">Personal Liability</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.liabilityProtection.personal.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.liabilityProtection.personal.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.liabilityProtection.personal.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>

            {/* Professional Liability */}
            <div className="space-y-2">
              <h4 className="font-medium">Professional Liability</h4>
              <div>
                <label className="block mb-2">Recommended Coverage</label>
                <textarea
                  {...register('riskManagementPlan.liabilityProtection.professional.recommendedCoverage')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Implementation Plan</label>
                <textarea
                  {...register('riskManagementPlan.liabilityProtection.professional.implementationPlan')}
                  className="input"
                  rows={4}
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Cost Estimate</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.liabilityProtection.professional.costEstimate')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>
          </div>

          {/* Emergency Fund */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Emergency Fund</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Target Amount</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.emergencyFund.targetAmount')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
              <div>
                <label className="block mb-2">Current Amount</label>
                <input
                  type="number"
                  {...register('riskManagementPlan.emergencyFund.currentAmount')}
                  className="input"
                  disabled={!canEdit()}
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Funding Plan</label>
              <textarea
                {...register('riskManagementPlan.emergencyFund.fundingPlan')}
                className="input"
                rows={4}
                disabled={!canEdit()}
              />
            </div>
            <div>
              <label className="block mb-2">Timeline</label>
              <input
                {...register('riskManagementPlan.emergencyFund.timeline')}
                className="input"
                disabled={!canEdit()}
              />
            </div>
          </div>
        </section>

        {/* Submission Controls */}
        <div className="flex justify-end space-x-4">
          {canEdit() && (
            <button
              type="button"
              onClick={saveDraft}
              disabled={saving}
              className="btn-secondary"
            >
              {saving ? 'Saving...' : 'Save Draft'}
            </button>
          )}
          {canSubmit() && (
            <button
              type="submit"
              disabled={saving}
              className="btn-primary"
            >
              {saving ? 'Submitting...' : 'Submit Assessment'}
            </button>
          )}
        </div>
      </form>

      {/* Feedback Section */}
      {feedback.length > 0 && (
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Feedback</h2>
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="text-sm text-gray-500 mb-2">
                  {formatDate(item.created_at)}
                </div>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium">Risk Assessment</h3>
                    <p className="text-gray-700">{item.content.riskAssessment}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Risk Management Plan</h3>
                    <p className="text-gray-700">{item.content.riskManagementPlan}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
} 