'use client';

import { useState } from 'react';
import { QuizLibrary } from './QuizLibrary';
import { MidtermLibrary } from './MidtermLibrary';
import { FinalLibrary } from './FinalLibrary';
import { ProjectLibrary } from './ProjectLibrary';

type AssessmentType = 'quizzes' | 'midterms' | 'finals' | 'projects';

export default function AssessmentLibrary() {
  const [activeTab, setActiveTab] = useState<AssessmentType>('quizzes');
  const [isCustomQuizEnabled, setIsCustomQuizEnabled] = useState(false);

  const tabs = [
    { id: 'quizzes', label: 'Quizzes', icon: 'fa-question-circle' },
    { id: 'midterms', label: 'Midterms', icon: 'fa-file-alt' },
    { id: 'finals', label: 'Finals', icon: 'fa-graduation-cap' },
    { id: 'projects', label: 'Projects', icon: 'fa-project-diagram' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">Assessment Library</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isCustomQuizEnabled}
                      onChange={(e) => setIsCustomQuizEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    <span className="ml-3 text-sm font-medium text-gray-700">Enable Custom Quizzes</span>
                  </label>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <i className="fas fa-save mr-2"></i>Save Configuration
                  </button>
                  <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Create Custom Assessment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex">
            {/* AI Assistance Sidebar (1/4 width) */}
            <div className="w-1/4 p-6 border-r border-gray-200">
              <div className="space-y-6">
                {/* Assessment Type Tabs */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Assessment Types</h2>
                  <div className="flex flex-col space-y-2">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        className={`assessment-type-tab w-full text-left px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 ${
                          activeTab === tab.id ? 'active' : ''
                        }`}
                        onClick={() => setActiveTab(tab.id as AssessmentType)}
                      >
                        <i className={`fas ${tab.icon} mr-2 text-${tab.id === 'quizzes' ? 'blue' : tab.id === 'midterms' ? 'purple' : tab.id === 'finals' ? 'green' : 'yellow'}-500`}></i>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Question Type Legend */}
                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-900">Question Types</h2>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Multiple Choice</span>
                      <span className="question-type-badge multiple-choice px-2 py-1 rounded-full text-xs font-medium">MC</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Short Response</span>
                      <span className="question-type-badge short-response px-2 py-1 rounded-full text-xs font-medium">SR</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Situational</span>
                      <span className="question-type-badge situational px-2 py-1 rounded-full text-xs font-medium">ST</span>
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">Fill in the Blank</span>
                      <span className="question-type-badge fill-blank px-2 py-1 rounded-full text-xs font-medium">FB</span>
                    </div>
                  </div>
                </div>

                {/* AI Nudge Explanation */}
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-indigo-900 mb-2">AI Nudge Feature</h3>
                  <p className="text-sm text-indigo-700">
                    Our AI system provides gentle nudges to help students reflect on their learning and improve their understanding. These prompts appear at strategic points during assessments.
                  </p>
                </div>

                {/* AI Assistance Settings */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assessment AI Assistance</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Enable AI Feedback</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span className="ml-2 text-sm text-gray-700">Enable Answer Guidance</span>
                      </label>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500">
                      <i className="fas fa-info-circle mr-1"></i>
                      Note: AI nudging for reflection prompts and skill builder activities is managed separately in the curriculum settings.
                    </p>
                  </div>
                </div>

                {/* AI Support Features */}
                <div className="pt-4 border-t border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">AI Support Features</h2>
                  <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      Automatic grading for all question types
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      Optional AI guidance for student responses
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      Teacher override capabilities
                    </li>
                    <li className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 mr-2"></i>
                      Knowledge base integration for edge cases
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Main Content Area (3/4 width) */}
            <div className="w-3/4 p-6">
              {activeTab === 'quizzes' && <QuizLibrary />}
              {activeTab === 'midterms' && <MidtermLibrary />}
              {activeTab === 'finals' && <FinalLibrary />}
              {activeTab === 'projects' && <ProjectLibrary />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 