import { useState } from 'react';
import { StandardType, QuestionType, Final } from '@/types/assessment';

const timeEstimates: Record<string, { min: number; max: number }> = {
    'multiple-choice': { min: 2, max: 3 },
    'short-response': { min: 5, max: 7 },
    'situational': { min: 8, max: 10 },
    'fill-in-blank': { min: 1, max: 2 },
    'practical-application': { min: 15, max: 20 },
    'comprehensive-review': { min: 10, max: 15 }
};

const standards: StandardType[] = [
    { id: 1, title: "Financial Literacy" },
    { id: 2, title: "Budgeting" },
    { id: 3, title: "Saving" },
    { id: 4, title: "Investing" },
    { id: 5, title: "Risk Management" },
    { id: 6, title: "Retirement Planning" },
    { id: 7, title: "Borrowing Money" },
    { id: 8, title: "Credit Cards" },
    { id: 9, title: "Fraud Prevention" },
    { id: 10, title: "Renting vs. Buying" },
    { id: 11, title: "Insurance" },
    { id: 12, title: "Gambling" },
    { id: 13, title: "Bankruptcy" },
    { id: 14, title: "Charitable Giving" },
    { id: 15, title: "Career Readiness" }
];

const FinalGenerator = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStandards, setSelectedStandards] = useState<StandardType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [timeLimit, setTimeLimit] = useState(60); // Finals typically longer
    const [questionAllocation, setQuestionAllocation] = useState<Record<string, number>>({});
    const [generatedFinals, setGeneratedFinals] = useState<Final[]>([]);
    const [includeComprehensive, setIncludeComprehensive] = useState(false);
    const [includePractical, setIncludePractical] = useState(false);

    const updateQuestionAllocation = () => {
        if (selectedTypes.length === 0) return;

        let availableTime = timeLimit;
        
        // Reserve time for comprehensive review if selected
        if (includeComprehensive) {
            availableTime -= timeEstimates['comprehensive-review'].min;
        }
        
        // Reserve time for practical application if selected
        if (includePractical) {
            availableTime -= timeEstimates['practical-application'].min;
        }

        const timePerType = Math.floor(availableTime / selectedTypes.length);
        const newAllocation: Record<string, number> = {};

        selectedTypes.forEach(type => {
            const estimate = timeEstimates[type];
            if (estimate) {
                newAllocation[type] = Math.floor(timePerType / estimate.min);
            }
        });

        if (includeComprehensive) {
            newAllocation['comprehensive-review'] = 1;
        }
        
        if (includePractical) {
            newAllocation['practical-application'] = 1;
        }

        setQuestionAllocation(newAllocation);
    };

    const calculateTotalTime = () => {
        let total = 0;
        Object.entries(questionAllocation).forEach(([type, count]) => {
            total += count * timeEstimates[type].min;
        });
        return total;
    };

    const handleGenerateFinal = () => {
        const newFinal: Final = {
            id: Date.now(),
            title: document.getElementById('final-title')?.value || '',
            timeLimit,
            standards: selectedStandards,
            questionTypes: Object.entries(questionAllocation).map(([type, count]) => ({
                type,
                count,
                timeEstimate: timeEstimates[type]
            })),
            difficulty: document.getElementById('difficulty-level')?.value || 'Medium',
            dateCreated: new Date(),
            comprehensiveReview: includeComprehensive,
            practicalApplication: includePractical
        };

        setGeneratedFinals([...generatedFinals, newFinal]);
        setShowModal(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setShowModal(true)}
                    className="btn-primary flex items-center"
                >
                    <i className="fas fa-plus mr-2"></i>
                    Create New Final
                </button>
            </div>

            {/* Final Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedFinals.map(final => (
                    <div key={final.id} className="assessment-card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{final.title}</h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="px-2 py-1 rounded text-sm bg-red-100 text-red-800">
                                        {final.timeLimit} minutes
                                    </span>
                                    <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                                        {final.difficulty}
                                    </span>
                                </div>
                            </div>
                            <div className="flex space-x-2">
                                <button className="btn-secondary text-sm">
                                    <i className="fas fa-eye mr-1"></i>Preview
                                </button>
                                <button className="btn-secondary text-sm">
                                    <i className="fas fa-plus mr-1"></i>New Version
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-700">Standards Covered</h3>
                                <div className="flex flex-wrap gap-2">
                                    {final.standards.map(standard => (
                                        <span key={standard.id} className="standard-badge">
                                            Standard {standard.id}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700">Questions</h3>
                                <div className="space-y-2">
                                    {final.questionTypes.map(qt => (
                                        <div key={qt.type} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {qt.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                            <span className="text-gray-900">{qt.count} questions</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {(final.comprehensiveReview || final.practicalApplication) && (
                                <div>
                                    <h3 className="font-medium text-gray-700">Special Sections</h3>
                                    <div className="space-y-2">
                                        {final.comprehensiveReview && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                Comprehensive Review
                                            </span>
                                        )}
                                        {final.practicalApplication && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Practical Application
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="form-header">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Create New Final</h2>
                                <button 
                                    className="text-gray-400 hover:text-gray-500"
                                    onClick={() => setShowModal(false)}
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>

                        <div className="form-body">
                            {/* Form content similar to MidtermGenerator but with final-specific options */}
                            {/* Add comprehensive review and practical application toggles */}
                            <div className="form-section">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Special Sections</h3>
                                <div className="space-y-4">
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={includeComprehensive}
                                            onChange={(e) => setIncludeComprehensive(e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">Include Comprehensive Review (10-15 mins)</span>
                                    </label>
                                    <label className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={includePractical}
                                            onChange={(e) => setIncludePractical(e.target.checked)}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-gray-700">Include Practical Application (15-20 mins)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-footer">
                            <div className="flex justify-end space-x-4">
                                <button 
                                    className="btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button 
                                    className="btn-primary"
                                    onClick={handleGenerateFinal}
                                >
                                    Generate Final
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FinalGenerator; 