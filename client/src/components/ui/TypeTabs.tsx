import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TypeTabsProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TypeTabs({ value, onValueChange }: TypeTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange}>
      <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
        <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
        <TabsTrigger value="deed" data-testid="tab-deed">Deed</TabsTrigger>
        <TabsTrigger value="lien" data-testid="tab-lien">Lien</TabsTrigger>
        <TabsTrigger value="hybrid" data-testid="tab-hybrid">Hybrid</TabsTrigger>
        <TabsTrigger value="verify" data-testid="tab-verify">To Verify</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}