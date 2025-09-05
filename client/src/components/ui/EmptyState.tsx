import { MapPin } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export function EmptyState({ 
  title = "No results found", 
  description = "Try adjusting your search or filter criteria.",
  children 
}: EmptyStateProps) {
  return (
    <div className="col-span-full text-center py-12">
      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground mb-6">
        {description}
      </p>
      {children}
    </div>
  );
}