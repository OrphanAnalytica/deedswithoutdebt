import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { ArrowLeft, Calendar, Clock, User, Mail } from "lucide-react";
import { Link } from "wouter";
import { setSEOData } from "@/lib/seo";
import newslettersData from "@/data/newsletters.json";
import { loadMarkdown, getMarkdownPath } from "@/lib/loadMarkdown";
import { Buffer } from 'buffer';
import RelatedArticles from "@/components/RelatedArticles";
import ArticleLayout from "@/layouts/ArticleLayout";
import { resolveCoverImage } from "@/lib/images";

if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

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
    featuredImage?: string;
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
    <ArticleLayout
      title={newsletter.title}
      subtitle={markdownContent?.meta.description || newsletter.excerpt}
      excerpt={newsletter.excerpt}
      image={markdownContent?.meta.featuredImage}
      imageAlt={`Cover image for ${newsletter.title}`}
      date={newsletter.publish_date}
      readTime={`${markdownContent ? getReadTime(markdownContent.html) : 5} min read`}
      author="Written by Ralph Biah"
      tags={newsletter.tags}
      backUrl="/archive"
      backLabel="Back to Archive"
    >
      {markdownContent ? (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: markdownContent.html }}
        />
      ) : (
        <div className="text-center text-editorial-text-muted">Loading content...</div>
      )}
      
      {/* Keep Reading Section */}
      <RelatedArticles currentSlug={newsletter.slug} maxArticles={3} />
    </ArticleLayout>
  );
}