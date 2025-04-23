import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Standard8Submission } from '../../types/standard8';
import { standard8Db } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { CreditCardAnalysis } from './Standard8/CreditCardAnalysis';
import { OnlineShoppingSecurity } from './Standard8/OnlineShoppingSecurity';
import { DigitalPurchaseStrategy } from './Standard8/DigitalPurchaseStrategy';
import { SubmissionControls } from './Standard8/SubmissionControls';
import { Toast } from '../ui/Toast';

export const Standard8Assessment: React.FC = () => {
  const { user } = useAuth();
  const [submission, setSubmission] = useState<Standard8Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const { register, handleSubmit, setValue, watch } = useForm<Standard8Submission>({
    defaultValues: {
      studentId: user?.id,
      status: 'draft',
      creditCardAnalysis: {
        largePurchase: { calculations: '', analysis: '' },
        monthlySpending: { calculations: '', analysis: '' },
        balanceTransfer: { calculations: '', analysis: '' },
        recommendation: ''
      },
      onlineShoppingSecurity: {
        retailerAnalysis: '',
        paymentMethodAnalysis: '',
        securityProtocol: '',
        riskMitigation: ''
      },
      digitalPurchaseStrategy: {
        decisionMatrix: '',
        totalCostAnalysis: '',
        purchaseStrategy: '',
        riskMitigation: ''
      }
    }
  });

  useEffect(() => {
    const loadSubmission = async () => {
      if (!user?.id) return;
      
      try {
        const data = await standard8Db.getSubmission(user.id);
        if (data) {
          setSubmission(data);
          // Set form values from existing submission
          Object.entries(data).forEach(([key, value]) => {
            setValue(key as keyof Standard8Submission, value);
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

  const onSubmit = async (data: Standard8Submission) => {
    try {
      const savedSubmission = await standard8Db.saveSubmission({
        ...data,
        updatedAt: new Date().toISOString()
      });
      setSubmission(savedSubmission);
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
      await standard8Db.submitSubmission(submission.id);
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
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Shopping Project</h1>
          <p className="text-xl text-gray-600 mb-4">Standard 8: Credit Cards and Online Shopping</p>
          
          <CreditCardAnalysis 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <OnlineShoppingSecurity 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <DigitalPurchaseStrategy 
            register={register}
            watch={watch}
            setValue={setValue}
          />

          <SubmissionControls
            submission={submission}
            onSave={handleSubmit(onSubmit)}
            onSubmit={handleSubmitAssessment}
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