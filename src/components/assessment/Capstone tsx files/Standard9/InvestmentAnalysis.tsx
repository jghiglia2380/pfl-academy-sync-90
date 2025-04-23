import React from 'react';
import { UseFormRegister, UseFormWatch, UseFormSetValue } from 'react-hook-form';
import { Standard9Submission, InvestmentOption } from '../../../types/standard9';

interface InvestmentAnalysisProps {
  register: UseFormRegister<Standard9Submission>;
  watch: UseFormWatch<Standard9Submission>;
  setValue: UseFormSetValue<Standard9Submission>;
}

export const InvestmentAnalysis: React.FC<InvestmentAnalysisProps> = ({
  register,
  watch,
  setValue
}) => {
  const investmentOptions: InvestmentOption[] = [
    {
      name: 'S&P 500 Index Fund',
      type: 'ETF',
      riskLevel: 'Medium',
      expectedReturn: 0.08,
      minimumInvestment: 100,
      liquidity: 'High',
      fees: {
        managementFee: 0.0003,
        transactionFee: 0,
        otherFees: 0
      },
      historicalPerformance: {
        oneYear: 0.12,
        threeYear: 0.15,
        fiveYear: 0.10
      }
    },
    {
      name: 'Corporate Bond Fund',
      type: 'Mutual Fund',
      riskLevel: 'Low',
      expectedReturn: 0.04,
      minimumInvestment: 1000,
      liquidity: 'Medium',
      fees: {
        managementFee: 0.005,
        transactionFee: 0,
        otherFees: 0.001
      },
      historicalPerformance: {
        oneYear: 0.03,
        threeYear: 0.04,
        fiveYear: 0.035
      }
    },
    {
      name: 'Tech Growth Fund',
      type: 'Mutual Fund',
      riskLevel: 'High',
      expectedReturn: 0.12,
      minimumInvestment: 2500,
      liquidity: 'Medium',
      fees: {
        managementFee: 0.01,
        transactionFee: 0,
        otherFees: 0.002
      },
      historicalPerformance: {
        oneYear: 0.18,
        threeYear: 0.20,
        fiveYear: 0.15
      }
    },
    {
      name: 'Real Estate Investment Trust',
      type: 'Real Estate',
      riskLevel: 'Medium',
      expectedReturn: 0.07,
      minimumInvestment: 5000,
      liquidity: 'Low',
      fees: {
        managementFee: 0.008,
        transactionFee: 0.01,
        otherFees: 0.003
      },
      historicalPerformance: {
        oneYear: 0.06,
        threeYear: 0.08,
        fiveYear: 0.065
      }
    }
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Investment Analysis</h2>

      {/* Investment Options Comparison */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h4 className="font-medium text-gray-800 mb-4">Investment Options Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investmentOptions.map((option, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <h5 className="font-medium text-blue-800 mb-3">{option.name}</h5>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-chart-line text-green-500 mt-1 mr-2"></i>
                  <span>Type: {option.type}</span>
                </li>
                <li className="flex items-start">
                  <i className={`fas fa-exclamation-triangle ${
                    option.riskLevel === 'High' ? 'text-red-500' :
                    option.riskLevel === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                  } mt-1 mr-2`}></i>
                  <span>Risk Level: {option.riskLevel}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-percentage text-blue-500 mt-1 mr-2"></i>
                  <span>Expected Return: {(option.expectedReturn * 100).toFixed(1)}%</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-dollar-sign text-purple-500 mt-1 mr-2"></i>
                  <span>Minimum Investment: ${option.minimumInvestment.toLocaleString()}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-exchange-alt text-orange-500 mt-1 mr-2"></i>
                  <span>Liquidity: {option.liquidity}</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-file-invoice-dollar text-red-500 mt-1 mr-2"></i>
                  <span>Total Fees: {((option.fees.managementFee + option.fees.transactionFee + option.fees.otherFees) * 100).toFixed(2)}%</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-history text-gray-500 mt-1 mr-2"></i>
                  <span>Historical Performance:</span>
                </li>
                <ul className="ml-6 space-y-1">
                  <li className="flex items-start">
                    <i className="fas fa-arrow-up text-green-500 mt-1 mr-2"></i>
                    <span>1 Year: {(option.historicalPerformance.oneYear * 100).toFixed(1)}%</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-arrow-up text-green-500 mt-1 mr-2"></i>
                    <span>3 Year: {(option.historicalPerformance.threeYear * 100).toFixed(1)}%</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-arrow-up text-green-500 mt-1 mr-2"></i>
                    <span>5 Year: {(option.historicalPerformance.fiveYear * 100).toFixed(1)}%</span>
                  </li>
                </ul>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-chart-bar"></i>
          1.1 Investment Option Analysis
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Analyze each investment option:
          </p>
          <textarea
            {...register('investmentAnalysis.optionAnalysis')}
            rows={4}
            className="font-mono"
            placeholder="Compare and analyze each investment option based on risk, return, fees, and historical performance..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider factors such as risk level, expected returns, fees, and historical performance
          </div>
        </div>
      </div>

      <div className="response-area mb-8">
        <label className="block">
          <i className="fas fa-shield-alt"></i>
          1.2 Risk Assessment
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Evaluate the risks associated with each option:
          </p>
          <textarea
            {...register('investmentAnalysis.riskAssessment')}
            rows={4}
            className="font-mono"
            placeholder="Assess the risks associated with each investment option and how they align with different investor profiles..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider market risk, liquidity risk, and how these investments might perform in different economic conditions
          </div>
        </div>
      </div>

      <div className="response-area">
        <label className="block">
          <i className="fas fa-balance-scale"></i>
          1.3 Portfolio Recommendation
        </label>
        <div className="calculation-field">
          <p>
            <i className="fas fa-pencil-alt"></i>
            Develop a portfolio recommendation:
          </p>
          <textarea
            {...register('investmentAnalysis.portfolioRecommendation')}
            rows={4}
            className="font-mono"
            placeholder="Recommend an optimal portfolio allocation based on your analysis..."
          />
          <div className="hint">
            <i className="fas fa-info-circle mr-1"></i>
            Consider diversification, risk tolerance, and investment goals in your recommendation
          </div>
        </div>
      </div>
    </div>
  );
}; 