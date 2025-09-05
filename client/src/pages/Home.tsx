import Hero from "@/components/Hero";
import PinnedIssue from "@/components/PinnedIssue";
import NewsletterForm from "@/components/NewsletterForm";
import PostCard from "@/components/PostCard";
import CTABox from "@/components/CTABox";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Calculator, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/lib/content";
import type { Post } from "@/components/PostCard";

export default function Home() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);

  useEffect(() => {
    const posts = getAllPosts().slice(0, 3);
    setLatestPosts(posts);
  }, []);

  return (
    <div>
      <Hero />
      <PinnedIssue />
      
      {/* Latest Issues Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-2">Latest Issues</h3>
                <p className="font-sans text-lg text-muted-foreground">Fresh insights delivered weekly</p>
              </div>
              <Button
                asChild
                variant="outline"
                className="hidden sm:block border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                data-testid="button-view-all-issues"
              >
                <Link href="/archive">View All Issues</Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button
                asChild
                variant="outline"
                className="sm:hidden border border-border text-foreground px-8 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                data-testid="button-view-all-issues-mobile"
              >
                <Link href="/archive">View All Issues</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <NewsletterForm variant="hero" />

      {/* About Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-6">
                  About Ralph Biah
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                    I've been investing in real estate without traditional bank financing for over 8 years,
                    acquiring properties through tax deed auctions, probate deals, and HOA foreclosures across 12 states.
                  </p>
                  <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                    My biggest win was a $17,000 Catron County tax deed purchase that I subdivided and sold for $120,000.
                    But more importantly, I've helped hundreds of investors discover these alternative strategies.
                  </p>
                  <p className="font-sans text-lg text-muted-foreground mb-8 leading-relaxed">
                    This newsletter shares the exact strategies, real deals, and hard-won lessons from the trenches of alternative real estate investing.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button 
                    asChild
                    variant="outline"
                    className="border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                    data-testid="button-read-full-bio"
                  >
                    <Link href="/about">Read Full Bio</Link>
                  </Button>
                  <Button 
                    variant="link"
                    className="text-primary hover:text-secondary font-mono font-semibold text-sm transition-colors flex items-center gap-2 p-0"
                    data-testid="button-linkedin"
                  >
                    Connect on LinkedIn →
                  </Button>
                </div>
              </div>
              <div className="lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000"
                  alt="Professional headshot of Ralph Biah, real estate investor and newsletter author"
                  className="rounded-xl shadow-lg w-full h-auto max-w-md mx-auto lg:mx-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Preview Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">Free Resources</h3>
              <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
                Download the tools and templates I use for every deal
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <CTABox
                title="Tax Deed Checklist"
                description="Pre-auction research steps, bidding strategy, and post-purchase action items."
                buttonText="Download Free"
                buttonHref="/resources"
                icon={<FileText className="w-8 h-8" />}
                variant="primary"
              />

              <CTABox
                title="No-Bank Offer Calculator"
                description="Excel spreadsheet to analyze deals and calculate your maximum offer price."
                buttonText="Download Free"
                buttonHref="/resources"
                icon={<Calculator className="w-8 h-8" />}
                variant="secondary"
              />

              <CTABox
                title="Cold Call Scripts"
                description="Proven phone scripts for contacting probate attorneys and property owners."
                buttonText="Download Free"
                buttonHref="/resources"
                icon={<MessageSquare className="w-8 h-8" />}
                variant="accent"
              />
            </div>

            <div className="text-center mt-12">
              <Button 
                asChild
                variant="outline"
                className="border border-border text-foreground px-8 py-4 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                data-testid="button-view-all-resources"
              >
                <Link href="/resources">View All Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
