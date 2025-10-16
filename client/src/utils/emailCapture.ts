// src/utils/emailCapture.ts

const EMAIL_CAPTURED_KEY = 'dwd_email_captured';
const USER_EMAIL_KEY = 'dwd_user_email';

export const emailCaptureUtils = {
  // Check if user has already provided email
  hasProvidedEmail: (): boolean => {
    return localStorage.getItem(EMAIL_CAPTURED_KEY) === 'true';
  },

  // Store email capture flag
  markEmailCaptured: (email: string): void => {
    localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem('dwd_capture_date', new Date().toISOString());
  },

  // Get stored email (optional, for display purposes)
  getStoredEmail: (): string | null => {
    return localStorage.getItem(USER_EMAIL_KEY);
  },

  // Clear capture flag (for testing or user logout)
  clearCapture: (): void => {
    localStorage.removeItem(EMAIL_CAPTURED_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem('dwd_capture_date');
  },

  // Check if user captured within last X days (optional expiry)
  isRecentCapture: (daysValid: number = 365): boolean => {
    const captureDate = localStorage.getItem('dwd_capture_date');
    if (!captureDate) return false;

    const daysSinceCapture = (Date.now() - new Date(captureDate).getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCapture < daysValid;
  }
};
