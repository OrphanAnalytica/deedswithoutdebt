import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { X, Calendar, MapPin, Bell, FileText, BookOpen, CheckCircle, Download, Briefcase, Scale, Phone, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { emailCaptureUtils } from '@/utils/emailCapture';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
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
        // Mark email as captured in localStorage
        emailCaptureUtils.markEmailCaptured(email);
        
        toast({
          title: "Welcome! 🎉",
          description: "You now have full access to all premium content.",
        });
        
        setEmail('');
        onClose();
        
        // Log variant for analytics
        console.log(`Subscription via ${variant} variant`);
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
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="p-8">
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
                  Subscribing...
                </div>
              ) : (
                <>
                  Get Instant Access
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

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
        </div>
      </div>
    </div>
  );
}

