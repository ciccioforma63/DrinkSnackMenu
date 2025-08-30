import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import CategoryFilter from "@/components/category-filter";
import MenuSections from "@/components/menu-sections";
import Footer from "@/components/footer";
import { useMenuFilter } from "@/hooks/use-menu-filter";

export default function Home() {
  const {
    filteredItems,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isLoading,
    error
  } = useMenuFilter();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
            Errore nel caricamento del menu
          </h2>
          <p className="text-muted-foreground">
            Si prega di riprovare più tardi
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MenuSections 
          menuItems={filteredItems}
          isLoading={isLoading}
          activeCategory={activeCategory}
        />
        
        {/* Happy Hour Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 border border-border">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
                Happy Hour
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Tutti i giorni dalle 18:00 alle 20:00
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">-30%</div>
                  <p className="text-foreground">Su tutti i cocktails</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">2x1</div>
                  <p className="text-foreground">Birre artigianali</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-2">€15</div>
                  <p className="text-foreground">Tagliere + 2 drink</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
