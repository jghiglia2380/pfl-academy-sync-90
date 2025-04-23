import React, { useState } from 'react';

interface PortfolioAnalyzerProps {
    onAnalyze?: (results: PortfolioAnalysisResults) => void;
}

interface PortfolioAnalysisResults {
    expectedReturn: number;
    riskLevel: number;
    sharpeRatio: number;
    diversificationScore: number;
}

export const PortfolioAnalyzer: React.FC<PortfolioAnalyzerProps> = ({ onAnalyze }) => {
    const [assets, setAssets] = useState<Array<{ name: string; weight: number; return: number; risk: number }>>([
        { name: '', weight: 0, return: 0, risk: 0 }
    ]);

    const [riskFreeRate, setRiskFreeRate] = useState(2.0); // Default 2% risk-free rate

    const addAsset = () => {
        setAssets([...assets, { name: '', weight: 0, return: 0, risk: 0 }]);
    };

    const updateAsset = (index: number, field: string, value: number | string) => {
        const updatedAssets = [...assets];
        updatedAssets[index] = { ...updatedAssets[index], [field]: value };
        setAssets(updatedAssets);
    };

    const calculatePortfolioMetrics = () => {
        // Calculate portfolio expected return
        const expectedReturn = assets.reduce((sum, asset) => {
            return sum + (asset.weight / 100) * asset.return;
        }, 0);

        // Calculate portfolio risk (simplified)
        const riskLevel = assets.reduce((sum, asset) => {
            return sum + (asset.weight / 100) * asset.risk;
        }, 0);

        // Calculate Sharpe Ratio
        const sharpeRatio = (expectedReturn - riskFreeRate) / riskLevel;

        // Calculate diversification score (simplified)
        const diversificationScore = 100 - Math.max(...assets.map(a => a.weight));

        const results: PortfolioAnalysisResults = {
            expectedReturn,
            riskLevel,
            sharpeRatio,
            diversificationScore
        };

        onAnalyze?.(results);
        return results;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Portfolio Analyzer</h3>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk-free Rate (%)
                </label>
                <input
                    type="number"
                    className="w-full p-2 border rounded-md"
                    value={riskFreeRate}
                    onChange={(e) => setRiskFreeRate(Number(e.target.value))}
                    step="0.1"
                />
            </div>

            <div className="space-y-4 mb-6">
                {assets.map((asset, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4">
                        <input
                            type="text"
                            placeholder="Asset Name"
                            className="p-2 border rounded-md"
                            value={asset.name}
                            onChange={(e) => updateAsset(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Weight (%)"
                            className="p-2 border rounded-md"
                            value={asset.weight}
                            onChange={(e) => updateAsset(index, 'weight', Number(e.target.value))}
                        />
                        <input
                            type="number"
                            placeholder="Expected Return (%)"
                            className="p-2 border rounded-md"
                            value={asset.return}
                            onChange={(e) => updateAsset(index, 'return', Number(e.target.value))}
                        />
                        <input
                            type="number"
                            placeholder="Risk Level (1-5)"
                            className="p-2 border rounded-md"
                            value={asset.risk}
                            onChange={(e) => updateAsset(index, 'risk', Number(e.target.value))}
                            min="1"
                            max="5"
                        />
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center">
                <button
                    type="button"
                    onClick={addAsset}
                    className="text-blue-600 hover:text-blue-800"
                >
                    <i className="fas fa-plus-circle mr-1"></i>Add Asset
                </button>
                <button
                    type="button"
                    onClick={calculatePortfolioMetrics}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Analyze Portfolio
                </button>
            </div>
        </div>
    );
};

export default PortfolioAnalyzer; 