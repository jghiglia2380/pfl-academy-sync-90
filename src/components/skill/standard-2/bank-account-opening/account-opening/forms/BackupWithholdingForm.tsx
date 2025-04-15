import React from 'react';
import { HelpCircle, ExternalLink } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';

interface Props {
  isSubjectToWithholding: boolean;
  onChange: (isSubject: boolean) => void;
}

export default function BackupWithholdingForm({ isSubjectToWithholding, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Backup Withholding</h3>
        <Tooltip content="Backup withholding is a way for the IRS to ensure that they receive tax payments from people who haven't properly reported their income.">
          <HelpCircle className="h-5 w-5 text-gray-400" />
        </Tooltip>
      </div>

      <p className="text-sm text-gray-600">
        Have you been notified by the IRS that you're subject to backup withholding?
      </p>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={!isSubjectToWithholding}
            onChange={() => onChange(false)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">No, I'm not subject to backup withholding</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="radio"
            checked={isSubjectToWithholding}
            onChange={() => onChange(true)}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            Yes, I have heard from the IRS that I'm subject to backup withholding
          </span>
        </label>
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium mb-2">Under penalties of perjury, I certify that:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            The number shown on this form is my correct{' '}
            <a href="#" className="text-blue-600 hover:underline inline-flex items-center">
              taxpayer identification number
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </li>
          <li>I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the IRS that I am subject to backup withholding</li>
          <li>
            I am a{' '}
            <a href="#" className="text-blue-600 hover:underline inline-flex items-center">
              U.S. person
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </li>
          <li>
            The{' '}
            <a href="#" className="text-blue-600 hover:underline inline-flex items-center">
              FATCA code(s)
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
            {' '}entered on this form (if any) indicating that I am exempt from FATCA reporting is correct
          </li>
        </ol>
      </div>
    </div>
  );
}