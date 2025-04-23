import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Standard9Submission } from '../types/standard9';
import { standard9Schema } from '../schemas/standard9';
import { useToast } from './useToast';

export function useStandard9Form(assessmentId?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessment, setAssessment] = useState<Standard9Submission | null>(null);
  const { showToast } = useToast();
  const supabase = useSupabaseClient();

  const form = useForm<Standard9Submission>({
    resolver: zodResolver(standard9Schema),
    defaultValues: {
      status: 'draft',
      investmentAnalysis: {
        cryptoScenario: {
          redFlagsAnalysis: '',
          potentialLosses: '',
          evaluationFramework: ''
        },
        phishingScenario: {
          redFlagsAnalysis: '',
          psychologicalTriggers: '',
          verificationSteps: ''
        },
        dataBreachScenario: {
          immediateActions: '',
          monitoringPlan: '',
          documentationTemplate: ''
        }
      }
    }
  });

  useEffect(() => {
    if (assessmentId) {
      loadAssessment();
    } else {
      setIsLoading(false);
    }
  }, [assessmentId]);

  const loadAssessment = async () => {
    try {
      const { data, error } = await supabase
        .from('standard9_assessments')
        .select('*')
        .eq('id', assessmentId)
        .single();

      if (error) throw error;

      if (data) {
        setAssessment(data);
        form.reset(data);
      }
    } catch (error) {
      showToast('Error loading assessment', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = async () => {
    try {
      setIsSaving(true);
      const values = form.getValues();
      const { error } = await supabase
        .from('standard9_assessments')
        .upsert({
          ...values,
          status: 'draft',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Draft saved successfully', 'success');
    } catch (error) {
      showToast('Error saving draft', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const submitAssessment = async (values: Standard9Submission) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from('standard9_assessments')
        .upsert({
          ...values,
          status: 'submitted',
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      showToast('Assessment submitted successfully', 'success');
    } catch (error) {
      showToast('Error submitting assessment', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit = () => {
    const values = form.getValues();
    return (
      values.investmentAnalysis.cryptoScenario.redFlagsAnalysis &&
      values.investmentAnalysis.cryptoScenario.potentialLosses &&
      values.investmentAnalysis.cryptoScenario.evaluationFramework &&
      values.investmentAnalysis.phishingScenario.redFlagsAnalysis &&
      values.investmentAnalysis.phishingScenario.psychologicalTriggers &&
      values.investmentAnalysis.phishingScenario.verificationSteps &&
      values.investmentAnalysis.dataBreachScenario.immediateActions &&
      values.investmentAnalysis.dataBreachScenario.monitoringPlan &&
      values.investmentAnalysis.dataBreachScenario.documentationTemplate
    );
  };

  const canEdit = () => {
    return !assessment || assessment.status === 'draft';
  };

  return {
    form,
    isLoading,
    isSaving,
    isSubmitting,
    assessment,
    saveDraft,
    submitAssessment,
    canSubmit,
    canEdit
  };
} 