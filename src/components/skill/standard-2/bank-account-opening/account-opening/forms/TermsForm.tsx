import { FileText, ExternalLink } from "lucide-react";

interface Props {
  agreed: boolean;
  onChange: (agreed: boolean) => void;
}

export default function TermsForm({ agreed, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          Terms and Conditions
        </h3>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p className="mb-3">By checking the box below, I agree to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Account Agreement
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Privacy Policy
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Electronic Communications Agreement
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Checking Agreement & Truth in Savings Disclosures
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Availability of Funds & Electronic Fund Transfer Disclosure
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                Paperless Agreement
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
              <span className="ml-1">
                and understand I won't receive documents in the mail
              </span>
            </li>
          </ul>
        </div>

        <label className="grid grid-cols-[15px,1fr] items-center gap-2">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => onChange(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            I certify that I have read and agree to all the terms and conditions
            above, and that all information provided is accurate and true.
          </span>
        </label>
      </div>
    </div>
  );
}
