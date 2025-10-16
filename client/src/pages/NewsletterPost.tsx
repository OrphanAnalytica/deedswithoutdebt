import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Calendar, Clock, User, Mail } from "lucide-react";
import { Link } from "wouter";
import { setSEOData } from "@/lib/seo";
import newslettersData from "@/data/newsletters.json";
import { loadMarkdown, getMarkdownPath } from "@/lib/loadMarkdown";

interface Newsletter {
  title: string;
  slug: string;
  publish_date: string;
  excerpt: string;
  tags: string[];
  file: string;
}

interface MarkdownContent {
  html: string;
  meta: {
    title: string;
    date: string;
    tags: string[];
    description: string;
  };
}

export default function NewsletterPost() {
  const [location, setLocation] = useLocation();
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
  const [markdownContent, setMarkdownContent] = useState<MarkdownContent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      // Extract slug from URL
      const slug = location.split('/').pop();
      
      if (slug) {
        const foundNewsletter = newslettersData.find(n => n.slug === slug);
        if (foundNewsletter) {
          setNewsletter(foundNewsletter);
          setSEOData({
            title: `${foundNewsletter.title} | Deeds Without Debt`,
            description: foundNewsletter.excerpt,
            canonical: `/archive/${slug}`
          });
          
          // Load markdown content
          try {
            const markdownPath = getMarkdownPath(slug);
            const content = await loadMarkdown(markdownPath);
            setMarkdownContent(content);
          } catch (error) {
            console.error("Error loading markdown content:", error);
          }
        }
      }
      
      setLoading(false);
    };
    
    loadArticle();
  }, [location]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading newsletter...</p>
        </div>
      </div>
    );
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">Newsletter Not Found</h1>
          <p className="text-gray-600 mb-8">The newsletter you're looking for doesn't exist.</p>
          <Link 
            href="/archive" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Archive
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Legal': 'bg-blue-100 text-blue-800',
      'Tax Deeds': 'bg-green-100 text-green-800',
      'Strategy': 'bg-purple-100 text-purple-800',
      'State Guide': 'bg-green-100 text-green-800',
      'Case Study': 'bg-orange-100 text-orange-800',
      'Property Rights': 'bg-indigo-100 text-indigo-800',
      'Investment Strategy': 'bg-purple-100 text-purple-800',
      'HOA': 'bg-yellow-100 text-yellow-800',
      'Probate': 'bg-pink-100 text-pink-800',
      'Tax Liens': 'bg-red-100 text-red-800',
      'Certificates': 'bg-gray-100 text-gray-800',
      'ROI': 'bg-emerald-100 text-emerald-800',
      'Alaska': 'bg-blue-100 text-blue-800',
      'Tax Sales': 'bg-green-100 text-green-800',
      'Auctions': 'bg-green-100 text-green-800',
      'New Mexico': 'bg-red-100 text-red-800',
      'Profit': 'bg-green-100 text-green-800',
      'Foreclosures': 'bg-orange-100 text-orange-800',
      'Real Estate': 'bg-blue-100 text-blue-800',
      'Off-Market': 'bg-purple-100 text-purple-800',
      'No-Bank Real Estate': 'bg-green-100 text-green-800',
      'Wealth Building': 'bg-emerald-100 text-emerald-800',
      'High Yield Returns': 'bg-green-100 text-green-800',
      'Real Estate Investing': 'bg-blue-100 text-blue-800',
      'Passive Income': 'bg-green-100 text-green-800',
      'Connecticut': 'bg-blue-100 text-blue-800'
    };
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header with Gradient */}
      <div className="bg-gradient-to-r from-green-800 to-green-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back Navigation */}
            <div className="mb-6">
              <Link 
                href="/archive" 
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Archive
              </Link>
            </div>

            {/* Article Title */}
            <h1 className="text-4xl font-semibold tracking-tight text-white mb-6 leading-tight">
              {newsletter.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formatDate(newsletter.publish_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{markdownContent ? getReadTime(markdownContent.html) : 5} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Written by Ralph Biah</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {newsletter.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getTagColor(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Excerpt Card */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-md border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="w-1 h-full bg-green-600 rounded-full mt-1"></div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Article Summary</h2>
                <p className="text-gray-700 leading-relaxed italic">{newsletter.excerpt}</p>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100">
            {markdownContent ? (
              <div 
                className="prose prose-lg max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-green-600 prose-a:no-underline hover:prose-a:underline"
                dangerouslySetInnerHTML={{ __html: markdownContent.html }}
              />
            ) : (
              <div className="text-center text-gray-500">Loading content...</div>
            )}
          </div>

          {/* Newsletter CTA */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mt-8 text-white text-center">
            <Mail className="w-8 h-8 mx-auto mb-4 text-white/90" />
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Get weekly insights on tax deed and lien investing delivered straight to your inbox.
            </p>
            <Link 
              href="/subscribe"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Subscribe to Newsletter
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </Link>
          </div>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
            <Link 
              href="/archive" 
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Archive
            </Link>
            
            <div className="text-sm text-gray-500">
              Published on {formatDate(newsletter.publish_date)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}