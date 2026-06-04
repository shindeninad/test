// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
};

// URL validation
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Required field validation
export const isRequired = (value: any): boolean => {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined;
};

// Min length validation
export const minLength = (value: string, min: number): boolean => {
  return value.length >= min;
};

// Max length validation
export const maxLength = (value: string, max: number): boolean => {
  return value.length <= max;
};

// Number range validation
export const inRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

// Validation error messages
export const getErrorMessage = (field: string, type: string): string => {
  const messages: Record<string, Record<string, string>> = {
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      invalid: 'Password must be at least 8 characters with uppercase, lowercase, and numbers',
      minLength: 'Password must be at least 8 characters',
    },
    name: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
    },
    title: {
      required: 'Title is required',
      minLength: 'Title must be at least 3 characters',
    },
  };

  return messages[field]?.[type] || 'Invalid input';
};