import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function PinnedIssue() {
  return (
    <section className="py-12 bg-accent/10 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="font-mono font-semibold text-sm text-primary uppercase tracking-wide">
              Pinned Issue
            </span>
          </div>

          <div className="bg-card rounded-xl shadow-sm border border-border p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-mono font-bold text-sm">
                    Issue #1
                  </span>
                  <span className="text-muted-foreground font-sans text-sm">March 15, 2024</span>
                </div>
                <h3 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                  3 Ways to Buy Real Estate Without Banks (And Why They Work)
                </h3>
                <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                  Discover the proven strategies I've used to acquire over $2M in real estate without traditional financing.
                  From tax deed auctions to probate deals, here's your complete roadmap.
                </p>
                <div className="flex items-center gap-4">
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
                    data-testid="button-read-pinned-issue"
                  >
                    <Link href="/archive">Read Full Issue</Link>
                  </Button>
                  <span className="font-sans text-sm text-muted-foreground">5 min read</span>
                </div>
              </div>
              <div className="lg:order-first">
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                  alt="Modern house with sold sign representing successful real estate investment"
                  className="rounded-lg shadow-lg w-full h-auto"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
