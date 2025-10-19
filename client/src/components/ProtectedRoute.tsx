import { useState, useEffect } from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import BeautifulSubscriptionModal, { ModalVariant } from '@/components/BeautifulSubscriptionModal';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  variant: ModalVariant;
}

export default function ProtectedRoute({ 
  children, 
  fallback,
  variant
}: ProtectedRouteProps) {
  const { isSubscribed, isLoading } = useSubscription();
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    if (!isLoading && !isSubscribed) {
      setShowGate(true);
    }
  }, [isSubscribed, isLoading]);


  const handleCloseGate = () => {
    setShowGate(false);
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-green mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show subscription gate for non-subscribers
  if (!isSubscribed) {
    return (
      <>
        <BeautifulSubscriptionModal
          isOpen={showGate}
          onClose={handleCloseGate}
          variant={variant}
        />
        
        {/* Show fallback content */}
        {fallback || (
          <div className="min-h-screen bg-cream">
            <div className="container mx-auto px-4 py-8">
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
                    <div className="text-gray-400 text-6xl mb-4">📧</div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                      Get Free Access
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Enter your email to unlock our premium content.
                    </p>
                    <button
                      onClick={() => setShowGate(true)}
                      className="w-full bg-primary-green hover:bg-primary-green/90 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                    >
                      Get Instant Access
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Show full content for subscribers
  return <>{children}</>;
}
