import { Car, Umbrella } from 'lucide-react';
import { Character } from '../types';

export const predefinedCharacters: Character[] = [
  {
    name: 'Alex',
    age: 18,
    goal: 'Saving for a car',
    icon: Car
  },
  {
    name: 'Taylor',
    age: 25,
    goal: 'Building an emergency fund',
    icon: Umbrella
  }
];

export const savingsProducts = [
  'High-yield savings account',
  'Certificate of Deposit (CD)',
  'Money Market Account'
];

export const investmentProducts = [
  'Index Mutual Fund',
  'Individual Stocks',
  'Exchange-Traded Fund (ETF)'
];