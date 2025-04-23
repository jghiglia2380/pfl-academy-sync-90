import React from 'react';
import { useStandard14Form } from '../../../hooks/useStandard14Form';
import { LoadingSpinner } from '../../ui/LoadingSpinner';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { FeedbackList } from '../FeedbackList';
import { useForm } from 'react-hook-form';
import { Standard14Assessment } from '../../../types/standard14';
import { Badge } from '../../ui/Badge';

interface Props {
  assessmentId?: string;
}

export function Standard14Capstone({ assessmentId }: Props) {
  const {
    form,
    isLoading,
    isSaving,
    isSubmitting,
    assessment,
    saveDraft,
    submitAssessment,
    canSubmit,
    canEdit
  } = useStandard14Form(assessmentId);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<Standard14Assessment>();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Standard 14: Charitable Giving and Financial Planning
          </h1>
          <div className="flex gap-4 mb-6">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              Time: 45 minutes
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
              Written Analysis
            </div>
          </div>

          <form onSubmit={handleSubmit(submitAssessment)} className="space-y-8">
            {/* Personal Reflection Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">1. Personal Reflection</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Past Experiences with Charitable Giving
                  </label>
                  <Textarea
                    rows={4}
                    {...register('personalReflection.pastExperiences')}
                    disabled={!canEdit}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Impact Reflection
                  </label>
                  <Textarea
                    rows={4}
                    {...register('personalReflection.impactReflection')}
                    disabled={!canEdit}
                  />
                </div>
              </div>
            </section>

            {/* Organization Comparison Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">2. Organization Comparison</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Future Leaders Initiative (FLI)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Program Expense Ratio
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('organizationComparison.fliMetrics.programExpenseRatio')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost per Student
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('organizationComparison.fliMetrics.costPerStudent')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cost per Hour
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('organizationComparison.fliMetrics.costPerHour')}
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Giving Plan Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">3. Giving Plan</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Monthly Allocation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Amount ($)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('givingPlan.monthlyAllocation.amount')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Percentage of Income
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('givingPlan.monthlyAllocation.percentage')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Impact ($)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('givingPlan.monthlyAllocation.taxImpact')}
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Analysis Section */}
            <section className="space-y-4">
              <h2 className="text-xl font-semibold">4. Impact Analysis</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Year 1 Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Students Impacted
                      </label>
                      <Input
                        type="number"
                        {...register('impactAnalysis.quantitative.year1.studentsImpacted')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Economic Benefit ($)
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register('impactAnalysis.quantitative.year1.economicBenefit')}
                        disabled={!canEdit}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Volunteer Hours
                      </label>
                      <Input
                        type="number"
                        {...register('impactAnalysis.quantitative.year1.volunteerHours')}
                        disabled={!canEdit}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Submission Controls */}
            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSubmit(saveDraft)}
                disabled={isSaving || !canEdit}
              >
                {isSaving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
              </Button>
            </div>
          </form>

          {assessment?.feedback && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Feedback</h2>
              <FeedbackList feedback={assessment.feedback} />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
} 