import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  InvestmentPlanningSubmission,
  investmentPlanningSubmissionSchema,
} from '../types/standard4';
import {
  saveStandard4Draft,
  submitStandard4Assessment,
  getStandard4Assessment,
  resubmitStandard4Assessment,
} from '../lib/supabase/standard4';

export function useStandard4Form() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<InvestmentPlanningSubmission>({
    resolver: zodResolver(investmentPlanningSubmissionSchema),
    defaultValues: {
      investmentAnalysis: {
        currentPortfolio: {
          stocks: [],
          bonds: [],
          mutualFunds: [],
          otherAssets: [],
        },
        riskAssessment: {
          riskTolerance: 'moderate',
          timeHorizon: 0,
          liquidityNeeds: 0,
          analysis: '',
        },
        performanceAnalysis: {
          returns: {
            annualized: 0,
            ytd: 0,
            historical: [],
          },
          benchmarkComparison: {
            benchmark: '',
            performance: 0,
            analysis: '',
          },
        },
      },
      investmentStrategy: {
        goals: {
          shortTerm: [],
          longTerm: [],
        },
        assetAllocation: {
          stocks: 0,
          bonds: 0,
          cash: 0,
          alternatives: 0,
          rationale: '',
        },
        investmentSelection: {
          criteria: [],
          screeningProcess: '',
          diversificationStrategy: '',
        },
      },
      investmentPlan: {
        implementation: {
          accountTypes: [],
          rebalancingStrategy: {
            frequency: '',
            thresholds: 0,
            process: '',
          },
          taxEfficiency: {
            strategies: [],
            considerations: '',
          },
        },
        monitoring: {
          performanceMetrics: [],
          reviewFrequency: '',
          adjustmentCriteria: '',
        },
        timeline: {
          milestones: [],
          reviewDates: [],
        },
      },
    },
  });

  useEffect(() => {
    if (user) {
      loadAssessment();
    } else {
      router.push('/login');
    }
  }, [user]);

  const loadAssessment = async () => {
    try {
      const { assessment: assessmentData, feedback: feedbackData } =
        await getStandard4Assessment(user.id);
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

  const saveDraft = async () => {
    try {
      setSaving(true);
      await saveStandard4Draft(user.id, form.getValues());
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSaving(false);
    }
  };

  const submitAssessment = async () => {
    try {
      setSaving(true);
      const content = form.getValues();

      if (assessment?.status === 'graded') {
        await resubmitStandard4Assessment(
          user.id,
          content,
          assessment.submission_id
        );
      } else {
        await submitStandard4Assessment(user.id, content);
      }

      await loadAssessment();
    } catch (error) {
      console.error('Error submitting assessment:', error);
    } finally {
      setSaving(false);
    }
  };

  const canSubmit = () => {
    if (!assessment) return true;
    return (
      assessment.status === 'draft' ||
      assessment.status === 'needs_resubmission'
    );
  };

  const canEdit = () => {
    if (!assessment) return true;
    return (
      assessment.status === 'draft' ||
      assessment.status === 'needs_resubmission'
    );
  };

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