import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <section 
      id="hero"
      className="relative h-screen hero-parallax flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1572116469696-31de0f17cc34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')`
      }}
    >
      <div className="text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-foreground" data-testid="hero-title">
          Menu della Casa
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-muted-foreground" data-testid="hero-subtitle">
          Cocktails artigianali e spuntini gourmet nel cuore della città
        </p>
        
        <div className="max-w-md mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder="Cerca drink o spuntini..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-6 py-4 bg-card/90 backdrop-blur border border-border rounded-full text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring pr-12"
              data-testid="search-input"
            />
            <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
