import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'react-hot-toast';
import { useDebounce } from 'use-debounce';

// Validation schemas
const MarketAnalysisSchema = z.object({
  location: z.string().min(1, "Location is required"),
  propertyType: z.string().min(1, "Property type is required"),
  marketTrends: z.string().min(10, "Market trends analysis must be detailed"),
  comparableProperties: z.array(z.object({
    address: z.string(),
    price: z.number().positive(),
    features: z.string()
  })).min(2, "At least 2 comparable properties required")
});

const FinancialCalculationsSchema = z.object({
  monthlyIncome: z.number().positive(),
  monthlyExpenses: z.number().positive(),
  downPayment: z.number().positive(),
  mortgageRate: z.number().positive(),
  propertyTaxes: z.number().positive(),
  insurance: z.number().positive(),
  maintenanceCosts: z.number().positive(),
  debtToIncomeRatio: z.number().max(0.43, "Debt-to-income ratio should not exceed 43%")
});

const DecisionAnalysisSchema = z.object({
  pros: z.array(z.string()).min(3, "List at least 3 pros"),
  cons: z.array(z.string()).min(3, "List at least 3 cons"),
  shortTermConsiderations: z.string().min(50),
  longTermConsiderations: z.string().min(50),
  riskAnalysis: z.string().min(50)
});

export type Standard10FormData = {
  scenario1: {
    marketAnalysis: z.infer<typeof MarketAnalysisSchema>;
    financialCalculations: z.infer<typeof FinancialCalculationsSchema>;
    decisionAnalysis: z.infer<typeof DecisionAnalysisSchema>;
    recommendation: string;
  };
  scenario2: {
    marketAnalysis: z.infer<typeof MarketAnalysisSchema>;
    financialCalculations: z.infer<typeof FinancialCalculationsSchema>;
    decisionAnalysis: z.infer<typeof DecisionAnalysisSchema>;
    recommendation: string;
  };
};

const AUTOSAVE_DELAY = 3000; // 3 seconds

