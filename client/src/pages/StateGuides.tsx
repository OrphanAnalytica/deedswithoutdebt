import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setSEOData } from "@/lib/seo";
import { Link } from "wouter";
import { MapPin, Calendar, DollarSign, FileText, Search } from "lucide-react";
import { StateGuide, loadStateGuides } from "@/lib/content";
import Fuse from 'fuse.js';

export default function StateGuides() {
  const [stateGuides, setStateGuides] = useState<StateGuide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    setSEOData({
      title: "State Guides | Deeds Without Debt",
      description: "Comprehensive guides to tax deed and tax lien laws by state. Learn auction schedules, redemption periods, and investment opportunities.",
      canonical: "/state-guides"
    });

    loadStateGuides().then((guides) => {
      setStateGuides(guides);
      setLoading(false);
    });
  }, []);

  // Initialize Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    if (!stateGuides.length) return null;
    return new Fuse(stateGuides, {
      keys: ['name', 'summary', 'type', 'status'],
      threshold: 0.4,
      includeScore: true
    });
  }, [stateGuides]);

  // Filter and search logic
  const filteredGuides = useMemo(() => {
    let guides = stateGuides;

    // Apply type filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'verify') {
        guides = guides.filter(guide => guide.status === 'research');
      } else {
        guides = guides.filter(guide => guide.type === activeFilter);
      }
    }

    // Apply search if query exists
    if (searchQuery.trim() && fuse) {
      const searchResults = fuse.search(searchQuery);
      const searchedGuides = searchResults.map(result => result.item);
      
      // Filter searched results by active filter
      if (activeFilter !== 'all') {
        if (activeFilter === 'verify') {
          return searchedGuides.filter(guide => guide.status === 'research');
        } else {
          return searchedGuides.filter(guide => guide.type === activeFilter);
        }
      }
      return searchedGuides;
    }

    return guides;
  }, [stateGuides, activeFilter, searchQuery, fuse]);

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

  // Get featured guide (Alaska) and other guides
  const featuredGuide = stateGuides.find(guide => guide.slug === 'alaska');
  const allGuides = stateGuides.filter(guide => guide.slug !== 'alaska');

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
                      <p className="font-mono font-bold text-2xl text-primary">{featuredGuide.type.toUpperCase()}</p>
                      <p className="font-sans text-sm text-muted-foreground">Investment Type</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-2xl text-primary">{featuredGuide.auctions_per_year}</p>
                      <p className="font-sans text-sm text-muted-foreground">Auction Frequency</p>
                    </div>
                    <div className="text-center">
                      <p className="font-mono font-bold text-2xl text-primary">{formatDifficulty(featuredGuide.difficulty)}</p>
                      <p className="font-sans text-sm text-muted-foreground">Difficulty Level</p>
                    </div>
                  </div>
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-mono font-bold hover:bg-secondary transition-colors"
                    data-testid={`button-read-${featuredGuide.slug}-guide`}
                  >
                    <Link href={`/state-guides/${featuredGuide.slug}`}>Read {featuredGuide.name} Guide</Link>
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

            <Tabs value={activeFilter} onValueChange={setActiveFilter} className="mb-8">
              <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
                <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                <TabsTrigger value="deed" data-testid="tab-deed">Deed</TabsTrigger>
                <TabsTrigger value="lien" data-testid="tab-lien">Lien</TabsTrigger>
                <TabsTrigger value="hybrid" data-testid="tab-hybrid">Hybrid</TabsTrigger>
                <TabsTrigger value="verify" data-testid="tab-verify">To Verify</TabsTrigger>
              </TabsList>

              <TabsContent value={activeFilter} className="mt-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground">
                    Showing {filteredGuides.length} {activeFilter === 'all' ? 'states' : 
                      activeFilter === 'verify' ? 'states to verify' : `${activeFilter} states`}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredGuides.map((guide) => (
                <Card key={guide.slug} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {guide.name}
                    </h3>
                    <Badge className={`px-3 py-1 rounded-full font-mono font-bold text-xs ${getStatusColor(guide.status)}`}>
                      {getStatusLabel(guide.status)}
                    </Badge>
                  </div>
                  
                  <p className="font-sans text-muted-foreground mb-4 leading-relaxed text-sm">
                    {guide.summary}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{guide.auctions_per_year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground">{guide.type.toUpperCase()} System</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-xs">
                      <FileText className="w-3 h-3 text-primary" />
                      <span className="text-muted-foreground capitalize">{guide.type} System</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground">{guide.format}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`font-sans text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
                      {formatDifficulty(guide.difficulty)}
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
                        {getStatusLabel(guide.status)}
                      </Button>
                    )}
                  </div>
                    </Card>
                  ))}
                  
                  {filteredGuides.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">
                        No states found matching your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
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
