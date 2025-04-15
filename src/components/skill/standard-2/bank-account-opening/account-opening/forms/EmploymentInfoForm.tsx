import { Briefcase, Building2 } from 'lucide-react';

export default function EmploymentInfoForm({ data, onChange }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Employment Information</h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Employment Status</label>
          <select
            value={data.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="unemployed">Unemployed</option>
            <option value="student">Student</option>
          </select>
        </div>

        {data.status !== 'unemployed' && (
          <>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Employer</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  <Building2 className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={data.employer || ''}
                  onChange={(e) => onChange({ employer: e.target.value })}
                  className="flex-1 block w-full rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Company name"
                />
              </div>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Position</label>
              <input
                type="text"
                value={data.position || ''}
                onChange={(e) => onChange({ position: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Job title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Start Date</label>
              <input
                type="date"
                value={data.startDate || ''}
                onChange={(e) => onChange({ startDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                max={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Annual Income</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={data.annualIncome || ''}
                  onChange={(e) => onChange({ annualIncome: parseFloat(e.target.value) })}
                  className="block w-full pl-7 pr-12 rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                  min="0"
                  step="100"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">/year</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}