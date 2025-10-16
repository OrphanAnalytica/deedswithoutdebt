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
        <TabsTrigger value="Tax Deed State" data-testid="tab-tax-deed">Tax Deed</TabsTrigger>
        <TabsTrigger value="Tax Lien State" data-testid="tab-tax-lien">Tax Lien</TabsTrigger>
        <TabsTrigger value="Redeemable Deed" data-testid="tab-redeemable-deed">Redeemable Deed</TabsTrigger>
        <TabsTrigger value="Hybrid" data-testid="tab-hybrid">Hybrid</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}