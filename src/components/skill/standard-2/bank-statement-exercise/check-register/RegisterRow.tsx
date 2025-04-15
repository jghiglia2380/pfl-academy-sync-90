import React from "react";
import AutoCompleteInput from "./AutoCompleteInput";

interface RegisterRowProps {
  entry: any;
  index: number;
  transactions: any[];
  onEntryChange: (index: number, field: any, value: string) => void;
}

const RegisterRow: React.FC<RegisterRowProps> = ({
  entry,
  index,
  transactions,
  onEntryChange,
}) => (
  <tr>
    <td className="border border-blue-200 p-0">
      <AutoCompleteInput
        value={entry.date}
        onChange={(value) => onEntryChange(index, "date", value)}
        field="date"
        transactions={transactions}
        className="w-full min-h-[40px]"
      />
    </td>
    <td className="border border-blue-200 p-0">
      <AutoCompleteInput
        value={entry.transactionType}
        onChange={(value) => onEntryChange(index, "transactionType", value)}
        field="details"
        transactions={transactions}
        className="w-full min-h-[40px]"
      />
    </td>
    <td className="border border-blue-200 p-0">
      <input
        type="text"
        className="w-full min-h-[40px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={entry.checkNumber}
        onChange={(e) => onEntryChange(index, "checkNumber", e.target.value)}
      />
    </td>
    <td className="border border-blue-200 p-0">
      <AutoCompleteInput
        value={entry.description}
        onChange={(value) => onEntryChange(index, "description", value)}
        field="details"
        transactions={transactions}
        className="w-full min-h-[40px]"
      />
    </td>
    <td className="border border-blue-200 p-0">
      <input
        type="text"
        className="w-full min-h-[40px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={entry.withdrawal}
        onChange={(e) => onEntryChange(index, "withdrawal", e.target.value)}
      />
    </td>
    <td className="border border-blue-200 p-0">
      <input
        type="text"
        className="w-full min-h-[40px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={entry.deposit}
        onChange={(e) => onEntryChange(index, "deposit", e.target.value)}
      />
    </td>
    <td className="border border-blue-200 p-0">
      <input
        type="text"
        className="w-full min-h-[40px] p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
        value={entry.balance}
        onChange={(e) => onEntryChange(index, "balance", e.target.value)}
      />
    </td>
  </tr>
);

export default RegisterRow;
