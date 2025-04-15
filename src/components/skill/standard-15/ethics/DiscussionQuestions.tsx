import React from 'react';

const questions = [
  "Why do you think the government prioritized prosecuting Al Capone for tax evasion?",
  "Do you believe it is ethical for corporations to use legal tax avoidance strategies?",
  "How do these different approaches impact society?"
];

export function DiscussionQuestions() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-indigo-600 mb-4">Consider These Questions:</h3>
      <ul className="space-y-3">
        {questions.map((question, index) => (
          <li key={index} className="flex items-start">
            <span className="text-indigo-600 mr-2">•</span>
            <span className="text-slate-600">{question}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}