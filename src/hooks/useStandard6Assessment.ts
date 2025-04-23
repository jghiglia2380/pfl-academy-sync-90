import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@supabase/auth-helpers-react';
import {
  getStandard6Assessment,
  saveStandard6Draft,
  submitStandard6Assessment,
  resubmitStandard6Assessment,
  getStandard6Feedback
} from '../lib/supabase/standard6';
import { Standard6Assessment, Standard6Feedback } from '../types/database';
import { TaxAnalysis, DeductionPlan, TaxStrategy } from '../types/standard6';

interface UseStandard6AssessmentProps {
  onError?: (error: Error) => void;
}

export function useStandard6Assessment({ onError }: UseStandard6AssessmentProps = {}) {
  const user = useUser();
  const router = useRouter();
  const [assessment, setAssessment] = useState<Standard6Assessment | null>(null);
  const [feedback, setFeedback] = useState<Standard6Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadAssessment();
  }, [user]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      if (!user?.id) return;

      const assessmentData = await getStandard6Assessment(user.id);
      setAssessment(assessmentData);

      if (assessmentData?.submission_id) {
        const feedbackData = await getStandard6Feedback(assessmentData.submission_id);
        setFeedback(feedbackData);
      }
    } catch (error) {
      onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
    calculationWorksheet?: string;
  }) => {
    try {
      setSaving(true);
      if (!user?.id) throw new Error('User not authenticated');

      await saveStandard6Draft(user.id, data);
      await loadAssessment();
    } catch (error) {
      onError?.(error as Error);
      throw error;
    } finally {
      setSaving(false);
    }
  };

  const submitAssessment = async (data: {
    taxAnalysis: TaxAnalysis;
    deductionPlan: DeductionPlan;
    taxStrategy: TaxStrategy;
    calculationWorksheet?: string;
    attachments?: string[];
  }) => {
    try {
      setSubmitting(true);
      if (!user?.id) throw new Error('User not authenticated');

      if (assessment?.status === 'resubmit_requested' && assessment.submission_id) {
        await resubmitStandard6Assessment(user.id, assessment.submission_id, data);
      } else {
        await submitStandard6Assessment(user.id, data);
      }
      
      await loadAssessment();
    } catch (error) {
      onError?.(error as Error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !loading && (!assessment || assessment.status === 'draft' || assessment.status === 'resubmit_requested');
  const canEdit = canSubmit || assessment?.status === 'draft';
  const isSubmitted = assessment?.status === 'submitted' || assessment?.status === 'graded';
  const needsResubmission = assessment?.status === 'resubmit_requested';

  return {
    assessment,
    feedback,
    loading,
    saving,
    submitting,
    canSubmit,
    canEdit,
    isSubmitted,
    needsResubmission,
    saveDraft,
    submitAssessment,
    refresh: loadAssessment
  };
} 