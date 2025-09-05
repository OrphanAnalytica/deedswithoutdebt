import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StateBadge } from "@/components/ui/StateBadge";
import { Calendar, FileText, Target, Clock } from "lucide-react";
import { Link } from "wouter";
import { StateGuide } from "@/lib/stateGuides";

interface FactsPanelProps {
  guide: StateGuide;
}

export function FactsPanel({ guide }: FactsPanelProps) {
  const formatDifficulty = (difficulty: string) => {
    if (difficulty === 'tbd') return 'TBD';
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

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

  return (
    <div className="space-y-6">
      {/* Quick Facts */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif text-lg">Quick Facts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-4 h-4 text-primary" />
            <div>
              <p className="font-mono font-semibold text-sm">{guide.type.toUpperCase()} System</p>
              <p className="text-xs text-muted-foreground">Investment Type</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="font-mono font-semibold text-sm capitalize">{formatDifficulty(guide.difficulty)}</p>
              <p className="text-xs text-muted-foreground">Difficulty Level</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-primary" />
            <div>
              <p className="font-mono font-semibold text-sm">{guide.auctions_per_year}</p>
              <p className="text-xs text-muted-foreground">Auction Frequency</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-primary" />
            <div>
              <p className="font-mono font-semibold text-sm">{guide.format}</p>
              <p className="text-xs text-muted-foreground">Format</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status & Last Updated */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground mb-2">Status</p>
              <StateBadge status={guide.status} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-mono text-sm font-semibold">{guide.last_updated}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-6 text-center">
          <h3 className="font-serif text-lg font-bold mb-2">Get County Checklists</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Detailed county-by-county research checklists and property analysis worksheets.
          </p>
          <Button 
            asChild
            className="w-full bg-primary text-primary-foreground font-mono font-semibold hover:bg-secondary transition-colors"
            data-testid="button-subscribe-county-checklists"
          >
            <Link href="/subscribe">Get Checklists</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}