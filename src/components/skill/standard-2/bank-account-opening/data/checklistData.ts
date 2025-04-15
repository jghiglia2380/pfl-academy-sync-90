import { AgeGroup } from '../types';

export const checklistData: AgeGroup[] = [
  {
    id: '18-24',
    title: '18-24 Year Olds',
    description: 'Essential tax planning steps for young adults and students',
    accentColor: 'blue',
    sections: [
      {
        id: 'personal-info',
        title: 'Collect Personal Information & Key Documents',
        items: [
          {
            id: 'w2',
            title: 'Gather W-2 Forms',
            description: 'Collect all W-2 forms from employers',
            tooltip: 'W-2 forms show your annual wages and tax withholdings',
            icon: 'FileText'
          },
          {
            id: '1098t',
            title: 'Education Forms',
            description: 'Collect Form 1098-T for tuition payments',
            tooltip: 'Form 1098-T reports tuition payments and scholarships',
            icon: 'GraduationCap'
          }
        ]
      },
      {
        id: 'standard-deduction',
        title: 'Use the Standard Deduction',
        items: [
          {
            id: 'calculate-standard',
            title: 'Calculate Standard Deduction',
            description: 'Determine if standard deduction is best for you',
            tooltip: 'Most young adults benefit from taking the standard deduction',
            icon: 'Calculator'
          }
        ]
      }
    ]
  },
  {
    id: '25-35',
    title: '25-35 Year Olds',
    description: 'Advanced tax planning for career professionals and families',
    accentColor: 'green',
    sections: [
      {
        id: 'essential-docs',
        title: 'Organize Essential Tax Documents',
        items: [
          {
            id: 'income-docs',
            title: 'Income Documents',
            description: 'Gather W-2s, 1099s, and other income forms',
            tooltip: 'Include all sources of income',
            icon: 'Files'
          },
          {
            id: 'deduction-docs',
            title: 'Deduction Records',
            description: 'Collect mortgage statements, charitable donations',
            tooltip: 'Keep receipts for all deductible expenses',
            icon: 'Receipt'
          }
        ]
      }
    ]
  }
];