import React from 'react';
import { Table } from '../../common/Table';

interface CreditOption {
    name: string;
    apr: number;
    annualFee: number;
    rewardsRate: number;
    creditLimit: number;
}

interface Props {
    creditOptions: CreditOption[];
    onUpdateOptions: (options: CreditOption[]) => void;
}

export const CreditCardComparisonTool: React.FC<Props> = ({ creditOptions, onUpdateOptions }) => {
    const columns = [
        { header: 'Card Name', key: 'name' },
        { 
            header: 'APR', 
            key: 'apr',
            render: (value: number) => `${value.toFixed(2)}%`
        },
        { 
            header: 'Annual Fee', 
            key: 'annualFee',
            render: (value: number) => `$${value}`
        },
        { 
            header: 'Rewards Rate', 
            key: 'rewardsRate',
            render: (value: number) => `${value}%`
        },
        { 
            header: 'Credit Limit', 
            key: 'creditLimit',
            render: (value: number) => `$${value.toLocaleString()}`
        },
        {
            header: 'Total First Year Cost',
            key: 'totalCost',
            render: (_, row: CreditOption) => {
                const totalCost = row.annualFee;
                return `$${totalCost}`;
            }
        }
    ];

    const handleAddCard = () => {
        const newCard: CreditOption = {
            name: "New Card",
            apr: 20.99,
            annualFee: 0,
            rewardsRate: 1,
            creditLimit: 1000
        };
        onUpdateOptions([...creditOptions, newCard]);
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Credit Card Comparison Tool</h3>
            <div className="mb-4">
                <button
                    onClick={handleAddCard}
                    className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                    Add Card for Comparison
                </button>
            </div>
            <Table
                data={creditOptions}
                columns={columns}
                className="w-full"
            />
            <div className="mt-4 text-sm text-gray-600">
                <p>Note: Total First Year Cost includes annual fee. APR costs will vary based on balance carried.</p>
            </div>
        </div>
    );
}; 