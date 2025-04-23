import React, { useState } from 'react';

interface ProviderComparisonTemplateProps {
    onSave?: (data: ProviderData[]) => void;
}

interface ProviderData {
    name: string;
    type: 'traditional' | 'credit-union' | 'online';
    basicFeatures: {
        monthlyFee: number;
        minimumBalance: number;
        atmNetwork: string;
        onlineBanking: boolean;
        mobileBanking: boolean;
    };
    rates: {
        savingsApy: number;
        checkingApy: number;
        creditCardApr: number;
        mortgageApr: number;
    };
    additionalServices: string[];
    customerService: {
        hours: string;
        channels: string[];
        rating: number;
    };
}

const ProviderComparisonTemplate: React.FC<ProviderComparisonTemplateProps> = ({ onSave }) => {
    const [providers, setProviders] = useState<ProviderData[]>([{
        name: '',
        type: 'traditional',
        basicFeatures: {
            monthlyFee: 0,
            minimumBalance: 0,
            atmNetwork: '',
            onlineBanking: false,
            mobileBanking: false,
        },
        rates: {
            savingsApy: 0,
            checkingApy: 0,
            creditCardApr: 0,
            mortgageApr: 0,
        },
        additionalServices: [],
        customerService: {
            hours: '',
            channels: [],
            rating: 0,
        }
    }]);

    const handleProviderChange = (index: number, field: string, value: any) => {
        const updatedProviders = [...providers];
        const fieldPath = field.split('.');
        
        let target = updatedProviders[index];
        for (let i = 0; i < fieldPath.length - 1; i++) {
            target = target[fieldPath[i] as keyof typeof target];
        }
        
        const lastField = fieldPath[fieldPath.length - 1];
        target[lastField as keyof typeof target] = value;
        
        setProviders(updatedProviders);
    };

    const addProvider = () => {
        setProviders([...providers, {
            name: '',
            type: 'traditional',
            basicFeatures: {
                monthlyFee: 0,
                minimumBalance: 0,
                atmNetwork: '',
                onlineBanking: false,
                mobileBanking: false,
            },
            rates: {
                savingsApy: 0,
                checkingApy: 0,
                creditCardApr: 0,
                mortgageApr: 0,
            },
            additionalServices: [],
            customerService: {
                hours: '',
                channels: [],
                rating: 0,
            }
        }]);
    };

    const handleSave = () => {
        onSave?.(providers);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                    <i className="fas fa-table text-blue-600 mr-2"></i>
                    Provider Comparison Template
                </h2>
                <button
                    onClick={handleSave}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Save Comparison
                </button>
            </div>

            {providers.map((provider, index) => (
                <div key={index} className="mb-8 p-4 border border-gray-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-6">
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
                                Provider Type
                            </label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={provider.type}
                                onChange={(e) => handleProviderChange(index, 'type', e.target.value)}
                            >
                                <option value="traditional">Traditional Bank</option>
                                <option value="credit-union">Credit Union</option>
                                <option value="online">Online Bank</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Basic Features</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Monthly Fee ($)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.basicFeatures.monthlyFee}
                                    onChange={(e) => handleProviderChange(index, 'basicFeatures.monthlyFee', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Minimum Balance ($)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.basicFeatures.minimumBalance}
                                    onChange={(e) => handleProviderChange(index, 'basicFeatures.minimumBalance', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ATM Network
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.basicFeatures.atmNetwork}
                                    onChange={(e) => handleProviderChange(index, 'basicFeatures.atmNetwork', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={provider.basicFeatures.onlineBanking}
                                        onChange={(e) => handleProviderChange(index, 'basicFeatures.onlineBanking', e.target.checked)}
                                        className="mr-2"
                                    />
                                    Online Banking
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={provider.basicFeatures.mobileBanking}
                                        onChange={(e) => handleProviderChange(index, 'basicFeatures.mobileBanking', e.target.checked)}
                                        className="mr-2"
                                    />
                                    Mobile Banking
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Interest Rates</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Savings APY (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.rates.savingsApy}
                                    onChange={(e) => handleProviderChange(index, 'rates.savingsApy', parseFloat(e.target.value) || 0)}
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Checking APY (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.rates.checkingApy}
                                    onChange={(e) => handleProviderChange(index, 'rates.checkingApy', parseFloat(e.target.value) || 0)}
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Credit Card APR (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.rates.creditCardApr}
                                    onChange={(e) => handleProviderChange(index, 'rates.creditCardApr', parseFloat(e.target.value) || 0)}
                                    step="0.01"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Mortgage APR (%)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.rates.mortgageApr}
                                    onChange={(e) => handleProviderChange(index, 'rates.mortgageApr', parseFloat(e.target.value) || 0)}
                                    step="0.01"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Services</h3>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows={3}
                            value={provider.additionalServices.join('\n')}
                            onChange={(e) => handleProviderChange(index, 'additionalServices', e.target.value.split('\n'))}
                            placeholder="Enter additional services (one per line)"
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-3">Customer Service</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Hours
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.customerService.hours}
                                    onChange={(e) => handleProviderChange(index, 'customerService.hours', e.target.value)}
                                    placeholder="e.g., 24/7, M-F 9-5"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Service Channels
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.customerService.channels.join(', ')}
                                    onChange={(e) => handleProviderChange(index, 'customerService.channels', e.target.value.split(', '))}
                                    placeholder="Phone, Email, Chat"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Customer Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    value={provider.customerService.rating}
                                    onChange={(e) => handleProviderChange(index, 'customerService.rating', Math.min(5, Math.max(1, parseInt(e.target.value) || 0)))}
                                    min="1"
                                    max="5"
                                />
                            </div>
                        </div>
                    </div>
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

export default ProviderComparisonTemplate; 