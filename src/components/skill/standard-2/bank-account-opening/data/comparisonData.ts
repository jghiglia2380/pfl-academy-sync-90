import { ComparisonCategory } from '../types';

export const comparisonData: ComparisonCategory[] = [
  {
    id: 'income-docs',
    title: 'Income Documentation',
    younger: 'Usually W-2s and possibly 1098-T for education',
    older: 'W-2s, 1099s, investment income, rental income'
  },
  {
    id: 'deductions',
    title: 'Deductions',
    younger: 'Typically standard deduction',
    older: 'May benefit from itemizing (mortgage, charity)'
  },
  {
    id: 'credits',
    title: 'Common Tax Credits',
    younger: 'Education credits (AOTC, LLC)',
    older: 'Child Tax Credit, Child Care Credit'
  }
];