import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { emailCaptureUtils } from '@/utils/emailCapture';

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscriberEmail: string | null;
  subscribe: (email: string) => Promise<boolean>;
  unsubscribe: () => void;
  verifySubscription: (email: string) => boolean;
  isLoading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriberEmail, setSubscriberEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check subscription status on mount (enhanced with multi-layer persistence)
  useEffect(() => {
    const checkSubscriptionStatus = () => {
      try {
        const hasEmail = emailCaptureUtils.hasProvidedEmail();
        const email = emailCaptureUtils.getStoredEmail();
        
        setIsSubscribed(hasEmail);
        setSubscriberEmail(email);
      } catch (error) {
        console.error('Error checking subscription status:', error);
        // Don't break the site - just assume not subscribed
        setIsSubscribed(false);
        setSubscriberEmail(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkSubscriptionStatus();
  }, []);

  const subscribe = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Submit to newsletter service
      const actionUrl = import.meta.env.VITE_NEWSLETTER_ACTION_URL || "https://api.beehiiv.com/v2/forms/submit";
      
      const response = await fetch(actionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        // Mark as subscribed with enhanced persistence
        emailCaptureUtils.markEmailCaptured(email);
        setIsSubscribed(true);
        setSubscriberEmail(email);
        return true;
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifySubscription = (email: string): boolean => {
    try {
      const success = emailCaptureUtils.verifySubscription(email);
      if (success) {
        setIsSubscribed(true);
        setSubscriberEmail(email);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Subscription verification error:", error);
      return false;
    }
  };

  const unsubscribe = () => {
    emailCaptureUtils.clearCapture();
    setIsSubscribed(false);
    setSubscriberEmail(null);
  };

  const value: SubscriptionContextType = {
    isSubscribed,
    subscriberEmail,
    subscribe,
    unsubscribe,
    verifySubscription,
    isLoading,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}




