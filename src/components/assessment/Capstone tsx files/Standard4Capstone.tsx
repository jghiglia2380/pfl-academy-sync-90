import React, { useState } from 'react';
import { CreditCardComparisonTool } from '../tools/credit/CreditCardComparisonTool';
import { CreditCostCalculator } from '../tools/credit/CreditCostCalculator';
import { InterestProjectionTool } from '../tools/credit/InterestProjectionTool';
import { ProjectInstructions } from '../common/ProjectInstructions';
import { EvaluationCriteria } from '../common/EvaluationCriteria';
import { TaskCard } from '../common/TaskCard';
import { ToolSection } from '../common/ToolSection';
import { useStandard4Form } from '../../hooks/useStandard4Form';
import { formatDate } from '../../utils/formatters';

interface CreditOption {
    name: string;
    apr: number;
    annualFee: number;
    rewardsRate: number;
    creditLimit: number;
}

interface BorrowingScenario {
    purpose: string;
    amount: number;
    term: number;
    monthlyIncome: number;
    existingDebt: number;
}

const Standard4Capstone: React.FC = () => {
    const {
        form,
        loading,
        saving,
        assessment,
        feedback,
        saveDraft,
        submitAssessment,
        canSubmit,
        canEdit,
    } = useStandard4Form();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        getValues,
    } = form;

    const addStock = () => {
        const stocks = getValues('investmentAnalysis.currentPortfolio.stocks');
        setValue('investmentAnalysis.currentPortfolio.stocks', [
            ...stocks,
            { symbol: '', shares: 0, purchasePrice: 0, currentPrice: 0 },
        ]);
    };

    const addBond = () => {
        const bonds = getValues('investmentAnalysis.currentPortfolio.bonds');
        setValue('investmentAnalysis.currentPortfolio.bonds', [
            ...bonds,
            { issuer: '', faceValue: 0, couponRate: 0, maturityDate: '' },
        ]);
    };

    const addMutualFund = () => {
        const mutualFunds = getValues('investmentAnalysis.currentPortfolio.mutualFunds');
        setValue('investmentAnalysis.currentPortfolio.mutualFunds', [
            ...mutualFunds,
            { name: '', shares: 0, nav: 0, expenseRatio: 0 },
        ]);
    };

    const addOtherAsset = () => {
        const otherAssets = getValues('investmentAnalysis.currentPortfolio.otherAssets');
        setValue('investmentAnalysis.currentPortfolio.otherAssets', [
            ...otherAssets,
            { type: '', value: 0, description: '' },
        ]);
    };

    const addShortTermGoal = () => {
        const goals = getValues('investmentStrategy.goals.shortTerm');
        setValue('investmentStrategy.goals.shortTerm', [
            ...goals,
            { goal: '', amount: 0, timeframe: '' },
        ]);
    };

    const addLongTermGoal = () => {
        const goals = getValues('investmentStrategy.goals.longTerm');
        setValue('investmentStrategy.goals.longTerm', [
            ...goals,
            { goal: '', amount: 0, timeframe: '' },
        ]);
    };

    const addAccountType = () => {
        const accountTypes = getValues('investmentPlan.implementation.accountTypes');
        setValue('investmentPlan.implementation.accountTypes', [
            ...accountTypes,
            { type: '', purpose: '', contributionStrategy: '' },
        ]);
    };

    const addMilestone = () => {
        const milestones = getValues('investmentPlan.timeline.milestones');
        setValue('investmentPlan.timeline.milestones', [
            ...milestones,
            { date: '', action: '', target: '' },
        ]);
    };

    // State for credit card comparison
    const [creditOptions, setCreditOptions] = useState<CreditOption[]>([
        {
            name: "Basic Card",
            apr: 18.99,
            annualFee: 0,
            rewardsRate: 1,
            creditLimit: 2000
        },
        {
            name: "Rewards Plus",
            apr: 22.99,
            annualFee: 95,
            rewardsRate: 2,
            creditLimit: 5000
        },
        {
            name: "Premium Card",
            apr: 24.99,
            annualFee: 195,
            rewardsRate: 3,
            creditLimit: 10000
        }
    ]);

    // State for borrowing scenarios
    const [scenarios, setScenarios] = useState<BorrowingScenario[]>([
        {
            purpose: "Car Loan",
            amount: 20000,
            term: 60,
            monthlyIncome: 4000,
            existingDebt: 500
        },
        {
            purpose: "Student Loan",
            amount: 15000,
            term: 120,
            monthlyIncome: 4000,
            existingDebt: 500
        }
    ]);

    const tasks = [
        {
            title: "Credit Analysis",
            duration: "15 minutes",
            description: "Analyze different credit options using the provided tools",
            subtasks: [
                "Compare credit card offers using the Credit Card Comparison Tool",
                "Calculate total costs using the Credit Cost Calculator",
                "Evaluate APR impact with the Interest Projection Tool",
                "Analyze credit score factors and improvement strategies",
                "Review credit terms and conditions for hidden fees"
            ]
        },
        {
            title: "Borrowing Scenario Analysis",
            duration: "15 minutes",
            description: "Apply your analysis to real-world borrowing scenarios",
            subtasks: [
                "Evaluate loan options for major purchases",
                "Calculate debt-to-income ratios and borrowing capacity",
                "Assess impact on monthly budget and cash flow",
                "Consider long-term implications of borrowing decisions",
                "Identify potential risks and mitigation strategies"
            ]
        },
        {
            title: "Credit Strategy & Implementation",
            duration: "15 minutes",
            description: "Develop strategic recommendations for credit use",
            subtasks: [
                "Create a credit building or improvement plan",
                "Outline responsible borrowing guidelines",
                "Develop debt management strategies",
                "Plan for emergency credit situations",
                "Set credit score improvement targets"
            ]
        }
    ];

    const evaluationCriteria = {
        creditAnalysis: {
            weight: 35,
            criteria: [
                "Thorough credit option comparison",
                "Accurate cost calculations",
                "Understanding of credit terms",
                "Fee and interest analysis"
            ]
        },
        scenarioAnalysis: {
            weight: 35,
            criteria: [
                "Borrowing capacity assessment",
                "Risk evaluation",
                "Budget impact analysis",
                "Long-term considerations"
            ]
        },
        strategyImplementation: {
            weight: 30,
            criteria: [
                "Strategic planning quality",
                "Practical implementation steps",
                "Risk mitigation strategies",
                "Supporting calculations"
            ]
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Investment Planning Capstone</h1>

            <form onSubmit={handleSubmit(submitAssessment)} className="space-y-8">
                {/* Investment Analysis Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Investment Analysis</h2>

                    {/* Current Portfolio */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Current Portfolio</h3>

                        {/* Stocks */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Stocks</h4>
                            {getValues('investmentAnalysis.currentPortfolio.stocks').map((_, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4">
                                    <input
                                        {...register(`investmentAnalysis.currentPortfolio.stocks.${index}.symbol`)}
                                        placeholder="Symbol"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.stocks.${index}.shares`)}
                                        placeholder="Shares"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.stocks.${index}.purchasePrice`)}
                                        placeholder="Purchase Price"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.stocks.${index}.currentPrice`)}
                                        placeholder="Current Price"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addStock} className="btn-secondary">
                                    Add Stock
                                </button>
                            )}
                        </div>

                        {/* Bonds */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Bonds</h4>
                            {getValues('investmentAnalysis.currentPortfolio.bonds').map((_, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4">
                                    <input
                                        {...register(`investmentAnalysis.currentPortfolio.bonds.${index}.issuer`)}
                                        placeholder="Issuer"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.bonds.${index}.faceValue`)}
                                        placeholder="Face Value"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.bonds.${index}.couponRate`)}
                                        placeholder="Coupon Rate"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="date"
                                        {...register(`investmentAnalysis.currentPortfolio.bonds.${index}.maturityDate`)}
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addBond} className="btn-secondary">
                                    Add Bond
                                </button>
                            )}
                        </div>

                        {/* Mutual Funds */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Mutual Funds</h4>
                            {getValues('investmentAnalysis.currentPortfolio.mutualFunds').map((_, index) => (
                                <div key={index} className="grid grid-cols-4 gap-4">
                                    <input
                                        {...register(`investmentAnalysis.currentPortfolio.mutualFunds.${index}.name`)}
                                        placeholder="Name"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.mutualFunds.${index}.shares`)}
                                        placeholder="Shares"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.mutualFunds.${index}.nav`)}
                                        placeholder="NAV"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.mutualFunds.${index}.expenseRatio`)}
                                        placeholder="Expense Ratio"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addMutualFund} className="btn-secondary">
                                    Add Mutual Fund
                                </button>
                            )}
                        </div>

                        {/* Other Assets */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Other Assets</h4>
                            {getValues('investmentAnalysis.currentPortfolio.otherAssets').map((_, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4">
                                    <input
                                        {...register(`investmentAnalysis.currentPortfolio.otherAssets.${index}.type`)}
                                        placeholder="Type"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentAnalysis.currentPortfolio.otherAssets.${index}.value`)}
                                        placeholder="Value"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        {...register(`investmentAnalysis.currentPortfolio.otherAssets.${index}.description`)}
                                        placeholder="Description"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addOtherAsset} className="btn-secondary">
                                    Add Other Asset
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Risk Assessment</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Risk Tolerance</label>
                                <select
                                    {...register('investmentAnalysis.riskAssessment.riskTolerance')}
                                    className="input"
                                    disabled={!canEdit()}
                                >
                                    <option value="conservative">Conservative</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="aggressive">Aggressive</option>
                                </select>
                            </div>
                            <div>
                                <label className="block mb-2">Time Horizon (years)</label>
                                <input
                                    type="number"
                                    {...register('investmentAnalysis.riskAssessment.timeHorizon')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Liquidity Needs</label>
                                <input
                                    type="number"
                                    {...register('investmentAnalysis.riskAssessment.liquidityNeeds')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Analysis</label>
                            <textarea
                                {...register('investmentAnalysis.riskAssessment.analysis')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
                        </div>
                    </div>

                    {/* Performance Analysis */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Performance Analysis</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Annualized Return (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentAnalysis.performanceAnalysis.returns.annualized')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">YTD Return (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentAnalysis.performanceAnalysis.returns.ytd')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Benchmark</label>
                            <input
                                {...register('investmentAnalysis.performanceAnalysis.benchmarkComparison.benchmark')}
                                className="input"
                                disabled={!canEdit()}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Benchmark Performance (%)</label>
                            <input
                                type="number"
                                {...register('investmentAnalysis.performanceAnalysis.benchmarkComparison.performance')}
                                className="input"
                                disabled={!canEdit()}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Analysis</label>
                            <textarea
                                {...register('investmentAnalysis.performanceAnalysis.benchmarkComparison.analysis')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
                        </div>
                    </div>
                </section>

                {/* Investment Strategy Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Investment Strategy</h2>

                    {/* Goals */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Goals</h3>

                        {/* Short-term Goals */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Short-term Goals</h4>
                            {getValues('investmentStrategy.goals.shortTerm').map((_, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4">
                                    <input
                                        {...register(`investmentStrategy.goals.shortTerm.${index}.goal`)}
                                        placeholder="Goal"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentStrategy.goals.shortTerm.${index}.amount`)}
                                        placeholder="Amount"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        {...register(`investmentStrategy.goals.shortTerm.${index}.timeframe`)}
                                        placeholder="Timeframe"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addShortTermGoal} className="btn-secondary">
                                    Add Short-term Goal
                                </button>
                            )}
                        </div>

                        {/* Long-term Goals */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Long-term Goals</h4>
                            {getValues('investmentStrategy.goals.longTerm').map((_, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4">
                                    <input
                                        {...register(`investmentStrategy.goals.longTerm.${index}.goal`)}
                                        placeholder="Goal"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        type="number"
                                        {...register(`investmentStrategy.goals.longTerm.${index}.amount`)}
                                        placeholder="Amount"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        {...register(`investmentStrategy.goals.longTerm.${index}.timeframe`)}
                                        placeholder="Timeframe"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addLongTermGoal} className="btn-secondary">
                                    Add Long-term Goal
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Asset Allocation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Asset Allocation</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2">Stocks (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentStrategy.assetAllocation.stocks')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Bonds (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentStrategy.assetAllocation.bonds')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Cash (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentStrategy.assetAllocation.cash')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                            <div>
                                <label className="block mb-2">Alternatives (%)</label>
                                <input
                                    type="number"
                                    {...register('investmentStrategy.assetAllocation.alternatives')}
                                    className="input"
                                    disabled={!canEdit()}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2">Rationale</label>
                            <textarea
                                {...register('investmentStrategy.assetAllocation.rationale')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
                        </div>
                    </div>

                    {/* Investment Selection */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Investment Selection</h3>
                        <div>
                            <label className="block mb-2">Screening Process</label>
                            <textarea
                                {...register('investmentStrategy.investmentSelection.screeningProcess')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Diversification Strategy</label>
                            <textarea
                                {...register('investmentStrategy.investmentSelection.diversificationStrategy')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
                        </div>
                    </div>
                </section>

                {/* Investment Plan Section */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Investment Plan</h2>

                    {/* Implementation */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Implementation</h3>

                        {/* Account Types */}
                        <div className="space-y-2">
                            <h4 className="font-medium">Account Types</h4>
                            {getValues('investmentPlan.implementation.accountTypes').map((_, index) => (
                                <div key={index} className="grid grid-cols-3 gap-4">
                                    <input
                                        {...register(`investmentPlan.implementation.accountTypes.${index}.type`)}
                                        placeholder="Type"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        {...register(`investmentPlan.implementation.accountTypes.${index}.purpose`)}
                                        placeholder="Purpose"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                    <input
                                        {...register(`investmentPlan.implementation.accountTypes.${index}.contributionStrategy`)}
                                        placeholder="Contribution Strategy"
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            ))}
                            {canEdit() && (
                                <button type="button" onClick={addAccountType} className="btn-secondary">
                                    Add Account Type
                                </button>
                            )}
                        </div>

                        {/* Rebalancing Strategy */}
                        <div className="space-y-4">
                            <h4 className="font-medium">Rebalancing Strategy</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block mb-2">Frequency</label>
                                    <input
                                        {...register('investmentPlan.implementation.rebalancingStrategy.frequency')}
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Thresholds (%)</label>
                                    <input
                                        type="number"
                                        {...register('investmentPlan.implementation.rebalancingStrategy.thresholds')}
                                        className="input"
                                        disabled={!canEdit()}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block mb-2">Process</label>
                                <textarea
                                    {...register('investmentPlan.implementation.rebalancingStrategy.process')}
                                    className="input"
                                    rows={4}
                                    disabled={!canEdit()}
                                />
                            </div>
                        </div>

                        {/* Tax Efficiency */}
                        <div className="space-y-4">
                            <h4 className="font-medium">Tax Efficiency</h4>
                            <div>
                                <label className="block mb-2">Considerations</label>
                                <textarea
                                    {...register('investmentPlan.implementation.taxEfficiency.considerations')}
                                    className="input"
                                    rows={4}
                                    disabled={!canEdit()}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Monitoring */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium">Monitoring</h3>
                        <div>
                            <label className="block mb-2">Review Frequency</label>
                            <input
                                {...register('investmentPlan.monitoring.reviewFrequency')}
                                className="input"
                                disabled={!canEdit()}
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Adjustment Criteria</label>
                            <textarea
                                {...register('investmentPlan.monitoring.adjustmentCriteria')}
                                className="input"
                                rows={4}
                                disabled={!canEdit()}
                            />
        <div className="max-w-7xl mx-auto px-4 py-8">
            <ProjectInstructions
                title="Credit and Borrowing Analysis Project"
                standard="Standard 4: Credit and Borrowing Decisions"
                duration={45}
                description="Demonstrate your understanding of credit management and borrowing decisions by analyzing different credit options, evaluating borrowing scenarios, and creating strategic recommendations for responsible credit use."
            />

            <div className="mt-8 space-y-8">
                {tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        title={task.title}
                        duration={task.duration}
                        description={task.description}
                        subtasks={task.subtasks}
                    />
                ))}
            </div>

            <ToolSection title="Project Tools">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CreditCardComparisonTool
                        creditOptions={creditOptions}
                        onUpdateOptions={setCreditOptions}
                    />
                    <CreditCostCalculator />
                    <InterestProjectionTool />
                </div>
            </ToolSection>

            <EvaluationCriteria criteria={evaluationCriteria} />
        </div>
    );
};

export default Standard4Capstone; 