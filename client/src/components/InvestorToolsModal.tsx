import { useState, useEffect } from "react";
import { X, CheckCircle, Download, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { emailCaptureUtils } from "@/utils/emailCapture";
import { useSubscription } from "@/contexts/SubscriptionContext";
import { useToast } from "@/hooks/use-toast";

interface InvestorToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InvestorToolsModal({ isOpen, onClose }: InvestorToolsModalProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [showVerifyFlow, setShowVerifyFlow] = useState(false);
  const { verifySubscription } = useSubscription();
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Check if user already has access
      const userHasAccess = emailCaptureUtils.hasProvidedEmail();
      setHasAccess(userHasAccess);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const triggerDownloads = () => {
    // Download all files
    window.open('/downloads/due-diligence-checklist.pdf', '_blank');
    window.open('/downloads/state-research-guide.xlsx', '_blank');
    window.open('/downloads/auction-bid-tracker.xlsx', '_blank');
  };

  const handleDirectDownload = () => {
    // User already provided email, allow direct download
    triggerDownloads();
    onClose();
  };

  const handleVerifySubscription = () => {
    if (!verifyEmail.trim() || !verifyEmail.includes('@')) {
      toast({
        title: "Email Required",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const success = verifySubscription(verifyEmail);
    if (success) {
      toast({
        title: "✓ Welcome Back!",
        description: "Access restored successfully.",
        duration: 3000,
      });
      setHasAccess(true);
      setShowVerifyFlow(false);
      
      // DO NOT trigger downloads for verification
      // Only restore access
      
      onClose();
      
      // Refresh to update UI
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      toast({
        title: "Verification Failed",
        description: "Unable to verify subscription. Please try subscribing again.",
        variant: "destructive"
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to ConvertKit
      const formData = new FormData();
      formData.append('email_address', email);
      
      const response = await fetch('https://app.kit.com/forms/8630938/subscriptions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Mark email as captured with enhanced persistence
        emailCaptureUtils.markEmailCaptured(email);
        
        // Trigger downloads
        triggerDownloads();
        
        // Close modal
        onClose();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      // Still proceed for better UX
      emailCaptureUtils.markEmailCaptured(email);
      triggerDownloads();
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  // If user already has access, show welcome back message
  if (hasAccess) {
    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleBackdropClick}
      >
        {/* Backdrop with blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        
        {/* Modal */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Welcome Back!
            </h2>
            <p className="font-sans text-muted-foreground mb-6">
              Your downloads will start automatically.
            </p>
            <Button
              onClick={handleDirectDownload}
              className="w-full bg-green-600 text-white hover:bg-green-700 font-mono font-semibold py-3"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Tools
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Regular email capture form (first-time users)
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-2">
              Get Free Access
            </h2>
            <p className="font-sans text-muted-foreground">
              Enter your email to unlock our investor tools and resources.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Get Instant Access'}
            </Button>
          </form>

          {/* Already Subscribed Section */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">Already subscribed?</p>
              <div className="space-y-3">
                <input
                  type="email"
                  value={verifyEmail}
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  placeholder="Enter your email to verify"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  type="button"
                  onClick={handleVerifySubscription}
                  variant="outline"
                  className="w-full text-sm py-2"
                >
                  <UserCheck className="mr-2 h-4 w-4" />
                  Verify Subscription
                </Button>
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </div>
  );
}