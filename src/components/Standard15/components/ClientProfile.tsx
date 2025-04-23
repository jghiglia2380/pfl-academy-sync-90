import { FC } from 'react';
import { ScaffoldingLevel } from '@/types/standard15';
import { useAccessibility } from '@/hooks/useAccessibility';

interface Props {
  scenario: 'alex' | 'jordan' | 'taylor';
  scaffoldingLevel: ScaffoldingLevel;
  isPreview?: boolean;
}

interface ProfileData {
  name: string;
  pronouns: string;
  title: string;
  description: string;
  currentExperience: string[];
  futureGoals: string[];
}

const profiles: Record<string, ProfileData> = {
  alex: {
    name: 'Alex Martinez',
    pronouns: 'he/him',
    title: 'High School Junior',
    description: `Alex is a high school junior who's passionate about technology and entrepreneurship. 
      He enjoys coding and has created a few simple games using Python tutorials. Alex is part of 
      his school's computer club and recently helped design the club's website. While he loves 
      technology, he's unsure whether to pursue a computer science degree or explore other 
      tech-related paths.`,
    currentExperience: [
      'Basic Python programming',
      'HTML/CSS website creation',
      'Computer club leadership role',
      'Strong math and science grades',
    ],
    futureGoals: [
      'Game development',
      'Web design',
      'Tech entrepreneurship',
      'Problem-solving',
    ],
  },
  jordan: {
    name: 'Jordan Chen',
    pronouns: 'she/her',
    title: 'High School Senior',
    description: `Jordan is a high school senior who's discovered a passion for digital media and marketing. 
      She manages her school's Instagram account and helps local small businesses, including her 
      family's restaurant, with social media posts. Jordan has grown the school's account from 200 
      to 800 followers through consistent posting and engaging content.`,
    currentExperience: [
      'School social media manager',
      'Basic graphic design skills',
      'Content creation for family business',
      'Photography club member',
    ],
    futureGoals: [
      'Marketing degree',
      'Digital media internship',
      'Content strategy skills',
      'Professional portfolio',
    ],
  },
  taylor: {
    name: 'Taylor Williams',
    pronouns: 'they/them',
    title: 'College Sophomore',
    description: `Taylor is a second-year college student majoring in Health Sciences. They work 
      part-time (15 hours/week) as a wellness center assistant on campus, earning $14/hour. Through 
      their campus job and coursework, Taylor has discovered a passion for health education and is 
      considering becoming a certified personal trainer while completing their degree.`,
    currentExperience: [
      'Part-time Wellness Center Assistant',
      'Health Sciences Major (2nd year)',
      'Student Health Club Member',
      'Basic fitness knowledge',
    ],
    futureGoals: [
      'Personal trainer certification',
      'Health coaching courses',
      'Wellness program development',
      'Business fundamentals',
    ],
  },
};

export const ClientProfile: FC<Props> = ({ scenario, scaffoldingLevel, isPreview }) => {
  const { fontSize, highContrast } = useAccessibility();
  const profile = profiles[scenario];

  const containerClasses = `
    rounded-lg p-6 mb-8 
    ${highContrast ? 'bg-gray-900 text-white' : 'bg-white shadow-md'}
  `;

  const headingClasses = `
    font-semibold mb-2
    ${highContrast ? 'text-yellow-300' : 'text-gray-800'}
    ${fontSize === 'large' ? 'text-2xl' : 'text-xl'}
  `;

  const textClasses = `
    ${highContrast ? 'text-gray-100' : 'text-gray-700'}
    ${fontSize === 'large' ? 'text-lg' : 'text-base'}
  `;

  const listClasses = `
    space-y-1 mt-2
    ${highContrast ? 'text-gray-100' : 'text-gray-700'}
    ${fontSize === 'large' ? 'text-lg' : 'text-base'}
  `;

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={headingClasses}>
            {profile.name} ({profile.pronouns})
          </h3>
          <p className={`${textClasses} opacity-75`}>{profile.title}</p>
        </div>
        {scaffoldingLevel !== ScaffoldingLevel.Clean && (
          <div className="text-sm">
            <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">
              Scenario Profile
            </span>
          </div>
        )}
      </div>

      <p className={`${textClasses} mb-6`} role="article">
        {profile.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className={headingClasses}>Current Experience</h4>
          <ul className={listClasses} role="list">
            {profile.currentExperience.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className={headingClasses}>Future Goals</h4>
          <ul className={listClasses} role="list">
            {profile.futureGoals.map((item, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {scaffoldingLevel === ScaffoldingLevel.Complete && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg" role="note">
          <h4 className="font-medium text-blue-800 mb-2">Analysis Tips</h4>
          <ul className="text-blue-700 space-y-2">
            <li>• Consider how the current experience aligns with future goals</li>
            <li>• Identify potential gaps in skills or knowledge</li>
            <li>• Think about short-term vs long-term objectives</li>
            <li>• Consider market demands and industry trends</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClientProfile; 