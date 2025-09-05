import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="py-16 lg:py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Master Alternative Real Estate Investing
          </h2>
          <p className="font-sans text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Learn how to acquire properties through tax deeds, tax liens, HOA foreclosures, and probate deals.
            No bank financing, no credit checks, no traditional mortgages required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild
              className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-mono font-bold text-lg hover:bg-secondary transition-colors shadow-lg"
              data-testid="button-newsletter-hero"
            >
              <Link href="/subscribe">Get Free Newsletter</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border border-border text-foreground px-8 py-4 rounded-lg font-mono font-semibold text-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              data-testid="button-archive-hero"
            >
              <Link href="/archive">Browse Archive</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
