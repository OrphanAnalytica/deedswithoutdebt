import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { setSEOData } from "@/lib/seo";
import { Link, useSearch, useLocation } from "wouter";
import { Calendar, TrendingUp, DollarSign, CheckCircle, ArrowRight, Search, Star } from 'lucide-react';
import { StateGuide, listStates } from "@/lib/stateGuides";
import { StateCard } from "@/components/ui/StateCard";
import { EmptyState } from "@/components/ui/EmptyState";
import Fuse from 'fuse.js';

export default function StateGuides() {
  const [stateGuides, setStateGuides] = useState<StateGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
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

    // Parse URL params
    const params = new URLSearchParams(searchParams);
    const urlType = params.get('type');
    const urlSearch = params.get('q');

    // Set initial state from URL or localStorage
    setSearchTerm(urlSearch || savedSearch);
    setSelectedType(urlType || savedType);

    listStates().then((guides) => {
      setStateGuides(guides);
      setLoading(false);
    });
  }, [searchParams]);

  // Update URL and localStorage when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('q', searchTerm);
    if (selectedType !== 'all') params.set('type', selectedType);
    
    const newUrl = `/state-guides${params.toString() ? '?' + params.toString() : ''}`;
    if (window.location.pathname + window.location.search !== newUrl) {
      window.history.replaceState({}, '', newUrl);
    }

    // Save to localStorage
    localStorage.setItem('stateGuides.search', searchTerm);
    localStorage.setItem('stateGuides.type', selectedType);
  }, [searchTerm, selectedType]);

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
  const filteredStates = useMemo(() => {
    let guides = stateGuides;

    // Apply search with fuzzy matching
    if (searchTerm.trim() && fuse) {
      const searchResults = fuse.search(searchTerm);
      const searchedGuides = searchResults.map(result => result.item);
      guides = guides.filter(guide => searchedGuides.includes(guide));
    }

    // Apply type filter
    guides = guides.filter(guide => {
      const matchesType = selectedType === 'all' || guide.type === selectedType;
      return matchesType;
    });

    return guides;
  }, [stateGuides, selectedType, searchTerm, fuse]);

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

  // Get featured state
  const featuredState = stateGuides.find(state => state.featured === true);

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

          {/* Featured State - NEW MODERN DESIGN */}
          {featuredState && (
            <div className="mb-12">
              {/* Featured Badge & Title */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-600 text-white rounded-full text-sm font-semibold mb-3">
                  <Star className="h-4 w-4" />
                  Featured Investment Guide
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Explore {featuredState.name}
                </h2>
              </div>

              {/* Main Featured Card - Horizontal Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-xl shadow-lg overflow-hidden">
                
                {/* Left Side - Image */}
                {featuredState.image && (
                  <div className="relative h-64 lg:h-full min-h-[400px]">
                    <img 
                      src={featuredState.image} 
                      alt={`${featuredState.name} landscape`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-blue-900/40"></div>
                    <div className="absolute top-6 left-6">
                      <h3 className="text-4xl font-bold text-white mb-2">
                        {featuredState.name}
                      </h3>
                      <p className="text-white/90 text-lg font-semibold">
                        Tax Investment Guide
                      </p>
                    </div>
                  </div>
                )}

                {/* Right Side - Content */}
                <div className="p-8 flex flex-col justify-between">
                  
                  {/* Description */}
                  <div className="mb-6">
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {featuredState.description}
                    </p>

                    {/* Quick Stats - Compact Inline */}
                    <div className="grid grid-cols-1 gap-3 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Calendar className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <span className="text-xs text-gray-600 block">Sale Type</span>
                          <span className="text-sm font-semibold text-gray-900">{featuredState.saleType}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <span className="text-xs text-gray-600 block">Redemption Period</span>
                          <span className="text-sm font-semibold text-gray-900">{featuredState.redemptionPeriod}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <DollarSign className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <span className="text-xs text-gray-600 block">Returns</span>
                          <span className="text-sm font-semibold text-gray-900">{featuredState.interestRate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Top 3 Key Features Only */}
                    {featuredState.keyFeatures && featuredState.keyFeatures.length > 0 && (
                      <div className="space-y-2">
                        {featuredState.keyFeatures.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA Button */}
                  <Link 
                    to={`/state-guides/${featuredState.id}`}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all hover:shadow-lg"
                  >
                    View Complete Guide
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="mb-12">
            <div className="relative max-w-2xl mx-auto mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 mb-6 bg-gray-100 rounded-lg p-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === 'all'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedType('Tax Deed State')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === 'Tax Deed State'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tax Deed
              </button>
              <button
                onClick={() => setSelectedType('Tax Lien State')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === 'Tax Lien State'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tax Lien
              </button>
              <button
                onClick={() => setSelectedType('Redeemable Deed')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === 'Redeemable Deed'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Redeemable Deed
              </button>
              <button
                onClick={() => setSelectedType('Hybrid')}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedType === 'Hybrid'
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hybrid
              </button>
            </div>

            <div className="mt-8">
              <div className="text-center mb-6">
                <p className="text-gray-600 mb-6">
                  Showing {filteredStates.length} {filteredStates.length === 1 ? 'state' : 'states'}
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStates.length > 0 ? (
                  filteredStates.map((guide) => (
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
              <Star className="w-12 h-12 text-primary mx-auto mb-4" />
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
