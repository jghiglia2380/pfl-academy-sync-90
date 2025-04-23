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

export const OrganizationComparison: React.FC<Props> = ({ register, watch, setValue }) => {
  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Organization Comparison</h2>
        
        <div className="space-y-8">
          {/* FLI Metrics */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Future Leaders Initiative (FLI)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program Expense Ratio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('organizationComparison.fliMetrics.programExpenseRatio')}
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
                />
              </div>
            </div>
          </div>

          {/* CEF Metrics */}
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Community Education Foundation (CEF)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Program Expense Ratio
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('organizationComparison.cefMetrics.programExpenseRatio')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Student
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('organizationComparison.cefMetrics.costPerStudent')}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cost per Hour
                </label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('organizationComparison.cefMetrics.costPerHour')}
                />
              </div>
            </div>
          </div>

          {/* Effectiveness Analysis */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Effectiveness Analysis
            </label>
            <Textarea
              rows={6}
              {...register('organizationComparison.effectivenessAnalysis')}
              placeholder="Compare and analyze the effectiveness of both organizations..."
            />
          </div>
        </div>
      </div>
    </Card>
  );
}; 