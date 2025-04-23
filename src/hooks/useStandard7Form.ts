import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';
import { useSupabase } from '@/contexts/supabase';
import { useToast } from '@/hooks/useToast';
import {
  BorrowingSubmission,
  borrowingSubmissionSchema,
  Standard7Assessment
} from '@/types/standard7';
import {
  getStandard7Assessment,
  saveStandard7Draft,
  submitStandard7Assessment,
  resubmitStandard7Assessment
} from '@/lib/supabase/standard7';

export function useStandard7Form(assessmentId: string) {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessment, setAssessment] = useState<Standard7Assessment | null>(null);

  const form = useForm<BorrowingSubmission>({
    resolver: zodResolver(borrowingSubmissionSchema),
    defaultValues: {
      loanAnalysis: {
        option1: {
          loanType: '',
          principal: 0,
          apr: 0,
          termMonths: 0,
          monthlyPayment: 0,
          totalInterest: 0,
          additionalFees: 0
        },
        option2: {
          loanType: '',
          principal: 0,
          apr: 0,
          termMonths: 0,
          monthlyPayment: 0,
          totalInterest: 0,
          additionalFees: 0
        },
        option3: {
          loanType: '',
          principal: 0,
          apr: 0,
          termMonths: 0,
          monthlyPayment: 0,
          totalInterest: 0,
          additionalFees: 0
        },
        analysisExplanation: ''
      },
      creditSources: {
        source1: {
          sourceType: '',
          interestRateRange: '',
          creditScoreRequired: '',
          applicationProcess: '',
          additionalRequirements: ''
        },
        source2: {
          sourceType: '',
          interestRateRange: '',
          creditScoreRequired: '',
          applicationProcess: '',
          additionalRequirements: ''
        },
        source3: {
          sourceType: '',
          interestRateRange: '',
          creditScoreRequired: '',
          applicationProcess: '',
          additionalRequirements: ''
        },
        sourceAnalysis: ''
      },
      framework: {
        loanNecessityCriteria: '',
        comparisonChecklist: '',
        riskAssessment: '',
        implementationPlan: ''
      }
    }
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    async function loadAssessment() {
      try {
        const data = await getStandard7Assessment(supabase, assessmentId);
        setAssessment(data);
        if (data.draft?.content) {
          form.reset(data.draft.content as BorrowingSubmission);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading assessment:', error);
        showToast('error', 'Failed to load assessment');
        setIsLoading(false);
      }
    }

    loadAssessment();
  }, [user, assessmentId, supabase, router, form, showToast]);

  const saveDraft = async (data: Partial<BorrowingSubmission>) => {
    if (!user) return;
    setIsSaving(true);
    try {
      await saveStandard7Draft(supabase, user.id, data);
      showToast('success', 'Draft saved successfully');
    } catch (error) {
      console.error('Error saving draft:', error);
      showToast('error', 'Failed to save draft');
    } finally {
      setIsSaving(false);
    }
  };

  const submitAssessment = async (data: BorrowingSubmission) => {
    if (!user || !assessment) return;
    setIsSubmitting(true);
    try {
      if (assessment.submission?.id) {
        await resubmitStandard7Assessment(
          supabase,
          user.id,
          data,
          assessment.submission.id,
          assessmentId
        );
      } else {
        await submitStandard7Assessment(supabase, user.id, data, assessmentId);
      }
      showToast('success', 'Assessment submitted successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      showToast('error', 'Failed to submit assessment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateMonthlyPayment = (principal: number, apr: number, termMonths: number) => {
    const monthlyRate = apr / 12 / 100;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
    return isNaN(payment) ? 0 : payment;
  };

  const calculateTotalInterest = (monthlyPayment: number, termMonths: number, principal: number) => {
    return monthlyPayment * termMonths - principal;
  };

  const canSubmit = assessment?.status !== 'completed';
  const canEdit = assessment?.status !== 'completed' && assessment?.status !== 'submitted';

  return {
    form,
    isLoading,
    isSaving,
    isSubmitting,
    assessment,
    saveDraft,
    submitAssessment,
    calculateMonthlyPayment,
    calculateTotalInterest,
    canSubmit,
    canEdit
  };
} 