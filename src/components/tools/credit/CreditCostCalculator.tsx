import React, { useState } from 'react';

interface CreditCostCalculatorProps {
    onCalculate: (totalCost: number, monthlyPayment: number) => void;
}

export const CreditCostCalculator: React.FC<CreditCostCalculatorProps> = ({ onCalculate }) => {
    const [principal, setPrincipal] = useState<number>(1000);
    const [apr, setApr] = useState<number>(20.99);
    const [term, setTerm] = useState<number>(12);
    const [results, setResults] = useState<{
        totalCost: number;
        monthlyPayment: number;
        totalInterest: number;
    } | null>(null);

    const calculateCosts = () => {
        const monthlyRate = apr / 100 / 12;
        const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / 
                              (Math.pow(1 + monthlyRate, term) - 1);
        const totalCost = monthlyPayment * term;
        const totalInterest = totalCost - principal;

        const results = {
            totalCost: parseFloat(totalCost.toFixed(2)),
            monthlyPayment: parseFloat(monthlyPayment.toFixed(2)),
            totalInterest: parseFloat(totalInterest.toFixed(2))
        };

        setResults(results);
        onCalculate(results.totalCost, results.monthlyPayment);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Credit Cost Calculator</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Loan Amount ($)
                    </label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Annual Percentage Rate (%)
                    </label>
                    <input
                        type="number"
                        value={apr}
                        onChange={(e) => setApr(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Term (months)
                    </label>
                    <input
                        type="number"
                        value={term}
                        onChange={(e) => setTerm(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={calculateCosts}
                    className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Calculate
                </button>

                {results && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                        <h4 className="font-semibold mb-2">Results:</h4>
                        <div className="space-y-2">
                            <p>Monthly Payment: ${results.monthlyPayment}</p>
                            <p>Total Interest: ${results.totalInterest}</p>
                            <p>Total Cost: ${results.totalCost}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}; 