import React from 'react';
import { Standard8Submission } from '../../../types/standard8';

interface SubmissionControlsProps {
  submission: Standard8Submission | null;
  onSave: () => void;
  onSubmit: () => void;
}

export const SubmissionControls: React.FC<SubmissionControlsProps> = ({
  submission,
  onSave,
  onSubmit
}) => {
  const isSubmitted = submission?.status === 'submitted';
  const isGraded = submission?.status === 'graded';

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row justify-end gap-4">
        <button
          type="button"
          onClick={onSave}
          disabled={isSubmitted || isGraded}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isSubmitted || isGraded
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          <i className="fas fa-save mr-2"></i>
          Save Draft
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitted || isGraded}
          className={`px-4 py-2 rounded-md text-white font-medium ${
            isSubmitted || isGraded
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          <i className="fas fa-paper-plane mr-2"></i>
          Submit Assessment
        </button>
      </div>

      {isGraded && submission?.grade && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Assessment Graded</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Score</p>
              <p className="text-2xl font-bold text-blue-600">{submission.grade.score}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Graded By</p>
              <p className="text-sm font-medium text-gray-900">{submission.grade.gradedBy}</p>
              <p className="text-xs text-gray-500">
                {new Date(submission.grade.gradedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          {submission.grade.feedback && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-1">Feedback</p>
              <p className="text-sm text-gray-900 whitespace-pre-wrap">{submission.grade.feedback}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 