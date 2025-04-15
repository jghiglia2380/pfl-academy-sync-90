export const calculateTaxBracket = (income: number): number => {
  if (income <= 9950) return 0.10;
  if (income <= 40525) return 0.12;
  if (income <= 86375) return 0.22;
  if (income <= 164925) return 0.24;
  if (income <= 209425) return 0.32;
  if (income <= 523600) return 0.35;
  return 0.37;
};

export const calculateDeductionBenefit = (deductionAmount: number, income: number): number => {
  const taxBracket = calculateTaxBracket(income);
  return deductionAmount * taxBracket;
};

export const calculateCreditBenefit = (creditAmount: number): number => {
  return creditAmount;
};