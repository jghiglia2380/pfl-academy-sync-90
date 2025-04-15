import React from "react";
import { Check, X } from "lucide-react";
import NumericInput from "./NumericInput";

interface Apartment {
  id: number;
  name: string;
  rent: string;
  bedrooms: string;
  petFriendly: boolean;
  utilities: boolean;
  parking: boolean;
  proximity: string;
  laundry: boolean;
  gym: boolean;
  outdoor: boolean;
}

interface ComparisonTableProps {
  apartments: Apartment[];
  updateApartment: (id: number, field: string, value: any) => void;
  selectedApartment: number | null;
  setSelectedApartment: (id: number | null) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  apartments,
  updateApartment,
  selectedApartment,
  setSelectedApartment,
}) => {
  const BooleanCell = ({
    value,
    onChange,
  }: {
    value: boolean;
    onChange: (value: boolean) => void;
  }) => (
    <button
      onClick={() => onChange(!value)}
      className="flex items-center justify-center"
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center ${
          value
            ? "bg-green-100 text-green-600 border-2 border-green-600"
            : "bg-red-100 text-red-600 border-2 border-red-600"
        }`}
      >
        {value ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </div>
    </button>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-2 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feature
            </th>
            {apartments?.map((apt, index) => (
              <th
                key={apt.id}
                className=" bg-gray-50 text-left text-xs font-medium p-2 text-gray-500 uppercase tracking-wider"
              >
                <input
                  type="text"
                  value={apt.name}
                  onChange={(e) =>
                    updateApartment(apt.id, "name", e.target.value)
                  }
                  placeholder={`Apartment ${index + 1}`}
                  className="w-full p-1 border rounded"
                />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Rent
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <NumericInput
                  type="currency"
                  value={apt.rent}
                  onChange={(value) => updateApartment(apt.id, "rent", value)}
                  placeholder="$0"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Bedrooms
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <NumericInput
                  type="number"
                  value={apt.bedrooms}
                  onChange={(value) =>
                    updateApartment(apt.id, "bedrooms", value)
                  }
                  placeholder="0"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Pet-Friendly
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.petFriendly}
                  onChange={(value) =>
                    updateApartment(apt.id, "petFriendly", value)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Utilities Included
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.utilities}
                  onChange={(value) =>
                    updateApartment(apt.id, "utilities", value)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Parking Available
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.parking}
                  onChange={(value) =>
                    updateApartment(apt.id, "parking", value)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Distance to Work/School
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <NumericInput
                  type="number"
                  value={apt.proximity}
                  onChange={(value) =>
                    updateApartment(apt.id, "proximity", value)
                  }
                  placeholder="0"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              On-site Laundry
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.laundry}
                  onChange={(value) =>
                    updateApartment(apt.id, "laundry", value)
                  }
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Gym Access
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.gym}
                  onChange={(value) => updateApartment(apt.id, "gym", value)}
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="px-2 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              Outdoor Space
            </td>
            {apartments?.map((apt) => (
              <td
                key={apt.id}
                className="px-2 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                <BooleanCell
                  value={apt.outdoor}
                  onChange={(value) =>
                    updateApartment(apt.id, "outdoor", value)
                  }
                />
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
