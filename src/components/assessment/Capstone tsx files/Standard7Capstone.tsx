import React from 'react';
import { useStandard7Form } from '@/hooks/useStandard7Form';
import { formatDate } from '@/lib/utils/date';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { FeedbackList } from '@/components/assessment/FeedbackList';

interface Props {
  assessmentId: string;
}

export function Standard7Capstone({ assessmentId }: Props) {
  const {
    form,
    isLoading,
    isSaving,
    isSubmitting,
    assessment,
    saveDraft,
    submitAssessment,
    calculateMonthlyPayment,
    calculateTotalInterest,
    canSubmit,
    canEdit
  } = useStandard7Form(assessmentId);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleAutoCalculate = (optionNumber: 1 | 2 | 3) => {
    const option = watch(`loanAnalysis.option${optionNumber}`);
    const monthlyPayment = calculateMonthlyPayment(
      option.principal,
      option.apr,
      option.termMonths
    );
    const totalInterest = calculateTotalInterest(
      monthlyPayment,
      option.termMonths,
      option.principal
    );

    setValue(`loanAnalysis.option${optionNumber}.monthlyPayment`, monthlyPayment);
    setValue(`loanAnalysis.option${optionNumber}.totalInterest`, totalInterest);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Standard 7: Borrowing Money
          </h1>
          <div className="flex gap-4 mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Time: 45 minutes
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Loan Calculator Included
            </div>
          </div>

          <form onSubmit={handleSubmit(submitAssessment)}>
            {/* Loan Analysis Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                1. Loan Analysis
              </h2>
              {[1, 2, 3].map((optionNumber) => (
                <div key={optionNumber} className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Option {optionNumber}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Loan Type"
                      {...register(`loanAnalysis.option${optionNumber}.loanType`)}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.loanType?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Principal"
                      type="number"
                      {...register(`loanAnalysis.option${optionNumber}.principal`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.principal?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="APR (%)"
                      type="number"
                      step="0.01"
                      {...register(`loanAnalysis.option${optionNumber}.apr`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.apr?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Term (months)"
                      type="number"
                      {...register(`loanAnalysis.option${optionNumber}.termMonths`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.termMonths?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Monthly Payment"
                      type="number"
                      step="0.01"
                      {...register(`loanAnalysis.option${optionNumber}.monthlyPayment`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.monthlyPayment?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Total Interest"
                      type="number"
                      step="0.01"
                      {...register(`loanAnalysis.option${optionNumber}.totalInterest`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.totalInterest?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Additional Fees"
                      type="number"
                      step="0.01"
                      {...register(`loanAnalysis.option${optionNumber}.additionalFees`, {
                        valueAsNumber: true
                      })}
                      error={errors.loanAnalysis?.['option' + optionNumber]?.additionalFees?.message}
                      disabled={!canEdit}
                    />
                  </div>
                  {canEdit && (
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-2"
                      onClick={() => handleAutoCalculate(optionNumber as 1 | 2 | 3)}
                    >
                      Calculate Payments
                    </Button>
                  )}
                </div>
              ))}
              <Textarea
                label="Analysis Explanation"
                {...register('loanAnalysis.analysisExplanation')}
                error={errors.loanAnalysis?.analysisExplanation?.message}
                disabled={!canEdit}
                rows={4}
              />
            </section>

            {/* Credit Source Analysis Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                2. Credit Source Analysis
              </h2>
              {[1, 2, 3].map((sourceNumber) => (
                <div key={sourceNumber} className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">
                    Source {sourceNumber}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Source Type"
                      {...register(`creditSources.source${sourceNumber}.sourceType`)}
                      error={errors.creditSources?.['source' + sourceNumber]?.sourceType?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Interest Rate Range"
                      {...register(`creditSources.source${sourceNumber}.interestRateRange`)}
                      error={errors.creditSources?.['source' + sourceNumber]?.interestRateRange?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Credit Score Required"
                      {...register(`creditSources.source${sourceNumber}.creditScoreRequired`)}
                      error={errors.creditSources?.['source' + sourceNumber]?.creditScoreRequired?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Application Process"
                      {...register(`creditSources.source${sourceNumber}.applicationProcess`)}
                      error={errors.creditSources?.['source' + sourceNumber]?.applicationProcess?.message}
                      disabled={!canEdit}
                    />
                    <Input
                      label="Additional Requirements"
                      {...register(`creditSources.source${sourceNumber}.additionalRequirements`)}
                      error={errors.creditSources?.['source' + sourceNumber]?.additionalRequirements?.message}
                      disabled={!canEdit}
                    />
                  </div>
                </div>
              ))}
              <Textarea
                label="Source Analysis"
                {...register('creditSources.sourceAnalysis')}
                error={errors.creditSources?.sourceAnalysis?.message}
                disabled={!canEdit}
                rows={4}
              />
            </section>

            {/* Borrowing Framework Section */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                3. Borrowing Decision Framework
              </h2>
              <div className="space-y-4">
                <Textarea
                  label="Loan Necessity Criteria"
                  {...register('framework.loanNecessityCriteria')}
                  error={errors.framework?.loanNecessityCriteria?.message}
                  disabled={!canEdit}
                  rows={3}
                />
                <Textarea
                  label="Comparison Checklist"
                  {...register('framework.comparisonChecklist')}
                  error={errors.framework?.comparisonChecklist?.message}
                  disabled={!canEdit}
                  rows={3}
                />
                <Textarea
                  label="Risk Assessment"
                  {...register('framework.riskAssessment')}
                  error={errors.framework?.riskAssessment?.message}
                  disabled={!canEdit}
                  rows={3}
                />
                <Textarea
                  label="Implementation Plan"
                  {...register('framework.implementationPlan')}
                  error={errors.framework?.implementationPlan?.message}
                  disabled={!canEdit}
                  rows={3}
                />
              </div>
            </section>

            {/* Feedback Section */}
            {assessment?.feedback && assessment.feedback.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Instructor Feedback
                </h2>
                <FeedbackList
                  feedback={assessment.feedback}
                  formatDate={formatDate}
                />
              </section>
            )}

            {/* Form Controls */}
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-600">
                {assessment?.draft?.last_updated && (
                  <span>Last saved: {formatDate(assessment.draft.last_updated)}</span>
                )}
              </div>
              <div className="space-x-4">
                {canEdit && (
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => saveDraft(form.getValues())}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Draft'}
                  </Button>
                )}
                {canSubmit && (
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit for Grading'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
} 