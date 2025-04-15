export const getStatementPeriod = () => {
  const today = new Date();
  const previousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  
  const startDate = new Date(previousMonth);
  const endDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0);
  
  return {
    start: startDate,
    end: endDate,
    format: (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }).format(date)
    },
    shortFormat: (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date)
    }
  };
};