import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import NewsletterForm from "@/components/NewsletterForm";
import { setSEOData } from "@/lib/seo";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    setSEOData({
      title: "About Ralph Biah | Deeds Without Debt",
      description: "Learn about Ralph Biah's journey in alternative real estate investing and his mission to teach others how to buy properties without traditional bank financing.",
      canonical: "/about"
    });
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
                alt="Professional headshot of Ralph Biah, real estate investor and newsletter author"
                className="rounded-xl shadow-lg w-full h-auto max-w-md mx-auto lg:mx-0"
                loading="lazy"
              />
            </div>
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                About Ralph Biah
              </h1>
              <p className="font-sans text-xl text-muted-foreground mb-8 leading-relaxed">
                Real estate investor, educator, and author of the Deeds Without Debt newsletter. 
                Specializing in alternative acquisition strategies that don't require traditional bank financing.
              </p>
              <div className="flex gap-4">
                <Button 
                  asChild
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
                  data-testid="button-subscribe-about"
                >
                  <Link href="/subscribe">Subscribe to Newsletter</Link>
                </Button>
                <Button 
                  variant="outline"
                  className="border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-testid="button-linkedin-about"
                >
                  Connect on LinkedIn
                </Button>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="prose prose-lg max-w-4xl mx-auto mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">My Journey</h2>
            
            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              I started my real estate investing journey like most people – looking at traditional rental properties and trying to secure bank loans. 
              But after facing rejection after rejection from lenders, I discovered there was an entirely different world of real estate acquisition 
              that didn't require banks, credit checks, or traditional mortgages.
            </p>

            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              Over the past 8 years, I've acquired properties through tax deed auctions, tax lien certificates, HOA foreclosures, and probate deals 
              across 12 states. My portfolio includes everything from vacant lots to residential homes, commercial buildings, and raw land.
            </p>

            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 mt-8">The Catron County Success</h3>
            
            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              My biggest win came from a tax deed auction in Catron County, New Mexico. I purchased a 5-acre property with a small cabin for $17,000. 
              After researching the local zoning laws, I discovered I could subdivide the property. I sold the cabin on 1 acre for $75,000 and 
              the remaining 4 acres for $45,000 – turning my $17,000 investment into $120,000 in just 18 months.
            </p>

            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              This deal taught me that the real money in alternative real estate investing isn't just in buying properties cheap – 
              it's in understanding how to unlock their hidden value through subdivision, zoning changes, or creative financing strategies.
            </p>

            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 mt-8">Teaching Others</h3>
            
            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              After achieving consistent success with these strategies, I began sharing my knowledge through workshops, online courses, 
              and eventually this newsletter. I've helped hundreds of investors discover opportunities they never knew existed, 
              from courthouse steps to probate court filings.
            </p>

            <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
              The Deeds Without Debt newsletter was born from my desire to document real deals, share practical strategies, 
              and help others navigate the often-complex world of alternative real estate investing. Every issue contains 
              actionable insights based on real experience – no theory, no fluff, just proven strategies that work.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-primary/5 rounded-xl p-8 lg:p-12 mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6 text-center">Mission Statement</h2>
            <p className="font-sans text-xl text-muted-foreground text-center leading-relaxed max-w-3xl mx-auto mb-8">
              To democratize real estate investing by teaching alternative acquisition strategies that don't require 
              traditional bank financing, perfect credit, or large down payments. Everyone deserves the opportunity 
              to build wealth through real estate.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-mono font-bold text-2xl text-primary mb-2">500+</h3>
                <p className="font-sans text-muted-foreground">Students Taught</p>
              </div>
              <div>
                <h3 className="font-mono font-bold text-2xl text-primary mb-2">$2M+</h3>
                <p className="font-sans text-muted-foreground">Personal Portfolio Value</p>
              </div>
              <div>
                <h3 className="font-mono font-bold text-2xl text-primary mb-2">12</h3>
                <p className="font-sans text-muted-foreground">States Invested In</p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-accent/10 rounded-lg p-6 mb-12">
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">Important Disclaimer</h3>
            <p className="font-sans text-sm text-muted-foreground leading-relaxed">
              The information provided in this newsletter and website is for educational purposes only and does not constitute investment advice. 
              Real estate investing involves risk, and past performance does not guarantee future results. Always consult with qualified 
              professionals including attorneys, accountants, and real estate professionals before making investment decisions. 
              Due diligence is essential for every deal.
            </p>
          </div>

          {/* Newsletter CTA */}
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
            <p className="font-sans text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors who receive weekly insights on alternative real estate strategies. 
              No spam, no fluff – just actionable information you can use.
            </p>
            <NewsletterForm className="max-w-md mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
