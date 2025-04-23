import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { Button } from '../../ui/Button';
import { Standard14Assessment } from '../../../types/standard14';

interface Props {
  assessment: Standard14Assessment;
  onSubmit: (grade: any) => Promise<void>;
}

export function Standard14Evaluation({ assessment, onSubmit }: Props) {
  const { register, handleSubmit } = useForm();

  const evaluationCriteria = {
    personalReflection: {
      weight: 25,
      criteria: [
        "Depth of reflection",
        "Understanding of values",
        "Future goals clarity",
        "Impact awareness"
      ]
    },
    organizationComparison: {
      weight: 25,
      criteria: [
        "Financial analysis accuracy",
        "Effectiveness comparison",
        "Cost-benefit analysis",
        "Decision rationale"
      ]
    },
    givingPlan: {
      weight: 25,
      criteria: [
        "Budget allocation",
        "Tax impact understanding",
        "Strategic planning",
        "Implementation feasibility"
      ]
    },
    impactAnalysis: {
      weight: 25,
      criteria: [
        "Quantitative analysis",
        "Long-term impact assessment",
        "Community benefit evaluation",
        "Sustainability considerations"
      ]
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Evaluation Criteria</h2>
          
          {/* Personal Reflection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Personal Reflection (25%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-25)</label>
                <Input
                  type="number"
                  min="0"
                  max="25"
                  {...register('scores.personalReflection')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.personalReflection')} />
              </div>
            </div>
          </div>

          {/* Organization Comparison */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Organization Comparison (25%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-25)</label>
                <Input
                  type="number"
                  min="0"
                  max="25"
                  {...register('scores.organizationComparison')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.organizationComparison')} />
              </div>
            </div>
          </div>

          {/* Giving Plan */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Giving Plan (25%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-25)</label>
                <Input
                  type="number"
                  min="0"
                  max="25"
                  {...register('scores.givingPlan')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.givingPlan')} />
              </div>
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Impact Analysis (25%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-25)</label>
                <Input
                  type="number"
                  min="0"
                  max="25"
                  {...register('scores.impactAnalysis')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.impactAnalysis')} />
              </div>
            </div>
          </div>

          {/* Overall Feedback */}
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Overall Feedback</h3>
            <Textarea
              rows={4}
              {...register('feedback.overall')}
              placeholder="Provide overall feedback on the student's performance..."
            />
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button type="submit">Submit Evaluation</Button>
      </div>
    </form>
  );
} 