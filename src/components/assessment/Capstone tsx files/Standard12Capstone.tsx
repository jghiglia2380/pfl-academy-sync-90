import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useStandard12Form } from '@/hooks/useStandard12Form';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function Standard12Capstone() {
  const { id } = useParams();
  const { form, isLoading, isSaving, saveDraft, submitAssessment, canSubmit } = useStandard12Form(id as string);
  const [activeScenario, setActiveScenario] = useState(1);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const renderProbabilityExample = () => (
    <Alert className="mb-6">
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Example: Coin Flip Probability</AlertTitle>
      <AlertDescription>
        <p>When flipping a fair coin:</p>
        <ul className="list-disc pl-6 mt-2">
          <li>Total possible outcomes: 2 (heads or tails)</li>
          <li>Probability of heads = 1/2 = 0.5 or 50%</li>
          <li>If you win $2 on heads and lose $1 on tails:</li>
          <li>Expected Value = (0.5 × $2) + (0.5 × -$1) = $0.50</li>
        </ul>
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Standard 12: Probability and Risk Assessment</h1>
      
      <div className="flex gap-4 mb-6">
        <Button 
          variant={activeScenario === 1 ? "default" : "outline"}
          onClick={() => setActiveScenario(1)}
        >
          Scenario 1: Understanding Game Odds
        </Button>
        <Button 
          variant={activeScenario === 2 ? "default" : "outline"}
          onClick={() => setActiveScenario(2)}
        >
          Scenario 2: State Lottery
        </Button>
        <Button 
          variant={activeScenario === 3 ? "default" : "outline"}
          onClick={() => setActiveScenario(3)}
        >
          Scenario 3: Making Smart Choices
        </Button>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {activeScenario === 1 && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Scenario 1: Understanding Game Odds</h2>
            {renderProbabilityExample()}
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Game Type</label>
                <select 
                  className="w-full p-2 border rounded"
                  {...form.register('scenario1.gameType')}
                >
                  <option value="">Select a game...</option>
                  <option value="dice">Rolling a Die</option>
                  <option value="coin">Flipping a Coin</option>
                  <option value="numbers">Number Guessing</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">List All Possible Outcomes</label>
                <Textarea 
                  placeholder="Example: For a die roll - 1, 2, 3, 4, 5, 6"
                  {...form.register('scenario1.outcomes')}
                />
              </div>

              <div>
                <label className="block mb-2">Favorable Outcomes</label>
                <Textarea 
                  placeholder="Which outcomes would be considered a win?"
                  {...form.register('scenario1.favorableOutcomes')}
                />
              </div>

              <div>
                <label className="block mb-2">Calculate Probability</label>
                <Input 
                  type="text"
                  placeholder="Example: 1/6 or 0.167 or 16.7%"
                  {...form.register('scenario1.probability')}
                />
              </div>

              <div>
                <label className="block mb-2">Show Your Calculations</label>
                <Textarea 
                  placeholder="Show how you calculated the probability"
                  {...form.register('scenario1.calculations')}
                />
              </div>
            </div>
          </Card>
        )}

        {activeScenario === 2 && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Scenario 2: State Lottery</h2>
            <Alert className="mb-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Pick 3 Lottery Information</AlertTitle>
              <AlertDescription>
                <p>In a Pick 3 lottery:</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>Choose 3 numbers from 0-9</li>
                  <li>Win by matching in exact order</li>
                  <li>Typical prize: $500 for a $1 ticket</li>
                  <li>Consider: What could you buy instead with $1 per day?</li>
                </ul>
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Prize Structure Analysis</label>
                <Textarea 
                  placeholder="Describe the prizes and their amounts"
                  {...form.register('scenario2.prizeStructure')}
                />
              </div>

              <div>
                <label className="block mb-2">Odds Analysis</label>
                <Textarea 
                  placeholder="What are your chances of winning? Show your work"
                  {...form.register('scenario2.oddsAnalysis')}
                />
              </div>

              <div>
                <label className="block mb-2">Opportunity Cost</label>
                <Textarea 
                  placeholder="What else could you do with the money spent on lottery tickets?"
                  {...form.register('scenario2.opportunityCost')}
                />
              </div>

              <div>
                <label className="block mb-2">Recommendations</label>
                <Textarea 
                  placeholder="What would you recommend to someone considering playing the lottery?"
                  {...form.register('scenario2.recommendations')}
                />
              </div>
            </div>
          </Card>
        )}

        {activeScenario === 3 && (
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Scenario 3: Making Smart Choices</h2>
            <Alert className="mb-6">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Meet Sara</AlertTitle>
              <AlertDescription>
                Sara just got her first part-time job making $15/hour, working 20 hours per week. 
                She's excited about having her own money but needs to make smart choices. 
                Help her create a responsible plan for entertainment spending.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              <div>
                <label className="block mb-2">Budget Limit</label>
                <Input 
                  type="text"
                  placeholder="How much should Sara budget for entertainment?"
                  {...form.register('scenario3.budgetLimit')}
                />
              </div>

              <div>
                <label className="block mb-2">Time Limit</label>
                <Input 
                  type="text"
                  placeholder="How much time is reasonable for entertainment activities?"
                  {...form.register('scenario3.timeLimit')}
                />
              </div>

              <div>
                <label className="block mb-2">Monitoring Strategy</label>
                <Textarea 
                  placeholder="How can Sara track her spending and time?"
                  {...form.register('scenario3.monitoringStrategy')}
                />
              </div>

              <div>
                <label className="block mb-2">Support Resources</label>
                <Textarea 
                  placeholder="List resources Sara can use if she needs help"
                  {...form.register('scenario3.supportResources')}
                />
              </div>

              <div>
                <label className="block mb-2">Personal Plan</label>
                <Textarea 
                  placeholder="Create a personal plan for Sara to follow"
                  {...form.register('scenario3.personalPlan')}
                />
              </div>
            </div>
          </Card>
        )}

        <div className="mt-6 flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={saveDraft}
            disabled={isSaving}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={submitAssessment}
            disabled={isSaving || !canSubmit()}
          >
            Submit Assessment
          </Button>
        </div>
      </form>
    </div>
  );
} 