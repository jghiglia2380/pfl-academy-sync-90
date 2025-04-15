import { ClipboardCheck } from 'lucide-react';

export default function Header() {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-6">
        <ClipboardCheck className="h-16 w-16 text-blue-600" />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Simplified Tax Planning & Compliance Checklist
      </h1>
      <p className="text-lg text-gray-600">
        Understanding tax planning is a critical step toward financial independence. 
        This activity provides customized checklists for two age groups—18-24 and 25-35—to 
        help navigate common tax responsibilities, deductions, credits, and planning strategies.
      </p>
    </div>
  );
}