import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/archive", label: "Archive" },
    { href: "/about", label: "About" },
    { href: "/resources", label: "Resources" },
    { href: "/state-guides", label: "State Guides" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3" data-testid="link-home">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-mono font-bold text-lg">DWD</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-foreground">Deeds Without Debt</h1>
              <p className="text-muted-foreground text-sm font-sans">Buy Real Estate Without Banks</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`font-sans font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
                data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              asChild
              className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-mono font-semibold text-sm hover:bg-secondary transition-colors"
              data-testid="button-subscribe-nav"
            >
              <Link href="/subscribe">Subscribe</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4" data-testid="mobile-menu">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-sans font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  {item.label}
                </Link>
              ))}
              <Button
                asChild
                className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-mono font-semibold text-sm hover:bg-secondary transition-colors w-fit"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-subscribe-mobile"
              >
                <Link href="/subscribe">Subscribe</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
