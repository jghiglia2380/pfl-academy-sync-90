import React from 'react';
import { Standard14Assessment } from '../../../types/standard14';
import { Button } from '../../ui/Button';
import { formatDate } from '../../../utils/date';

interface Props {
  assessment: Standard14Assessment | null;
  onSave: () => void;
  onSubmit: () => void;
}

export const SubmissionControls: React.FC<Props> = ({ assessment, onSave, onSubmit }) => {
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {assessment?.updatedAt && (
            <span>Last saved: {formatDate(assessment.updatedAt)}</span>
          )}
        </div>
        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onSave}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={onSubmit}
            disabled={assessment?.status === 'submitted'}
          >
            {assessment?.status === 'submitted' ? 'Submitted' : 'Submit Assessment'}
          </Button>
        </div>
      </div>
    </div>
  );
}; 