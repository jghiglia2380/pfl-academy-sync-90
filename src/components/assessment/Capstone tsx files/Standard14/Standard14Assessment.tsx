import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Standard14Assessment as AssessmentType } from '../../../types/standard14';
import { standard14Service } from '../../../services/standard14';
import { useAuth } from '../../../hooks/useAuth';
import { Toast } from '../../ui/Toast';
import { PersonalReflection } from './PersonalReflection';
import { OrganizationComparison } from './OrganizationComparison';
import { GivingPlan } from './GivingPlan';
import { ImpactAnalysis } from './ImpactAnalysis';
import { SubmissionControls } from './SubmissionControls';

export const Standard14Assessment: React.FC = () => {
  const { user } = useAuth();
  const [assessment, setAssessment] = useState<AssessmentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { register, watch, setValue, handleSubmit } = useForm<AssessmentType>({
    defaultValues: {
      studentId: user?.id || '',
      status: 'draft',
      personalReflection: {
        pastExperiences: '',
        impactReflection: '',
        causes: [],
        preferredWays: [],
        futureGoals: '',
        values: '',
        idealImpact: ''
      },
      organizationComparison: {
        fliMetrics: {
          programExpenseRatio: 0,
          costPerStudent: 0,
          costPerHour: 0
        },
        cefMetrics: {
          programExpenseRatio: 0,
          costPerStudent: 0,
          costPerHour: 0
        },
        effectivenessAnalysis: ''
      },
      givingPlan: {
        monthlyAllocation: {
          amount: 0,
          percentage: 0,
          taxImpact: 0
        },
        yearEndGiving: {
          amount: 0,
          percentage: 0,
          taxImpact: 0
        },
        strategy: ''
      },
      impactAnalysis: {
        quantitative: {
          year1: {
            studentsImpacted: 0,
            economicBenefit: 0,
            volunteerHours: 0
          },
          year2: {
            studentsImpacted: 0,
            economicBenefit: 0,
            volunteerHours: 0
          },
          year3: {
            studentsImpacted: 0,
            economicBenefit: 0,
            volunteerHours: 0
          }
        },
        longTermImpact: ''
      }
    }
  });

  useEffect(() => {
    const loadAssessment = async () => {
      try {
        if (user?.id) {
          const data = await standard14Service.getAssessment(user.id);
          setAssessment(data);
        }
      } catch (error) {
        console.error('Error loading assessment:', error);
        setToastMessage('Error loading assessment');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadAssessment();
  }, [user?.id]);

  const onSubmit = async (data: AssessmentType) => {
    try {
      if (assessment?.id) {
        await standard14Service.updateAssessment(assessment.id, data);
        setToastMessage('Assessment saved successfully');
      } else {
        const newAssessment = await standard14Service.createAssessment(user?.id || '');
        setAssessment(newAssessment);
        setToastMessage('Assessment created successfully');
      }
      setShowToast(true);
    } catch (error) {
      console.error('Error saving assessment:', error);
      setToastMessage('Error saving assessment');
      setShowToast(true);
    }
  };

  const onSubmitAssessment = async (data: AssessmentType) => {
    try {
      if (assessment?.id) {
        await standard14Service.submitAssessment(assessment.id);
        setToastMessage('Assessment submitted successfully');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setToastMessage('Error submitting assessment');
    }
    setShowToast(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Charitable Giving Project</h1>
          <p className="text-xl text-gray-600 mb-4">Standard 14: Charitable Giving and Financial Planning</p>
          
          <PersonalReflection 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <OrganizationComparison 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <GivingPlan 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <ImpactAnalysis 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <SubmissionControls
            assessment={assessment}
            onSave={handleSubmit(onSubmit)}
            onSubmit={handleSubmit(onSubmitAssessment)}
          />
        </div>
      </form>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}; 