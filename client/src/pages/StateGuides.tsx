import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { setSEOData } from "@/lib/seo";
import { Link, useSearch, useLocation } from "wouter";
import { MapPin, Search, Settings } from "lucide-react";
import { StateGuide, listStates } from "@/lib/stateGuides";
import { StateCard } from "@/components/ui/StateCard";
import { TypeTabs } from "@/components/ui/TypeTabs";
import { EmptyState } from "@/components/ui/EmptyState";
import Fuse from 'fuse.js';

export default function StateGuides() {
  const [stateGuides, setStateGuides] = useState<StateGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [statusFilters, setStatusFilters] = useState<string[]>(['available', 'coming_soon', 'research']);
  const [showFilters, setShowFilters] = useState(false);
  const searchParams = useSearch();
  const [, setLocation] = useLocation();

  useEffect(() => {
    setSEOData({
      title: "State Investment Guides | Deeds Without Debt",
      description: "Guides to tax deed, tax lien, and hybrid (redeemable deed) investing by state. Learn auction schedules, redemption periods, and investment opportunities across all 50 states plus Washington DC.",
      canonical: "/state-guides"
    });

    // Load saved preferences from localStorage
    const savedSearch = localStorage.getItem('stateGuides.search') || '';
    const savedType = localStorage.getItem('stateGuides.type') || 'all';
    const savedStatus = JSON.parse(localStorage.getItem('stateGuides.status') || '["available", "coming_soon", "research"]');

    // Parse URL params
    const params = new URLSearchParams(searchParams);
    const urlType = params.get('type');
    const urlSearch = params.get('q');
    const urlStatus = params.get('status')?.split(',') || savedStatus;

    // Set initial state from URL or localStorage
    setSearchQuery(urlSearch || savedSearch);
    setActiveFilter(urlType || savedType);
    setStatusFilters(urlStatus);

    listStates().then((guides) => {
      setStateGuides(guides);
      setLoading(false);
    });
  }, [searchParams]);

  // Update URL and localStorage when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (activeFilter !== 'all') params.set('type', activeFilter);
    if (statusFilters.length !== 3) params.set('status', statusFilters.join(','));
    
    const newUrl = `/state-guides${params.toString() ? '?' + params.toString() : ''}`;
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState({}, '', newUrl);
    }

    // Save to localStorage
    localStorage.setItem('stateGuides.search', searchQuery);
    localStorage.setItem('stateGuides.type', activeFilter);
    localStorage.setItem('stateGuides.status', JSON.stringify(statusFilters));
  }, [searchQuery, activeFilter, statusFilters]);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    if (!stateGuides.length) return null;
    return new Fuse(stateGuides, {
      keys: ['name', 'summary'],
      threshold: 0.3,
      includeScore: true
    });
  }, [stateGuides]);

  // Filter and search logic
  const filteredGuides = useMemo(() => {
    let guides = stateGuides;

    // Apply status filter first
    guides = guides.filter(guide => statusFilters.includes(guide.status));

    // Apply search with fuzzy matching
    if (searchQuery.trim() && fuse) {
      const searchResults = fuse.search(searchQuery);
      const searchedGuides = searchResults.map(result => result.item);
      guides = guides.filter(guide => searchedGuides.includes(guide));
    }

    // Apply type filter
    if (activeFilter === 'verify') {
      guides = guides.filter(guide => guide.status === 'research');
    } else if (activeFilter !== 'all') {
      guides = guides.filter(guide => guide.type === activeFilter);
    }

    return guides;
  }, [stateGuides, activeFilter, searchQuery, statusFilters, fuse]);

  const handleStatusChange = (status: string, checked: boolean) => {
    if (checked) {
      setStatusFilters(prev => [...prev, status]);
    } else {
      setStatusFilters(prev => prev.filter(s => s !== status));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-primary text-primary-foreground";
      case "coming_soon":
        return "bg-muted text-muted-foreground";
      case "research":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "coming_soon":
        return "Coming Soon";
      case "research":
        return "Research";
      default:
        return "TBD";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "text-green-600";
      case "intermediate":
        return "text-yellow-600";
      case "advanced":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDifficulty = (difficulty: string) => {
    if (difficulty === 'tbd') return 'TBD';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  // Get featured guide (Alaska)
  const featuredGuide = stateGuides.find(guide => guide.slug === 'alaska');

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Loading State Guides...
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

          {/* Featured Guide */}
          {featuredGuide && (
            <div className="bg-primary/5 rounded-xl p-8 lg:p-12 mb-12 border border-primary/20">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1 rounded-full font-mono font-bold text-sm">
                      FEATURED GUIDE
                    </Badge>
                    <span className="text-muted-foreground font-sans text-sm">Updated {featuredGuide.last_updated}</span>
                  </div>
                  <h2 className="font-serif text-3xl lg:text-4xl font-bold text-foreground mb-4">
                    {featuredGuide.name} Tax Investment Guide
                  </h2>
                  <p className="font-sans text-lg text-muted-foreground mb-6 leading-relaxed">
                    {featuredGuide.summary}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <p className="font-mono font-bold text-2xl text-primary">3 Sales</p>
                      <p className="font-sans text-sm text-muted-foreground">Avg/2 Years</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-2xl text-primary">150–300%</p>
                      <p className="font-sans text-sm text-muted-foreground">ROI Range</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-2xl text-primary">19 Boroughs</p>
                      <p className="font-sans text-sm text-muted-foreground">Covered</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-6 italic">*Example estimates based on available data</p>
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-mono font-bold hover:bg-secondary transition-colors"
                    data-testid={`button-read-${featuredGuide.slug}-guide`}
                  >
                    <Link href={`/state-guides/${featuredGuide.slug}`}>Read Alaska Guide</Link>
                  </Button>
                </div>
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt={`${featuredGuide.name} landscape for tax investing opportunities`}
                    className="rounded-lg shadow-lg w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search states..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-states"
                />
              </div>
            </div>

            <TypeTabs value={activeFilter} onValueChange={setActiveFilter} />

            <div className="mt-8">
              <div className="text-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredGuides.length} {activeFilter === 'all' ? 'states' : 
                    activeFilter === 'verify' ? 'states to verify' : `${activeFilter} states`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.length > 0 ? (
                  filteredGuides.map((guide) => (
                    <StateCard key={guide.slug} guide={guide} />
                  ))
                ) : (
                  <EmptyState 
                    title="No states found"
                    description="Try adjusting your search or filter criteria."
                  />
                )}
              </div>
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
