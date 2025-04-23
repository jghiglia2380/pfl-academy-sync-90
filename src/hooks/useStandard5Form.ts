import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import {
  RiskManagementSubmission,
  riskManagementSubmissionSchema,
} from '../types/standard5';
import {
  saveStandard5Draft,
  submitStandard5Assessment,
  getStandard5Assessment,
  resubmitStandard5Assessment,
} from '../lib/supabase/standard5';

export function useStandard5Form() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [assessment, setAssessment] = useState<any>(null);
  const [feedback, setFeedback] = useState<any[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  const form = useForm<RiskManagementSubmission>({
    resolver: zodResolver(riskManagementSubmissionSchema),
    defaultValues: {
      riskAssessment: {
        personalRisk: {
          health: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          disability: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          lifeInsurance: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          longTermCare: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
        },
        propertyRisk: {
          home: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          auto: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          otherProperty: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
        },
        liabilityRisk: {
          personal: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
          professional: {
            currentCoverage: '',
            gaps: '',
            recommendations: '',
          },
        },
      },
      riskManagementPlan: {
        insuranceStrategy: {
          health: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          disability: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          lifeInsurance: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          longTermCare: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
        },
        propertyProtection: {
          home: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          auto: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          otherProperty: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
        },
        liabilityProtection: {
          personal: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
          professional: {
            recommendedCoverage: '',
            implementationPlan: '',
            costEstimate: 0,
          },
        },
        emergencyFund: {
          targetAmount: 0,
          currentAmount: 0,
          fundingPlan: '',
          timeline: '',
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
        await getStandard5Assessment(user.id);
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
      await saveStandard5Draft(user.id, form.getValues());
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
        await resubmitStandard5Assessment(
          user.id,
          content,
          assessment.submission_id
        );
      } else {
        await submitStandard5Assessment(user.id, content);
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