import { useEffect } from "react";
import CTABox from "@/components/CTABox";
import NewsletterForm from "@/components/NewsletterForm";
import { setSEOData } from "@/lib/seo";
import { FileText, Calculator, MessageSquare, MapPin, BookOpen, CheckCircle } from "lucide-react";

export default function Resources() {
  useEffect(() => {
    setSEOData({
      title: "Free Resources | Deeds Without Debt",
      description: "Download free tools, templates, and guides for alternative real estate investing. Tax deed checklists, calculators, scripts, and more.",
      canonical: "/resources"
    });
  }, []);

  const resources = [
    {
      title: "Tax Deed Checklist",
      description: "Pre-auction research steps, bidding strategy, and post-purchase action items.",
      icon: <FileText className="w-8 h-8" />,
      variant: "primary" as const,
      features: ["20-point research checklist", "Bidding strategy worksheet", "Post-auction timeline"]
    },
    {
      title: "No-Bank Offer Calculator",
      description: "Excel spreadsheet to analyze deals and calculate your maximum offer price.",
      icon: <Calculator className="w-8 h-8" />,
      variant: "secondary" as const,
      features: ["Deal analysis formulas", "ROI calculations", "Risk assessment matrix"]
    },
    {
      title: "Cold Call Scripts",
      description: "Proven phone scripts for contacting probate attorneys and property owners.",
      icon: <MessageSquare className="w-8 h-8" />,
      variant: "accent" as const,
      features: ["4 different script variations", "Objection handling guide", "Follow-up templates"]
    },
    {
      title: "State Research Guide",
      description: "How to research tax deed laws, auction schedules, and redemption periods by state.",
      icon: <MapPin className="w-8 h-8" />,
      variant: "primary" as const,
      features: ["50-state comparison chart", "Research website directory", "Key contacts database"]
    },
    {
      title: "Due Diligence Handbook",
      description: "Complete property research methodology to avoid costly mistakes.",
      icon: <BookOpen className="w-8 h-8" />,
      variant: "secondary" as const,
      features: ["Title research process", "Lien investigation steps", "Environmental risk checks"]
    },
    {
      title: "Auction Bid Tracker",
      description: "Spreadsheet to track multiple auctions, properties, and bidding results.",
      icon: <CheckCircle className="w-8 h-8" />,
      variant: "accent" as const,
      features: ["Multi-auction tracking", "Performance analytics", "ROI tracking tools"]
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Free Resources
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Download the tools, templates, and guides I use for every deal. These resources have helped me 
              analyze hundreds of properties and close profitable transactions across 12 states.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {resources.map((resource, index) => (
              <div key={index} className="bg-card rounded-xl shadow-sm border border-border p-8 text-center hover:shadow-md transition-shadow">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 ${
                  resource.variant === "secondary" ? "bg-secondary/10 text-secondary" :
                  resource.variant === "accent" ? "bg-accent/20 text-accent-foreground" :
                  "bg-primary/10 text-primary"
                }`}>
                  {resource.icon}
                </div>
                
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {resource.title}
                </h3>
                
                <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                  {resource.description}
                </p>

                <ul className="font-sans text-sm text-muted-foreground mb-6 text-left space-y-1">
                  {resource.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className={`font-mono font-semibold transition-colors w-full px-6 py-3 rounded-lg ${
                    resource.variant === "secondary" 
                      ? "bg-secondary text-secondary-foreground hover:bg-primary" 
                      : resource.variant === "accent"
                      ? "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground"
                      : "bg-primary text-primary-foreground hover:bg-secondary"
                  }`}
                  data-testid={`button-download-${resource.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  Download Free
                </button>
              </div>
            ))}
          </div>

          {/* How to Use Section */}
          <div className="bg-accent/10 rounded-xl p-8 lg:p-12 mb-16">
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                  How to Use These Resources
                </h2>
                <div className="space-y-4 font-sans text-muted-foreground">
                  <div className="flex gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</span>
                    <p>Start with the <strong className="text-foreground">State Research Guide</strong> to understand the laws in your target area</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</span>
                    <p>Use the <strong className="text-foreground">Tax Deed Checklist</strong> to research properties before auction day</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</span>
                    <p>Run numbers with the <strong className="text-foreground">Offer Calculator</strong> to determine your maximum bid</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">4</span>
                    <p>Track your results with the <strong className="text-foreground">Auction Bid Tracker</strong> to improve over time</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  💡 Pro Tip
                </h3>
                <p className="font-sans text-muted-foreground leading-relaxed">
                  These resources are most effective when used together as a complete system. 
                  Don't try to skip steps – the research and due diligence phase is where most 
                  profitable deals are found and most costly mistakes are avoided.
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Want More Advanced Strategies?
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              These free resources are just the beginning. Subscribe to the newsletter for 
              advanced techniques, real deal breakdowns, and insider insights you won't find anywhere else.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
