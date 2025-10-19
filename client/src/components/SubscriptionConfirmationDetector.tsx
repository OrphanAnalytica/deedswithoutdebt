import { useEffect } from 'react';
import { emailCaptureUtils } from '@/utils/emailCapture';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionConfirmationDetectorProps {
  onConfirmationDetected?: () => void;
}

export default function SubscriptionConfirmationDetector({ 
  onConfirmationDetected 
}: SubscriptionConfirmationDetectorProps) {
  const { toast } = useToast();

  useEffect(() => {
    const detectConfirmation = () => {
      const isConfirmationPending = emailCaptureUtils.isConfirmationPending();
      const hasAccess = emailCaptureUtils.hasProvidedEmail();
      const welcomeShown = emailCaptureUtils.hasWelcomeBeenShown();
      const email = emailCaptureUtils.getStoredEmail();

      // DEBUG: Log all detection variables
      console.log('🔍 Email Confirmation Detection Debug:');
      console.log('- Referrer:', document.referrer);
      console.log('- Pending confirmation:', isConfirmationPending);
      console.log('- Has access:', hasAccess);
      console.log('- Email:', email);
      console.log('- Welcome shown:', welcomeShown);

      // Check for ConvertKit confirmation via multiple methods
      const referrer = document.referrer.toLowerCase();
      const urlParams = new URLSearchParams(window.location.search);
      
      const fromConvertKit = 
        referrer.includes('kit.com') || 
        referrer.includes('convertkit') ||
        referrer.includes('app.kit.com') ||
        urlParams.get('confirmed') === 'true' ||
        urlParams.get('subscription') === 'confirmed' ||
        urlParams.get('subscriber_id') !== null;

      console.log('- From ConvertKit?', fromConvertKit);

      // Grant access ONLY if they came from ConvertKit confirmation
      if (fromConvertKit && isConfirmationPending && !hasAccess && email && !welcomeShown) {
        console.log('✅ GRANTING ACCESS - Email confirmation detected');
        
        // Grant access only after proper email confirmation
        emailCaptureUtils.markEmailConfirmed(email);
        
        // Show success toast
        toast({
          title: "✓ Subscription Confirmed!",
          description: "Welcome! You now have full access to all premium content.",
          duration: 4000,
          className: "bg-green-50 border-green-200 text-green-900 shadow-xl",
        });
        
        // Mark welcome as shown
        emailCaptureUtils.markWelcomeShown();
        
        // Notify parent component
        onConfirmationDetected?.();
        
        // Force page refresh to update subscription state
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    };

    // Run detection immediately
    detectConfirmation();
    
    // Also run after a short delay as backup
    const backupTimer = setTimeout(detectConfirmation, 1000);

    return () => clearTimeout(backupTimer);
  }, [toast, onConfirmationDetected]);

  // This component doesn't render anything
  return null;
}
