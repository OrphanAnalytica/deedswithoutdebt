import React, { useState } from 'react';
import { Link } from 'wouter';
import { Search, ArrowRight, Calendar, Clock } from 'lucide-react';

const Archive = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Sample articles data - replace with your actual data
  const articles = [
    {
      id: '1',
      title: 'Forget Liens — Here\'s Where You Can Actually Own the Property',
      slug: 'forget-liens-deed-states',
      date: '2024-12-15',
      readTime: 5,
      excerpt: 'Why understanding deed states is the foundation of smart tax sale investing',
      category: 'tax-deeds',
      tags: ['No-Bank Real Estate', 'Tax Deeds', 'Wealth Building']
    },
    {
      id: '2',
      title: '3 Ways to Buy Real Estate Without Banks (And Why They Work)',
      slug: '3-ways-buy-without-banks',
      date: '2024-12-08',
      readTime: 5,
      excerpt: 'Discover the proven strategies I\'ve used to acquire over $2M in real estate without traditional financing',
      category: 'strategy',
      tags: ['Tax Deeds', 'Strategy', 'No-Bank Investing']
    },
    {
      id: '3',
      title: 'Alaska Tax Sales: September 2025 Borough Auction Guide',
      slug: 'alaska-tax-sales-2025',
      date: '2024-12-01',
      readTime: 5,
      excerpt: 'Alaska\'s unique borough structure creates exceptional opportunities',
      category: 'state-guides',
      tags: ['Alaska', 'Tax Sales', 'State Guide']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Articles' },
    { value: 'tax-deeds', label: 'Tax Deeds' },
    { value: 'tax-liens', label: 'Tax Liens' },
    { value: 'state-guides', label: 'State Guides' },
    { value: 'strategy', label: 'Strategy & Tips' },
    { value: 'case-studies', label: 'Case Studies' }
  ];

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    
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
                  placeholder="Search articles, topics, states..."
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
            <span className="font-semibold text-gray-900">{filteredArticles.length}</span> articles
          </p>
        </div>

        {/* Article Grid - SIMPLE VERSION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <article 
              key={article.id} 
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Date & Read Time */}
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
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

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                  <Link href={`/archive/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4">
                  {article.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More Link */}
                <Link 
                  href={`/archive/${article.slug}`}
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm"
                >
                  Read Article
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