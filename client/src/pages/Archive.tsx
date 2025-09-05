import { useState, useEffect } from "react";
import SearchBar from "@/components/SearchBar";
import PostCard from "@/components/PostCard";
import Tag from "@/components/Tag";
import { getAllPosts, getUniqueTags } from "@/lib/content";
import { setSEOData } from "@/lib/seo";
import type { Post } from "@/components/PostCard";

export default function Archive() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);

  useEffect(() => {
    setSEOData({
      title: "Newsletter Archive | Deeds Without Debt",
      description: "Browse all issues of the Deeds Without Debt newsletter. Find insights on tax deeds, tax liens, HOA foreclosures, and probate deals.",
      canonical: "/archive"
    });

    const allPosts = getAllPosts();
    const tags = getUniqueTags();
    
    setPosts(allPosts);
    setFilteredPosts(allPosts);
    setAvailableTags(tags);
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(post =>
        selectedTags.every(tag => post.tags.includes(tag))
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchQuery, selectedTags]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Newsletter Archive
            </h1>
            <p className="font-sans text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore all issues of the Deeds Without Debt newsletter. Find strategies, case studies, and insights on alternative real estate investing.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-xl shadow-sm border border-border p-6 mb-8">
            <div className="space-y-6">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search articles, tags, or topics..."
                className="max-w-2xl mx-auto"
              />

              {/* Tag Filters */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono font-semibold text-foreground">Filter by Topic</h3>
                  {(selectedTags.length > 0 || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-secondary font-sans transition-colors"
                      data-testid="button-clear-filters"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Tag
                      key={tag}
                      tag={tag}
                      variant="filter"
                      isActive={selectedTags.includes(tag)}
                      onClick={handleTagToggle}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="font-sans text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              {(searchQuery || selectedTags.length > 0) && ' found'}
            </p>
            {selectedTags.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-sans">Active filters:</span>
                <div className="flex gap-1">
                  {selectedTags.map(tag => (
                    <Tag
                      key={tag}
                      tag={tag}
                      onClick={() => handleTagToggle(tag)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">No articles found</h3>
              <p className="font-sans text-muted-foreground mb-4">
                Try adjusting your search terms or clearing some filters.
              </p>
              <button
                onClick={clearFilters}
                className="text-primary hover:text-secondary font-mono font-semibold transition-colors"
                data-testid="button-clear-filters-empty"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
