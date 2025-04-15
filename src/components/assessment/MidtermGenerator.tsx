import { useState } from 'react';
import { StandardType, QuestionType, Midterm } from '@/types/assessment';

const timeEstimates: Record<string, { min: number; max: number }> = {
    'multiple-choice': { min: 2, max: 3 },
    'short-response': { min: 5, max: 7 },
    'situational': { min: 8, max: 10 },
    'fill-in-blank': { min: 1, max: 2 }
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

const MidtermGenerator = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedStandards, setSelectedStandards] = useState<StandardType[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [timeLimit, setTimeLimit] = useState(30);
    const [questionAllocation, setQuestionAllocation] = useState<Record<string, number>>({});
    const [generatedMidterms, setGeneratedMidterms] = useState<Midterm[]>([]);

    const updateQuestionAllocation = () => {
        if (selectedTypes.length === 0) return;

        const timePerType = Math.floor(timeLimit / selectedTypes.length);
        const newAllocation: Record<string, number> = {};

        selectedTypes.forEach(type => {
            const estimate = timeEstimates[type];
            if (estimate) {
                newAllocation[type] = Math.floor(timePerType / estimate.min);
            }
        });

        setQuestionAllocation(newAllocation);
    };

    const calculateTotalTime = () => {
        let total = 0;
        Object.entries(questionAllocation).forEach(([type, count]) => {
            total += count * timeEstimates[type].min;
        });
        return total;
    };

    const handleGenerateMidterm = () => {
        const newMidterm: Midterm = {
            id: Date.now(),
            title: document.getElementById('midterm-title')?.value || '',
            timeLimit,
            standards: selectedStandards,
            questionTypes: Object.entries(questionAllocation).map(([type, count]) => ({
                type,
                count,
                timeEstimate: timeEstimates[type]
            })),
            difficulty: document.getElementById('difficulty-level')?.value || 'Medium',
            dateCreated: new Date()
        };

        setGeneratedMidterms([...generatedMidterms, newMidterm]);
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
                    Create New Midterm
                </button>
            </div>

            {/* Midterm Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedMidterms.map(midterm => (
                    <div key={midterm.id} className="assessment-card">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{midterm.title}</h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                                        {midterm.timeLimit} minutes
                                    </span>
                                    <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800">
                                        {midterm.difficulty}
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
                                    {midterm.standards.map(standard => (
                                        <span key={standard.id} className="standard-badge">
                                            Standard {standard.id}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700">Questions</h3>
                                <div className="space-y-2">
                                    {midterm.questionTypes.map(qt => (
                                        <div key={qt.type} className="flex justify-between text-sm">
                                            <span className="text-gray-600">
                                                {qt.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                            </span>
                                            <span className="text-gray-900">{qt.count} questions</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {showModal && (
                <div className="modal-overlay">
                    {/* Modal content from the previous HTML, converted to React/TSX */}
                    {/* ... */}
                </div>
            )}
        </div>
    );
};

export default MidtermGenerator; 