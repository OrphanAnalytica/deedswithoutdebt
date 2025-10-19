import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import newslettersData from "@/data/newsletters.json";

interface Newsletter {
  title: string;
  slug: string;
  publish_date: string;
  excerpt: string;
  image: string;
  tags: string[];
}

interface RelatedArticlesProps {
  currentSlug: string;
  maxArticles?: number;
}

export default function RelatedArticles({ currentSlug, maxArticles = 3 }: RelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<Newsletter[]>([]);

  useEffect(() => {
    const getRelatedArticles = () => {
      // Filter out current article
      const otherArticles = newslettersData.filter(article => article.slug !== currentSlug);
      
      if (otherArticles.length === 0) {
        setRelatedArticles([]);
        return;
      }
      
      // Get current article to find related tags
      const currentArticle = newslettersData.find(article => article.slug === currentSlug);
      
      if (currentArticle && currentArticle.tags && currentArticle.tags.length > 0) {
        // Score articles based on shared tags
        const scoredArticles = otherArticles.map(article => {
          const sharedTags = article.tags ? article.tags.filter(tag => 
            currentArticle.tags.includes(tag)
          ).length : 0;
          
          return {
            ...article,
            score: sharedTags
          };
        });
        
        // Sort by score (shared tags) first, then by date
        scoredArticles.sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score; // Higher score first
          }
          // If same score, sort by date (newest first)
          return new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime();
        });
        
        // Add some randomization to avoid always showing the same articles
        const topScored = scoredArticles.slice(0, Math.min(6, scoredArticles.length));
        const shuffled = topScored.sort(() => Math.random() - 0.5);
        
        setRelatedArticles(shuffled.slice(0, maxArticles));
      } else {
        // Fallback: just show most recent articles
        const sortedByDate = otherArticles
          .sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime())
          .slice(0, maxArticles);
        
        setRelatedArticles(sortedByDate);
      }
    };

    getRelatedArticles();
  }, [currentSlug, maxArticles]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (excerpt: string) => {
    // Estimate read time based on excerpt length and typical article length
    const wordsPerMinute = 200;
    const estimatedWords = excerpt.split(/\s+/).length * 8; // Assume excerpt is ~1/8 of full article
    return Math.max(1, Math.ceil(estimatedWords / wordsPerMinute));
  };

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="keep-reading-section mt-12 pt-8 border-t border-gray-200">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Keep Reading</h2>
        <p className="text-gray-600">Discover more insights on tax deed and lien investing</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map(article => (
          <article 
            key={article.slug} 
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Featured Image */}
            <Link href={`/archive/${article.slug}`}>
              <div className="relative h-48 overflow-hidden">
                {article.image ? (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                    <span className="text-white text-3xl font-bold opacity-50">
                      {article.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
            </Link>

            <div className="p-6">
              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                <Link href={`/archive/${article.slug}`} className="line-clamp-2 block">
                  {article.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {article.excerpt}
              </p>

              {/* Date & Read Time */}
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <time className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(article.publish_date)}
                </time>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {getReadTime(article.excerpt)} min
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {article.tags.slice(0, 2).map(tag => (
                  <span 
                    key={tag}
                    className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{article.tags.length - 2}
                  </span>
                )}
              </div>

              {/* Read More Link */}
              <Link 
                href={`/archive/${article.slug}`}
                className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
