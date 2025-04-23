import { FC } from 'react';
import { ScaffoldingLevel, FinancialAnalysisItem, StartupCostItem } from '@/types/standard15';
import { useAccessibility } from '@/hooks/useAccessibility';
import { DynamicTable } from '@/components/shared/DynamicTable';
import { Card } from '@/components/ui/Card';
import { Tabs, TabPanel } from '@/components/ui/Tabs';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { useTimeTracking } from '@/hooks/useTimeTracking';

interface Props {
  renderTable: (section: string, defaultRows: number) => React.ReactNode;
  scaffoldingLevel: ScaffoldingLevel;
  isPreview?: boolean;
}

const defaultEducationCosts: Partial<FinancialAnalysisItem>[] = [
  {
    expenseCategory: 'Tuition and Fees',
    annualCost: 10000,
    fourYearTotal: 40000,
    notes: 'Based on average in-state public university costs',
  },
  {
    expenseCategory: 'Books and Materials',
    annualCost: 1200,
    fourYearTotal: 4800,
    notes: 'Includes required software and equipment',
  },
  {
    expenseCategory: 'Living Expenses',
    annualCost: 12000,
    fourYearTotal: 48000,
    notes: 'Housing, food, utilities, etc.',
  },
];

const defaultStartupCosts: Partial<StartupCostItem>[] = [
  {
    resourceTool: 'Development Environment',
    initialCost: 1000,
    monthlyCost: 50,
    purpose: 'Software licenses and cloud services',
  },
  {
    resourceTool: 'Marketing',
    initialCost: 500,
    monthlyCost: 100,
    purpose: 'Website hosting and advertising',
  },
];

export const FinancialAnalysis: FC<Props> = ({
  renderTable,
  scaffoldingLevel,
  isPreview,
}) => {
  const { fontSize, highContrast } = useAccessibility();
  const { trackTime } = useTimeTracking('financial-analysis');

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
        <h3 className={headingClasses}>Financial Analysis</h3>
        {scaffoldingLevel !== ScaffoldingLevel.Clean && (
          <InfoTooltip
            content="Compare education costs with potential startup/side project expenses to make informed decisions"
            position="top"
          />
        )}
      </div>

      <Tabs defaultValue="education" className="mb-6">
        <TabPanel value="education" label="Education Costs">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Education Cost Analysis</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Analysis Guidelines</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• Research actual costs for your target schools</li>
                    <li>• Include all mandatory fees and materials</li>
                    <li>• Consider living expenses if moving away</li>
                    <li>• Factor in potential scholarships or financial aid</li>
                  </ul>
                </div>
              )}
              {renderTable('financialAnalysis', 
                scaffoldingLevel === ScaffoldingLevel.Complete ? 3 : 
                scaffoldingLevel === ScaffoldingLevel.Guided ? 2 : 1
              )}
            </div>
          </Card>
        </TabPanel>

        <TabPanel value="startup" label="Startup/Project Costs">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Startup Cost Analysis</h4>
              {scaffoldingLevel === ScaffoldingLevel.Complete && (
                <div className="bg-blue-50 p-4 rounded-lg mb-4" role="note">
                  <h5 className="font-medium text-blue-800 mb-2">Cost Considerations</h5>
                  <ul className="text-blue-700 space-y-2">
                    <li>• List all essential tools and resources</li>
                    <li>• Include both one-time and recurring costs</li>
                    <li>• Consider scaling costs as you grow</li>
                    <li>• Factor in marketing and operational expenses</li>
                  </ul>
                </div>
              )}
              {renderTable('startupCosts',
                scaffoldingLevel === ScaffoldingLevel.Complete ? 3 :
                scaffoldingLevel === ScaffoldingLevel.Guided ? 2 : 1
              )}
            </div>
          </Card>
        </TabPanel>
      </Tabs>

      {scaffoldingLevel === ScaffoldingLevel.Complete && (
        <div className="mt-6">
          <Card>
            <div className="p-4">
              <h4 className="text-lg font-medium mb-4">Comparative Analysis</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium mb-2">Education Investment</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Long-term career foundation</li>
                    <li>• Structured learning environment</li>
                    <li>• Networking opportunities</li>
                    <li>• Degree credentials</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Startup Investment</h5>
                  <ul className="space-y-2 text-sm">
                    <li>• Immediate practical experience</li>
                    <li>• Flexible learning pace</li>
                    <li>• Potential early income</li>
                    <li>• Direct market exposure</li>
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

export default FinancialAnalysis; 