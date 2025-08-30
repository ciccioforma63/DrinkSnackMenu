import { type MenuItem } from "@shared/schema";
import MenuItemCard from "./menu-item-card";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuSectionsProps {
  menuItems: MenuItem[];
  isLoading: boolean;
  activeCategory: string;
}

export default function MenuSections({ menuItems, isLoading, activeCategory }: MenuSectionsProps) {
  if (isLoading) {
    return (
      <div className="space-y-20">
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const getSectionTitle = (category: string) => {
    switch (category) {
      case "drinks":
        return "Tutte le Bevande";
      case "cocktails":
        return "Cocktails Signature";
      case "wines":
        return "Selezione Vini";
      case "beers":
        return "Birre Artigianali";
      case "non-alcoholic":
        return "Analcolici & Mocktails";
      case "snacks":
        return "Spuntini Gourmet";
      default:
        return category;
    }
  };

  const getSectionDescription = (category: string) => {
    switch (category) {
      case "drinks":
        return "La nostra completa selezione di bevande: cocktails, vini, birre e analcolici";
      case "cocktails":
        return "I nostri cocktails artigianali preparati con ingredienti premium e tecniche innovative";
      case "wines":
        return "Una curata selezione di vini italiani e internazionali";
      case "beers":
        return "Selezione di birre artigianali italiane e internazionali";
      case "non-alcoholic":
        return "Bevande fresche e mocktails creativi per ogni momento";
      case "snacks":
        return "Piccoli piatti preparati con ingredienti freschi e di qualità";
      default:
        return "";
    }
  };

  if (activeCategory !== "all") {
    const categoryItems = groupedItems[activeCategory] || [];
    
    if (categoryItems.length === 0) {
      return (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg" data-testid="no-items-message">
            Nessun elemento trovato per questa categoria.
          </p>
        </div>
      );
    }

    return (
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground" data-testid={`section-title-${activeCategory}`}>
            {getSectionTitle(activeCategory)}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid={`section-description-${activeCategory}`}>
            {getSectionDescription(activeCategory)}
          </p>
        </div>

        {activeCategory === "drinks" ? (
          <DrinksSection items={categoryItems} />
        ) : activeCategory === "wines" ? (
          <WinesSection items={categoryItems} />
        ) : activeCategory === "beers" ? (
          <BeersSection items={categoryItems} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="space-y-20">
      {Object.entries(groupedItems).map(([category, items]) => (
        <section key={category} id={category} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-foreground" data-testid={`section-title-${category}`}>
              {getSectionTitle(category)}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid={`section-description-${category}`}>
              {getSectionDescription(category)}
            </p>
          </div>

          {category === "wines" ? (
            <WinesSection items={items} />
          ) : category === "beers" ? (
            <BeersSection items={items} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function WinesSection({ items }: { items: MenuItem[] }) {
  const redWines = items.filter(item => item.subcategory === "red");
  const whiteWines = items.filter(item => item.subcategory === "white");
  const sparklingWines = items.filter(item => item.subcategory === "sparkling");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h3 className="text-2xl font-serif font-semibold mb-6 text-primary" data-testid="red-wines-title">
          Vini Rossi
        </h3>
        <div className="space-y-4">
          {redWines.map((item) => (
            <MenuItemCard key={item.id} item={item} showImage={false} layout="list" />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-serif font-semibold mb-6 text-primary" data-testid="white-wines-title">
          Vini Bianchi
        </h3>
        <div className="space-y-4">
          {[...whiteWines, ...sparklingWines].map((item) => (
            <MenuItemCard key={item.id} item={item} showImage={false} layout="list" />
          ))}
        </div>
      </div>
    </div>
  );
}

function DrinksSection({ items }: { items: MenuItem[] }) {
  const cocktails = items.filter(item => item.category === "cocktails");
  const wines = items.filter(item => item.category === "wines");
  const beers = items.filter(item => item.category === "beers");
  const nonAlcoholic = items.filter(item => item.category === "non-alcoholic");

  return (
    <div className="space-y-16">
      {cocktails.length > 0 && (
        <div>
          <h3 className="text-3xl font-serif font-semibold mb-8 text-primary text-center" data-testid="cocktails-subsection-title">
            Cocktails Signature
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cocktails.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {wines.length > 0 && (
        <div>
          <h3 className="text-3xl font-serif font-semibold mb-8 text-primary text-center" data-testid="wines-subsection-title">
            Selezione Vini
          </h3>
          <WinesSection items={wines} />
        </div>
      )}

      {beers.length > 0 && (
        <div>
          <h3 className="text-3xl font-serif font-semibold mb-8 text-primary text-center" data-testid="beers-subsection-title">
            Birre Artigianali
          </h3>
          <BeersSection items={beers} />
        </div>
      )}

      {nonAlcoholic.length > 0 && (
        <div>
          <h3 className="text-3xl font-serif font-semibold mb-8 text-primary text-center" data-testid="non-alcoholic-subsection-title">
            Analcolici & Mocktails
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nonAlcoholic.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function BeersSection({ items }: { items: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <MenuItemCard key={item.id} item={item} showImage={false} layout="list" />
      ))}
    </div>
  );
}
