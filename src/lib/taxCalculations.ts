import { TaxAnalysis, DeductionPlan } from '../types/standard6';

interface TaxBracket {
  rate: number;
  single: number;
  marriedJoint: number;
  headOfHousehold: number;
}

const TAX_BRACKETS_2024: TaxBracket[] = [
  { rate: 0.10, single: 11600, marriedJoint: 23200, headOfHousehold: 16550 },
  { rate: 0.12, single: 47150, marriedJoint: 94300, headOfHousehold: 63100 },
  { rate: 0.22, single: 100525, marriedJoint: 201050, headOfHousehold: 95350 },
  { rate: 0.24, single: 191950, marriedJoint: 383900, headOfHousehold: 182100 },
  { rate: 0.32, single: 243725, marriedJoint: 487450, headOfHousehold: 231250 },
  { rate: 0.35, single: 609350, marriedJoint: 731200, headOfHousehold: 578100 },
  { rate: 0.37, single: Infinity, marriedJoint: Infinity, headOfHousehold: Infinity }
];

export const calculateTaxLiability = (
  income: number,
  adjustments: number = 0,
  filingStatus: 'single' | 'marriedJoint' | 'headOfHousehold' = 'single'
): { liability: number; effectiveRate: number; bracket: number } => {
  const adjustedIncome = income - adjustments;
  let liability = 0;
  let previousBracketLimit = 0;

  for (const bracket of TAX_BRACKETS_2024) {
    const bracketLimit = bracket[filingStatus];
    const taxableInThisBracket = Math.min(
      Math.max(adjustedIncome - previousBracketLimit, 0),
      bracketLimit - previousBracketLimit
    );
    liability += taxableInThisBracket * bracket.rate;

    if (adjustedIncome <= bracketLimit) {
      return {
        liability: Math.round(liability * 100) / 100,
        effectiveRate: (liability / adjustedIncome) * 100,
        bracket: bracket.rate * 100
      };
    }
    previousBracketLimit = bracketLimit;
  }

  return {
    liability: Math.round(liability * 100) / 100,
    effectiveRate: (liability / adjustedIncome) * 100,
    bracket: 37
  };
};

export const calculateItemizedDeductions = (
  mortgageInterest: number = 0,
  stateTaxes: number = 0,
  charitableContributions: number = 0,
  medicalExpenses: number = 0,
  agi: number = 0
): number => {
  const saltCap = 10000; // State and Local Tax deduction cap
  const medicalThreshold = agi * 0.075; // 7.5% of AGI threshold for medical expenses

  return (
    mortgageInterest +
    Math.min(stateTaxes, saltCap) +
    charitableContributions +
    Math.max(medicalExpenses - medicalThreshold, 0)
  );
};

export const getOptimalDeductionMethod = (
  itemizedTotal: number,
  filingStatus: 'single' | 'marriedJoint' | 'headOfHousehold'
): { method: 'standard' | 'itemized'; amount: number } => {
  const standardDeductions = {
    single: 14600,
    marriedJoint: 29200,
    headOfHousehold: 21900
  };

  const standardAmount = standardDeductions[filingStatus];

  return {
    method: itemizedTotal > standardAmount ? 'itemized' : 'standard',
    amount: Math.max(itemizedTotal, standardAmount)
  };
};

export const calculateTaxSavings = (
  income: number,
  adjustments: number,
  deductions: number,
  filingStatus: 'single' | 'marriedJoint' | 'headOfHousehold' = 'single'
): number => {
  const withoutDeductions = calculateTaxLiability(income, adjustments, filingStatus);
  const withDeductions = calculateTaxLiability(income, adjustments + deductions, filingStatus);
  
  return Math.round((withoutDeductions.liability - withDeductions.liability) * 100) / 100;
}; 