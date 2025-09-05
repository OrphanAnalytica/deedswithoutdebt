export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readTime?: string;
  category?: string;
  content?: string;
}

export interface StateGuide {
  slug: string;
  name: string;
  type: 'deed' | 'lien' | 'hybrid' | 'tbd';
  status: 'available' | 'coming_soon' | 'research';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'tbd';
  roi_range: string;
  auctions_per_year: string;
  format: string;
  headline: string;
  cover: string;
  last_updated: string;
}

// Static post data - in a real implementation this would come from markdown files
const posts: Post[] = [
  {
    slug: "3-ways-buy-real-estate-without-banks",
    title: "3 Ways to Buy Real Estate Without Banks (And Why They Work)",
    description: "Discover the proven strategies I've used to acquire over $2M in real estate without traditional financing. From tax deed auctions to probate deals, here's your complete roadmap.",
    date: "March 15, 2024",
    tags: ["Tax Deeds", "Strategy", "No-Bank Investing"],
    cover: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "5 min read",
    category: "Strategy"
  },
  {
    slug: "alaska-tax-sales-guide",
    title: "How Alaska Tax Sales Work: September 2025 Borough Auction Guide",
    description: "Alaska's unique borough structure creates exceptional opportunities. Here's everything you need to know about the upcoming September auction.",
    date: "March 8, 2024",
    tags: ["Alaska", "Tax Sales", "State Guide"],
    cover: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "3 min read",
    category: "State Guide"
  },
  {
    slug: "catron-county-case-study",
    title: "Catron County Win: $17K to $120K in 18 Months",
    description: "My personal case study of turning a tax deed purchase into a massive profit by subdividing 5 acres and selling the cabin separately.",
    date: "March 1, 2024",
    tags: ["Case Study", "Profit", "New Mexico"],
    cover: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "7 min read",
    category: "Case Study"
  },
  {
    slug: "hoa-foreclosures-hidden-opportunity",
    title: "HOA Foreclosures: The Hidden Opportunity in Every City",
    description: "While everyone focuses on tax sales, HOA foreclosures happen year-round with less competition and faster timelines.",
    date: "February 22, 2024",
    tags: ["HOA", "Strategy", "Foreclosures"],
    cover: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "5 min read",
    category: "Strategy"
  },
  {
    slug: "probate-investing-guide",
    title: "Probate Real Estate: Finding Off-Market Deals",
    description: "Learn how to ethically approach probate situations and help families while building your portfolio.",
    date: "February 15, 2024",
    tags: ["Probate", "Off-Market", "Strategy"],
    cover: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "6 min read",
    category: "Strategy"
  },
  {
    slug: "tax-lien-certificates-explained",
    title: "Tax Lien Certificates: Guaranteed Returns or Risky Gamble?",
    description: "Breaking down the reality of tax lien investing, including the states where it actually works.",
    date: "February 8, 2024",
    tags: ["Tax Liens", "Certificates", "ROI"],
    cover: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600",
    readTime: "8 min read",
    category: "Strategy"
  }
];

export function getAllPosts(): Post[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find(post => post.slug === slug);
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter(post => post.tags.includes(tag)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getUniqueTags(): string[] {
  const allTags = posts.flatMap(post => post.tags);
  return Array.from(new Set(allTags)).sort();
}

export function getFeaturedPosts(limit = 3): Post[] {
  return posts.slice(0, limit);
}

export function searchPosts(query: string): Post[] {
  const lowercaseQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.description.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// State Guides functionality
let stateGuideData: { states: StateGuide[] } | null = null;

export async function loadStateGuides(): Promise<StateGuide[]> {
  if (stateGuideData) {
    return stateGuideData.states;
  }

  try {
    const response = await fetch('/content/state-guides/index.yml');
    const yamlText = await response.text();
    
    // Basic YAML parsing for our simple structure
    const lines = yamlText.split('\n');
    const states: StateGuide[] = [];
    let currentState: Partial<StateGuide> = {};
    
    for (const line of lines) {
      if (line.trim().startsWith('- slug:')) {
        if (currentState.slug) {
          states.push(currentState as StateGuide);
        }
        currentState = { slug: line.split(':')[1].trim() };
      } else if (line.trim().includes(':') && currentState.slug) {
        const [key, ...valueParts] = line.trim().split(':');
        const value = valueParts.join(':').trim().replace(/^"/, '').replace(/"$/, '');
        
        switch (key.trim()) {
          case 'name':
            currentState.name = value;
            break;
          case 'type':
            currentState.type = value as StateGuide['type'];
            break;
          case 'status':
            currentState.status = value as StateGuide['status'];
            break;
          case 'difficulty':
            currentState.difficulty = value as StateGuide['difficulty'];
            break;
          case 'roi_range':
            currentState.roi_range = value;
            break;
          case 'auctions_per_year':
            currentState.auctions_per_year = value;
            break;
          case 'format':
            currentState.format = value;
            break;
          case 'headline':
            currentState.headline = value;
            break;
          case 'cover':
            currentState.cover = value;
            break;
          case 'last_updated':
            currentState.last_updated = value;
            break;
        }
      }
    }
    
    // Don't forget the last state
    if (currentState.slug) {
      states.push(currentState as StateGuide);
    }
    
    stateGuideData = { states };
    return states;
  } catch (error) {
    console.error('Error loading state guides:', error);
    return [];
  }
}

export function getStateGuideBySlug(slug: string): StateGuide | undefined {
  return stateGuideData?.states.find(state => state.slug === slug);
}

export function getAvailableStateGuides(): StateGuide[] {
  return stateGuideData?.states.filter(state => state.status === 'available') || [];
}

export function getStateGuidesByType(type: StateGuide['type']): StateGuide[] {
  return stateGuideData?.states.filter(state => state.type === type) || [];
}

export function getFeaturedStateGuide(): StateGuide | undefined {
  // Return Alaska as the featured guide
  return stateGuideData?.states.find(state => state.slug === 'alaska');
}
