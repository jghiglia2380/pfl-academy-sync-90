import { FC } from 'react';
import { ScaffoldingLevel, ValuePropositionElement, BrandElement } from '@/types/standard15';
import { useAccessibility } from '@/hooks/useAccessibility';
import { Card } from '@/components/ui/Card';
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useTimeTracking } from '@/hooks/useTimeTracking';

interface Props {
  renderTable: (section: string, defaultRows: number) => React.ReactNode;
  scaffoldingLevel: ScaffoldingLevel;
  isPreview?: boolean;
}

const defaultValueProps: Partial<ValuePropositionElement>[] = [
  {
    element: 'Technical Skills',
    currentStrength: 'Proficient in Python and web development',
    developmentNeed: 'Advanced frameworks and cloud services',
    actionSteps: 'Complete online courses, build portfolio projects',
  },
  {
    element: 'Industry Knowledge',
    currentStrength: 'Basic understanding of tech trends',
    developmentNeed: 'Deep expertise in specific domains',
    actionSteps: 'Follow industry blogs, attend conferences',
  },
];

const defaultBrandElements: Partial<BrandElement>[] = [
  {
    element: 'Voice & Tone',
    description: 'Professional yet approachable',
    examples: 'Blog posts, social media content',
    application: 'Consistent messaging across platforms',
  },
  {
    element: 'Visual Identity',
    description: 'Clean, modern aesthetic',
    examples: 'Portfolio website, presentations',
    application: 'Professional branding materials',
  },
];

export const BrandStrategy: FC<Props> = ({
  renderTable,
  scaffoldingLevel,
  isPreview,
}) => {
  const { fontSize, highContrast } = useAccessibility();
  const { trackTime } = useTimeTracking('brand-strategy');

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
        <h3 className={headingClasses}>Personal Brand Strategy</h3>
        {scaffoldingLevel !== ScaffoldingLevel.Clean && (
          <InfoTooltip
            content="Develop your unique value proposition and professional brand identity"
            position="top"
          />
        )}
      </div>

      <Tabs defaultValue="valueProposition" className="mb-6">
        <TabPanel value="valueProposition" label="Value Proposition">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Value Proposition Elements</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Development Guidelines</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Identify your unique strengths and expertise</li>
                    <li>• Analyze gaps between current and desired skills</li>
                    <li>• Create actionable development plans</li>
                    <li>• Set measurable milestones for progress</li>
                  </ul>
                </div>
              )}
              {renderTable('valueProposition',
                scaffoldingLevel === ScaffoldingLevel.Complete ? 4 :
                scaffoldingLevel === ScaffoldingLevel.Guided ? 3 : 2
              )}
            </div>
          </Card>
        </TabPanel>

        <TabPanel value="brandVoice" label="Brand Voice & Style">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Brand Elements</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Brand Development Tips</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Define your professional personality</li>
                    <li>• Create consistent visual elements</li>
                    <li>• Develop content guidelines</li>
                    <li>• Plan implementation across platforms</li>
                  </ul>
                </div>
              )}
              {renderTable('brandElements',
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
              <h4 className="text-lg font-medium mb-4">Brand Implementation Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Online Presence</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Professional website/portfolio</li>
                    <li>• LinkedIn optimization</li>
                    <li>• Content strategy</li>
                    <li>• Social media presence</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Professional Network</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Industry connections</li>
                    <li>• Speaking opportunities</li>
                    <li>• Community involvement</li>
                    <li>• Mentorship relationships</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default BrandStrategy; 