import React, { useState } from 'react';

interface ReturnCalculatorProps {
    onCalculate?: (results: ReturnCalculationResults) => void;
}

interface ReturnCalculationResults {
    totalReturn: number;
    annualizedReturn: number;
    futureValue: number;
    returnBreakdown: {
        capitalGains: number;
        dividends: number;
        interestIncome: number;
    };
}

export const ReturnCalculator: React.FC<ReturnCalculatorProps> = ({ onCalculate }) => {
    const [investment, setInvestment] = useState({
        initialAmount: 10000,
        monthlyContribution: 500,
        investmentPeriod: 5,
        expectedReturn: 8,
        dividendYield: 2,
        interestRate: 3
    });

    const calculateReturns = () => {
        const {
            initialAmount,
            monthlyContribution,
            investmentPeriod,
            expectedReturn,
            dividendYield,
            interestRate
        } = investment;

        // Calculate future value with monthly contributions
        const monthlyRate = expectedReturn / 100 / 12;
        const numberOfMonths = investmentPeriod * 12;
        
        const futureValue = initialAmount * Math.pow(1 + monthlyRate, numberOfMonths) +
            monthlyContribution * ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);

        // Calculate total return
        const totalInvested = initialAmount + (monthlyContribution * numberOfMonths);
        const totalReturn = ((futureValue - totalInvested) / totalInvested) * 100;

        // Calculate annualized return
        const annualizedReturn = (Math.pow(futureValue / totalInvested, 1 / investmentPeriod) - 1) * 100;

        // Calculate return breakdown
        const capitalGains = (expectedReturn - dividendYield - interestRate) / 100 * totalInvested;
        const dividends = (dividendYield / 100) * totalInvested;
        const interestIncome = (interestRate / 100) * totalInvested;

        const results: ReturnCalculationResults = {
            totalReturn,
            annualizedReturn,
            futureValue,
            returnBreakdown: {
                capitalGains,
                dividends,
                interestIncome
            }
        };

        onCalculate?.(results);
        return results;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Return Calculator</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Initial Investment Amount ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.initialAmount}
                        onChange={(e) => setInvestment({
                            ...investment,
                            initialAmount: Number(e.target.value)
                        })}
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Contribution ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.monthlyContribution}
                        onChange={(e) => setInvestment({
                            ...investment,
                            monthlyContribution: Number(e.target.value)
                        })}
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Investment Period (Years)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.investmentPeriod}
                        onChange={(e) => setInvestment({
                            ...investment,
                            investmentPeriod: Number(e.target.value)
                        })}
                        min="1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Expected Annual Return (%)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.expectedReturn}
                        onChange={(e) => setInvestment({
                            ...investment,
                            expectedReturn: Number(e.target.value)
                        })}
                        step="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Dividend Yield (%)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.dividendYield}
                        onChange={(e) => setInvestment({
                            ...investment,
                            dividendYield: Number(e.target.value)
                        })}
                        step="0.1"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Interest Rate (%)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={investment.interestRate}
                        onChange={(e) => setInvestment({
                            ...investment,
                            interestRate: Number(e.target.value)
                        })}
                        step="0.1"
                    />
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={calculateReturns}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Calculate Returns
                </button>
            </div>
        </div>
    );
};

export default ReturnCalculator; 