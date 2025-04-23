import React, { useState } from 'react';

interface RiskAnalyzerProps {
    onAnalyze?: (results: RiskAnalysisResults) => void;
}

interface RiskAnalysisResults {
    overallRiskScore: number;
    marketRisk: number;
    creditRisk: number;
    liquidityRisk: number;
    operationalRisk: number;
    recommendations: string[];
}

export const RiskAnalyzer: React.FC<RiskAnalyzerProps> = ({ onAnalyze }) => {
    const [riskFactors, setRiskFactors] = useState({
        marketVolatility: 3,
        interestRateRisk: 3,
        creditQuality: 3,
        liquidityLevel: 3,
        operationalComplexity: 3
    });

    const [marketConditions, setMarketConditions] = useState({
        economicOutlook: 'neutral',
        marketTrend: 'stable',
        volatilityLevel: 'moderate'
    });

    const calculateRiskScores = () => {
        // Calculate individual risk components
        const marketRisk = (riskFactors.marketVolatility + riskFactors.interestRateRisk) / 2;
        const creditRisk = riskFactors.creditQuality;
        const liquidityRisk = riskFactors.liquidityLevel;
        const operationalRisk = riskFactors.operationalComplexity;

        // Calculate overall risk score
        const overallRiskScore = (marketRisk + creditRisk + liquidityRisk + operationalRisk) / 4;

        // Generate recommendations based on risk scores
        const recommendations: string[] = [];

        if (marketRisk > 3) {
            recommendations.push("Consider hedging strategies to mitigate market risk");
        }
        if (creditRisk > 3) {
            recommendations.push("Review credit quality of investments and consider diversification");
        }
        if (liquidityRisk > 3) {
            recommendations.push("Maintain higher cash reserves and review liquidity management");
        }
        if (operationalRisk > 3) {
            recommendations.push("Implement additional operational controls and monitoring");
        }

        const results: RiskAnalysisResults = {
            overallRiskScore,
            marketRisk,
            creditRisk,
            liquidityRisk,
            operationalRisk,
            recommendations
        };

        onAnalyze?.(results);
        return results;
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Analyzer</h3>

            <div className="space-y-6">
                <div>
                    <h4 className="font-medium text-gray-700 mb-3">Risk Factors</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Market Volatility (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={riskFactors.marketVolatility}
                                onChange={(e) => setRiskFactors({
                                    ...riskFactors,
                                    marketVolatility: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Value: {riskFactors.marketVolatility}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Interest Rate Risk (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={riskFactors.interestRateRisk}
                                onChange={(e) => setRiskFactors({
                                    ...riskFactors,
                                    interestRateRisk: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Value: {riskFactors.interestRateRisk}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Credit Quality (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={riskFactors.creditQuality}
                                onChange={(e) => setRiskFactors({
                                    ...riskFactors,
                                    creditQuality: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Value: {riskFactors.creditQuality}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Liquidity Level (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={riskFactors.liquidityLevel}
                                onChange={(e) => setRiskFactors({
                                    ...riskFactors,
                                    liquidityLevel: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Value: {riskFactors.liquidityLevel}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Operational Complexity (1-5)
                            </label>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={riskFactors.operationalComplexity}
                                onChange={(e) => setRiskFactors({
                                    ...riskFactors,
                                    operationalComplexity: Number(e.target.value)
                                })}
                                className="w-full"
                            />
                            <div className="text-sm text-gray-500 mt-1">
                                Value: {riskFactors.operationalComplexity}
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-700 mb-3">Market Conditions</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Economic Outlook
                            </label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={marketConditions.economicOutlook}
                                onChange={(e) => setMarketConditions({
                                    ...marketConditions,
                                    economicOutlook: e.target.value
                                })}
                            >
                                <option value="positive">Positive</option>
                                <option value="neutral">Neutral</option>
                                <option value="negative">Negative</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Market Trend
                            </label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={marketConditions.marketTrend}
                                onChange={(e) => setMarketConditions({
                                    ...marketConditions,
                                    marketTrend: e.target.value
                                })}
                            >
                                <option value="bullish">Bullish</option>
                                <option value="stable">Stable</option>
                                <option value="bearish">Bearish</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-600 mb-1">
                                Volatility Level
                            </label>
                            <select
                                className="w-full p-2 border rounded-md"
                                value={marketConditions.volatilityLevel}
                                onChange={(e) => setMarketConditions({
                                    ...marketConditions,
                                    volatilityLevel: e.target.value
                                })}
                            >
                                <option value="low">Low</option>
                                <option value="moderate">Moderate</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={calculateRiskScores}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Analyze Risks
                </button>
            </div>
        </div>
    );
};

export default RiskAnalyzer; 