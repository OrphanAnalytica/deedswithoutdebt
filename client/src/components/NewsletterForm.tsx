import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Check, Mail, Lock, ArrowRight } from "lucide-react";

interface NewsletterFormProps {
  variant?: "default" | "hero";
  className?: string;
}

export default function NewsletterForm({ variant = "default", className = "" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const actionUrl = import.meta.env.VITE_NEWSLETTER_ACTION_URL || "https://api.beehiiv.com/v2/forms/submit";
      
      const response = await fetch(actionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        toast({
          title: "Success!",
          description: "Thank you for subscribing to our newsletter.",
        });
      } else {
        throw new Error("Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      toast({
        title: "Subscription Error",
        description: "There was an error subscribing to our newsletter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "hero") {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-serif text-3xl lg:text-4xl font-bold mb-6 leading-tight">
              Get the Deeds Without Debt Newsletter
            </h3>
            <p className="font-sans text-xl text-primary-foreground/80 mb-8 leading-relaxed">
              Weekly insights on alternative real estate investing. Real deals, proven strategies, and actionable opportunities delivered to your inbox.
            </p>

            <form className="max-w-md mx-auto mb-8" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting || isSuccess}
                  className="flex-1 px-4 py-3 rounded-lg bg-input text-foreground font-sans placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-mono font-bold hover:bg-accent hover:text-accent-foreground transition-colors whitespace-nowrap"
                  data-testid="button-newsletter-submit"
                >
                  {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Get Free Access"}
                </Button>
              </div>
            </form>

            <div className="grid sm:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Check className="w-5 h-5 text-secondary" />
                <span className="font-sans text-primary-foreground/90">3x weekly delivery</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Lock className="w-5 h-5 text-secondary" />
                <span className="font-sans text-primary-foreground/90">No spam ever</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <ArrowRight className="w-5 h-5 text-secondary" />
                <span className="font-sans text-primary-foreground/90">Unsubscribe anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting || isSuccess}
            className="pl-10"
            data-testid="input-newsletter-email-default"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="bg-primary text-primary-foreground font-mono font-semibold hover:bg-secondary transition-colors"
          data-testid="button-newsletter-submit-default"
        >
          {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe"}
        </Button>
      </div>
      
      {isSuccess && (
        <p className="text-sm text-primary font-sans">
          ✓ Thank you for subscribing! Check your email for confirmation.
        </p>
      )}
    </form>
  );
}
