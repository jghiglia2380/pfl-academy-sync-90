import React, { useState, useEffect } from 'react';

interface CreditFactor {
    name: string;
    weight: number;
    value: number;
    description: string;
}

interface CreditScoreSimulatorProps {
    onScoreChange?: (score: number) => void;
}

export const CreditScoreSimulator: React.FC<CreditScoreSimulatorProps> = ({ onScoreChange }) => {
    const initialFactors: CreditFactor[] = [
        {
            name: "Payment History",
            weight: 0.35,
            value: 100,
            description: "Percentage of payments made on time"
        },
        {
            name: "Credit Utilization",
            weight: 0.30,
            value: 30,
            description: "Percentage of available credit being used"
        },
        {
            name: "Credit History Length",
            weight: 0.15,
            value: 60,
            description: "Length of credit history in months"
        },
        {
            name: "Credit Mix",
            weight: 0.10,
            value: 70,
            description: "Diversity of credit types (credit cards, loans, etc.)"
        },
        {
            name: "New Credit",
            weight: 0.10,
            value: 90,
            description: "Recent credit applications and new accounts"
        }
    ];

    const [factors, setFactors] = useState<CreditFactor[]>(initialFactors);
    const [creditScore, setCreditScore] = useState<number>(0);

    const calculateScore = () => {
        const score = factors.reduce((total, factor) => {
            return total + (factor.value * factor.weight);
        }, 0);
        
        // Scale to 300-850 range
        const scaledScore = Math.round(300 + (score * 5.5));
        return Math.min(850, Math.max(300, scaledScore));
    };

    useEffect(() => {
        const newScore = calculateScore();
        setCreditScore(newScore);
        if (onScoreChange) {
            onScoreChange(newScore);
        }
    }, [factors]);

    const handleFactorChange = (index: number, newValue: number) => {
        const updatedFactors = [...factors];
        updatedFactors[index] = {
            ...updatedFactors[index],
            value: Math.max(0, Math.min(100, newValue))
        };
        setFactors(updatedFactors);
    };

    const getScoreCategory = (score: number): string => {
        if (score >= 800) return "Excellent";
        if (score >= 740) return "Very Good";
        if (score >= 670) return "Good";
        if (score >= 580) return "Fair";
        return "Poor";
    };

    const getScoreCategoryColor = (score: number): string => {
        if (score >= 800) return "text-green-600";
        if (score >= 740) return "text-green-500";
        if (score >= 670) return "text-yellow-500";
        if (score >= 580) return "text-orange-500";
        return "text-red-500";
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Credit Score Simulator</h3>
            
            <div className="mb-6">
                <div className="text-center mb-2">
                    <span className="text-3xl font-bold">
                        {creditScore}
                    </span>
                    <span className={`ml-2 font-semibold ${getScoreCategoryColor(creditScore)}`}>
                        {getScoreCategory(creditScore)}
                    </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${((creditScore - 300) / 550) * 100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300</span>
                    <span>850</span>
                </div>
            </div>

            <div className="space-y-4">
                {factors.map((factor, index) => (
                    <div key={factor.name}>
                        <div className="flex justify-between mb-1">
                            <label className="block text-sm font-medium text-gray-700">
                                {factor.name} ({factor.weight * 100}%)
                            </label>
                            <span className="text-sm text-gray-500">
                                {factor.value}
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={factor.value}
                            onChange={(e) => handleFactorChange(index, Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}; 