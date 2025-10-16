import { Link } from "wouter";
import { Rss, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-accent/5 border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-mono font-bold">DWD</span>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-lg text-foreground">Deeds Without Debt</h4>
                  <p className="text-muted-foreground text-sm font-sans">Own Property Through Tax Deeds & Liens</p>
                </div>
              </div>
              <p className="font-sans text-muted-foreground mb-4 leading-relaxed max-w-md">
                Explore tax deed and tax lien strategies that help you buy real estate without banks, agents, or traditional financing. New guides and insights added weekly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-mono font-semibold text-foreground mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/archive" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-archive"
                  >
                    Newsletter Archive
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/resources" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-resources"
                  >
                    Free Resources
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/state-guides" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-state-guides"
                  >
                    State by State Guide
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-about"
                  >
                    About the Editor
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h5 className="font-mono font-semibold text-foreground mb-4">Legal</h5>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/privacy" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/terms" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-terms"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/disclaimer" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-disclaimer"
                  >
                    Disclaimer
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="font-sans text-muted-foreground hover:text-primary transition-colors"
                    data-testid="link-footer-contact"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border pt-8">
            <div className="bg-accent/10 rounded-lg p-6 mb-6">
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> This content is for educational and informational purposes only. It does not constitute legal, financial, or investment advice. Always consult licensed professionals and perform your own due diligence before making real estate decisions. Investing in real estate involves risk, and past performance is not indicative of future results.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="font-sans text-sm text-muted-foreground">
                © 2025 Biah Capital Holdings Ltd. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a 
                  href="/rss.xml" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-rss"
                >
                  <span className="sr-only">RSS Feed</span>
                  <Rss className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                  data-testid="link-footer-linkedin"
                >
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
