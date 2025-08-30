import { MapPin, Phone, Instagram, Facebook, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4" data-testid="footer-logo">
              Locale
            </h3>
            <div className="text-muted-foreground space-y-2">
              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                <span data-testid="footer-address">Via del Centro 123, 00100 Roma, Italia</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <Phone className="h-4 w-4 mr-2" />
                <span data-testid="footer-phone">+39 06 1234567</span>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4 text-foreground" data-testid="opening-hours-title">
              Orari di Apertura
            </h4>
            <div className="text-muted-foreground space-y-1" data-testid="opening-hours">
              <p>Lun - Gio: 18:00 - 1:00</p>
              <p>Ven - Sab: 18:00 - 2:00</p>
              <p>Dom: 19:00 - 24:00</p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4 text-foreground" data-testid="social-title">
              Seguici
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-primary transition-colors"
                data-testid="social-tripadvisor"
              >
                <Star className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground" data-testid="footer-copyright">
            © 2024 Locale Drinkeria. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
