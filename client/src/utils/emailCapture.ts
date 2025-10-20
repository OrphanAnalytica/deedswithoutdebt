// src/utils/emailCapture.ts

const EMAIL_CAPTURED_KEY = 'dwd_email_captured';
const USER_EMAIL_KEY = 'dwd_user_email';
const EMAIL_SUBMITTED_KEY = 'dwd_email_submitted';
const CONFIRMATION_PENDING_KEY = 'dwd_confirmation_pending';
const SUBSCRIPTION_DATA_KEY = 'dwd_subscription';
const COOKIE_NAME = 'dwd_subscriber';

// Cookie utilities
const setSubscriptionCookie = (email: string): void => {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 90); // 90 days
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(email)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
};

const getSubscriptionCookie = (): string | null => {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === COOKIE_NAME) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const clearSubscriptionCookie = (): void => {
  document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Enhanced subscription data structure
interface SubscriptionData {
  email: string;
  confirmedAt: number;
  expiresAt: number;
}

export const emailCaptureUtils = {
  // Check if user has already provided email (enhanced with expiration)
  hasProvidedEmail: (): boolean => {
    const email = this.getStoredEmail();
    return email !== null;
  },

  // Store email capture flag with 90-day expiration
  markEmailCaptured: (email: string): void => {
    const subscriptionData: SubscriptionData = {
      email: email,
      confirmedAt: Date.now(),
      expiresAt: Date.now() + (90 * 24 * 60 * 60 * 1000) // 90 days
    };
    
    // Store in localStorage with expiration
    localStorage.setItem(SUBSCRIPTION_DATA_KEY, JSON.stringify(subscriptionData));
    localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem('dwd_capture_date', new Date().toISOString());
    
    // Set cookie as backup
    setSubscriptionCookie(email);
  },

  // Get stored email with expiration check
  getStoredEmail: (): string | null => {
    // Check localStorage first
    const subscriptionData = localStorage.getItem(SUBSCRIPTION_DATA_KEY);
    if (subscriptionData) {
      try {
        const data: SubscriptionData = JSON.parse(subscriptionData);
        const now = Date.now();
        
        // Check if not expired
        if (now < data.expiresAt) {
          return data.email;
        }
        
        // Expired - clear localStorage
        this.clearCapture();
      } catch (error) {
        console.error('Error parsing subscription data:', error);
        this.clearCapture();
      }
    }
    
    // Fallback to cookie
    const cookieEmail = getSubscriptionCookie();
    if (cookieEmail) {
      // Restore to localStorage
      const subscriptionData: SubscriptionData = {
        email: cookieEmail,
        confirmedAt: Date.now(),
        expiresAt: Date.now() + (90 * 24 * 60 * 60 * 1000)
      };
      localStorage.setItem(SUBSCRIPTION_DATA_KEY, JSON.stringify(subscriptionData));
      localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
      localStorage.setItem(USER_EMAIL_KEY, cookieEmail);
      return cookieEmail;
    }
    
    return null;
  },

  // Clear capture flag (for testing or user logout)
  clearCapture: (): void => {
    localStorage.removeItem(EMAIL_CAPTURED_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(SUBSCRIPTION_DATA_KEY);
    localStorage.removeItem('dwd_capture_date');
    clearSubscriptionCookie();
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
    const hasEmail = this.hasProvidedEmail();
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
    const subscriptionData: SubscriptionData = {
      email: email,
      confirmedAt: Date.now(),
      expiresAt: Date.now() + (90 * 24 * 60 * 60 * 1000) // 90 days
    };
    
    localStorage.setItem(SUBSCRIPTION_DATA_KEY, JSON.stringify(subscriptionData));
    localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem('dwd_capture_date', new Date().toISOString());
    
    // Set cookie as backup
    setSubscriptionCookie(email);
    
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

  // Verify subscription by email (for "Already Subscribed?" flow)
  verifySubscription: (email: string): boolean => {
    // Store subscription data
    const subscriptionData: SubscriptionData = {
      email: email,
      confirmedAt: Date.now(),
      expiresAt: Date.now() + (90 * 24 * 60 * 60 * 1000) // 90 days
    };
    
    localStorage.setItem(SUBSCRIPTION_DATA_KEY, JSON.stringify(subscriptionData));
    localStorage.setItem(EMAIL_CAPTURED_KEY, 'true');
    localStorage.setItem(USER_EMAIL_KEY, email);
    localStorage.setItem('dwd_capture_date', new Date().toISOString());
    
    // Set cookie as backup
    setSubscriptionCookie(email);
    
    return true;
  },

  // Clear all subscription data
  clearAllData: (): void => {
    localStorage.removeItem(EMAIL_CAPTURED_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(EMAIL_SUBMITTED_KEY);
    localStorage.removeItem(CONFIRMATION_PENDING_KEY);
    localStorage.removeItem(SUBSCRIPTION_DATA_KEY);
    localStorage.removeItem('dwd_capture_date');
    localStorage.removeItem('dwd_submit_date');
    localStorage.removeItem('dwd_last_confirmation_check');
    localStorage.removeItem('dwd_welcome_shown');
    clearSubscriptionCookie();
  }
};
