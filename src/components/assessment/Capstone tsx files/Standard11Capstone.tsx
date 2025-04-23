import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useStandard11Form } from "@/hooks/useStandard11Form";
import { Standard11Draft } from "@/types/standard11";

export function Standard11Capstone() {
  const { form, saveDraft, submitAssessment, canSubmit } = useStandard11Form();
  const { register, formState: { errors } } = useFormContext<Standard11Draft>();

  const handleSaveDraft = async () => {
    try {
      await saveDraft("current-assessment-id");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      await submitAssessment("current-assessment-id");
    } catch (error) {
      console.error("Error submitting assessment:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Scenario 1: Young Professional Risk Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Risk Assessment Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Risk Assessment</h3>
            <div className="space-y-4">
              {[1, 2].map((index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <Input
                    {...register(`scenario1_response.riskAssessment.identifiedRisks.${index - 1}.type`)}
                    placeholder="Risk Type"
                  />
                  <Textarea
                    {...register(`scenario1_response.riskAssessment.identifiedRisks.${index - 1}.description`)}
                    placeholder="Risk Description"
                  />
                  <Input
                    type="number"
                    {...register(`scenario1_response.riskAssessment.identifiedRisks.${index - 1}.impact`)}
                    placeholder="Impact (1-10)"
                  />
                  <Input
                    type="number"
                    {...register(`scenario1_response.riskAssessment.identifiedRisks.${index - 1}.probability`)}
                    placeholder="Probability (1-10)"
                  />
                  <Textarea
                    {...register(`scenario1_response.riskAssessment.identifiedRisks.${index - 1}.mitigationStrategy`)}
                    placeholder="Mitigation Strategy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Analysis Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Insurance Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Input
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.type`)}
                  placeholder="Insurance Type"
                />
                <Input
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.provider`)}
                  placeholder="Provider"
                />
                <Input
                  type="number"
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.coverage`)}
                  placeholder="Coverage Amount"
                />
                <Input
                  type="number"
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.premium`)}
                  placeholder="Premium"
                />
                <Input
                  type="number"
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.deductible`)}
                  placeholder="Deductible"
                />
                <Textarea
                  {...register(`scenario1_response.insuranceAnalysis.recommendedCoverage.0.justification`)}
                  placeholder="Justification"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Monthly Budget</h4>
              <Input
                type="number"
                {...register(`scenario1_response.insuranceAnalysis.monthlyBudget.income`)}
                placeholder="Monthly Income"
              />
              <Input
                type="number"
                {...register(`scenario1_response.insuranceAnalysis.monthlyBudget.expenses`)}
                placeholder="Monthly Expenses"
              />
              <Input
                type="number"
                {...register(`scenario1_response.insuranceAnalysis.monthlyBudget.insuranceAllocation`)}
                placeholder="Insurance Allocation"
              />
              <Textarea
                {...register(`scenario1_response.insuranceAnalysis.monthlyBudget.calculations`)}
                placeholder="Budget Calculations"
              />
            </div>
          </div>

          {/* Protection Plan Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Protection Plan</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <Input
                    {...register(`scenario1_response.protectionPlan.steps.${index - 1}.action`)}
                    placeholder="Action"
                  />
                  <Input
                    {...register(`scenario1_response.protectionPlan.steps.${index - 1}.timeline`)}
                    placeholder="Timeline"
                  />
                  <Input
                    type="number"
                    {...register(`scenario1_response.protectionPlan.steps.${index - 1}.cost`)}
                    placeholder="Cost"
                  />
                  <Textarea
                    {...register(`scenario1_response.protectionPlan.steps.${index - 1}.expectedOutcome`)}
                    placeholder="Expected Outcome"
                  />
                  <select
                    {...register(`scenario1_response.protectionPlan.steps.${index - 1}.priority`)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scenario 2: Growing Family Protection Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Repeat the same structure for Scenario 2 */}
          {/* Risk Assessment Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Risk Assessment</h3>
            <div className="space-y-4">
              {[1, 2].map((index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <Input
                    {...register(`scenario2_response.riskAssessment.identifiedRisks.${index - 1}.type`)}
                    placeholder="Risk Type"
                  />
                  <Textarea
                    {...register(`scenario2_response.riskAssessment.identifiedRisks.${index - 1}.description`)}
                    placeholder="Risk Description"
                  />
                  <Input
                    type="number"
                    {...register(`scenario2_response.riskAssessment.identifiedRisks.${index - 1}.impact`)}
                    placeholder="Impact (1-10)"
                  />
                  <Input
                    type="number"
                    {...register(`scenario2_response.riskAssessment.identifiedRisks.${index - 1}.probability`)}
                    placeholder="Probability (1-10)"
                  />
                  <Textarea
                    {...register(`scenario2_response.riskAssessment.identifiedRisks.${index - 1}.mitigationStrategy`)}
                    placeholder="Mitigation Strategy"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Analysis Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Insurance Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Input
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.type`)}
                  placeholder="Insurance Type"
                />
                <Input
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.provider`)}
                  placeholder="Provider"
                />
                <Input
                  type="number"
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.coverage`)}
                  placeholder="Coverage Amount"
                />
                <Input
                  type="number"
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.premium`)}
                  placeholder="Premium"
                />
                <Input
                  type="number"
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.deductible`)}
                  placeholder="Deductible"
                />
                <Textarea
                  {...register(`scenario2_response.insuranceAnalysis.recommendedCoverage.0.justification`)}
                  placeholder="Justification"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Monthly Budget</h4>
              <Input
                type="number"
                {...register(`scenario2_response.insuranceAnalysis.monthlyBudget.income`)}
                placeholder="Monthly Income"
              />
              <Input
                type="number"
                {...register(`scenario2_response.insuranceAnalysis.monthlyBudget.expenses`)}
                placeholder="Monthly Expenses"
              />
              <Input
                type="number"
                {...register(`scenario2_response.insuranceAnalysis.monthlyBudget.insuranceAllocation`)}
                placeholder="Insurance Allocation"
              />
              <Textarea
                {...register(`scenario2_response.insuranceAnalysis.monthlyBudget.calculations`)}
                placeholder="Budget Calculations"
              />
            </div>
          </div>

          {/* Protection Plan Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Protection Plan</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg">
                  <Input
                    {...register(`scenario2_response.protectionPlan.steps.${index - 1}.action`)}
                    placeholder="Action"
                  />
                  <Input
                    {...register(`scenario2_response.protectionPlan.steps.${index - 1}.timeline`)}
                    placeholder="Timeline"
                  />
                  <Input
                    type="number"
                    {...register(`scenario2_response.protectionPlan.steps.${index - 1}.cost`)}
                    placeholder="Cost"
                  />
                  <Textarea
                    {...register(`scenario2_response.protectionPlan.steps.${index - 1}.expectedOutcome`)}
                    placeholder="Expected Outcome"
                  />
                  <select
                    {...register(`scenario2_response.protectionPlan.steps.${index - 1}.priority`)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleSaveDraft}>
          Save Draft
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit()}>
          Submit Assessment
        </Button>
      </div>
    </div>
  );
} 