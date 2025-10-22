import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { Link } from 'wouter';
import { resolveCoverImage } from '@/lib/images';

interface ArticleLayoutProps {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  imageAlt?: string;
  date?: string;
  readTime?: string;
  author?: string;
  tags?: string[];
  children: React.ReactNode;
  backUrl?: string;
  backLabel?: string;
}

export default function ArticleLayout({
  title,
  subtitle,
  excerpt,
  image,
  imageAlt,
  date,
  readTime,
  author,
  tags = [],
  children,
  backUrl = '/archive',
  backLabel = 'Back to Archive'
}: ArticleLayoutProps) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollPercent(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTagColor = (tag: string) => {
    const tagColors: { [key: string]: string } = {
      'Tax Deeds': 'bg-green-100 text-green-800',
      'Tax Liens': 'bg-red-100 text-red-800',
      'Due Diligence': 'bg-blue-100 text-blue-800',
      'Research': 'bg-purple-100 text-purple-800',
      'Strategy': 'bg-purple-100 text-purple-800',
      'Real Estate Investing': 'bg-blue-100 text-blue-800',
      'Educational': 'bg-green-100 text-green-800',
      'Case Study': 'bg-orange-100 text-orange-800',
      'Legal': 'bg-gray-100 text-gray-800'
    };
    return tagColors[tag] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-editorial-background">
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-editorial-accent z-50 transition-all duration-150"
        style={{ width: `${scrollPercent}%` }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl mb-8 mx-6 md:mx-0">
        {image && (
          <img 
            src={resolveCoverImage(image)} 
            alt={imageAlt || title}
            className="w-full h-[380px] object-cover brightness-75"
            width={1200}
            height={630}
            loading="eager"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          {/* Back Navigation */}
          <div className="mb-6 self-start">
            <Link 
              href={backUrl}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {backLabel}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold max-w-3xl leading-tight mb-4">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-6">
              {subtitle}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-6 text-white/90 mb-6">
            {date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">{formatDate(date)}</span>
              </div>
            )}
            {readTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{readTime}</span>
              </div>
            )}
            {author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">{author}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex gap-3 flex-wrap justify-center">
              {tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[720px] mx-auto px-6 md:px-0">
        {/* Excerpt Card */}
        {excerpt && (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-md border border-editorial-border">
            <div className="flex items-start gap-3">
              <div className="w-1 h-full bg-editorial-accent rounded-full mt-1"></div>
              <div>
                <h2 className="text-lg font-semibold text-editorial-text mb-2">Article Summary</h2>
                <p className="text-editorial-text-muted leading-relaxed italic">{excerpt}</p>
              </div>
            </div>
          </div>
        )}

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-md border border-editorial-border p-8 md:p-10">
          <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-headings:text-editorial-text prose-headings:leading-tight prose-p:text-editorial-text prose-p:leading-[1.8] prose-p:text-base prose-p:md:text-lg prose-strong:text-editorial-text prose-a:text-editorial-accent prose-a:no-underline hover:prose-a:underline prose-ul:text-editorial-text prose-li:text-editorial-text prose-li:leading-[1.8] prose-blockquote:border-l-4 prose-blockquote:border-editorial-accent prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-editorial-text-muted prose-blockquote:my-6">
            {children}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-12 flex justify-between items-center">
          <Link 
            href={backUrl}
            className="inline-flex items-center gap-2 text-editorial-accent hover:text-editorial-accent-light transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
          
          <button className="inline-flex items-center gap-2 text-editorial-accent hover:text-editorial-accent-light transition-colors font-medium">
            <Share2 className="w-4 h-4" />
            Share Article
          </button>
        </div>
      </div>
    </div>
  );
}
