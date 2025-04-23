import React from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { Standard9Submission } from '../../types/standard9';

interface Props {
  assessment: Standard9Submission;
  onSubmit: (grade: any) => Promise<void>;
}

export function Standard9Evaluation({ assessment, onSubmit }: Props) {
  const { register, handleSubmit } = useForm();

  const evaluationCriteria = {
    fraudAnalysis: {
      weight: 35,
      criteria: [
        "Identification of red flags",
        "Understanding of psychological manipulation",
        "Verification process knowledge",
        "Multi-channel threat awareness"
      ]
    },
    investmentProtection: {
      weight: 35,
      criteria: [
        "Crypto scam identification",
        "Loss calculation accuracy",
        "Framework development",
        "Risk assessment quality"
      ]
    },
    dataBreachResponse: {
      weight: 30,
      criteria: [
        "Response plan completeness",
        "Monitoring strategy",
        "Documentation quality",
        "Prevention measures"
      ]
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Evaluation Criteria</h2>
          
          {/* Fraud Analysis */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Fraud Analysis (35%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-35)</label>
                <Input
                  type="number"
                  min="0"
                  max="35"
                  {...register('scores.fraudAnalysis')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.fraudAnalysis')} />
              </div>
            </div>
          </div>

          {/* Investment Protection */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Investment Protection (35%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-35)</label>
                <Input
                  type="number"
                  min="0"
                  max="35"
                  {...register('scores.investmentProtection')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.investmentProtection')} />
              </div>
            </div>
          </div>

          {/* Data Breach Response */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Data Breach Response (30%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Score (0-30)</label>
                <Input
                  type="number"
                  min="0"
                  max="30"
                  {...register('scores.dataBreachResponse')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Comments</label>
                <Textarea {...register('feedback.dataBreachResponse')} />
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