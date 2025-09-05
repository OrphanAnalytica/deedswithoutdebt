import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { setSEOData } from "@/lib/seo";
import { Link } from "wouter";
import { MapPin, Calendar, DollarSign, FileText } from "lucide-react";

export default function StateGuides() {
  useEffect(() => {
    setSEOData({
      title: "State Guides | Deeds Without Debt",
      description: "Comprehensive guides to tax deed and tax lien laws by state. Learn auction schedules, redemption periods, and investment opportunities.",
      canonical: "/state-guides"
    });
  }, []);

  const stateGuides = [
    {
      state: "Alaska",
      slug: "alaska",
      status: "available",
      description: "Unique borough system creates exceptional opportunities with September 2025 auction highlights.",
      highlights: ["Borough-specific strategies", "Winterization requirements", "Remote property considerations"],
      upcomingAuctions: 3,
      averageROI: "150-300%",
      difficulty: "Intermediate"
    },
    {
      state: "Arizona",
      slug: "arizona",
      status: "coming-soon",
      description: "Tax lien state with competitive certificate auctions and strong redemption rates.",
      highlights: ["High redemption rates", "Online auctions", "Desert property challenges"],
      upcomingAuctions: 8,
      averageROI: "12-16%",
      difficulty: "Beginner"
    },
    {
      state: "Texas",
      slug: "texas",
      status: "coming-soon",
      description: "Deed state with monthly auctions and excellent opportunities in major metropolitan areas.",
      highlights: ["Monthly courthouse auctions", "Strong property rights", "Oil & gas considerations"],
      upcomingAuctions: 12,
      averageROI: "200-400%",
      difficulty: "Advanced"
    },
    {
      state: "Florida",
      slug: "florida",
      status: "coming-soon",
      description: "Certificate state with online bidding and hurricane-related opportunities.",
      highlights: ["Online auction platform", "Hurricane recovery plays", "Homestead exemptions"],
      upcomingAuctions: 15,
      averageROI: "8-12%",
      difficulty: "Beginner"
    },
    {
      state: "Georgia",
      slug: "georgia",
      status: "coming-soon",
      description: "Deed state with first Tuesday auctions and rural land opportunities.",
      highlights: ["First Tuesday tradition", "Rural timber opportunities", "Right of redemption periods"],
      upcomingAuctions: 6,
      averageROI: "180-250%",
      difficulty: "Intermediate"
    },
    {
      state: "New Mexico",
      slug: "new-mexico",
      status: "coming-soon",
      description: "Deed state with county-by-county variations and subdivision opportunities.",
      highlights: ["County-specific rules", "Subdivision potential", "Water rights complexity"],
      upcomingAuctions: 4,
      averageROI: "200-500%",
      difficulty: "Advanced"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-primary text-primary-foreground";
      case "coming-soon":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-green-600";
      case "Intermediate":
        return "text-yellow-600";
      case "Advanced":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              State Investment Guides
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive guides to tax deed and tax lien investing by state. Learn the specific laws, 
              auction schedules, and strategies that work in each jurisdiction.
            </p>
          </div>

          {/* Featured Guide - Alaska */}
          <div className="bg-primary/5 rounded-xl p-8 lg:p-12 mb-12 border border-primary/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-mono font-bold text-sm">
                    FEATURED GUIDE
                  </Badge>
                  <span className="text-muted-foreground font-sans text-sm">Updated December 2024</span>
                </div>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Alaska Tax Sales Guide
                </h2>
                <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                  Alaska's unique borough structure creates exceptional opportunities for tax deed investors. 
                  Learn about the September 2025 auction calendar and borough-specific strategies.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <p className="font-mono font-bold text-2xl text-primary">3</p>
                    <p className="font-sans text-sm text-muted-foreground">Upcoming Auctions</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono font-bold text-2xl text-primary">150-300%</p>
                    <p className="font-sans text-sm text-muted-foreground">Average ROI</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono font-bold text-2xl text-primary">19</p>
                    <p className="font-sans text-sm text-muted-foreground">Boroughs Covered</p>
                  </div>
                </div>
                <Button 
                  asChild
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-mono font-bold hover:bg-secondary transition-colors"
                  data-testid="button-read-alaska-guide"
                >
                  <Link href="/state-guides/alaska">Read Alaska Guide</Link>
                </Button>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Scenic Alaska wilderness landscape with mountains and forest"
                  className="rounded-lg shadow-lg w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* All State Guides */}
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              All State Guides
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stateGuides.map((guide) => (
                <Card key={guide.state} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {guide.state}
                    </h3>
                    <Badge className={`px-3 py-1 rounded-full font-mono font-bold text-xs ${getStatusColor(guide.status)}`}>
                      {guide.status === "available" ? "Available" : "Coming Soon"}
                    </Badge>
                  </div>
                  
                  <p className="font-sans text-muted-foreground mb-4 leading-relaxed text-sm">
                    {guide.description}
                  </p>
                  
                  <ul className="font-sans text-xs text-muted-foreground space-y-1 mb-4">
                    {guide.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{guide.upcomingAuctions} auctions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{guide.averageROI} ROI</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`font-sans text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                      {guide.difficulty}
                    </span>
                    {guide.status === "available" ? (
                      <Button 
                        asChild
                        size="sm"
                        className="bg-primary text-primary-foreground font-mono font-semibold hover:bg-secondary transition-colors"
                        data-testid={`button-read-${guide.slug}-guide`}
                      >
                        <Link href={`/state-guides/${guide.slug}`}>Read Guide</Link>
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        variant="outline"
                        disabled
                        className="font-mono font-semibold"
                      >
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Request Guide */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Don't See Your State?
              </h2>
              <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                I'm constantly researching new states and updating existing guides. 
                Let me know which state you'd like to see covered next, and I'll prioritize it for the newsletter.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
                  data-testid="button-request-state-guide"
                >
                  Request a State Guide
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-testid="button-subscribe-updates"
                >
                  <Link href="/subscribe">Subscribe for Updates</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
