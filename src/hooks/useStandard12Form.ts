import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useCallback, useEffect, useState } from 'react';
import { Database } from '@/types/database';
import { Standard12Assessment, standard12Schema } from '@/types/standard12';
import { toast } from 'react-hot-toast';

const defaultValues: Standard12Assessment = {
  id: '',
  userId: '',
  status: 'draft',
  scenario1: {
    gameType: '',
    outcomes: '',
    favorableOutcomes: '',
    probability: '',
    expectedValue: '',
    calculations: '',
  },
  scenario2: {
    lotteryType: 'Pick 3',
    prizeStructure: '',
    oddsAnalysis: '',
    opportunityCost: '',
    recommendations: '',
  },
  scenario3: {
    budgetLimit: '',
    timeLimit: '',
    monitoringStrategy: '',
    supportResources: [],
    personalPlan: '',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  submittedAt: null,
  feedback: [],
  grade: null,
};

export function useStandard12Form(assessmentId?: string) {
  const supabase = useSupabaseClient<Database>();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<Standard12Assessment>({
    resolver: zodResolver(standard12Schema),
    defaultValues,
  });

  const loadAssessment = useCallback(async () => {
    if (!assessmentId) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('standard12_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error) throw error;
      if (data) {
        form.reset(data as Standard12Assessment);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      toast.error('Failed to load assessment');
    } finally {
      setIsLoading(false);
    }
  }, [assessmentId, form, supabase]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();
      const { error } = await supabase
        .from('standard12_assessments')
        .upsert({
          ...values,
          status: 'draft',
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const submitAssessment = async () => {
    setIsSaving(true);
    try {
      const values = form.getValues();
      const { error } = await supabase
        .from('standard12_assessments')
        .upsert({
          ...values,
          status: 'submitted',
          submitted_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Assessment submitted successfully');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      toast.error('Failed to submit assessment');
    } finally {
      setIsSaving(false);
    }
  };

  const canSubmit = useCallback(() => {
    const values = form.getValues();
    const scenario1Complete = Object.values(values.scenario1).every(Boolean);
    const scenario2Complete = Object.values(values.scenario2).every(Boolean);
    const scenario3Complete = 
      values.scenario3.budgetLimit &&
      values.scenario3.timeLimit &&
      values.scenario3.monitoringStrategy &&
      values.scenario3.supportResources.length > 0 &&
      values.scenario3.personalPlan;

    return scenario1Complete && scenario2Complete && scenario3Complete;
  }, [form]);

  return {
    form,
    isLoading,
    isSaving,
    saveDraft,
    submitAssessment,
    canSubmit,
  };
} 