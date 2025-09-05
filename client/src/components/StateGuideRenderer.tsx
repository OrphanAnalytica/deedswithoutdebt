import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, FileText, MapPin, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { StateGuide } from "@/lib/content";

interface StateGuideRendererProps {
  guide: StateGuide;
}

export default function StateGuideRenderer({ guide }: StateGuideRendererProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`/content/state-guides/${guide.slug}.mdx`);
        if (response.ok) {
          const mdxContent = await response.text();
          // Simple MDX to HTML conversion - remove frontmatter and basic markdown parsing
          const contentWithoutFrontmatter = mdxContent.replace(/^---[\s\S]*?---\n/, '');
          setContent(contentWithoutFrontmatter);
        } else {
          setContent("Content not available yet. This guide is still being researched and will be available soon.");
        }
      } catch (error) {
        console.error("Error loading guide content:", error);
        setContent("Error loading content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [guide.slug]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-200";
      case "coming_soon":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "research":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "deed":
        return "bg-primary/10 text-primary";
      case "lien":
        return "bg-blue-100 text-blue-800";
      case "hybrid":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  // Simple markdown to HTML conversion
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^# (.+)$/gm, '<h1 class="font-serif text-4xl font-bold text-foreground mb-6 mt-8">$1</h1>')
      .replace(/^## (.+)$/gm, '<h2 class="font-serif text-3xl font-bold text-foreground mb-4 mt-8">$2</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="font-serif text-2xl font-bold text-foreground mb-3 mt-6">$3</h3>')
      .replace(/^\*(.+)\*$/gm, '<p class="text-sm text-muted-foreground italic mb-4">$1</p>')
      .replace(/^\*\*(.+):\*\*$/gm, '<h4 class="font-semibold text-foreground mb-2 mt-4">$1:</h4>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(/^(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Button 
              asChild
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-back-to-state-guides"
            >
              <Link href="/state-guides">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to State Guides
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge className={`px-3 py-1 rounded-full border ${getStatusColor(guide.status)}`}>
                {guide.status === "available" ? "Available" : guide.status === "coming_soon" ? "Coming Soon" : "Research"}
              </Badge>
              <Badge className={`px-3 py-1 rounded-full border ${getTypeColor(guide.type)}`}>
                {guide.type === 'tbd' ? 'TBD' : guide.type.toUpperCase()} System
              </Badge>
              <span className="text-sm text-muted-foreground">Updated {guide.last_updated}</span>
            </div>
            
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {guide.name} Tax Investment Guide
            </h1>
            
            <p className="font-sans text-xl text-muted-foreground mb-8 leading-relaxed">
              {guide.headline}
            </p>
            
            {/* Stats grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="p-4 text-center">
                <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-mono font-bold text-lg text-foreground">{guide.roi_range}</p>
                <p className="text-sm text-muted-foreground">ROI Range</p>
              </Card>
              <Card className="p-4 text-center">
                <Calendar className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-mono font-bold text-lg text-foreground">{guide.auctions_per_year}</p>
                <p className="text-sm text-muted-foreground">Auction Frequency</p>
              </Card>
              <Card className="p-4 text-center">
                <FileText className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="font-mono font-bold text-lg text-foreground">{guide.format}</p>
                <p className="text-sm text-muted-foreground">Auction Format</p>
              </Card>
              <Card className="p-4 text-center">
                <MapPin className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className={`font-mono font-bold text-lg ${getDifficultyColor(guide.difficulty)}`}>
                  {formatDifficulty(guide.difficulty)}
                </p>
                <p className="text-sm text-muted-foreground">Difficulty Level</p>
              </Card>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading guide content...</p>
              </div>
            ) : guide.status === "research" ? (
              <div className="bg-muted/50 rounded-lg p-8 text-center mb-8">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                  Research in Progress
                </h2>
                <p className="text-muted-foreground mb-6">
                  We are currently researching tax investment opportunities in {guide.name}. 
                  This comprehensive guide will be available soon with detailed information about local laws, 
                  auction schedules, and investment strategies.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    asChild
                    className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
                  >
                    <Link href="/subscribe">Get Notified When Available</Link>
                  </Button>
                  <Button 
                    asChild
                    variant="outline"
                    className="border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    <Link href="/state-guides">Explore Available Guides</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="font-sans text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
              />
            )}
          </div>

          {/* CTA section */}
          {guide.status === "available" && (
            <div className="mt-12 bg-card rounded-xl shadow-sm border border-border p-8 text-center">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                Ready to Start Investing in {guide.name}?
              </h2>
              <p className="font-sans text-muted-foreground mb-6 leading-relaxed">
                Get the latest updates on {guide.name} tax investment opportunities, 
                auction schedules, and market insights delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button 
                  asChild
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
                  data-testid="button-subscribe-state-updates"
                >
                  <Link href="/subscribe">Subscribe for Updates</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline"
                  className="border border-border text-foreground px-6 py-3 rounded-lg font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
                  data-testid="button-all-state-guides"
                >
                  <Link href="/state-guides">All State Guides</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}