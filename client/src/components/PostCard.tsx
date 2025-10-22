import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { resolveCoverImage } from "@/lib/images";

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  cover?: string;
  readTime?: string;
  category?: string;
  link?: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const getCategoryColor = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'state guide':
        return 'bg-secondary text-secondary-foreground';
      case 'case study':
        return 'bg-primary text-primary-foreground';
      case 'strategy':
        return 'bg-accent text-accent-foreground';
      case 'legal':
        return 'bg-green-800 text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <article className="bg-card rounded-xl shadow-sm border border-border overflow-hidden hover:shadow-md transition-shadow">
      {post.cover && (
        <div className="aspect-video bg-accent/20 relative">
          <img
            src={resolveCoverImage(post.cover)}
            alt={`Cover image for ${post.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ display: 'block' }}
          />
          {post.category && (
            <div className="absolute top-4 left-4">
              <Badge className={`${getCategoryColor(post.category)} px-3 py-1 rounded-full font-mono font-bold text-xs uppercase tracking-wide`}>
                {post.category}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-muted-foreground font-sans text-sm">{post.date}</span>
          {post.readTime && (
            <>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground font-sans text-sm">{post.readTime}</span>
            </>
          )}
        </div>
        
        <h4 className="font-serif text-xl font-bold text-foreground mb-3 leading-tight">
          {post.title}
        </h4>
        
        <p className="font-sans text-muted-foreground mb-4 leading-relaxed">
          {post.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md font-sans text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <Button
            asChild
            variant="link"
            className="text-primary hover:text-secondary font-mono font-semibold text-sm transition-colors p-0"
            data-testid={`button-read-more-${post.slug}`}
          >
            <Link href={`/archive/${post.slug}`}>Read More →</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
