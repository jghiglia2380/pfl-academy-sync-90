import { FC } from 'react';
import { ScaffoldingLevel, CareerMilestone, SkillGoal } from '@/types/standard15';
import { useAccessibility } from '@/hooks/useAccessibility';
import { Card } from '@/components/ui/Card';
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useTimeTracking } from '@/hooks/useTimeTracking';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface Props {
  renderTable: (section: string, defaultRows: number) => React.ReactNode;
  scaffoldingLevel: ScaffoldingLevel;
  isPreview?: boolean;
}

const defaultMilestones: Partial<CareerMilestone>[] = [
  {
    milestone: 'Entry Level Position',
    timeframe: '0-2 years',
    requirements: 'Bachelor\'s degree, basic programming skills',
    progressMetrics: 'Project completion, code quality',
  },
  {
    milestone: 'Mid-Level Developer',
    timeframe: '2-5 years',
    requirements: 'Advanced frameworks, team leadership',
    progressMetrics: 'System architecture, mentoring juniors',
  },
];

const defaultSkillGoals: Partial<SkillGoal>[] = [
  {
    skill: 'Cloud Computing',
    currentLevel: 'Basic',
    targetLevel: 'Advanced',
    timeline: '12 months',
    resources: 'AWS certification courses',
  },
  {
    skill: 'Team Leadership',
    currentLevel: 'Intermediate',
    targetLevel: 'Expert',
    timeline: '18 months',
    resources: 'Management training, project lead role',
  },
];

export const CareerProgression: FC<Props> = ({
  renderTable,
  scaffoldingLevel,
  isPreview,
}) => {
  const { fontSize, highContrast } = useAccessibility();
  const { trackTime } = useTimeTracking('career-progression');

  const containerClasses = `
    rounded-lg p-6 mb-8 
    ${highContrast ? 'bg-gray-900 text-white' : 'bg-white shadow-md'}
  `;

  const headingClasses = `
    font-semibold mb-4
    ${highContrast ? 'text-yellow-300' : 'text-gray-800'}
    ${fontSize === 'large' ? 'text-2xl' : 'text-xl'}
  `;

  return (
    <div className={containerClasses} onFocus={trackTime}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={headingClasses}>Career Progression Plan</h3>
        {scaffoldingLevel !== ScaffoldingLevel.Clean && (
          <InfoTooltip
            content="Map your career journey with clear milestones and skill development goals"
            position="top"
          />
        )}
      </div>

      <Tabs defaultValue="milestones" className="mb-6">
        <TabPanel value="milestones" label="Career Milestones">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Career Path Milestones</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Milestone Planning Tips</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Set realistic timeframes for each milestone</li>
                    <li>• Define clear requirements and metrics</li>
                    <li>• Consider industry trends and demands</li>
                    <li>• Plan for continuous learning</li>
                  </ul>
                </div>
              )}
              {renderTable('careerMilestones',
                scaffoldingLevel === ScaffoldingLevel.Complete ? 4 :
                scaffoldingLevel === ScaffoldingLevel.Guided ? 3 : 2
              )}
            </div>
          </Card>
        </TabPanel>

        <TabPanel value="skillGoals" label="Skill Development">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Skill Development Goals</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Skill Development Strategy</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Identify key skills for career growth</li>
                    <li>• Set measurable improvement targets</li>
                    <li>• Research learning resources</li>
                    <li>• Track progress regularly</li>
                  </ul>
                </div>
              )}
              {renderTable('skillGoals',
                scaffoldingLevel === ScaffoldingLevel.Complete ? 4 :
                scaffoldingLevel === ScaffoldingLevel.Guided ? 3 : 2
              )}
            </div>
          </Card>
        </TabPanel>
      </Tabs>

      {scaffoldingLevel === ScaffoldingLevel.Complete && (
        <div className="mt-6">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Progress Tracking</h4>
              <div className="space-y-6">
                <div>
                  <h5 className="font-medium mb-2">Technical Skills Progress</h5>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Programming Fundamentals</span>
                        <span>85%</span>
                      </div>
                      <ProgressBar value={85} max={100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Framework Expertise</span>
                        <span>70%</span>
                      </div>
                      <ProgressBar value={70} max={100} />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-medium mb-2">Soft Skills Development</h5>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Team Communication</span>
                        <span>75%</span>
                      </div>
                      <ProgressBar value={75} max={100} />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Project Management</span>
                        <span>60%</span>
                      </div>
                      <ProgressBar value={60} max={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CareerProgression; 