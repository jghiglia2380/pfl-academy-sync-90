import {
  formatPhoneNumber,
  isValidPhoneNumber,
  isValidEmail,
} from "../../utils/formatters";
import { Copy } from "lucide-react";

export default function ContactInfoForm({ data, onChange, isGuardian }) {
  const handleChange = (field, value: string) => {
    if (field === "phone") {
      value = formatPhoneNumber(value);
    }
    onChange({ [field]: value });
  };

  const handleAddressChange = (field: string, value: string) => {
    onChange({
      address: {
        ...data.address,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center h-[30px]">
        <h3 className="text-lg font-semibold text-gray-900">
          Contact Information
        </h3>
        {isGuardian && (
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
          >
            <Copy className="h-4 w-4 mr-1.5" />
            Same as Student
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${
                isValidEmail(data.email)
                  ? "border-green-300 focus:border-green-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="XXX-XXX-XXXX"
            maxLength={12}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 
              ${
                isValidPhoneNumber(data.phone)
                  ? "border-green-300 focus:border-green-500"
                  : "border-gray-300 focus:border-blue-500"
              }`}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Street Address
          </label>
          <input
            type="text"
            value={data.address.street}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            City
          </label>
          <input
            type="text"
            value={data.address.city}
            onChange={(e) => handleAddressChange("city", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            State
          </label>
          <input
            type="text"
            value={data.address.state}
            onChange={(e) => handleAddressChange("state", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ZIP Code
          </label>
          <input
            type="text"
            value={data.address.zipCode}
            onChange={(e) => handleAddressChange("zipCode", e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
