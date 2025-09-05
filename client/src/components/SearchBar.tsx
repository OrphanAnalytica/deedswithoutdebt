import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Search articles...", 
  className = "" 
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-20 font-sans"
          data-testid="input-search"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-1 h-auto"
            data-testid="button-search-clear"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 font-mono font-semibold"
          data-testid="button-search-submit"
        >
          Search
        </Button>
      </div>
    </form>
  );
}
