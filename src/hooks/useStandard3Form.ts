import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import {
  CreditManagementSubmission,
  creditManagementSubmissionSchema,
} from '../types/standard3';
import {
  saveStandard3Draft,
  submitStandard3Assessment,
  getStandard3Assessment,
  getStandard3Feedback,
} from '../lib/supabase/standard3';

export function useStandard3Form() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);

  const form = useForm<CreditManagementSubmission>({
    resolver: zodResolver(creditManagementSubmissionSchema),
    defaultValues: {
      creditScoreAnalysis: {
        currentScore: 0,
        scoreFactors: {
          paymentHistory: 0,
          creditUtilization: 0,
          lengthOfCredit: 0,
          newCredit: 0,
          creditMix: 0,
        },
        scoreImpact: '',
        improvementPlan: '',
      },
      creditReportAnalysis: {
        accounts: [],
        inquiries: [],
        publicRecords: [],
        analysis: '',
      },
      creditManagementPlan: {
        goals: {
          shortTerm: [],
          longTerm: [],
        },
        strategies: {
          debtReduction: '',
          creditBuilding: '',
          utilization: '',
        },
        timeline: {
          milestones: [],
          targetScore: 0,
          targetDate: '',
        },
      },
    },
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadAssessment();
  }, [user]);

  const loadAssessment = async () => {
    try {
      const { assessment: assessmentData, feedback: feedbackData } =
        await getStandard3Assessment(user.id);

      setAssessment(assessmentData);
      setFeedback(feedbackData);

      if (assessmentData?.draft) {
        form.reset(assessmentData.draft.content);
      } else if (assessmentData?.submission) {
        form.reset(assessmentData.submission.content);
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (data: CreditManagementSubmission) => {
    if (!user) return;

    setSaving(true);
    try {
      await saveStandard3Draft(user.id, data);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSaving(false);
    }
  };

  const submitAssessment = async (data: CreditManagementSubmission) => {
    if (!user) return;

    setSaving(true);
    try {
      if (assessment?.status === 'needs_resubmission') {
        await submitStandard3Assessment(user.id, data);
      } else {
        await submitStandard3Assessment(user.id, data);
      }
      await loadAssessment();
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit = !assessment || assessment.status === 'draft' || assessment.status === 'needs_resubmission';
  const canEdit = !assessment || assessment.status === 'draft' || assessment.status === 'needs_resubmission';
  const isSubmitted = assessment?.status === 'submitted' || assessment?.status === 'graded';
  const needsResubmission = assessment?.status === 'needs_resubmission';

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
    isSubmitted,
    needsResubmission,
  };
} 