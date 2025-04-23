import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Standard9Submission } from '../../../types/standard9';
import { standard9Db } from '../../../lib/supabase';
import { useAuth } from '../../../hooks/useAuth';
import { Toast } from '../../ui/Toast';
import { InvestmentAnalysis } from './InvestmentAnalysis';
import { RetirementPlanning } from './RetirementPlanning';
import { EducationPlanning } from './EducationPlanning';
import { EmergencyFund } from './EmergencyFund';
import { SubmissionControls } from './SubmissionControls';

export const Standard9Assessment: React.FC = () => {
  const { user } = useAuth();
  const [submission, setSubmission] = useState<Standard9Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { register, watch, setValue, handleSubmit } = useForm<Standard9Submission>({
    defaultValues: {
      studentId: user?.id || '',
      status: 'draft',
      investmentAnalysis: {
        optionAnalysis: '',
        riskAssessment: '',
        portfolioRecommendation: ''
      },
      retirementPlanning: {
        scenarioAnalysis: '',
        savingsStrategy: '',
        riskManagement: ''
      },
      educationPlanning: {
        scenarioAnalysis: '',
        savingsStrategy: '',
        investmentSelection: ''
      },
      emergencyFund: {
        scenarioAnalysis: '',
        savingsStrategy: '',
        investmentSelection: ''
      }
    }
  });

  useEffect(() => {
    const loadSubmission = async () => {
      if (!user?.id) return;

      try {
        const data = await standard9Db.getSubmission(user.id);
        if (data) {
          setSubmission(data);
          // Set form values from existing submission
          Object.entries(data).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              setValue(key as any, value);
            }
          });
        }
      } catch (error) {
        console.error('Error loading submission:', error);
        setToastMessage('Error loading your submission');
        setShowToast(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubmission();
  }, [user?.id, setValue]);

  const onSubmit = async (data: Standard9Submission) => {
    try {
      await standard9Db.saveSubmission(data);
      setToastMessage('Draft saved successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Error saving submission:', error);
      setToastMessage('Error saving your submission');
      setShowToast(true);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!submission?.id) return;

    try {
      await standard9Db.submitSubmission(submission.id);
      setSubmission(prev => prev ? { ...prev, status: 'submitted' } : null);
      setToastMessage('Assessment submitted successfully');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      setToastMessage('Error submitting your assessment');
      setShowToast(true);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Standard 9: Investment and Savings Planning</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <InvestmentAnalysis
          register={register}
          watch={watch}
          setValue={setValue}
        />

        <RetirementPlanning
          register={register}
          watch={watch}
          setValue={setValue}
        />

        <EducationPlanning
          register={register}
          watch={watch}
          setValue={setValue}
        />

        <EmergencyFund
          register={register}
          watch={watch}
          setValue={setValue}
        />

        <SubmissionControls
          submission={submission}
          onSave={handleSubmit(onSubmit)}
          onSubmit={handleSubmitAssessment}
        />
      </form>

      <Toast
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}; 