import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { setSEOData, setBreadcrumbSchema } from "@/lib/seo";
import { Linkedin } from "lucide-react";

export default function About() {
  useEffect(() => {
    setSEOData({
      title: "About Deeds Without Debt | Tax Sale Investing Education",
      description: "Discover how Deeds Without Debt helps investors learn Tax Deed and Tax Lien strategies for property ownership through tax sales.",
      canonical: "/about"
    });

    setBreadcrumbSchema([
      { name: "Home", url: "https://deedswithoutdebt.com" },
      { name: "About", url: "https://deedswithoutdebt.com/about" }
    ]);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-[800px] mx-auto">
          {/* Hero Section - Simple & Centered */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              About Deeds Without Debt
            </h1>
            <p className="font-sans text-xl text-muted-foreground leading-relaxed max-w-[700px] mx-auto">
              A newsletter dedicated to making alternative real estate strategies accessible to everyday investors.
            </p>
          </div>

          {/* Section 1: Why This Newsletter Exists */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Why This Newsletter Exists</h2>
            
            <p className="font-sans text-lg text-muted-foreground mb-6 leading-[1.75]">
              I started Deeds Without Debt because I discovered that real estate investing doesn't have to require bank loans, perfect credit, or large down payments. Tax deed and lien investing opened doors that traditional financing closed—and I believe this knowledge should be accessible to everyone, not hidden behind expensive courses or gatekept by industry insiders.
            </p>

            <p className="font-sans text-lg text-muted-foreground leading-[1.75]">
              This newsletter exists to demystify alternative real estate acquisition strategies and provide practical, actionable information that helps everyday investors build wealth outside the traditional system.
            </p>
          </div>

          {/* Section 2: What You'll Find Here */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">What You'll Find Here</h2>
            
            <ul className="space-y-4">
              <li className="font-sans text-lg text-muted-foreground leading-[1.75] flex items-start">
                <span className="text-primary mr-3 mt-1 font-bold">•</span>
                <span>State-by-state guides to tax deed and lien auctions</span>
              </li>
              <li className="font-sans text-lg text-muted-foreground leading-[1.75] flex items-start">
                <span className="text-primary mr-3 mt-1 font-bold">•</span>
                <span>Educational resources and checklists (all free)</span>
              </li>
              <li className="font-sans text-lg text-muted-foreground leading-[1.75] flex items-start">
                <span className="text-primary mr-3 mt-1 font-bold">•</span>
                <span>Real strategies that work without banks or traditional financing</span>
              </li>
              <li className="font-sans text-lg text-muted-foreground leading-[1.75] flex items-start">
                <span className="text-primary mr-3 mt-1 font-bold">•</span>
                <span>Weekly insights on alternative real estate acquisition</span>
              </li>
            </ul>
          </div>

          {/* Section 3: My Background */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">My Background</h2>
            
            <p className="font-sans text-lg text-muted-foreground mb-6 leading-[1.75]">
              I've been investing in tax deeds and liens for several years across multiple states. My experience includes purchasing properties at tax deed auctions, investing in tax lien certificates, and helping others navigate these alternative acquisition strategies.
            </p>

            <p className="font-sans text-lg text-muted-foreground leading-[1.75]">
              I'm sharing what I've learned because I wish this information had been available when I started.
            </p>
          </div>

          {/* Section 4: Connect */}
          <div className="text-center mb-16">
            <Button 
              asChild
              className="bg-primary text-primary-foreground px-8 py-6 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors text-lg inline-flex items-center gap-2"
              data-testid="button-linkedin-about"
            >
              <a 
                href="https://www.linkedin.com/in/ralph-biah-260a5253/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
                Connect on LinkedIn
              </a>
            </Button>
          </div>

          {/* Section 5: Mission Statement */}
          <div className="bg-primary/5 rounded-xl p-8 lg:p-12 mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">Mission Statement</h2>
            <p className="font-sans text-xl text-muted-foreground text-center leading-relaxed">
              To democratize real estate investing by teaching alternative acquisition strategies that don't require 
              traditional bank financing, perfect credit, or large down payments. Everyone deserves the opportunity 
              to build wealth through real estate.
            </p>
          </div>

          {/* Section 7: Disclaimer */}
          <div className="bg-accent/10 rounded-lg p-6 mb-16">
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">Important Disclaimer</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
              The information provided in this newsletter and website is for educational purposes only and does not constitute investment advice. 
              Real estate investing involves risk, and past performance does not guarantee future results. Always consult with qualified 
              professionals including attorneys, accountants, and real estate professionals before making investment decisions. 
              Due diligence is essential for every deal.
            </p>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              Every state has different laws regarding tax deed and lien sales, redemption periods, and property rights. 
              It is your responsibility to understand the laws in your jurisdiction before making any investment decisions.
            </p>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="font-sans text-lg text-muted-foreground mb-8">
              Join investors who receive weekly insights on alternative real estate strategies.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
