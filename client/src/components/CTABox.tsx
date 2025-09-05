import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ReactNode } from "react";

interface CTABoxProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary" | "accent";
}

export default function CTABox({ 
  title, 
  description, 
  buttonText, 
  buttonHref, 
  icon, 
  variant = "primary" 
}: CTABoxProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary/10 border-secondary";
      case "accent":
        return "bg-accent/10 border-accent";
      default:
        return "bg-primary/10 border-primary";
    }
  };

  const getIconClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary/10 text-secondary";
      case "accent":
        return "bg-accent/10 text-accent-foreground";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getButtonClasses = () => {
    switch (variant) {
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-primary";
      case "accent":
        return "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground";
      default:
        return "bg-primary text-primary-foreground hover:bg-secondary";
    }
  };

  return (
    <Card className={`p-8 text-center hover:shadow-md transition-shadow ${getVariantClasses()}`}>
      {icon && (
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${getIconClasses()}`}>
          {icon}
        </div>
      )}
      
      <h4 className="font-serif text-xl font-bold text-foreground mb-3">
        {title}
      </h4>
      
      <p className="font-sans text-muted-foreground mb-6">
        {description}
      </p>
      
      <Button 
        asChild
        className={`font-mono font-semibold transition-colors w-full ${getButtonClasses()}`}
        data-testid={`button-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <Link href={buttonHref}>{buttonText}</Link>
      </Button>
    </Card>
  );
}
