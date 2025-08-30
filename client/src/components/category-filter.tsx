import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "Tutto" },
  { id: "drinks", label: "Drinks" },
  { id: "cocktails", label: "Cocktails" },
  { id: "wines", label: "Vini" },
  { id: "beers", label: "Birre" },
  { id: "non-alcoholic", label: "Analcolici" },
  { id: "snacks", label: "Spuntini" },
];

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 py-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              variant={activeCategory === category.id ? "default" : "secondary"}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
              data-testid={`category-filter-${category.id}`}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
