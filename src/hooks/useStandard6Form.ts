import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  calculateTaxLiability,
  calculateItemizedDeductions,
  getOptimalDeductionMethod,
  calculateTaxSavings
} from '../lib/taxCalculations';
import { TaxAnalysis, DeductionPlan, TaxStrategy, Standard6Submission } from '../types/standard6';

const standard6Schema = z.object({
  taxAnalysis: z.object({
    grossIncome: z.number().min(0, 'Income must be positive'),
    adjustments: z.number(),
    analysis: z.string().min(1, 'Analysis is required'),
    taxBracket: z.string().optional(),
    estimatedLiability: z.number().optional()
  }),
  deductionPlan: z.object({
    deductionMethod: z.enum(['standard', 'itemized']),
    totalDeductions: z.number().min(0, 'Deductions must be positive'),
    strategy: z.string().min(1, 'Strategy is required'),
    itemizedBreakdown: z
      .object({
        mortgageInterest: z.number().optional(),
        stateTaxes: z.number().optional(),
        charitableContributions: z.number().optional(),
        medicalExpenses: z.number().optional()
      })
      .optional()
  }),
  taxStrategy: z.object({
    shortTerm: z.string().min(1, 'Short-term strategy is required'),
    longTerm: z.string().min(1, 'Long-term strategy is required'),
    timeline: z.string().min(1, 'Timeline is required'),
    riskAssessment: z.string().optional()
  })
});

export const useStandard6Form = (
  onSubmit: (data: Standard6Submission) => void,
  onSaveDraft: (data: Partial<Standard6Submission>) => void
) => {
  const [filingStatus, setFilingStatus] = useState<'single' | 'marriedJoint' | 'headOfHousehold'>('single');
  const [calculatedValues, setCalculatedValues] = useState<{
    liability: number;
    effectiveRate: number;
    bracket: number;
    optimalDeduction: { method: 'standard' | 'itemized'; amount: number };
    taxSavings: number;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm<z.infer<typeof standard6Schema>>({
    resolver: zodResolver(standard6Schema),
    mode: 'onChange'
  });

  const watchGrossIncome = watch('taxAnalysis.grossIncome');
  const watchAdjustments = watch('taxAnalysis.adjustments');
  const watchDeductionMethod = watch('deductionPlan.deductionMethod');
  const watchItemizedBreakdown = watch('deductionPlan.itemizedBreakdown');

  useEffect(() => {
    if (watchGrossIncome && watchAdjustments !== undefined) {
      const taxCalc = calculateTaxLiability(watchGrossIncome, watchAdjustments, filingStatus);
      
      let itemizedTotal = 0;
      if (watchItemizedBreakdown) {
        itemizedTotal = calculateItemizedDeductions(
          watchItemizedBreakdown.mortgageInterest,
          watchItemizedBreakdown.stateTaxes,
          watchItemizedBreakdown.charitableContributions,
          watchItemizedBreakdown.medicalExpenses,
          watchGrossIncome - watchAdjustments
        );
      }

      const optimalDeduction = getOptimalDeductionMethod(itemizedTotal, filingStatus);
      const taxSavings = calculateTaxSavings(
        watchGrossIncome,
        watchAdjustments,
        optimalDeduction.amount,
        filingStatus
      );

      setCalculatedValues({
        liability: taxCalc.liability,
        effectiveRate: taxCalc.effectiveRate,
        bracket: taxCalc.bracket,
        optimalDeduction,
        taxSavings
      });

      setValue('taxAnalysis.taxBracket', `${taxCalc.bracket}%`);
      setValue('taxAnalysis.estimatedLiability', taxCalc.liability);
      setValue('deductionPlan.totalDeductions', optimalDeduction.amount);
    }
  }, [
    watchGrossIncome,
    watchAdjustments,
    watchDeductionMethod,
    watchItemizedBreakdown,
    filingStatus,
    setValue
  ]);

  const handleFormSubmit = (data: z.infer<typeof standard6Schema>) => {
    onSubmit({
      ...data,
      calculationWorksheet: JSON.stringify(calculatedValues, null, 2)
    });
  };

  const handleSaveDraft = () => {
    const currentData = watch();
    onSaveDraft({
      ...currentData,
      calculationWorksheet: JSON.stringify(calculatedValues, null, 2)
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(handleFormSubmit),
    handleSaveDraft,
    errors,
    isDirty,
    isValid,
    calculatedValues,
    filingStatus,
    setFilingStatus
  };
}; 