'use client';

import { useState } from 'react';
import { Final } from '@/types/assessment';

export function FinalLibrary() {
  const [finals, setFinals] = useState<Final[]>([
    {
      id: '1',
      title: 'Final Exam 1',
      timeLimit: 90,
      standards: ['1.1', '1.2', '1.3', '2.1', '2.2', '2.3'],
      questionTypes: [
        { type: 'multiple_choice', count: 15, timeEstimate: { min: 1, max: 2 } },
        { type: 'short_response', count: 5, timeEstimate: { min: 3, max: 5 } },
        { type: 'situational', count: 3, timeEstimate: { min: 5, max: 8 } },
      ],
      difficulty: 'hard',
      dateCreated: new Date().toISOString(),
      hasComprehensiveReview: true,
      hasPracticalApplication: true,
    },
    {
      id: '2',
      title: 'Final Exam 2',
      timeLimit: 120,
      standards: ['3.1', '3.2', '3.3', '4.1', '4.2', '4.3'],
      questionTypes: [
        { type: 'multiple_choice', count: 20, timeEstimate: { min: 1, max: 2 } },
        { type: 'short_response', count: 8, timeEstimate: { min: 3, max: 5 } },
        { type: 'situational', count: 5, timeEstimate: { min: 5, max: 8 } },
        { type: 'fill_in_blank', count: 10, timeEstimate: { min: 1, max: 2 } },
      ],
      difficulty: 'hard',
      dateCreated: new Date().toISOString(),
      hasComprehensiveReview: true,
      hasPracticalApplication: true,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {finals.map((final) => (
          <div key={final.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{final.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {final.timeLimit} minutes • {final.difficulty} difficulty
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <i className="fas fa-eye"></i>
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-500">
                    <i className="fas fa-edit"></i>
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {final.standards.map((standard) => (
                    <span key={standard} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {final.questionTypes.map((type, index) => (
                    <span
                      key={index}
                      className={`question-type-badge ${
                        type.type === 'multiple_choice'
                          ? 'multiple-choice'
                          : type.type === 'short_response'
                          ? 'short-response'
                          : type.type === 'situational'
                          ? 'situational'
                          : 'fill-blank'
                      } px-2 py-1 rounded-full text-xs font-medium`}
                    >
                      {type.type === 'multiple_choice'
                        ? `${type.count} MC`
                        : type.type === 'short_response'
                        ? `${type.count} SR`
                        : type.type === 'situational'
                        ? `${type.count} ST`
                        : `${type.count} FB`}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {final.hasComprehensiveReview && (
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-book-open mr-2 text-green-500"></i>
                    Includes Comprehensive Review (10-15 min)
                  </div>
                )}
                {final.hasPracticalApplication && (
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fas fa-tasks mr-2 text-purple-500"></i>
                    Includes Practical Application (15-20 min)
                  </div>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Created {new Date(final.dateCreated).toLocaleDateString()}
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Deploy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 