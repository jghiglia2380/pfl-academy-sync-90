import React from 'react';
import { useStandard10Form } from '@/hooks/useStandard10Form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Standard10Layout } from './Standard10Layout';
import { STANDARD10_CONSTANTS } from '@/constants/standard10';
import type { ComparablePropertyInput } from '@/types/standard10';

interface ComparablePropertyInput {
  address: string;
  price: number;
  features: string;
}

export const Standard10Capstone: React.FC = () => {
  const { assessmentId } = useParams();
  const {
    formData,
    setFormData,
    errors,
    isSubmitting,
    progress,
    handleSubmit,
    validateForm
  } = useStandard10Form(assessmentId as string);

  const handleMarketAnalysisChange = (
    scenarioKey: 'scenario1' | 'scenario2',
    field: string,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        marketAnalysis: {
          ...prev[scenarioKey].marketAnalysis,
          [field]: value
        }
      }
    }));
  };

  const handleFinancialCalculationsChange = (
    scenarioKey: 'scenario1' | 'scenario2',
    field: string,
    value: string
  ) => {
    const numValue = parseFloat(value) || 0;
    setFormData((prev) => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        financialCalculations: {
          ...prev[scenarioKey].financialCalculations,
          [field]: numValue
        }
      }
    }));
  };

  const handleDecisionAnalysisChange = (
    scenarioKey: 'scenario1' | 'scenario2',
    field: string,
    value: string | string[]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        decisionAnalysis: {
          ...prev[scenarioKey].decisionAnalysis,
          [field]: value
        }
      }
    }));
  };

  const addComparableProperty = (scenarioKey: 'scenario1' | 'scenario2') => {
    setFormData((prev) => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        marketAnalysis: {
          ...prev[scenarioKey].marketAnalysis,
          comparableProperties: [
            ...prev[scenarioKey].marketAnalysis.comparableProperties,
            { address: '', price: 0, features: '' }
          ]
        }
      }
    }));
  };

  const handleComparablePropertyChange = (
    scenarioKey: 'scenario1' | 'scenario2',
    index: number,
    field: keyof ComparablePropertyInput,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [scenarioKey]: {
        ...prev[scenarioKey],
        marketAnalysis: {
          ...prev[scenarioKey].marketAnalysis,
          comparableProperties: prev[scenarioKey].marketAnalysis.comparableProperties.map(
            (prop, i) =>
              i === index
                ? {
                    ...prop,
                    [field]: field === 'price' ? parseFloat(value) || 0 : value
                  }
                : prop
          )
        }
      }
    }));
  };

  const renderScenarioForm = (scenarioKey: 'scenario1' | 'scenario2') => {
    const scenario = formData[scenarioKey];
    
    return (
      <div className="space-y-6">
        {/* Market Analysis Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Market Analysis</h3>
            <Badge variant="outline">Required</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor={`${scenarioKey}-location`}>Location</Label>
              <Input
                id={`${scenarioKey}-location`}
                value={scenario.marketAnalysis.location}
                onChange={(e) =>
                  handleMarketAnalysisChange(scenarioKey, 'location', e.target.value)
                }
                error={errors[`${scenarioKey}.marketAnalysis.location`]}
              />
            </div>
            
            <div>
              <Label htmlFor={`${scenarioKey}-propertyType`}>Property Type</Label>
              <Input
                id={`${scenarioKey}-propertyType`}
                value={scenario.marketAnalysis.propertyType}
                onChange={(e) =>
                  handleMarketAnalysisChange(scenarioKey, 'propertyType', e.target.value)
                }
                error={errors[`${scenarioKey}.marketAnalysis.propertyType`]}
              />
            </div>

            <div>
              <Label htmlFor={`${scenarioKey}-marketTrends`}>Market Trends Analysis</Label>
              <Textarea
                id={`${scenarioKey}-marketTrends`}
                value={scenario.marketAnalysis.marketTrends}
                onChange={(e) =>
                  handleMarketAnalysisChange(scenarioKey, 'marketTrends', e.target.value)
                }
                error={errors[`${scenarioKey}.marketAnalysis.marketTrends`]}
                rows={4}
              />
            </div>

            <div>
              <Label>Comparable Properties</Label>
              {scenario.marketAnalysis.comparableProperties.map((prop, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 mt-2">
                  <Input
                    placeholder="Address"
                    value={prop.address}
                    onChange={(e) =>
                      handleComparablePropertyChange(
                        scenarioKey,
                        index,
                        'address',
                        e.target.value
                      )
                    }
                  />
                  <Input
                    type="number"
                    placeholder="Price"
                    value={prop.price}
                    onChange={(e) =>
                      handleComparablePropertyChange(
                        scenarioKey,
                        index,
                        'price',
                        e.target.value
                      )
                    }
                  />
                  <Input
                    placeholder="Features"
                    value={prop.features}
                    onChange={(e) =>
                      handleComparablePropertyChange(
                        scenarioKey,
                        index,
                        'features',
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addComparableProperty(scenarioKey)}
                className="mt-2"
              >
                Add Comparable Property
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Financial Calculations Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Financial Calculations</h3>
            <Badge variant="outline">Required</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`${scenarioKey}-monthlyIncome`}>Monthly Income</Label>
                <Input
                  id={`${scenarioKey}-monthlyIncome`}
                  type="number"
                  value={scenario.financialCalculations.monthlyIncome}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'monthlyIncome',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.monthlyIncome`]}
                />
              </div>
              <div>
                <Label htmlFor={`${scenarioKey}-monthlyExpenses`}>Monthly Expenses</Label>
                <Input
                  id={`${scenarioKey}-monthlyExpenses`}
                  type="number"
                  value={scenario.financialCalculations.monthlyExpenses}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'monthlyExpenses',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.monthlyExpenses`]}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`${scenarioKey}-downPayment`}>Down Payment</Label>
                <Input
                  id={`${scenarioKey}-downPayment`}
                  type="number"
                  value={scenario.financialCalculations.downPayment}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'downPayment',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.downPayment`]}
                />
              </div>
              <div>
                <Label htmlFor={`${scenarioKey}-mortgageRate`}>Mortgage Rate (%)</Label>
                <Input
                  id={`${scenarioKey}-mortgageRate`}
                  type="number"
                  step="0.01"
                  value={scenario.financialCalculations.mortgageRate}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'mortgageRate',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.mortgageRate`]}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor={`${scenarioKey}-propertyTaxes`}>Property Taxes</Label>
                <Input
                  id={`${scenarioKey}-propertyTaxes`}
                  type="number"
                  value={scenario.financialCalculations.propertyTaxes}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'propertyTaxes',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.propertyTaxes`]}
                />
              </div>
              <div>
                <Label htmlFor={`${scenarioKey}-insurance`}>Insurance</Label>
                <Input
                  id={`${scenarioKey}-insurance`}
                  type="number"
                  value={scenario.financialCalculations.insurance}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'insurance',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.insurance`]}
                />
              </div>
              <div>
                <Label htmlFor={`${scenarioKey}-maintenanceCosts`}>
                  Maintenance Costs
                </Label>
                <Input
                  id={`${scenarioKey}-maintenanceCosts`}
                  type="number"
                  value={scenario.financialCalculations.maintenanceCosts}
                  onChange={(e) =>
                    handleFinancialCalculationsChange(
                      scenarioKey,
                      'maintenanceCosts',
                      e.target.value
                    )
                  }
                  error={errors[`${scenarioKey}.financialCalculations.maintenanceCosts`]}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Decision Analysis Section */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Decision Analysis</h3>
            <Badge variant="outline">Required</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Pros</Label>
                <Textarea
                  value={scenario.decisionAnalysis.pros.join('\n')}
                  onChange={(e) =>
                    handleDecisionAnalysisChange(
                      scenarioKey,
                      'pros',
                      e.target.value.split('\n')
                    )
                  }
                  error={errors[`${scenarioKey}.decisionAnalysis.pros`]}
                  placeholder="Enter one pro per line"
                  rows={4}
                />
              </div>
              <div>
                <Label>Cons</Label>
                <Textarea
                  value={scenario.decisionAnalysis.cons.join('\n')}
                  onChange={(e) =>
                    handleDecisionAnalysisChange(
                      scenarioKey,
                      'cons',
                      e.target.value.split('\n')
                    )
                  }
                  error={errors[`${scenarioKey}.decisionAnalysis.cons`]}
                  placeholder="Enter one con per line"
                  rows={4}
                />
              </div>
            </div>

            <div>
              <Label>Short-term Considerations</Label>
              <Textarea
                value={scenario.decisionAnalysis.shortTermConsiderations}
                onChange={(e) =>
                  handleDecisionAnalysisChange(
                    scenarioKey,
                    'shortTermConsiderations',
                    e.target.value
                  )
                }
                error={errors[`${scenarioKey}.decisionAnalysis.shortTermConsiderations`]}
                rows={3}
              />
            </div>

            <div>
              <Label>Long-term Considerations</Label>
              <Textarea
                value={scenario.decisionAnalysis.longTermConsiderations}
                onChange={(e) =>
                  handleDecisionAnalysisChange(
                    scenarioKey,
                    'longTermConsiderations',
                    e.target.value
                  )
                }
                error={errors[`${scenarioKey}.decisionAnalysis.longTermConsiderations`]}
                rows={3}
              />
            </div>

            <div>
              <Label>Risk Analysis</Label>
              <Textarea
                value={scenario.decisionAnalysis.riskAnalysis}
                onChange={(e) =>
                  handleDecisionAnalysisChange(
                    scenarioKey,
                    'riskAnalysis',
                    e.target.value
                  )
                }
                error={errors[`${scenarioKey}.decisionAnalysis.riskAnalysis`]}
                rows={3}
              />
            </div>

            <div>
              <Label>Final Recommendation</Label>
              <Textarea
                value={scenario.recommendation}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [scenarioKey]: {
                      ...prev[scenarioKey],
                      recommendation: e.target.value
                    }
                  }))
                }
                error={errors[`${scenarioKey}.recommendation`]}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <Standard10Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Housing Decision Analysis Project</h1>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </Button>
        </div>

        <Progress 
          value={Object.values(progress).filter(Boolean).length * 33.33} 
          className="w-full"
        />

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertDescription>
              Please fix all errors before submitting the assessment.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue={STANDARD10_CONSTANTS.SCENARIOS.SCENARIO1.KEY}>
          <TabsList>
            <TabsTrigger value={STANDARD10_CONSTANTS.SCENARIOS.SCENARIO1.KEY}>
              {STANDARD10_CONSTANTS.SCENARIOS.SCENARIO1.TITLE}
            </TabsTrigger>
            <TabsTrigger value={STANDARD10_CONSTANTS.SCENARIOS.SCENARIO2.KEY}>
              {STANDARD10_CONSTANTS.SCENARIOS.SCENARIO2.TITLE}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={STANDARD10_CONSTANTS.SCENARIOS.SCENARIO1.KEY}>
            {renderScenarioForm(STANDARD10_CONSTANTS.SCENARIOS.SCENARIO1.KEY)}
          </TabsContent>
          <TabsContent value={STANDARD10_CONSTANTS.SCENARIOS.SCENARIO2.KEY}>
            {renderScenarioForm(STANDARD10_CONSTANTS.SCENARIOS.SCENARIO2.KEY)}
          </TabsContent>
        </Tabs>
      </div>
    </Standard10Layout>
  );
}; 