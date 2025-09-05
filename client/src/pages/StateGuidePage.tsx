import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { setSEOData } from "@/lib/seo";
import { StateGuide, loadStateGuides, getStateGuideBySlug } from "@/lib/content";
import StateGuideRenderer from "@/components/StateGuideRenderer";

export default function StateGuidePage() {
  const { slug } = useParams<{ slug: string }>();
  const [guide, setGuide] = useState<StateGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadGuide = async () => {
      if (!slug) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      try {
        const guides = await loadStateGuides();
        const foundGuide = guides.find(g => g.slug === slug);
        
        if (foundGuide) {
          setGuide(foundGuide);
          
          // Set SEO data
          setSEOData({
            title: `${foundGuide.name} Tax Investment Guide | Deeds Without Debt`,
            description: `${foundGuide.headline} Learn about ${foundGuide.type} investing in ${foundGuide.name} with our comprehensive guide.`,
            canonical: `/state-guides/${slug}`
          });
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading state guide:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
              Loading Guide...
            </h1>
            <p className="text-muted-foreground">Please wait while we load the state guide.</p>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !guide) {
    return (
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-6">
              Guide Not Found
            </h1>
            <p className="text-muted-foreground mb-8">
              The state guide you're looking for doesn't exist or hasn't been published yet.
            </p>
            <a 
              href="/state-guides" 
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-mono font-semibold hover:bg-secondary transition-colors"
            >
              Back to State Guides
            </a>
          </div>
        </div>
      </div>
    );
  }

  return <StateGuideRenderer guide={guide} />;
}