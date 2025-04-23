import React, { useState, useEffect } from 'react';
import { Standard8Submission, Standard8Evaluation } from '../../../types/standard8';
import { standard8Db } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import { Toast } from '../../ui/Toast';

export const Standard8Grading: React.FC = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<Standard8Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Standard8Submission | null>(null);
  const [evaluation, setEvaluation] = useState<Standard8Evaluation>({
    creditCardAnalysis: {
      interestCalculations: 0,
      featureComparison: 0,
      costBenefitAnalysis: 0,
      recommendationRationale: 0
    },
    securityAssessment: {
      riskIdentification: 0,
      securityFeatureAnalysis: 0,
      paymentMethodEvaluation: 0,
      protectionStrategies: 0
    },
    strategyDevelopment: {
      decisionFramework: 0,
      implementationPlan: 0,
      riskMitigation: 0,
      processDocumentation: 0
    },
    totalScore: 0,
    feedback: ''
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const data = await standard8Db.getSubmissionsForGrading();
        setSubmissions(data);
      } catch (error) {
        console.error('Error loading submissions:', error);
        setToastMessage('Error loading submissions');
        setShowToast(true);
      }
    };

    loadSubmissions();
  }, []);

  const calculateTotalScore = (evaluation: Standard8Evaluation) => {
    const creditCardScore = Object.values(evaluation.creditCardAnalysis).reduce((a, b) => a + b, 0) / 4;
    const securityScore = Object.values(evaluation.securityAssessment).reduce((a, b) => a + b, 0) / 4;
    const strategyScore = Object.values(evaluation.strategyDevelopment).reduce((a, b) => a + b, 0) / 4;
    return Math.round((creditCardScore + securityScore + strategyScore) / 3);
  };

  const handleScoreChange = (section: keyof Standard8Evaluation, field: string, value: number) => {
    setEvaluation(prev => {
      const updated = { ...prev };
      updated[section][field] = value;
      updated.totalScore = calculateTotalScore(updated);
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!selectedSubmission?.id || !user?.id) return;

    try {
      await standard8Db.saveEvaluation({
        ...evaluation,
        submissionId: selectedSubmission.id,
        evaluatorId: user.id
      });

      await standard8Db.updateSubmissionGrade(selectedSubmission.id, {
        score: evaluation.totalScore,
        feedback: evaluation.feedback,
        gradedBy: user.id,
        gradedAt: new Date().toISOString()
      });

      setToastMessage('Evaluation submitted successfully');
      setShowToast(true);
      
      // Refresh submissions list
      const updatedSubmissions = await standard8Db.getSubmissionsForGrading();
      setSubmissions(updatedSubmissions);
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      setToastMessage('Error submitting evaluation');
      setShowToast(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Standard 8 Grading</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submissions</h2>
            <div className="space-y-2">
              {submissions.map(submission => (
                <button
                  key={submission.id}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`w-full text-left p-3 rounded-md ${
                    selectedSubmission?.id === submission.id
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <p className="font-medium text-gray-900">
                    {submission.studentId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Submitted: {new Date(submission.createdAt).toLocaleDateString()}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grading Interface */}
        <div className="lg:col-span-2">
          {selectedSubmission ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Evaluation</h2>

              {/* Credit Card Analysis */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Credit Card Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(evaluation.creditCardAnalysis).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={e => handleScoreChange('creditCardAnalysis', key, parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Assessment */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Security Assessment</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(evaluation.securityAssessment).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={e => handleScoreChange('securityAssessment', key, parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Strategy Development */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Strategy Development</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(evaluation.strategyDevelopment).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={e => handleScoreChange('strategyDevelopment', key, parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Score */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Total Score</h3>
                <div className="text-3xl font-bold text-blue-600">
                  {evaluation.totalScore}%
                </div>
              </div>

              {/* Feedback */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback
                </label>
                <textarea
                  value={evaluation.feedback}
                  onChange={e => setEvaluation(prev => ({ ...prev, feedback: e.target.value }))}
                  rows={4}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Provide detailed feedback for the student..."
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Submit Evaluation
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select a submission to begin grading
            </div>
          )}
        </div>
      </div>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}; 