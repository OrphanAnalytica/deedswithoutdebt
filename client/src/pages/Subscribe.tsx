import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { setSEOData } from "@/lib/seo";
import { Link } from "wouter";
import { CheckCircle, Clock, Shield, Users, TrendingUp, BookOpen } from "lucide-react";
import ConvertKitForm from "@/components/ConvertKitForm";


export default function Subscribe() {
  useEffect(() => {
    setSEOData({
      title: "Subscribe to Newsletter | Deeds Without Debt",
      description: "Join thousands of investors learning alternative real estate strategies. Get weekly insights on tax deeds, tax liens, HOA foreclosures, and probate deals.",
      canonical: "/subscribe"
    });
  }, []);

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "3x Weekly Delivery",
      description: "Monday deep dives, Wednesday auction alerts, Friday case studies"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Spam Policy",
      description: "We respect your inbox. No ads, no affiliate spam, just valuable content"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Learn from 12+ Years of Experience",
      description: "Get insights from over a decade of hands-on real estate investing across deeds and liens sales"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real Deal Analysis",
      description: "See actual deals with numbers, strategies, and outcomes"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Educational Focus",
      description: "Learn proven strategies from real-world experience, not recycled blog posts."
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Actionable Insights",
      description: "Every issue includes specific steps you can take immediately"
    }
  ];

  const testimonials = [
    {
      quote: "Ralph's newsletter opened my eyes to opportunities I never knew existed. I closed my first tax deed deal within 3 months of subscribing.",
      author: "Sarah M.",
      location: "Phoenix, AZ"
    },
    {
      quote: "The real-world examples and case studies are invaluable. No theory – just practical strategies that actually work.",
      author: "Mike T.",
      location: "Denver, CO"
    },
    {
      quote: "I've learned more about alternative real estate investing from this newsletter than from years of expensive courses.",
      author: "Jennifer L.",
      location: "Austin, TX"
    }
  ];

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Subscribe to Deeds Without Debt — Own Property Through Tax Deeds & Liens — Without Banks
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              You'll receive 3 expert insights per week:<br/>
              • Monday – Educational deep dive on tax sale strategies & due diligence<br/>
              • Wednesday – Upcoming auction alerts and timely opportunities<br/>
              • Friday – Real case studies, success stories & Q&A
            </p>
          </div>

          {/* ConvertKit Form */}
          <div className="mb-12">
            <ConvertKitForm />
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              What You'll Get
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* Sample Content */}
          <div className="bg-accent/10 rounded-xl p-8 mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              Recent Issue Highlights
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Issue #4: Alaska Tax Sales Deep Dive
                </h3>
                <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                  Complete breakdown of Alaska's unique borough system, upcoming September 2025 auction calendar, 
                  and why the state offers some of the best tax deed opportunities in the country.
                </p>
                <ul className="font-sans text-sm text-muted-foreground space-y-1">
                  <li>• 12 upcoming auctions with property details</li>
                  <li>• Borough-by-borough bidding strategies</li>
                  <li>• Winterization requirements and costs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  Issue #3: $17K to $120K Case Study
                </h3>
                <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
                  Complete walkthrough of my Catron County, NM deal including initial research, 
                  auction strategy, subdivision process, and final sale details.
                </p>
                <ul className="font-sans text-sm text-muted-foreground space-y-1">
                  <li>• Pre-auction research checklist</li>
                  <li>• Subdivision feasibility analysis</li>
                  <li>• Marketing strategy for rural properties</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              What Subscribers Say
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="p-6">
                  <p className="font-sans text-muted-foreground mb-4 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t pt-4">
                    <p className="font-serif font-bold text-foreground">{testimonial.author}</p>
                    <p className="font-sans text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              Ready to Start Learning?
            </h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the community of investors who are building wealth through alternative real estate strategies. 
              Your first issue will arrive within 24 hours.
            </p>
            <div className="flex justify-center">
              <ConvertKitForm />
            </div>
            <div className="mt-8 pt-8 border-t border-border">
              <p className="font-sans text-sm text-muted-foreground">
                Want to see what you're signing up for?{" "}
                <Button
                  asChild
                  variant="link"
                  className="text-primary hover:text-secondary font-mono font-semibold p-0"
                  data-testid="button-browse-archive"
                >
                  <Link href="/archive">Browse our archive</Link>
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
