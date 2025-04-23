import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { standard1SubmissionSchema } from '../types/standard1';
import {
  saveStandard1Draft,
  submitStandard1Assessment,
  getStandard1Assessment,
  resubmitStandard1Assessment,
} from '../lib/supabase/standard1';

export function useStandard1Form() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [feedback, setFeedback] = useState([]);

  const form = useForm({
    resolver: zodResolver(standard1SubmissionSchema),
    defaultValues: {
      content: {
        financialGoals: {
          shortTerm: [],
          mediumTerm: [],
          longTerm: [],
        },
        budgetAnalysis: {
          income: {
            salary: 0,
            other: 0,
          },
          expenses: {
            fixed: 0,
            variable: 0,
          },
          savings: 0,
        },
        recommendations: {
          shortTerm: '',
          mediumTerm: '',
          longTerm: '',
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
      const data = await getStandard1Assessment(user.id);
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
      await saveStandard1Draft(user.id, data.content);
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
        await resubmitStandard1Assessment(
          user.id,
          data.content,
          assessment.submission_id
        );
      } else {
        await submitStandard1Assessment(user.id, data.content);
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