import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard14Assessment } from '../../../types/standard14';
import { Card } from '../../ui/Card';
import { Input } from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

interface Props {
  register: UseFormRegister<Standard14Assessment>;
  watch: UseFormWatch<Standard14Assessment>;
  setValue: UseFormSetValue<Standard14Assessment>;
}

export const ImpactAnalysis: React.FC<Props> = ({ register, watch, setValue }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Impact Analysis</h2>
        
        <div className="space-y-8">
          {/* Year 1 Impact */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Year 1 Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Impacted
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year1.studentsImpacted')}
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
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volunteer Hours
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year1.volunteerHours')}
                />
              </div>
            </div>
          </div>

          {/* Year 2 Impact */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Year 2 Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Impacted
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year2.studentsImpacted')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Economic Benefit ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('impactAnalysis.quantitative.year2.economicBenefit')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volunteer Hours
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year2.volunteerHours')}
                />
              </div>
            </div>
          </div>

          {/* Year 3 Impact */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Year 3 Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Students Impacted
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year3.studentsImpacted')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Economic Benefit ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('impactAnalysis.quantitative.year3.economicBenefit')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Volunteer Hours
                </label>
                <Input
                  type="number"
                  {...register('impactAnalysis.quantitative.year3.volunteerHours')}
                />
              </div>
            </div>
          </div>

          {/* Long-term Impact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Long-term Community Impact
            </label>
            <Textarea
              rows={6}
              {...register('impactAnalysis.longTermImpact')}
              placeholder="Describe the long-term impact on the community..."
            />
          </div>
        </div>
      </div>
    </Card>
  );
}; 