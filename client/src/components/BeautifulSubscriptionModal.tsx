import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { X, Calendar, MapPin, Bell, FileText, BookOpen, CheckCircle, Download, Briefcase, Scale, Phone, Clock, DollarSign, ArrowRight, UserCheck } from 'lucide-react';
import { emailCaptureUtils } from '@/utils/emailCapture';
import { useSubscription } from '@/contexts/SubscriptionContext';

export type ModalVariant = 'auctions' | 'resources' | 'guides';

interface BeautifulSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant: ModalVariant;
}

// Variant configurations with modern design
const variantConfigs = {
  auctions: {
    icon: Calendar,
    title: "Access Exclusive Auction Listings",
    subtitle: "Find profitable properties before your competition",
    benefits: [
      { icon: Calendar, text: "Daily auction updates" },
      { icon: MapPin, text: "50-state coverage" },
      { icon: Bell, text: "New listing alerts" },
      { icon: FileText, text: "Registration details" }
    ]
  },
  resources: {
    icon: BookOpen,
    title: "Unlock Premium Resources",
    subtitle: "Step-by-step guides for successful investing",
    benefits: [
      { icon: BookOpen, text: "State-specific guides" },
      { icon: CheckCircle, text: "Due diligence checklists" },
      { icon: Briefcase, text: "Real case studies" },
      { icon: Download, text: "Weekly strategies" }
    ]
  },
  guides: {
    icon: MapPin,
    title: "Get State Investment Guides",
    subtitle: "Master tax deed laws in your target state",
    benefits: [
      { icon: Scale, text: "Laws & regulations" },
      { icon: Phone, text: "County contacts" },
      { icon: Clock, text: "Redemption periods" },
      { icon: DollarSign, text: "ROI analysis" }
    ]
  }
};

export default function BeautifulSubscriptionModal({ 
  isOpen, 
  onClose, 
  variant
}: BeautifulSubscriptionModalProps) {
  const [email, setEmail] = useState('');
  const [verifyEmail, setVerifyEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const { toast } = useToast();
  const { verifySubscription } = useSubscription();
  
  const config = variantConfigs[variant];
  const IconComponent = config.icon;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleClose = () => {
    // Reset all states when closing
    setShowSuccessMessage(false);
    setSubmittedEmail('');
    setEmail('');
    setIsSubmitting(false);
    onClose();
  };

  const handleGotItClick = () => {
    // SECURITY FIX: Do NOT automatically grant access
    // Simply close the modal - user must confirm via email
    console.log('🔍 User clicked "Got It" - closing modal');
    handleClose();
  };

  const handleAlreadyConfirmed = () => {
    // SECURITY FIX: Do NOT bypass email verification
    // Show message directing user to check their email
    const isConfirmationPending = emailCaptureUtils.isConfirmationPending();
    const email = emailCaptureUtils.getStoredEmail();

    if (isConfirmationPending && email) {
      console.log('🔍 User clicked "Already confirmed?" - directing to email');
      
      // Show message directing them to click the email link
      toast({
        title: "Please Check Your Email",
        description: `Click the confirmation link we sent to ${email} to activate your subscription.`,
        duration: 6000,
        className: "bg-blue-50 border-blue-200 text-blue-900 shadow-xl",
      });
      
      // Close modal but do NOT grant access
      handleClose();
    } else {
      // Show error if no pending confirmation
      toast({
        title: "No Pending Confirmation",
        description: "Please submit your email first to get access.",
        variant: "destructive",
      });
    }
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
      
      // DO NOT trigger downloads for verification
      // Only restore access
      
      handleClose();
      
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Use ConvertKit API
      const formData = new FormData();
      formData.append('email_address', email);
      
      const response = await fetch('https://app.kit.com/forms/8630938/subscriptions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Store the submitted email for display
        setSubmittedEmail(email);
        
        // Show success message instead of closing immediately
        setShowSuccessMessage(true);
        
        // Mark email as submitted (but not confirmed yet)
        emailCaptureUtils.markEmailSubmitted(email);
        
        // Log variant for analytics
        console.log(`Subscription via ${variant} variant - awaiting email confirmation`);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      toast({
        title: "Subscription Error",
        description: "There was an error subscribing. Please try again.",
        variant: "destructive",
      });
      // DO NOT grant access on error - user needs to try again
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-[520px] w-full max-h-[90vh] overflow-y-auto"
        data-modal-variant={variant}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
          {showSuccessMessage ? (
            /* Email Confirmation Instructions */
            <div className="text-center">
              {/* Email Icon */}
              <div className="text-6xl mb-6">📧</div>
              
              {/* Header */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Check Your Email!
              </h3>
              
              <p className="text-lg text-gray-600 mb-2">
                We just sent a confirmation link to:
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-6">
                {submittedEmail}
              </p>
              
              <p className="text-gray-600 mb-8">
                Click the link in that email to activate your subscription and unlock all premium content.
              </p>
              
              {/* Next Steps */}
              <div className="bg-green-50 rounded-lg p-6 mb-8 text-left">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Check your inbox (and spam folder)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Click "Confirm your subscription"</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">Return here to access all content</span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleGotItClick}
                  className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-semibold py-3 text-base"
                >
                  Got It
                </Button>
                
                {/* Already Confirmed Button */}
                <button
                  onClick={handleAlreadyConfirmed}
                  className="w-full text-green-600 hover:text-green-700 underline text-sm font-medium py-2 transition-colors"
                >
                  Already confirmed? Click here
                </button>
              </div>
            </div>
          ) : (
            /* Original Form Content */
            <>
              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-primary-green/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-primary-green" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  {config.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {config.subtitle}
                </p>
              </div>

              {/* Benefits Section - 2x2 Grid */}
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-3">
                  {config.benefits.map((benefit, index) => {
                    const BenefitIcon = benefit.icon;
                    return (
                      <div 
                        key={index}
                        className="bg-green-50 p-3 rounded-lg flex items-center gap-3 hover:bg-green-100 transition-colors"
                      >
                        <BenefitIcon className="w-5 h-5 text-primary-green flex-shrink-0" />
                        <span className="text-sm font-medium text-gray-800">
                          {benefit.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent transition-colors text-base"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-semibold py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </div>
                  ) : (
                    <>
                      Get Instant Access
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
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
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    />
                    <Button
                      type="button"
                      onClick={handleVerifySubscription}
                      variant="outline"
                      className="w-full text-sm py-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white"
                    >
                      <UserCheck className="mr-2 h-4 w-4" />
                      Verify Subscription
                    </Button>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>No spam, ever</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Unsubscribe anytime</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Free forever</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}