export const useStandard10Form = (assessmentId?: string) => {
  const supabase = useSupabaseClient();
  const [formData, setFormData] = useState<Standard10FormData>({
    scenario1: {
      marketAnalysis: {
        location: '',
        propertyType: '',
        marketTrends: '',
        comparableProperties: []
      },
      financialCalculations: {
        monthlyIncome: 0,
        monthlyExpenses: 0,
        downPayment: 0,
        mortgageRate: 0,
        propertyTaxes: 0,
        insurance: 0,
        maintenanceCosts: 0,
        debtToIncomeRatio: 0
      },
      decisionAnalysis: {
        pros: [],
        cons: [],
        shortTermConsiderations: '',
        longTermConsiderations: '',
        riskAnalysis: ''
      },
      recommendation: ''
    },
    scenario2: {
      marketAnalysis: {
        location: '',
        propertyType: '',
        marketTrends: '',
        comparableProperties: []
      },
      financialCalculations: {
        monthlyIncome: 0,
        monthlyExpenses: 0,
        downPayment: 0,
        mortgageRate: 0,
        propertyTaxes: 0,
        insurance: 0,
        maintenanceCosts: 0,
        debtToIncomeRatio: 0
      },
      decisionAnalysis: {
        pros: [],
        cons: [],
        shortTermConsiderations: '',
        longTermConsiderations: '',
        riskAnalysis: ''
      },
      recommendation: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState({
    marketAnalysis: false,
    financialAnalysis: false,
    decisionAnalysis: false
  });

  // Debounced form data for autosave
  const [debouncedFormData] = useDebounce(formData, AUTOSAVE_DELAY);

  // Load existing assessment data
  useEffect(() => {
    const loadAssessment = async () => {
      if (!assessmentId) return;

      try {
        const { data, error } = await supabase
          .from('standard10_assessments')
          .select('*')
          .eq('id', assessmentId)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            scenario1: {
              marketAnalysis: data.scenario1_market_analysis,
              financialCalculations: data.scenario1_financial_calculations,
              decisionAnalysis: data.scenario1_decision_analysis,
              recommendation: data.scenario1_recommendation
            },
            scenario2: {
              marketAnalysis: data.scenario2_market_analysis,
              financialCalculations: data.scenario2_financial_calculations,
              decisionAnalysis: data.scenario2_decision_analysis,
              recommendation: data.scenario2_recommendation
            }
          });

          setProgress({
            marketAnalysis: data.market_analysis_complete,
            financialAnalysis: data.financial_analysis_complete,
            decisionAnalysis: data.decision_analysis_complete
          });
        }
      } catch (error) {
        toast.error('Failed to load assessment data');
        console.error('Error loading assessment:', error);
      }
    };

    loadAssessment();
  }, [assessmentId, supabase]);

  // Autosave functionality
  useEffect(() => {
    const saveProgress = async () => {
      if (!assessmentId || !debouncedFormData) return;

      try {
        const { error } = await supabase
          .from('standard10_assessments')
          .update({
            scenario1_market_analysis: debouncedFormData.scenario1.marketAnalysis,
            scenario1_financial_calculations: debouncedFormData.scenario1.financialCalculations,
            scenario1_decision_analysis: debouncedFormData.scenario1.decisionAnalysis,
            scenario1_recommendation: debouncedFormData.scenario1.recommendation,
            scenario2_market_analysis: debouncedFormData.scenario2.marketAnalysis,
            scenario2_financial_calculations: debouncedFormData.scenario2.financialCalculations,
            scenario2_decision_analysis: debouncedFormData.scenario2.decisionAnalysis,
            scenario2_recommendation: debouncedFormData.scenario2.recommendation,
            updated_at: new Date().toISOString()
          })
          .eq('id', assessmentId);

        if (error) throw error;
        toast.success('Progress saved');
      } catch (error) {
        toast.error('Failed to save progress');
        console.error('Error saving progress:', error);
      }
    };

    saveProgress();
  }, [debouncedFormData, assessmentId, supabase]);

  const validateForm = useCallback(() => {
    const errors: Record<string, string> = {};

    try {
      // Validate Scenario 1
      MarketAnalysisSchema.parse(formData.scenario1.marketAnalysis);
      FinancialCalculationsSchema.parse(formData.scenario1.financialCalculations);
      DecisionAnalysisSchema.parse(formData.scenario1.decisionAnalysis);
      if (!formData.scenario1.recommendation) {
        errors.scenario1Recommendation = 'Recommendation is required';
      }

      // Validate Scenario 2
      MarketAnalysisSchema.parse(formData.scenario2.marketAnalysis);
      FinancialCalculationsSchema.parse(formData.scenario2.financialCalculations);
      DecisionAnalysisSchema.parse(formData.scenario2.decisionAnalysis);
      if (!formData.scenario2.recommendation) {
        errors.scenario2Recommendation = 'Recommendation is required';
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          errors[err.path.join('.')] = err.message;
        });
      }
    }

    return errors;
  }, [formData]);

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix all errors before submitting');
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('standard10_assessments')
        .update({
          status: 'submitted',
          is_draft: false,
          submitted_at: new Date().toISOString(),
          scenario1_market_analysis: formData.scenario1.marketAnalysis,
          scenario1_financial_calculations: formData.scenario1.financialCalculations,
          scenario1_decision_analysis: formData.scenario1.decisionAnalysis,
          scenario1_recommendation: formData.scenario1.recommendation,
          scenario2_market_analysis: formData.scenario2.marketAnalysis,
          scenario2_financial_calculations: formData.scenario2.financialCalculations,
          scenario2_decision_analysis: formData.scenario2.decisionAnalysis,
          scenario2_recommendation: formData.scenario2.recommendation
        })
        .eq('id', assessmentId);

      if (error) throw error;
      toast.success('Assessment submitted successfully');
    } catch (error) {
      toast.error('Failed to submit assessment');
      console.error('Error submitting assessment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isSubmitting,
    progress,
    handleSubmit,
    validateForm
  };
}; 