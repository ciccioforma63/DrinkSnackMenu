import { type MenuItem } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Leaf, Heart, Users, Sprout } from "lucide-react";

interface MenuItemCardProps {
  item: MenuItem;
  showImage?: boolean;
  layout?: "card" | "list";
}

export default function MenuItemCard({ item, showImage = true, layout = "card" }: MenuItemCardProps) {
  const formatPrice = (price: number) => `€${(price / 100).toFixed(0)}`;

  const getStrengthIcon = (strength: string | null) => {
    if (!strength) return null;
    switch (strength.toLowerCase()) {
      case "forte":
      case "intenso":
        return <Flame className="h-4 w-4" />;
      case "fresco":
        return <Leaf className="h-4 w-4" />;
      case "dolce":
        return <Heart className="h-4 w-4" />;
      default:
        return <Flame className="h-4 w-4" />;
    }
  };

  const getDietaryIcon = (dietary: string[]) => {
    if (dietary.includes("vegano")) return <Sprout className="h-4 w-4" />;
    if (dietary.includes("vegetariano")) return <Leaf className="h-4 w-4" />;
    return null;
  };

  if (layout === "list") {
    return (
      <Card className="bg-card border border-border hover:shadow-lg transition-shadow" data-testid={`menu-item-${item.id}`}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground" data-testid={`item-name-${item.id}`}>
                {item.name}
              </h4>
              <p className="text-sm text-muted-foreground" data-testid={`item-description-${item.id}`}>
                {item.description}
              </p>
              {item.dietary && item.dietary.length > 0 && (
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  {getDietaryIcon(item.dietary)}
                  <span className="ml-1">{item.dietary.join(", ")}</span>
                </div>
              )}
            </div>
            <div className="text-right ml-4">
              <p className="text-primary font-semibold" data-testid={`item-price-${item.id}`}>
                {formatPrice(item.price)}
              </p>
              {item.bottlePrice && (
                <p className="text-xs text-muted-foreground">
                  Bottiglia: {formatPrice(item.bottlePrice)}
                </p>
              )}
              {item.servings && (
                <p className="text-xs text-muted-foreground">{item.servings}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-card rounded-lg overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow duration-300" data-testid={`menu-item-${item.id}`}>
      {showImage && (
        <img 
          src={item.imageUrl} 
          alt={item.name}
          className="w-full h-48 object-cover"
          data-testid={`item-image-${item.id}`}
        />
      )}
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-serif font-semibold text-foreground" data-testid={`item-name-${item.id}`}>
            {item.name}
          </h3>
          <span className="text-lg font-semibold text-primary" data-testid={`item-price-${item.id}`}>
            {formatPrice(item.price)}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-4" data-testid={`item-description-${item.id}`}>
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {item.prepTime && (
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{item.prepTime}</span>
              </div>
            )}
            
            {item.strength && (
              <div className="flex items-center">
                {getStrengthIcon(item.strength)}
                <span className="ml-1">{item.strength}</span>
              </div>
            )}
            
            {item.servings && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{item.servings}</span>
              </div>
            )}
          </div>
          
          {item.dietary && item.dietary.length > 0 && (
            <div className="flex gap-1">
              {item.dietary.map((diet) => (
                <Badge 
                  key={diet} 
                  variant="secondary" 
                  className="text-xs"
                  data-testid={`item-dietary-${item.id}-${diet}`}
                >
                  {diet}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {item.bottlePrice && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Bottiglia: <span className="text-primary font-semibold">{formatPrice(item.bottlePrice)}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
