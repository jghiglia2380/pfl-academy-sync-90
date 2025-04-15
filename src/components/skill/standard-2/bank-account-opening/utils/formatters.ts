// Format SSN input to include dashes (XXX-XX-XXXX)
export const formatSSN = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Limit to 9 digits
  const limited = cleaned.slice(0, 9);
  
  // Add dashes after 3rd and 5th digits
  if (limited.length <= 3) return limited;
  if (limited.length <= 5) return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  return `${limited.slice(0, 3)}-${limited.slice(3, 5)}-${limited.slice(5)}`;
};

// Format phone number to include dashes (XXX-XXX-XXXX)
export const formatPhoneNumber = (value: string): string => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '');
  
  // Limit to 10 digits
  const limited = cleaned.slice(0, 10);
  
  // Add dashes after 3rd and 6th digits
  if (limited.length <= 3) return limited;
  if (limited.length <= 6) return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  return `${limited.slice(0, 3)}-${limited.slice(3, 6)}-${limited.slice(6)}`;
};

// Validate name (letters, spaces, and hyphens only)
export const isValidName = (name: string): boolean => {
  return /^[a-zA-Z\s-]+$/.test(name);
};

// Validate SSN format
export const isValidSSN = (ssn: string): boolean => {
  return /^\d{3}-\d{2}-\d{4}$/.test(ssn);
};

// Validate phone number format
export const isValidPhoneNumber = (phone: string): boolean => {
  return /^\d{3}-\d{3}-\d{4}$/.test(phone);
};

// Validate date format and year length
export const isValidDateOfBirth = (date: string): boolean => {
  const yearRegex = /^\d{4}-\d{2}-\d{2}$/;
  return yearRegex.test(date);
};

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};