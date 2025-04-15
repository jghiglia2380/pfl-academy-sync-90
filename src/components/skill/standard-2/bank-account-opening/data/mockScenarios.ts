import { AccountScenario } from '../types/bankAccount';

export const scenarios: AccountScenario[] = [
  {
    student: {
      personalInfo: {
        firstName: 'Taylor',
        lastName: 'Johnson',
        dateOfBirth: '2007-04-15', // 16 years old
        ssn: '123-45-6789',
        email: 'taylor.j@example.com',
        phone: '(555) 123-4567',
        address: {
          street: '123 Maple Street',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      },
      employmentInfo: {
        status: 'part-time',
        employer: 'Local Coffee Shop',
        position: 'Barista',
        startDate: '2023-06-01',
        annualIncome: 4500
      },
      accountInfo: {
        initialDeposit: 50,
        depositMethod: 'debit',
        accountType: 'student-checking'
      }
    },
    guardian: {
      personalInfo: {
        firstName: 'Jamie',
        lastName: 'Johnson',
        dateOfBirth: '1980-06-20', // 43 years old
        ssn: '987-65-4321',
        email: 'jamie.j@example.com',
        phone: '(555) 987-6543',
        address: {
          street: '123 Maple Street',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345'
        }
      },
      employmentInfo: {
        status: 'full-time',
        employer: 'Tech Solutions Inc.',
        position: 'Senior Manager',
        startDate: '2015-03-15',
        annualIncome: 65000
      },
      relationship: 'Mother',
      consentProvided: false
    }
  }
];