import React, { useState, useEffect } from 'react';

interface LongTermCostProjectionProps {
    onCalculate?: (projections: CostProjection[]) => void;
}

interface CostProjection {
    providerName: string;
    yearlyFees: number[];
    yearlyInterestEarned: number[];
    yearlyInterestPaid: number[];
    netCost: number[];
}

interface ProjectionInputs {
    initialDeposit: number;
    monthlyDeposit: number;
    loanAmount: number;
    creditCardUsage: number;
    projectionYears: number;
}

const LongTermCostProjection: React.FC<LongTermCostProjectionProps> = ({ onCalculate }) => {
    const [inputs, setInputs] = useState<ProjectionInputs>({
        initialDeposit: 1000,
        monthlyDeposit: 100,
        loanAmount: 0,
        creditCardUsage: 0,
        projectionYears: 5
    });

    const [providers, setProviders] = useState([{
        name: '',
        monthlyFee: 0,
        atmFees: 0,
        minimumBalanceFee: 0,
        savingsRate: 0,
        loanRate: 0,
        creditCardRate: 0
    }]);

    const [projections, setProjections] = useState<CostProjection[]>([]);

    const calculateProjections = () => {
        const newProjections = providers.map(provider => {
            const yearlyFees: number[] = [];
            const yearlyInterestEarned: number[] = [];
            const yearlyInterestPaid: number[] = [];
            const netCost: number[] = [];

            let balance = inputs.initialDeposit;
            let loanBalance = inputs.loanAmount;
            let creditCardBalance = inputs.creditCardUsage;

            for (let year = 0; year < inputs.projectionYears; year++) {
                // Calculate yearly fees
                const annualFees = (provider.monthlyFee * 12) + 
                                 (provider.minimumBalanceFee * 12) +
                                 (provider.atmFees * 12);
                yearlyFees.push(annualFees);

                // Calculate interest earned on savings
                const yearlyDeposits = inputs.monthlyDeposit * 12;
                const averageBalance = balance + (yearlyDeposits / 2);
                const interestEarned = averageBalance * (provider.savingsRate / 100);
                yearlyInterestEarned.push(interestEarned);

                // Calculate interest paid on loans and credit cards
                const loanInterest = loanBalance * (provider.loanRate / 100);
                const creditCardInterest = creditCardBalance * (provider.creditCardRate / 100);
                const totalInterestPaid = loanInterest + creditCardInterest;
                yearlyInterestPaid.push(totalInterestPaid);

                // Calculate net cost
                const yearlyNet = annualFees + totalInterestPaid - interestEarned;
                netCost.push(yearlyNet);

                // Update balances for next year
                balance += yearlyDeposits + interestEarned;
                loanBalance = Math.max(0, loanBalance - (loanBalance * 0.1)); // Assume 10% loan paydown
                creditCardBalance = creditCardBalance * 0.9; // Assume 10% credit card paydown
            }

            return {
                providerName: provider.name,
                yearlyFees,
                yearlyInterestEarned,
                yearlyInterestPaid,
                netCost
            };
        });

        setProjections(newProjections);
        onCalculate?.(newProjections);
    };

    useEffect(() => {
        calculateProjections();
    }, [inputs, providers]);

    const handleInputChange = (field: keyof ProjectionInputs, value: number) => {
        setInputs(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleProviderChange = (index: number, field: string, value: number | string) => {
        const updatedProviders = [...providers];
        updatedProviders[index] = {
            ...updatedProviders[index],
            [field]: value
        };
        setProviders(updatedProviders);
    };

    const addProvider = () => {
        setProviders([...providers, {
            name: '',
            monthlyFee: 0,
            atmFees: 0,
            minimumBalanceFee: 0,
            savingsRate: 0,
            loanRate: 0,
            creditCardRate: 0
        }]);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                <i className="fas fa-chart-line text-blue-600 mr-2"></i>
                Long-term Cost Projection
            </h2>

            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Financial Profile</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Initial Deposit ($)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={inputs.initialDeposit}
                            onChange={(e) => handleInputChange('initialDeposit', parseFloat(e.target.value) || 0)}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Monthly Deposit ($)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={inputs.monthlyDeposit}
                            onChange={(e) => handleInputChange('monthlyDeposit', parseFloat(e.target.value) || 0)}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Loan Amount ($)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={inputs.loanAmount}
                            onChange={(e) => handleInputChange('loanAmount', parseFloat(e.target.value) || 0)}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Credit Card Usage ($)
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={inputs.creditCardUsage}
                            onChange={(e) => handleInputChange('creditCardUsage', parseFloat(e.target.value) || 0)}
                            min="0"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Projection Years
                        </label>
                        <input
                            type="number"
                            className="w-full p-2 border rounded-md"
                            value={inputs.projectionYears}
                            onChange={(e) => handleInputChange('projectionYears', parseInt(e.target.value) || 1)}
                            min="1"
                            max="30"
                        />
                    </div>
                </div>
            </div>

            {providers.map((provider, index) => (
                <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Provider Name
                            </label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={provider.name}
                                onChange={(e) => handleProviderChange(index, 'name', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Monthly Fee ($)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.monthlyFee}
                                onChange={(e) => handleProviderChange(index, 'monthlyFee', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Monthly ATM Fees ($)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.atmFees}
                                onChange={(e) => handleProviderChange(index, 'atmFees', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Minimum Balance Fee ($)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.minimumBalanceFee}
                                onChange={(e) => handleProviderChange(index, 'minimumBalanceFee', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Savings Rate (%)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.savingsRate}
                                onChange={(e) => handleProviderChange(index, 'savingsRate', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Loan Rate (%)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.loanRate}
                                onChange={(e) => handleProviderChange(index, 'loanRate', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Credit Card Rate (%)
                            </label>
                            <input
                                type="number"
                                className="w-full p-2 border rounded-md"
                                value={provider.creditCardRate}
                                onChange={(e) => handleProviderChange(index, 'creditCardRate', parseFloat(e.target.value) || 0)}
                                min="0"
                                step="0.01"
                            />
                        </div>
                    </div>

                    {projections[index] && (
                        <div className="mt-4">
                            <h4 className="font-medium text-gray-800 mb-2">Projection Results</h4>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Year</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Fees</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Interest Earned</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Interest Paid</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">Net Cost</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {projections[index].yearlyFees.map((_, yearIndex) => (
                                            <tr key={yearIndex}>
                                                <td className="px-4 py-2 text-sm text-gray-900">Year {yearIndex + 1}</td>
                                                <td className="px-4 py-2 text-right text-sm text-gray-900">
                                                    ${projections[index].yearlyFees[yearIndex].toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 text-right text-sm text-green-600">
                                                    ${projections[index].yearlyInterestEarned[yearIndex].toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 text-right text-sm text-red-600">
                                                    ${projections[index].yearlyInterestPaid[yearIndex].toFixed(2)}
                                                </td>
                                                <td className="px-4 py-2 text-right text-sm font-medium text-gray-900">
                                                    ${projections[index].netCost[yearIndex].toFixed(2)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <button
                type="button"
                onClick={addProvider}
                className="text-blue-600 hover:text-blue-800"
            >
                <i className="fas fa-plus-circle mr-1"></i>Add Another Provider
            </button>
        </div>
    );
};

export default LongTermCostProjection; 