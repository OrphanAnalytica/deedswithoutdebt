// src/utils/emailCapture.ts

const EMAIL_CAPTURED_KEY = 'dwd_email_captured';
const USER_EMAIL_KEY = 'dwd_user_email';
const EMAIL_SUBMITTED_KEY = 'dwd_email_submitted';
const CONFIRMATION_PENDING_KEY = 'dwd_confirmation_pending';

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
  },

  // Check if user has recently confirmed subscription (for auto-refresh)
  checkForRecentConfirmation: (): boolean => {
    const lastCheck = localStorage.getItem('dwd_last_confirmation_check');
    const now = Date.now();
    
    // Only check once per session to avoid excessive checks
    if (lastCheck && (now - parseInt(lastCheck)) < 60000) { // 1 minute
      return false;
    }
    
    // Mark that we've checked
    localStorage.setItem('dwd_last_confirmation_check', now.toString());
    
    // Check if user has email captured but might have just confirmed
    const hasEmail = localStorage.getItem(EMAIL_CAPTURED_KEY) === 'true';
    const captureDate = localStorage.getItem('dwd_capture_date');
    
    if (hasEmail && captureDate) {
      const timeSinceCapture = now - new Date(captureDate).getTime();
      // If captured within last 10 minutes, they might have just confirmed
      return timeSinceCapture < 600000; // 10 minutes
    }
    
    return false;
  },

  // Mark that user has been welcomed back (to avoid repeated messages)
  markWelcomeShown: (): void => {
    localStorage.setItem('dwd_welcome_shown', 'true');
  },

  // Check if welcome message has been shown
  hasWelcomeBeenShown: (): boolean => {
    return localStorage.getItem('dwd_welcome_shown') === 'true';
  },

  // Mark email as submitted (but not yet confirmed)
  markEmailSubmitted: (email: string): void => {
    localStorage.setItem(EMAIL_SUBMITTED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem(CONFIRMATION_PENDING_KEY, 'true');
    localStorage.setItem('dwd_submit_date', new Date().toISOString());
  },

  // Check if email is submitted but confirmation pending
  isConfirmationPending: (): boolean => {
    return localStorage.getItem(CONFIRMATION_PENDING_KEY) === 'true';
  },

  // Mark email as confirmed (grants access)
  markEmailConfirmed: (email: string): void => {
    localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem('dwd_capture_date', new Date().toISOString());
    // Clear pending state
    localStorage.removeItem(CONFIRMATION_PENDING_KEY);
    localStorage.removeItem(EMAIL_SUBMITTED_KEY);
  },

  // Check if user recently submitted email (for detecting confirmations)
  hasRecentSubmission: (minutesValid: number = 30): boolean => {
    const submitDate = localStorage.getItem('dwd_submit_date');
    if (!submitDate) return false;

    const minutesSinceSubmit = (Date.now() - new Date(submitDate).getTime()) / (1000 * 60);
    return minutesSinceSubmit < minutesValid;
  },

  // Clear all subscription data
  clearAllData: (): void => {
    localStorage.removeItem(EMAIL_CAPTURED_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(EMAIL_SUBMITTED_KEY);
    localStorage.removeItem(CONFIRMATION_PENDING_KEY);
    localStorage.removeItem('dwd_capture_date');
    localStorage.removeItem('dwd_submit_date');
    localStorage.removeItem('dwd_last_confirmation_check');
    localStorage.removeItem('dwd_welcome_shown');
  }
};
