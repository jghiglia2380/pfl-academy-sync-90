import { sampleTransactions } from "./data/sampleTransactions";
import TableHeader from "./check-register/TableHeader";
import RegisterRow from "./check-register/RegisterRow";
import Instructions from "./check-register/Instructions";

const CheckRegister = ({ formData, setFormData }) => {
  // Handle entry change and update global state
  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...formData.checkRegister];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };

    setFormData((prev) => ({
      ...prev,
      checkRegister: updatedEntries,
    }));
  };

  const addNewEntry = () => {
    setFormData((prev) => ({
      ...prev,
      checkRegister: [
        ...prev.checkRegister,
        {
          date: "",
          transactionType: "",
          checkNumber: "",
          description: "",
          withdrawal: "",
          deposit: "",
          balance: "",
        },
      ],
    }));
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto mt-8 p-8 bg-white shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">
          Check Register
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-fixed">
            <colgroup>
              <col className="w-[8%]" />
              <col className="w-[20%]" />
              <col className="w-[12%]" />
              <col className="w-[25%]" />
              <col className="w-[15%]" />
              <col className="w-[12%]" />
              <col className="w-[10%]" />
            </colgroup>
            <TableHeader />
            <tbody>
              {formData.checkRegister.map((entry, index) => (
                <RegisterRow
                  key={index}
                  entry={entry}
                  index={index}
                  transactions={sampleTransactions}
                  onEntryChange={handleEntryChange}
                />
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={addNewEntry}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add New Entry
          </button>
        </div>
        <Instructions />
      </div>
    </div>
  );
};

export default CheckRegister;
