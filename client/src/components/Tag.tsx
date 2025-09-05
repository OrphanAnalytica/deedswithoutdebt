import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagProps {
  tag: string;
  isActive?: boolean;
  onClick?: (tag: string) => void;
  variant?: "default" | "filter";
}

export default function Tag({ tag, isActive = false, onClick, variant = "default" }: TagProps) {
  if (variant === "filter") {
    return (
      <Button
        variant={isActive ? "default" : "outline"}
        size="sm"
        onClick={() => onClick?.(tag)}
        className={`font-sans text-xs transition-colors ${
          isActive 
            ? "bg-primary text-primary-foreground" 
            : "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
        data-testid={`button-tag-filter-${tag.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {tag}
      </Button>
    );
  }

  return (
    <Badge
      variant="secondary"
      className="bg-accent/20 text-accent-foreground px-2 py-1 rounded-md font-sans text-xs cursor-pointer hover:bg-accent/30 transition-colors"
      onClick={() => onClick?.(tag)}
      data-testid={`tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {tag}
    </Badge>
  );
}
