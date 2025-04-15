import React from 'react';
import { Student, Guardian } from '../../../types/bankAccount';
import { formatSSN, isValidSSN, isValidName, isValidDateOfBirth } from '../../../utils/formatters';

interface Props {
  data: Student | Guardian;
  onChange: (data: any) => void;
  type: 'student' | 'guardian';
}

export default function PersonalInfoSection({ data, onChange, type }: Props) {
  const handleChange = (field: string, value: string) => {
    if (field === 'ssn') {
      value = formatSSN(value);
    }
    if ((field === 'firstName' || field === 'lastName') && !isValidName(value)) {
      return;
    }
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={data.personalInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${data.personalInfo.firstName && isValidName(data.personalInfo.firstName)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Letters only</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={data.personalInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${data.personalInfo.lastName && isValidName(data.personalInfo.lastName)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Letters only</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={data.personalInfo.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${isValidDateOfBirth(data.personalInfo.dateOfBirth)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Social Security Number</label>
          <input
            type="text"
            value={data.personalInfo.ssn}
            onChange={(e) => handleChange('ssn', e.target.value)}
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${isValidSSN(data.personalInfo.ssn)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
          <p className="mt-1 text-sm text-gray-500">Format: XXX-XX-XXXX</p>
        </div>
        {type === 'guardian' && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">Relationship to Student</label>
            <select
              value={(data as Guardian).relationship}
              onChange={(e) => onChange({
                ...data,
                relationship: e.target.value
              })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select relationship</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Legal Guardian">Legal Guardian</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}