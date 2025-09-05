import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { StateGuide } from "@/lib/stateGuides";
import { FactsPanel } from "@/components/ui/FactsPanel";
import { TableOfContents } from "@/components/ui/TableOfContents";

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
          // Remove frontmatter
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

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "coming_soon":
        return "Coming Soon";
      case "research":
        return "Research";
      default:
        return "Unknown";
    }
  };

  // Parse content to add IDs to headings for TOC
  const processedContent = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `<${hashes.length === 1 ? 'h1' : hashes.length === 2 ? 'h2' : hashes.length === 3 ? 'h3' : 'h4'} id="${id}" class="font-serif font-bold text-foreground mb-4 mt-8 ${
      hashes.length === 1 ? 'text-4xl' : 
      hashes.length === 2 ? 'text-3xl' : 
      hashes.length === 3 ? 'text-2xl' : 'text-xl'
    }">${title}</${hashes.length === 1 ? 'h1' : hashes.length === 2 ? 'h2' : hashes.length === 3 ? 'h3' : 'h4'}>`;
  });

  // Simple markdown to HTML conversion
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^\*\*(.+):\*\*$/gm, '<h4 class="font-semibold text-foreground mb-2 mt-4">$1:</h4>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-1">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-1 list-decimal">$1</li>')
      .replace(/^(.+)$/gm, '<p class="mb-4 leading-relaxed">$1</p>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>');
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
                Loading {guide.name} Guide...
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation */}
          <div className="mb-8">
            <Button
              asChild
              variant="outline"
              className="font-mono font-semibold hover:bg-accent hover:text-accent-foreground transition-colors"
              data-testid="button-back-to-state-guides"
            >
              <Link href="/state-guides">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to State Guides
              </Link>
            </Button>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge className={`px-4 py-2 rounded-full font-mono font-bold text-sm ${getStatusColor(guide.status)}`}>
                {getStatusLabel(guide.status)}
              </Badge>
              <Badge className={`px-4 py-2 rounded-full font-mono font-bold text-sm ${getTypeColor(guide.type)}`}>
                {guide.type.toUpperCase()} SYSTEM
              </Badge>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {guide.name} Tax Investment Guide
            </h1>
            <p className="font-sans text-xl text-muted-foreground mb-8 leading-relaxed">
              {guide.summary}
            </p>
          </div>

          {/* Main Layout with Sidebar */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-xl shadow-sm border border-border p-8 lg:p-12">
                <div className="prose prose-lg max-w-none">
                  <div 
                    className="leading-relaxed text-foreground font-sans"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(processedContent) }}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <FactsPanel guide={guide} />
                <TableOfContents content={content} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}