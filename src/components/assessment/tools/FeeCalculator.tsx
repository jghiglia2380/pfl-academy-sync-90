import React, { useState } from 'react';

interface FeeCalculatorProps {
    onCalculate?: (totalFees: number) => void;
}

interface FeeStructure {
    monthlyFee: number;
    atmFees: number;
    overdraftFees: number;
    minimumBalanceFee: number;
    estimatedMonthlyAtmUses: number;
    estimatedYearlyOverdrafts: number;
}

const FeeCalculator: React.FC<FeeCalculatorProps> = ({ onCalculate }) => {
    const [fees, setFees] = useState<FeeStructure>({
        monthlyFee: 0,
        atmFees: 0,
        overdraftFees: 0,
        minimumBalanceFee: 0,
        estimatedMonthlyAtmUses: 0,
        estimatedYearlyOverdrafts: 0
    });

    const calculateAnnualFees = () => {
        const annualMonthlyFees = fees.monthlyFee * 12;
        const annualAtmFees = fees.atmFees * fees.estimatedMonthlyAtmUses * 12;
        const annualOverdraftFees = fees.overdraftFees * fees.estimatedYearlyOverdrafts;
        const annualMinBalanceFees = fees.minimumBalanceFee * 12;

        const totalAnnualFees = annualMonthlyFees + annualAtmFees + 
                               annualOverdraftFees + annualMinBalanceFees;
        
        onCalculate?.(totalAnnualFees);
        return totalAnnualFees;
    };

    const handleInputChange = (field: keyof FeeStructure, value: string) => {
        setFees(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }));
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                <i className="fas fa-calculator text-blue-600 mr-2"></i>
                Fee Comparison Calculator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Maintenance Fee ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.monthlyFee || ''}
                        onChange={(e) => handleInputChange('monthlyFee', e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        ATM Fee per Use ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.atmFees || ''}
                        onChange={(e) => handleInputChange('atmFees', e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Monthly ATM Uses
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.estimatedMonthlyAtmUses || ''}
                        onChange={(e) => handleInputChange('estimatedMonthlyAtmUses', e.target.value)}
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Overdraft Fee ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.overdraftFees || ''}
                        onChange={(e) => handleInputChange('overdraftFees', e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Estimated Yearly Overdrafts
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.estimatedYearlyOverdrafts || ''}
                        onChange={(e) => handleInputChange('estimatedYearlyOverdrafts', e.target.value)}
                        min="0"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Minimum Balance Fee ($)
                    </label>
                    <input
                        type="number"
                        className="w-full p-2 border rounded-md"
                        value={fees.minimumBalanceFee || ''}
                        onChange={(e) => handleInputChange('minimumBalanceFee', e.target.value)}
                        min="0"
                        step="0.01"
                    />
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">
                        Estimated Annual Fees:
                    </span>
                    <span className="text-xl font-bold text-blue-600">
                        ${calculateAnnualFees().toFixed(2)}
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    This calculation is based on the provided estimates and may vary based on actual usage patterns.
                </p>
            </div>
        </div>
    );
};

export default FeeCalculator; 