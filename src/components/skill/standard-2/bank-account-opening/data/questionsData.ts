import { ComprehensionQuestion } from '../types';

export const questions: ComprehensionQuestion[] = [
  {
    id: 'financial-institutions',
    question: 'List three types of financial institutions and the services they provide.',
    type: 'multiple',
    inputCount: 3,
    correctAnswer: [
      'Banks: Savings accounts, checking accounts, loans, credit cards, online banking',
      'Credit Unions: Similar to banks but often offer better rates and personalized service',
      'Insurance Companies: Health insurance, auto insurance, life insurance, property insurance'
    ],
    feedback: 'Financial institutions offer various services to meet different financial needs. Understanding these differences helps you choose the right institution for your goals.',
    icon: 'Building2'
  },
  {
    id: 'payment-methods',
    question: 'Identify four financial services that allow you to pay for goods and services.',
    type: 'multiple',
    inputCount: 4,
    correctAnswer: [
      'Credit Cards',
      'Debit Cards',
      'Checks',
      'Money Orders'
    ],
    feedback: 'Having multiple payment options gives you flexibility and security in different situations.',
    icon: 'CreditCard'
  },
  {
    id: 'non-cash',
    question: 'How could you pay for an item and not use cash or a check?',
    type: 'single',
    correctAnswer: [
      'Using a debit card, credit card, money order, or online payment services like PayPal'
    ],
    feedback: 'Digital payment methods often provide better security and convenience than traditional cash or checks.',
    icon: 'Smartphone'
  },
  {
    id: 'online-banking',
    question: 'What are the benefits of using online banking instead of a check?',
    type: 'single',
    correctAnswer: [
      'Safer than mailing a check, can pay bills electronically, no need for postage, immediate transaction tracking, convenient access from anywhere with internet'
    ],
    feedback: 'Online banking combines convenience, security, and instant access to your financial information.',
    icon: 'Globe'
  }
];