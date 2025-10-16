import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  FileText,
  Shield,
  TrendingUp,
  Clock,
  Info,
  Phone,
  Globe,
  BookOpen
} from "lucide-react";
import { Link } from "wouter";
import { StateGuide } from "@/lib/stateGuides";

interface EnhancedStateGuideRendererProps {
  guide: StateGuide;
  enhancedData?: any; // Additional data from JSON file
}

export default function EnhancedStateGuideRenderer({ guide, enhancedData }: EnhancedStateGuideRendererProps) {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeStrategyTab, setActiveStrategyTab] = useState<'research' | 'bidding' | 'post'>('research');

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
      // YAML types
      case "deed":
        return "bg-blue-100 text-blue-800";
      case "lien":
        return "bg-green-100 text-green-800";
      case "hybrid":
        return "bg-purple-100 text-purple-800";
      case "redeemable_deed":
        return "bg-orange-100 text-orange-800";
      // JSON types (from enhancedData)
      case "Tax Deed State":
        return "bg-blue-100 text-blue-800";
      case "Tax Lien State":
        return "bg-green-100 text-green-800";
      case "Hybrid":
        return "bg-purple-100 text-purple-800";
      case "Redeemable Deed":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      // YAML types
      case "deed":
        return "Tax Deed";
      case "lien":
        return "Tax Lien";
      case "hybrid":
        return "Hybrid";
      case "redeemable_deed":
        return "Redeemable Deed";
      // JSON types (already formatted correctly)
      case "Tax Deed State":
      case "Tax Lien State":
      case "Hybrid":
      case "Redeemable Deed":
        return type;
      default:
        return type;
    }
  };

  // Simple markdown to HTML conversion
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^#{1}\s+(.+)$/gm, '<h1 id="$1" class="font-serif text-4xl font-bold text-foreground mb-6 mt-12 first:mt-0">$1</h1>')
      .replace(/^#{2}\s+(.+)$/gm, '<h2 class="font-serif text-3xl font-bold text-foreground mb-4 mt-10">$1</h2>')
      .replace(/^#{3}\s+(.+)$/gm, '<h3 class="font-serif text-2xl font-bold text-foreground mb-3 mt-8">$1</h3>')
      .replace(/^#{4}\s+(.+)$/gm, '<h4 class="font-serif text-xl font-semibold text-foreground mb-2 mt-6">$1</h4>')
      .replace(/^\*\*(.+):\*\*$/gm, '<h5 class="font-semibold text-foreground mb-2 mt-4">$1:</h5>')
      .replace(/^- (.+)$/gm, '<li class="ml-4 mb-2 text-muted-foreground leading-relaxed">• $1</li>')
      .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 mb-2 list-decimal text-muted-foreground leading-relaxed">$1</li>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`(.+?)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono">$1</code>')
      .replace(/^(?!<[h|l]|•)(.+)$/gm, '<p class="mb-4 leading-relaxed text-muted-foreground">$1</p>');
  };

  const processedContent = renderMarkdown(content);

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            asChild
            variant="ghost"
            className="font-mono font-semibold hover:bg-accent transition-colors"
            data-testid="button-back-to-state-guides"
          >
            <Link href="/state-guides">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to State Guides
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge className={`px-4 py-2 rounded-full font-mono font-bold text-sm ${getTypeColor(enhancedData?.type || guide.type)}`}>
              {getTypeLabel(enhancedData?.type || guide.type).toUpperCase()}
            </Badge>
            <Badge className={`px-4 py-2 rounded-full font-mono font-bold text-sm ${getStatusColor(enhancedData?.status || guide.status)}`}>
              {(enhancedData?.status || guide.status) === 'available' ? 'VERIFIED' : (enhancedData?.status || guide.status).toUpperCase()}
            </Badge>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            {guide.name} Tax Investment Guide
          </h1>
          <p className="text-xl opacity-90 max-w-3xl leading-relaxed">
            {enhancedData?.description || guide.summary}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. Quick Facts */}
            <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Info className="h-6 w-6 text-blue-600" />
                Quick Facts
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Investment Type</div>
                    <div className="text-muted-foreground">{enhancedData?.saleType || getTypeLabel(guide.type) + ' Sales'}</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-6 w-6 text-indigo-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Auction Frequency</div>
                    <div className="text-muted-foreground">{guide.auctions_per_year}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Format</div>
                    <div className="text-muted-foreground">{guide.format}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Difficulty Level</div>
                    <div className={`font-semibold ${
                      guide.difficulty === 'beginner' ? 'text-green-600' :
                      guide.difficulty === 'intermediate' ? 'text-yellow-600' :
                      guide.difficulty === 'advanced' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Key Features - NEW GRID DESIGN */}
            {enhancedData?.keyFeatures && enhancedData.keyFeatures.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Info className="h-6 w-6 text-blue-600" />
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedData.keyFeatures.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {idx + 1}
                      </div>
                      <span className="text-gray-700 text-sm pt-0.5">{feature}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 3. Pros and Cons - NEW ENHANCED DESIGN */}
            {(enhancedData?.pros || enhancedData?.cons) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pros */}
                {enhancedData.pros && enhancedData.pros.length > 0 && (
                  <section className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg shadow-sm border border-green-200 overflow-hidden">
                    <div className="bg-green-600 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <CheckCircle className="h-6 w-6" />
                        Advantages
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {enhancedData.pros.map((pro: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">+</span>
                            </div>
                            <span className="text-gray-700 text-sm pt-0.5">{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}

                {/* Cons */}
                {enhancedData.cons && enhancedData.cons.length > 0 && (
                  <section className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg shadow-sm border border-orange-200 overflow-hidden">
                    <div className="bg-orange-600 p-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <XCircle className="h-6 w-6" />
                        Challenges
                      </h3>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        {enhancedData.cons.map((con: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <div className="flex-shrink-0 w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs font-bold">−</span>
                            </div>
                            <span className="text-gray-700 text-sm pt-0.5">{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* 4. Sale Details - if available */}
            {enhancedData?.saleDetails && (
              <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-green-600" />
                  Sale Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedData.saleDetails.propertyTaxDueDates && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-foreground mb-1">Property Tax Due Dates</div>
                      <div className="text-sm text-muted-foreground">{enhancedData.saleDetails.propertyTaxDueDates}</div>
                    </div>
                  )}
                  {enhancedData.saleDetails.minimumBid && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-foreground mb-1">Minimum Bid</div>
                      <div className="text-sm text-muted-foreground">{enhancedData.saleDetails.minimumBid}</div>
                    </div>
                  )}
                  {enhancedData.saleDetails.registrationRequirement && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-foreground mb-1">Registration</div>
                      <div className="text-sm text-muted-foreground">{enhancedData.saleDetails.registrationRequirement}</div>
                    </div>
                  )}
                  {enhancedData.saleDetails.paymentMethods && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-sm font-semibold text-foreground mb-1">Payment Methods</div>
                      <div className="text-sm text-muted-foreground">{enhancedData.saleDetails.paymentMethods}</div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 5. Investment Strategy Guide - NEW TABBED DESIGN */}
            {enhancedData?.investmentStrategy && (
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-green-700 to-green-900 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Investment Strategy Guide
                  </h2>
                  <p className="text-white/90 text-sm mt-2">
                    Follow this proven framework to maximize your success
                  </p>
                </div>

                <div className="p-6">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-6 border-b border-gray-200">
                    <button
                      onClick={() => setActiveStrategyTab('research')}
                      className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                        activeStrategyTab === 'research'
                          ? 'border-green-700 text-green-700'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Research Phase
                    </button>
                    <button
                      onClick={() => setActiveStrategyTab('bidding')}
                      className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                        activeStrategyTab === 'bidding'
                          ? 'border-green-700 text-green-700'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Bidding Phase
                    </button>
                    <button
                      onClick={() => setActiveStrategyTab('post')}
                      className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                        activeStrategyTab === 'post'
                          ? 'border-green-700 text-green-700'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      Post-Purchase
                    </button>
                  </div>

                  {/* Tab Content - Research Phase */}
                  {activeStrategyTab === 'research' && enhancedData.investmentStrategy.researchPhase && (
                    <div className="space-y-3">
                      <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
                        <p className="text-sm text-green-900 font-medium">
                          <strong>Goal:</strong> Identify profitable opportunities and avoid costly mistakes through thorough research
                        </p>
                      </div>
                      {enhancedData.investmentStrategy.researchPhase.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700 pt-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content - Bidding Phase */}
                  {activeStrategyTab === 'bidding' && enhancedData.investmentStrategy.biddingPhase && (
                    <div className="space-y-3">
                      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
                        <p className="text-sm text-blue-900 font-medium">
                          <strong>Goal:</strong> Bid strategically to win profitable properties without overpaying
                        </p>
                      </div>
                      {enhancedData.investmentStrategy.biddingPhase.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <DollarSign className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 pt-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content - Post-Purchase */}
                  {activeStrategyTab === 'post' && enhancedData.investmentStrategy.postPurchase && (
                    <div className="space-y-3">
                      <div className="bg-purple-50 border-l-4 border-purple-600 p-4 mb-6">
                        <p className="text-sm text-purple-900 font-medium">
                          <strong>Goal:</strong> Secure your investment and prepare for profitable exit or hold
                        </p>
                      </div>
                      {enhancedData.investmentStrategy.postPurchase.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <CheckCircle className="h-6 w-6 text-purple-600 flex-shrink-0 mt-1" />
                          <span className="text-gray-700 pt-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6. Due Diligence Required - NEW ENHANCED DESIGN */}
            {enhancedData?.dueDiligenceRequired && enhancedData.dueDiligenceRequired.length > 0 && (
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FileText className="h-6 w-6" />
                    Due Diligence Checklist
                  </h2>
                  <p className="text-white/90 text-sm mt-2">
                    Essential research steps before bidding on any property
                  </p>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {enhancedData.dueDiligenceRequired.map((item: string, idx: number) => (
                      <label key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors group">
                        <input 
                          type="checkbox" 
                          className="mt-1 h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <span className="text-gray-700 text-sm group-hover:text-gray-900">{item}</span>
                      </label>
                    ))}
                  </div>

                  <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-900">
                      <strong>💡 Pro Tip:</strong> Print this checklist and use it for every property you evaluate. 
                      Skipping steps can lead to expensive mistakes.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* 7. Important Risks - NEW CARD DESIGN */}
            {enhancedData?.risks && enhancedData.risks.length > 0 && (
              <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg shadow-sm border border-red-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-red-600 rounded-full">
                    <AlertTriangle className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Important Risks to Consider</h2>
                    <p className="text-gray-700 text-sm">These risks require careful attention and mitigation</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enhancedData.risks.map((risk: string, idx: number) => (
                    <div key={idx} className="bg-white rounded-lg p-4 border-l-4 border-red-600 hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{risk}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-white rounded-lg p-4 border border-red-200">
                  <p className="text-sm text-gray-700">
                    <strong className="text-red-700">⚠️ Risk Mitigation:</strong> Work with experienced real estate attorneys, 
                    title companies, and conduct thorough due diligence to minimize these risks.
                  </p>
                </div>
              </section>
            )}

            {/* 8. Best For / Not Recommended For - NEW COMPARISON DESIGN */}
            {(enhancedData?.bestFor || enhancedData?.notRecommendedFor) && (
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gray-100 p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">Is {guide.name} Right for You?</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Evaluate whether this state aligns with your investment goals and experience level
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-gray-200">
                  {/* Best For Column */}
                  {enhancedData.bestFor && enhancedData.bestFor.length > 0 && (
                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-green-600 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">✅ Best For</h3>
                      </div>
                      <ul className="space-y-3">
                        {enhancedData.bestFor.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Not Recommended For Column */}
                  {enhancedData.notRecommendedFor && enhancedData.notRecommendedFor.length > 0 && (
                    <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-orange-600 rounded-lg">
                          <XCircle className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">❌ Not Recommended For</h3>
                      </div>
                      <ul className="space-y-3">
                        {enhancedData.notRecommendedFor.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm">
                            <XCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* MDX Content - Keep at end */}
            <section className="bg-white rounded-lg shadow-sm p-8 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="leading-relaxed font-sans"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Contact Information */}
            {enhancedData?.resources?.primaryContact && (
              <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 sticky top-4">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Phone className="h-5 w-5 text-green-600" />
                  Contact Information
                </h3>
                <div className="space-y-4">
                  {enhancedData.resources.primaryContact.name && (
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-1">
                        {enhancedData.resources.primaryContact.name}
                      </div>
                    </div>
                  )}
                  
                  {enhancedData.resources.primaryContact.phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                      <a 
                        href={`tel:${enhancedData.resources.primaryContact.phone}`}
                        className="text-sm text-primary hover:underline"
                      >
                        {enhancedData.resources.primaryContact.phone}
                      </a>
                    </div>
                  )}

                  {enhancedData.resources.primaryContact.website && (
                    <div className="flex items-start gap-2">
                      <Globe className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                      <a 
                        href={`https://${enhancedData.resources.primaryContact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline break-all"
                      >
                        {enhancedData.resources.primaryContact.website}
                      </a>
                    </div>
                  )}

                  {enhancedData.resources.primaryContact.address && (
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {enhancedData.resources.primaryContact.address}
                      </span>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Quick Reference */}
            <section className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Reference</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span className="font-semibold text-foreground">{guide.last_updated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Difficulty:</span>
                  <span className={`font-semibold ${
                    guide.difficulty === 'beginner' ? 'text-green-600' :
                    guide.difficulty === 'intermediate' ? 'text-yellow-600' :
                    guide.difficulty === 'advanced' ? 'text-red-600' :
                    'text-gray-600'
                  }`}>
                    {guide.difficulty.charAt(0).toUpperCase() + guide.difficulty.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-semibold text-foreground">
                    {guide.status === 'available' ? 'Complete' : guide.status === 'research' ? 'In Research' : 'Coming Soon'}
                  </span>
                </div>
              </div>
            </section>

            {/* CTA Box */}
            <section className="bg-gradient-to-br from-primary to-primary/80 rounded-lg shadow-lg p-6 text-primary-foreground">
              <h3 className="text-xl font-bold mb-3">Ready to Invest in {guide.name}?</h3>
              <p className="opacity-90 text-sm mb-4">
                Get access to live auction lists, detailed county data, and exclusive investment tools for {guide.name}.
              </p>
              <Button 
                asChild
                className="w-full bg-white text-primary font-mono font-semibold hover:bg-gray-100 transition-colors"
              >
                <Link href="/subscribe">
                  Subscribe for Updates
                </Link>
              </Button>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

