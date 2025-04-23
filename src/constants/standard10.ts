export const STANDARD10_CONSTANTS = {
  SCENARIOS: {
    SCENARIO1: {
      KEY: 'scenario1',
      TITLE: 'Renting Scenario',
      DESCRIPTION: 'Analyze the financial implications and considerations of renting a property.'
    },
    SCENARIO2: {
      KEY: 'scenario2',
      TITLE: 'Buying Scenario',
      DESCRIPTION: 'Evaluate the long-term financial impact and responsibilities of home ownership.'
    }
  },
  SECTIONS: {
    MARKET_ANALYSIS: {
      TITLE: 'Market Analysis',
      WEIGHT: 0.35
    },
    FINANCIAL_CALCULATIONS: {
      TITLE: 'Financial Calculations',
      WEIGHT: 0.40
    },
    DECISION_ANALYSIS: {
      TITLE: 'Decision Analysis',
      WEIGHT: 0.25
    }
  },
  VALIDATION: {
    MIN_PROS_CONS: 3,
    MIN_CONSIDERATION_LENGTH: 50,
    MIN_COMPARABLE_PROPERTIES: 2,
    MAX_DEBT_TO_INCOME_RATIO: 0.43
  },
  AUTOSAVE_DELAY: 3000
} as const; 