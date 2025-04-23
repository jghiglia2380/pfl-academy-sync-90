import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { standard2SubmissionSchema } from '../types/standard2';
import {
  saveStandard2Draft,
  submitStandard2Assessment,
  getStandard2Assessment,
  resubmitStandard2Assessment,
} from '../lib/supabase/standard2';

export function useStandard2Form() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const form = useForm({
    resolver: zodResolver(standard2SubmissionSchema),
    defaultValues: {
      content: {
        spendingAnalysis: {
          categories: [
            { name: 'Housing', amount: 0, percentage: 0 },
            { name: 'Transportation', amount: 0, percentage: 0 },
            { name: 'Food', amount: 0, percentage: 0 },
            { name: 'Utilities', amount: 0, percentage: 0 },
            { name: 'Insurance', amount: 0, percentage: 0 },
            { name: 'Entertainment', amount: 0, percentage: 0 },
            { name: 'Other', amount: 0, percentage: 0 },
          ],
          total: 0,
        },
        savingsPlan: {
          currentSavings: 0,
          monthlyContribution: 0,
          targetAmount: 0,
          timeline: 0,
        },
        recommendations: {
          spending: '',
          savings: '',
          implementation: '',
        },
      },
    },
  });

  useEffect(() => {
    if (user) {
      loadAssessment();
    }
  }, [user]);

  const loadAssessment = async () => {
    try {
      setLoading(true);
      const data = await getStandard2Assessment(user.id);
      setAssessment(data.assessment);
      setFeedback(data.feedback);

      if (data.assessment?.draft) {
        form.reset(data.assessment.draft.content);
      } else if (data.assessment?.submission) {
        form.reset(data.assessment.submission.content);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (data) => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setSaving(true);
      await saveStandard2Draft(user.id, data.content);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSaving(false);
    }
  };

  const submitAssessment = async (data) => {
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      setLoading(true);
      if (assessment?.status === 'graded' && assessment?.needs_resubmission) {
        await resubmitStandard2Assessment(
          user.id,
          data.content,
          assessment.submission_id
        );
      } else {
        await submitStandard2Assessment(user.id, data.content);
      }
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = !assessment || 
    assessment.status === 'not_started' || 
    (assessment.status === 'graded' && assessment.needs_resubmission);

  const canEdit = !assessment || 
    assessment.status === 'not_started' || 
    assessment.status === 'draft' || 
    (assessment.status === 'graded' && assessment.needs_resubmission);

  return {
    form,
    loading,
    saving,
    assessment,
    feedback,
    saveDraft,
    submitAssessment,
    canSubmit,
    canEdit,
  };
} 