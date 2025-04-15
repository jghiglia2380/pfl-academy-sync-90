'use client';

import { useState } from 'react';
import { Project } from '@/types/assessment';

export function ProjectLibrary() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      title: 'Personal Budget Project',
      description: 'Create a comprehensive personal budget plan for a given scenario',
      standards: ['1.1', '1.2', '1.3', '2.1', '2.2'],
      requirements: [
        'Monthly income and expense analysis',
        'Savings and investment recommendations',
        'Emergency fund planning',
        'Debt management strategy',
      ],
      rubric: {
        criteria: [
          { name: 'Budget Accuracy', weight: 30 },
          { name: 'Financial Analysis', weight: 25 },
          { name: 'Recommendations', weight: 25 },
          { name: 'Presentation', weight: 20 },
        ],
      },
      timeframe: '2 weeks',
      difficulty: 'medium',
      groupSize: 2,
    },
    {
      id: '2',
      title: 'Investment Portfolio Analysis',
      description: 'Analyze and present an investment portfolio strategy',
      standards: ['3.1', '3.2', '3.3', '4.1', '4.2'],
      requirements: [
        'Portfolio diversification analysis',
        'Risk assessment',
        'Return on investment calculations',
        'Market trend analysis',
      ],
      rubric: {
        criteria: [
          { name: 'Analysis Depth', weight: 35 },
          { name: 'Risk Assessment', weight: 25 },
          { name: 'Recommendations', weight: 25 },
          { name: 'Presentation', weight: 15 },
        ],
      },
      timeframe: '3 weeks',
      difficulty: 'hard',
      groupSize: 3,
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {project.timeframe} • {project.difficulty} difficulty
                    {project.groupSize && ` • Group size: ${project.groupSize}`}
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

              <p className="mt-2 text-sm text-gray-600">{project.description}</p>

              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  {project.standards.map((standard) => (
                    <span key={standard} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Requirements</h4>
                <ul className="mt-2 space-y-1">
                  {project.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                      <span className="text-sm text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-900">Rubric</h4>
                <div className="mt-2 space-y-1">
                  {project.rubric.criteria.map((criterion, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{criterion.name}</span>
                      <span className="text-sm font-medium text-gray-900">{criterion.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Created {new Date().toLocaleDateString()}
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