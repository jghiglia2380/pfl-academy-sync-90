import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Database } from "../lib/database.types";
import { Standard11Submission, Standard11Draft } from "../types/standard11";
import { standard11Schema } from "../schemas/standard11";

const defaultValues: Standard11Draft = {
  scenario1_response: {
    riskAssessment: {
      identifiedRisks: []
    },
    insuranceAnalysis: {
      recommendedCoverage: [],
      monthlyBudget: {
        income: 0,
        expenses: 0,
        insuranceAllocation: 0,
        calculations: ""
      }
    },
    protectionPlan: {
      steps: []
    }
  },
  scenario2_response: {
    riskAssessment: {
      identifiedRisks: []
    },
    insuranceAnalysis: {
      recommendedCoverage: [],
      monthlyBudget: {
        income: 0,
        expenses: 0,
        insuranceAllocation: 0,
        calculations: ""
      }
    },
    protectionPlan: {
      steps: []
    }
  }
};

export function useStandard11Form() {
  const supabase = useSupabaseClient<Database>();
  const form = useForm<Standard11Draft>({
    resolver: zodResolver(standard11Schema),
    defaultValues,
    mode: "onChange"
  });

  const loadAssessment = async (assessmentId: string) => {
    const { data, error } = await supabase
      .from("standard11_assessments")
      .select("*")
      .eq("id", assessmentId)
      .single();

    if (error) {
      console.error("Error loading assessment:", error);
      return;
    }

    if (data) {
      form.reset({
        scenario1_response: data.scenario1_response,
        scenario2_response: data.scenario2_response
      });
    }
  };

  const saveDraft = async (assessmentId: string) => {
    const formData = form.getValues();
    const { error } = await supabase
      .from("standard11_assessments")
      .upsert({
        id: assessmentId,
        scenario1_response: formData.scenario1_response,
        scenario2_response: formData.scenario2_response,
        status: "draft"
      });

    if (error) {
      console.error("Error saving draft:", error);
      throw error;
    }
  };

  const submitAssessment = async (assessmentId: string) => {
    const formData = form.getValues();
    const { error } = await supabase
      .from("standard11_assessments")
      .upsert({
        id: assessmentId,
        scenario1_response: formData.scenario1_response,
        scenario2_response: formData.scenario2_response,
        status: "submitted"
      });

    if (error) {
      console.error("Error submitting assessment:", error);
      throw error;
    }
  };

  const canSubmit = () => {
    const formData = form.getValues();
    const scenario1Valid = 
      formData.scenario1_response.riskAssessment.identifiedRisks.length >= 2 &&
      formData.scenario1_response.insuranceAnalysis.recommendedCoverage.length >= 1 &&
      formData.scenario1_response.protectionPlan.steps.length >= 3;

    const scenario2Valid = 
      formData.scenario2_response.riskAssessment.identifiedRisks.length >= 2 &&
      formData.scenario2_response.insuranceAnalysis.recommendedCoverage.length >= 1 &&
      formData.scenario2_response.protectionPlan.steps.length >= 3;

    return scenario1Valid && scenario2Valid;
  };

  return {
    form,
    loadAssessment,
    saveDraft,
    submitAssessment,
    canSubmit
  };
} 