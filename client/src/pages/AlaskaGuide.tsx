import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import NewsletterForm from "@/components/NewsletterForm";
import { setSEOData } from "@/lib/seo";
import { Link } from "wouter";
import { Calendar, MapPin, DollarSign, AlertTriangle, CheckCircle } from "lucide-react";

export default function AlaskaGuide() {
  useEffect(() => {
    setSEOData({
      title: "Alaska Tax Sales Guide | Deeds Without Debt",
      description: "Complete guide to Alaska tax deed investing. Learn about borough auctions, September 2025 opportunities, and unique Alaska strategies.",
      canonical: "/state-guides/alaska"
    });
  }, []);

  const upcomingAuctions = [
    {
      borough: "Matanuska-Susitna",
      date: "September 15, 2025",
      properties: 45,
      minimumBid: "$2,500",
      location: "Palmer Courthouse"
    },
    {
      borough: "Fairbanks North Star",
      date: "September 22, 2025", 
      properties: 23,
      minimumBid: "$5,000",
      location: "Fairbanks City Hall"
    },
    {
      borough: "Anchorage Municipality",
      date: "October 1, 2025",
      properties: 67,
      minimumBid: "$7,500",
      location: "Anchorage Assembly Chambers"
    }
  ];

  const keyFeatures = [
    {
      title: "No Right of Redemption",
      description: "Alaska properties have no redemption period after tax deed sale",
      icon: <CheckCircle className="w-6 h-6" />,
      advantage: true
    },
    {
      title: "Borough Variations",
      description: "Each borough has different rules and auction schedules",
      icon: <MapPin className="w-6 h-6" />,
      advantage: false
    },
    {
      title: "Winterization Required",
      description: "Properties must be winterized by October 1st annually",
      icon: <AlertTriangle className="w-6 h-6" />,
      advantage: false
    },
    {
      title: "High ROI Potential",
      description: "Average returns of 150-300% due to limited competition",
      icon: <DollarSign className="w-6 h-6" />,
      advantage: true
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Button 
                asChild
                variant="ghost"
                size="sm"
                className="text-primary hover:text-secondary font-sans"
                data-testid="button-back-to-state-guides"
              >
                <Link href="/state-guides">← Back to State Guides</Link>
              </Button>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Alaska Tax Sales Guide
            </h1>
            <p className="font-sans text-xl text-muted-foreground leading-relaxed">
              The complete guide to investing in Alaska tax deed auctions, including borough-specific strategies 
              and September 2025 opportunities.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Updated December 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">19 Boroughs Covered</span>
              </div>
              <Badge className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono font-bold">
                INTERMEDIATE
              </Badge>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <img
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600"
              alt="Scenic Alaska wilderness landscape with mountains and forest"
              className="rounded-xl shadow-lg w-full h-80 object-cover"
              loading="lazy"
            />
          </div>

          {/* Key Features */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Alaska Tax Sale Key Features
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {keyFeatures.map((feature, index) => (
                <Card key={index} className={`p-6 ${feature.advantage ? 'border-green-200 bg-green-50' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${feature.advantage ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-sans text-muted-foreground text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Auctions */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              September 2025 Auction Calendar
            </h2>
            <div className="space-y-4">
              {upcomingAuctions.map((auction, index) => (
                <Card key={index} className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-foreground">
                        {auction.borough}
                      </h3>
                      <p className="font-sans text-sm text-muted-foreground">
                        {auction.location}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-primary">{auction.date}</p>
                      <p className="font-sans text-xs text-muted-foreground">Auction Date</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-primary">{auction.properties}</p>
                      <p className="font-sans text-xs text-muted-foreground">Properties</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-primary">{auction.minimumBid}</p>
                      <p className="font-sans text-xs text-muted-foreground">Min. Bid</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Strategy Section */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Alaska Investment Strategy
            </h2>
            <div className="prose prose-lg max-w-none">
              <div className="bg-card rounded-xl shadow-sm border border-border p-8">
                <h3 className="font-serif text-xl font-bold text-foreground mb-4">
                  Why Alaska Works for Tax Deed Investing
                </h3>
                <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                  Alaska's unique characteristics create exceptional opportunities for tax deed investors. 
                  The state's vast size, small population, and borough-based government system result in 
                  less competition and higher potential returns than most other states.
                </p>
                
                <h4 className="font-serif text-lg font-bold text-foreground mb-3 mt-6">
                  Borough System Advantages
                </h4>
                <ul className="font-sans text-muted-foreground space-y-2 mb-6">
                  <li>• Each borough operates independently with its own auction rules</li>
                  <li>• Smaller auction pools mean less bidding competition</li>
                  <li>• Many boroughs have annual or bi-annual auctions only</li>
                  <li>• Local knowledge gives significant advantages</li>
                </ul>
                
                <h4 className="font-serif text-lg font-bold text-foreground mb-3">
                  Key Considerations
                </h4>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                  <p className="font-sans text-yellow-800 text-sm">
                    <strong>Important:</strong> Alaska properties require winterization by October 1st annually. 
                    Budget $2,000-$5,000 per property for proper winterization to prevent freeze damage.
                  </p>
                </div>
                
                <ul className="font-sans text-muted-foreground space-y-2">
                  <li>• Remote locations may require bush plane or boat access</li>
                  <li>• Environmental hazards (permafrost, wildlife) need consideration</li>
                  <li>• Limited local contractor availability in rural areas</li>
                  <li>• Seasonal accessibility affects property values</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Get Alaska Auction Updates
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to receive detailed property lists, bidding strategies, and auction results 
              for each Alaska borough auction throughout 2025.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </div>

          {/* Resources */}
          <div className="bg-accent/10 rounded-xl p-8">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4 text-center">
              Alaska-Specific Resources
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Button 
                variant="outline"
                className="border border-border text-foreground font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                data-testid="button-download-alaska-checklist"
              >
                Download Alaska Auction Checklist
              </Button>
              <Button 
                variant="outline"
                className="border border-border text-foreground font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                data-testid="button-download-winterization-guide"
              >
                Download Winterization Guide
              </Button>
            </div>
            <div className="text-center mt-6">
              <Button 
                asChild
                variant="link"
                className="text-primary hover:text-secondary font-mono font-semibold"
                data-testid="button-all-resources"
              >
                <Link href="/resources">View All Resources →</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
