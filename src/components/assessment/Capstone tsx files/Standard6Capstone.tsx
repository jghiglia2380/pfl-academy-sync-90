import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface TaxAnalysis {
  grossIncome: number;
  adjustments: number;
  analysis: string;
}

interface DeductionPlan {
  deductionMethod: 'standard' | 'itemized';
  totalDeductions: number;
  strategy: string;
}

interface TaxStrategy {
  shortTerm: string;
  longTerm: string;
  timeline: string;
}

interface Standard6CapstoneProps {
  onSubmit: (data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
  }) => void;
  onSaveDraft: (data: any) => void;
}

export const Standard6Capstone: React.FC<Standard6CapstoneProps> = ({
  onSubmit,
  onSaveDraft,
}) => {
  const { register, handleSubmit, watch } = useForm();
  const [activeSection, setActiveSection] = useState<number>(1);

  const handleFormSubmit = (data: any) => {
    const formattedData = {
      taxAnalysis: {
        grossIncome: parseFloat(data.grossIncome),
        adjustments: parseFloat(data.adjustments),
        analysis: data.analysis,
      },
      deductionPlan: {
        deductionMethod: data.deductionMethod,
        totalDeductions: parseFloat(data.totalDeductions),
        strategy: data.deductionStrategy,
      },
      taxStrategy: {
        shortTerm: data.shortTermStrategy,
        longTerm: data.longTermStrategy,
        timeline: data.implementationTimeline,
      },
    };
    onSubmit(formattedData);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Project Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Tax Planning and Strategy Project
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Standard 6: Tax Planning and Strategy
        </p>
        <div className="flex gap-2 mb-6">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            <i className="fas fa-clock mr-2"></i>45 Minutes
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <i className="fas fa-calculator mr-2"></i>Tools Provided
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            <i className="fas fa-chart-line mr-2"></i>Analysis Required
          </span>
        </div>
        <p className="text-gray-700">
          In this capstone project, you will demonstrate your understanding of tax planning principles and strategies.
          You'll analyze different tax scenarios, evaluate deduction opportunities, and develop comprehensive tax planning strategies.
        </p>
      </div>

      {/* Project Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Project Tasks</h2>
        
        <div className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Tax Situation Analysis (15 minutes)</h3>
          <p className="text-gray-600 mb-3">Analyze income sources and potential tax implications</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Review provided income information</li>
            <li>Identify applicable tax brackets</li>
            <li>Calculate estimated tax liability</li>
            <li>Analyze impact of different income types</li>
            <li>Consider state and local tax implications</li>
          </ul>
        </div>

        <div className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Deduction Planning (15 minutes)</h3>
          <p className="text-gray-600 mb-3">Evaluate and optimize deduction opportunities</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Identify eligible deductions</li>
            <li>Compare standard vs. itemized deductions</li>
            <li>Analyze retirement contribution benefits</li>
            <li>Evaluate education-related deductions</li>
            <li>Consider charitable giving strategies</li>
          </ul>
        </div>

        <div className="border-l-4 border-purple-500 bg-gray-50 p-4 rounded-r-lg">
          <h3 className="font-medium text-gray-800 mb-2">Tax Strategy Development (15 minutes)</h3>
          <p className="text-gray-600 mb-3">Create comprehensive tax planning recommendations</p>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Develop tax-efficient strategies</li>
            <li>Plan for future tax years</li>
            <li>Consider timing of income/deductions</li>
            <li>Recommend record-keeping practices</li>
            <li>Address potential tax law changes</li>
          </ul>
        </div>
      </div>

      {/* Reference Data */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Reference Data</h2>

        {/* Income Scenarios */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Sample Income Scenarios</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Income Source</th>
                  <th className="px-4 py-2 border">Annual Amount</th>
                  <th className="px-4 py-2 border">Tax Treatment</th>
                  <th className="px-4 py-2 border">Special Considerations</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Salary</td>
                  <td className="px-4 py-2 border">$75,000</td>
                  <td className="px-4 py-2 border">Ordinary Income</td>
                  <td className="px-4 py-2 border">Subject to FICA taxes</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Freelance Income</td>
                  <td className="px-4 py-2 border">$15,000</td>
                  <td className="px-4 py-2 border">Self-Employment</td>
                  <td className="px-4 py-2 border">Quarterly estimated payments required</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Investment Dividends</td>
                  <td className="px-4 py-2 border">$5,000</td>
                  <td className="px-4 py-2 border">Qualified/Non-qualified</td>
                  <td className="px-4 py-2 border">Potential preferential rates</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Capital Gains</td>
                  <td className="px-4 py-2 border">$10,000</td>
                  <td className="px-4 py-2 border">Long-term</td>
                  <td className="px-4 py-2 border">Lower tax rates apply</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Deduction Information */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Available Deductions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Standard Deduction (2024)</h4>
              <ul className="space-y-1">
                <li>Single: $14,600</li>
                <li>Married Filing Jointly: $29,200</li>
                <li>Head of Household: $21,900</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">Common Itemized Deductions</h4>
              <ul className="space-y-1">
                <li>Mortgage Interest: $12,000</li>
                <li>State/Local Taxes: $10,000 cap</li>
                <li>Charitable Contributions: $5,000</li>
                <li>Medical Expenses: Above 7.5% AGI</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tax Credits */}
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Available Tax Credits</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border">Credit Type</th>
                  <th className="px-4 py-2 border">Maximum Amount</th>
                  <th className="px-4 py-2 border">Income Limits</th>
                  <th className="px-4 py-2 border">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Child Tax Credit</td>
                  <td className="px-4 py-2 border">$2,000 per child</td>
                  <td className="px-4 py-2 border">Phases out at $200,000 (single)</td>
                  <td className="px-4 py-2 border">Partially refundable</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Education Credits</td>
                  <td className="px-4 py-2 border">Up to $2,500</td>
                  <td className="px-4 py-2 border">Varies by credit type</td>
                  <td className="px-4 py-2 border">American Opportunity/Lifetime Learning</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Retirement Savings</td>
                  <td className="px-4 py-2 border">Up to $1,000</td>
                  <td className="px-4 py-2 border">Based on contributions</td>
                  <td className="px-4 py-2 border">Saver's Credit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        {/* Tax Situation Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            1. Tax Situation Analysis
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gross Income
                </label>
                <input
                  type="number"
                  {...register('grossIncome')}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter gross income"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adjustments
                </label>
                <input
                  type="number"
                  {...register('adjustments')}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter adjustments"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Analysis
              </label>
              <textarea
                {...register('analysis')}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Explain your tax liability calculations and analysis..."
              />
            </div>
          </div>
        </div>

        {/* Deduction Planning */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            2. Deduction Planning
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deduction Method
                </label>
                <select
                  {...register('deductionMethod')}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Choose deduction method...</option>
                  <option value="standard">Standard Deduction</option>
                  <option value="itemized">Itemized Deductions</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Deductions
                </label>
                <input
                  type="number"
                  {...register('totalDeductions')}
                  className="w-full p-2 border rounded-md"
                  placeholder="$0.00"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deduction Strategy
              </label>
              <textarea
                {...register('deductionStrategy')}
                rows={4}
                className="w-full p-2 border rounded-md"
                placeholder="Explain your deduction strategy and calculations..."
              />
            </div>
          </div>
        </div>

        {/* Tax Strategy */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            3. Tax Strategy Recommendations
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short-term Strategies (1-2 years)
              </label>
              <textarea
                {...register('shortTermStrategy')}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Outline immediate tax planning recommendations..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Long-term Strategies (3-5 years)
              </label>
              <textarea
                {...register('longTermStrategy')}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Outline long-term tax planning recommendations..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Implementation Timeline
              </label>
              <textarea
                {...register('implementationTimeline')}
                rows={3}
                className="w-full p-2 border rounded-md"
                placeholder="Provide a timeline for implementing tax strategies..."
              />
            </div>
          </div>
        </div>

        {/* Evaluation Criteria */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Evaluation Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Tax Analysis (35%)</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Accurate tax calculations</li>
                <li>• Understanding of tax concepts</li>
                <li>• Income source analysis</li>
                <li>• Tax bracket considerations</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Deduction Planning (35%)</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Deduction identification</li>
                <li>• Optimization strategy</li>
                <li>• Calculation accuracy</li>
                <li>• Documentation approach</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Strategy Development (30%)</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Strategic planning</li>
                <li>• Implementation feasibility</li>
                <li>• Long-term considerations</li>
                <li>• Risk assessment</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submission Controls */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => handleSubmit(onSaveDraft)()}
            className="px-6 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
          >
            Save Draft
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Submit Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default Standard6Capstone; 