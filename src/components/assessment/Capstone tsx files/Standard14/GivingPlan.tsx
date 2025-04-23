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

export const GivingPlan: React.FC<Props> = ({ register, watch, setValue }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Giving Plan</h2>
        
        <div className="space-y-8">
          {/* Monthly Allocation */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Monthly Allocation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('givingPlan.monthlyAllocation.amount')}
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
                />
              </div>
            </div>
          </div>

          {/* Year-End Giving */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Year-End Giving</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('givingPlan.yearEndGiving.amount')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Percentage of Income
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('givingPlan.yearEndGiving.percentage')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Impact ($)
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('givingPlan.yearEndGiving.taxImpact')}
                />
              </div>
            </div>
          </div>

          {/* Strategy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giving Strategy
            </label>
            <Textarea
              rows={6}
              {...register('givingPlan.strategy')}
              placeholder="Describe your giving strategy, including how you'll allocate funds between organizations..."
            />
          </div>
        </div>
      </div>
    </Card>
  );
}; 