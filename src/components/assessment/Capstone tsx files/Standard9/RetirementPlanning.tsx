import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard9Submission, RetirementScenario } from '../../../types/standard9';

interface RetirementPlanningProps {
  register: UseFormRegister<Standard9Submission>;
  watch: UseFormWatch<Standard9Submission>;
  setValue: UseFormSetValue<Standard9Submission>;
}

export const RetirementPlanning: React.FC<RetirementPlanningProps> = ({
  register,
  watch,
  setValue
}) => {
  const retirementScenarios: RetirementScenario[] = [
    {
      currentAge: 25,
      retirementAge: 65,
      currentSavings: 0,
      annualContribution: 6000,
      expectedReturn: 0.07,
      inflationRate: 0.03,
      lifeExpectancy: 85
    },
    {
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 50000,
      annualContribution: 12000,
      expectedReturn: 0.06,
      inflationRate: 0.03,
      lifeExpectancy: 85
    },
    {
      currentAge: 45,
      retirementAge: 65,
      currentSavings: 150000,
      annualContribution: 18000,
      expectedReturn: 0.05,
      inflationRate: 0.03,
      lifeExpectancy: 85
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Retirement Planning</h2>

      {/* Retirement Scenarios */}
      <div className="bg-green-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Retirement Scenarios</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retirementScenarios.map((scenario, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">Scenario {index + 1}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-user text-purple-500 mt-1 mr-2"></i>
                  <span>Current Age: {scenario.currentAge}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-calendar-alt text-blue-500 mt-1 mr-2"></i>
                  <span>Years Until Retirement: {scenario.retirementAge - scenario.currentAge}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-piggy-bank text-green-500 mt-1 mr-2"></i>
                  <span>Current Savings: ${scenario.currentSavings.toLocaleString()}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-plus-circle text-orange-500 mt-1 mr-2"></i>
                  <span>Annual Contribution: ${scenario.annualContribution.toLocaleString()}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chart-line text-yellow-500 mt-1 mr-2"></i>
                  <span>Expected Return: {(scenario.expectedReturn * 100).toFixed(1)}%</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-chart-bar text-red-500 mt-1 mr-2"></i>
                  <span>Inflation Rate: {(scenario.inflationRate * 100).toFixed(1)}%</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-hourglass-half text-gray-500 mt-1 mr-2"></i>
                  <span>Retirement Duration: {scenario.lifeExpectancy - scenario.retirementAge} years</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-calculator"></i>
          2.1 Scenario Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Analyze each retirement scenario:
          </p>
          <textarea
            {...register('retirementPlanning.scenarioAnalysis')}
            rows={4}
            className="font-mono"
            placeholder="Calculate and analyze the retirement savings potential for each scenario..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider factors such as compound growth, inflation, and retirement duration
          </div>
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-piggy-bank"></i>
          2.2 Savings Strategy
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Develop a savings strategy:
          </p>
          <textarea
            {...register('retirementPlanning.savingsStrategy')}
            rows={4}
            className="font-mono"
            placeholder="Outline a comprehensive savings strategy for each scenario..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider contribution amounts, investment vehicles, and tax implications
          </div>
        </div>
      </div>

      <div className="response-area">
        <label className="block">
          <i className="fas fa-shield-alt"></i>
          2.3 Risk Management
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Address potential risks:
          </p>
          <textarea
            {...register('retirementPlanning.riskManagement')}
            rows={4}
            className="font-mono"
            placeholder="Identify and address potential risks in each retirement scenario..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider market volatility, inflation risk, and longevity risk
          </div>
        </div>
      </div>
    </div>
  );
}; 