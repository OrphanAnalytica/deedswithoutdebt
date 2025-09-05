import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StateBadge } from "@/components/ui/StateBadge";
import { Calendar, DollarSign, FileText } from "lucide-react";
import { Link } from "wouter";
import { StateGuide } from "@/lib/stateGuides";

interface StateCardProps {
  guide: StateGuide;
}

export function StateCard({ guide }: StateCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "text-green-600";
      case "intermediate":
        return "text-yellow-600";
      case "advanced":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDifficulty = (difficulty: string) => {
    if (difficulty === 'tbd') return 'TBD';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "coming_soon":
        return "Coming Soon";
      case "research":
        return "Research";
      default:
        return "Unknown";
    }
  };

  return (
    <Card className="p-6 hover:shadow-md transition-shadow" data-testid={`card-state-${guide.slug}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif text-xl font-bold text-foreground">
          {guide.name}
        </h3>
        <StateBadge status={guide.status} />
      </div>
      
      <p className="font-sans text-muted-foreground mb-4 leading-relaxed text-sm">
        {guide.summary}
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <Calendar className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">{guide.auctions_per_year}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground">{guide.type.toUpperCase()} System</span>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs">
          <FileText className="w-3 h-3 text-primary" />
          <span className="text-muted-foreground capitalize">{guide.type} System</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{guide.format}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`font-sans text-xs font-semibold ${getDifficultyColor(guide.difficulty)}`}>
          {formatDifficulty(guide.difficulty)}
        </span>
        {guide.status === "available" ? (
          <Button 
            asChild
            size="sm"
            className="bg-primary text-primary-foreground font-mono font-semibold hover:bg-secondary transition-colors"
            data-testid={`button-read-${guide.slug}-guide`}
          >
            <Link href={`/state-guides/${guide.slug}`}>Read Guide</Link>
          </Button>
        ) : (
          <Button 
            size="sm"
            variant="outline"
            disabled
            className="font-mono font-semibold"
          >
            {getStatusLabel(guide.status)}
          </Button>
        )}
      </div>
    </Card>
  );
}