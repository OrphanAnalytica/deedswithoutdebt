import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Search, ArrowRight, Calendar, Clock } from 'lucide-react';
import newslettersData from '@/data/newsletters.json';
import { setSEOData, setBreadcrumbSchema } from '@/lib/seo';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    setSEOData({
      title: "Deeds Without Debt Newsletter Archive | Tax Sale Insights",
      description: "Browse past articles and real stories on Tax Deed and Tax Lien investing from the Deeds Without Debt newsletter.",
      canonical: "/archive"
    });

    setBreadcrumbSchema([
      { name: "Home", url: "https://deedswithoutdebt.com" },
      { name: "Archive", url: "https://deedswithoutdebt.com/archive" }
    ]);
  }, []);

  // Use newsletters data from JSON file
  const articles = newslettersData.map((newsletter, index) => ({
    id: (index + 1).toString(),
    title: newsletter.title,
    slug: newsletter.slug,
    date: newsletter.publish_date,
    readTime: 5, // Default read time, could be calculated from content
    excerpt: newsletter.excerpt,
    category: newsletter.tags[0]?.toLowerCase().replace(/\s+/g, '-') || 'general',
    tags: newsletter.tags,
    image: newsletter.image
  }));

  // Generate categories dynamically from newsletter tags
  const allCategories = Array.from(new Set(articles.flatMap(article => article.tags)));
  const categories = [
    { value: 'all', label: 'All Newsletters' },
    ...allCategories.map(tag => ({
      value: tag.toLowerCase().replace(/\s+/g, '-'),
      label: tag
    }))
  ];

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      article.tags.some(tag => tag.toLowerCase().replace(/\s+/g, '-') === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Newsletter Archive
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore all issues of the Deeds Without Debt newsletter. Find strategies, case studies, and insights on alternative real estate investing.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search newsletters, topics, states..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredArticles.length}</span> newsletters
          </p>
        </div>

        {/* Article Grid - WITH FEATURED IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article 
              key={article.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Featured Image */}
              <Link href={`/archive/${article.slug}`}>
                <div className="relative h-60 overflow-hidden">
                  {article.image ? (
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center">
                      <span className="text-white text-4xl font-bold opacity-50">
                        {article.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors line-clamp-2">
                  <Link href={`/archive/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Date & Read Time */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                  <time className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </time>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {article.readTime} min
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {article.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                      +{article.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/archive/${article.slug}`}
                  className="inline-flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  Read Newsletter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Archive;