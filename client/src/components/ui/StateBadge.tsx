import { Badge } from "@/components/ui/badge";

interface StateBadgeProps {
  status: 'available' | 'coming_soon' | 'research';
}

export function StateBadge({ status }: StateBadgeProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-primary text-primary-foreground";
      case "coming_soon":
        return "bg-muted text-muted-foreground";
      case "research":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
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
    <Badge className={`px-3 py-1 rounded-full font-mono font-bold text-xs ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </Badge>
  );
}