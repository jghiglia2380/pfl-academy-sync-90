import { formatSSN, isValidSSN, isValidName, isValidDateOfBirth } from '../../utils/formatters';

export default function PersonalInfoForm({ data, onChange, type }) {
  const handleChange = (field, value: string) => {
    if (field === 'ssn') {
      value = formatSSN(value);
    }
    if ((field === 'firstName' || field === 'lastName') && !isValidName(value)) {
      return;
    }
    onChange({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Enter first name"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${data.firstName && isValidName(data.firstName)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Enter last name"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${data.lastName && isValidName(data.lastName)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={data.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${isValidDateOfBirth(data.dateOfBirth)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
            max={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Social Security Number</label>
          <input
            type="text"
            value={data.ssn}
            onChange={(e) => handleChange('ssn', e.target.value)}
            placeholder="XXX-XX-XXXX"
            maxLength={11}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${isValidSSN(data.ssn)
                ? 'border-green-300 focus:border-green-500'
                : 'border-gray-300 focus:border-blue-500'}`}
          />
        </div>
      </div>
    </div>
  );
}