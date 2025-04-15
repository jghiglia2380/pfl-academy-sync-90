import React from 'react';
import { AlertCircle, Building2 } from 'lucide-react';

const caseStudies = [
  {
    title: "Example 1: Illegal Tax Evasion – Al Capone's Downfall",
    content: "Al Capone, one of the most notorious crime bosses in U.S. history, was brought down not by his criminal activities but through tax evasion charges. Despite running a lucrative empire through illegal alcohol distribution, gambling, and other illicit businesses, Capone failed to report his income to the IRS. The government's investigation revealed substantial earnings that were never accounted for in tax filings, allowing the prosecution to charge him with tax evasion. In 1931, Capone was convicted and sentenced to 11 years in federal prison.",
    icon: <AlertCircle className="w-6 h-6 text-red-500" />,
    iconBg: "bg-red-100"
  },
  {
    title: "Example 2: Legal Tax Avoidance – Amazon's Global Strategy",
    content: "Amazon demonstrates legal tax avoidance through strategic financial planning. In 2021, Amazon reported a federal tax rate of just 6 percent on its U.S. profits of over $35 billion, saving approximately $5.2 billion in federal corporate taxes by using various tax credits and deductions. Additionally, Amazon leverages subsidiaries and moves profits to countries with lower tax rates, like Luxembourg, allowing them to minimize their U.S. tax obligations.",
    icon: <Building2 className="w-6 h-6 text-green-500" />,
    iconBg: "bg-green-100"
  }
];

export function CaseStudies() {
  return (
    <div className="space-y-6">
      {caseStudies.map((study, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-4">
            <div className={`${study.iconBg} p-2 rounded-lg mr-4`}>
              {study.icon}
            </div>
            <h3 className="text-xl font-semibold text-slate-900">{study.title}</h3>
          </div>
          <p className="text-slate-600 ml-14">{study.content}</p>
        </div>
      ))}
    </div>
  );
}