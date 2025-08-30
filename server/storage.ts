import { type User, type InsertUser, type MenuItem, type InsertMenuItem } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllMenuItems(): Promise<MenuItem[]>;
  getMenuItemsByCategory(category: string): Promise<MenuItem[]>;
  getMenuItem(id: string): Promise<MenuItem | undefined>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  searchMenuItems(query: string): Promise<MenuItem[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private menuItems: Map<string, MenuItem>;

  constructor() {
    this.users = new Map();
    this.menuItems = new Map();
    this.initializeMenuData();
  }

  private initializeMenuData() {
    const menuData: Omit<MenuItem, 'id'>[] = [
      // Cocktails
      {
        name: "Negroni Classico",
        description: "Gin, Campari, vermouth rosso con scorza d'arancia",
        price: 1200,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "5 min",
        strength: "Forte",
        servings: null,
        alcoholContent: "22% vol",
        bottlePrice: null,
      },
      {
        name: "Martini Perfetto",
        description: "Gin premium, vermouth secco, olive Taggiasca",
        price: 1400,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "3 min",
        strength: "Forte",
        servings: null,
        alcoholContent: "25% vol",
        bottlePrice: null,
      },
      {
        name: "Mojito Cubano",
        description: "Rum bianco, menta fresca, lime, zucchero di canna, soda",
        price: 1100,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "4 min",
        strength: "Fresco",
        servings: null,
        alcoholContent: "18% vol",
        bottlePrice: null,
      },
      {
        name: "Old Fashioned",
        description: "Bourbon premium, bitter Angostura, zucchero, scorza d'arancia",
        price: 1500,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "3 min",
        strength: "Intenso",
        servings: null,
        alcoholContent: "30% vol",
        bottlePrice: null,
      },
      {
        name: "Cosmopolitan",
        description: "Vodka premium, Cointreau, succo di mirtillo, lime fresco",
        price: 1300,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "4 min",
        strength: "Dolce",
        servings: null,
        alcoholContent: "20% vol",
        bottlePrice: null,
      },
      {
        name: "Mai Tai Tropicale",
        description: "Rum dorato, rum scuro, Orgeat, Curacao, succo di lime",
        price: 1200,
        category: "cocktails",
        subcategory: "signature",
        imageUrl: "https://images.unsplash.com/photo-1603631420966-b9aa6ac50df5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: [],
        prepTime: "5 min",
        strength: "Tropicale",
        servings: null,
        alcoholContent: "24% vol",
        bottlePrice: null,
      },
      // Wines
      {
        name: "Chianti Classico DOCG",
        description: "Toscana, Italia • Note di ciliegia e spezie",
        price: 800,
        category: "wines",
        subcategory: "red",
        imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["solfiti"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "Bicchiere",
        alcoholContent: "13.5% vol",
        bottlePrice: 4200,
      },
      {
        name: "Barolo DOCG",
        description: "Piemonte, Italia • Tannico, strutturato",
        price: 1500,
        category: "wines",
        subcategory: "red",
        imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["solfiti"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "Bicchiere",
        alcoholContent: "14% vol",
        bottlePrice: 8500,
      },
      {
        name: "Pinot Grigio DOC",
        description: "Alto Adige, Italia • Fresco, minerale",
        price: 700,
        category: "wines",
        subcategory: "white",
        imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["solfiti"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "Bicchiere",
        alcoholContent: "12.5% vol",
        bottlePrice: 3500,
      },
      {
        name: "Prosecco DOCG",
        description: "Veneto, Italia • Bollicine eleganti",
        price: 900,
        category: "wines",
        subcategory: "sparkling",
        imageUrl: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["solfiti"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "Bicchiere",
        alcoholContent: "11% vol",
        bottlePrice: 4500,
      },
      // Beers
      {
        name: "IPA Artigianale",
        description: "Birrificio del Borgo • Note agrumate e luppolate",
        price: 600,
        category: "beers",
        subcategory: "craft",
        imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["glutine"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "33cl",
        alcoholContent: "6.2% vol",
        bottlePrice: null,
      },
      {
        name: "Lager Premium",
        description: "Peroni Nastro Azzurro • Gusto pulito e rinfrescante",
        price: 500,
        category: "beers",
        subcategory: "lager",
        imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["glutine"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "33cl",
        alcoholContent: "5.1% vol",
        bottlePrice: null,
      },
      // Non-alcoholic
      {
        name: "Virgin Mojito",
        description: "Menta fresca, lime, zucchero di canna, soda",
        price: 600,
        category: "non-alcoholic",
        subcategory: "mocktails",
        imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: ["vegetariano", "vegano"],
        prepTime: "3 min",
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Smoothie della Casa",
        description: "Frutta di stagione, yogurt greco, miele",
        price: 700,
        category: "non-alcoholic",
        subcategory: "smoothies",
        imageUrl: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["lattosio"],
        dietary: ["vegetariano"],
        prepTime: "2 min",
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Limonata Artigianale",
        description: "Limoni di Sorrento, basilico fresco, acqua frizzante",
        price: 500,
        category: "non-alcoholic",
        subcategory: "soft-drinks",
        imageUrl: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: ["vegetariano", "vegano"],
        prepTime: "2 min",
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
      // Snacks
      {
        name: "Tagliere Locale",
        description: "Selezione di salumi, formaggi stagionati, miele e mostarda",
        price: 1800,
        category: "snacks",
        subcategory: "boards",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["lattosio"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "Per 2-3 persone",
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Bruschette Miste",
        description: "Pomodorini, mozzarella di bufala, basilico fresco",
        price: 1200,
        category: "snacks",
        subcategory: "appetizers",
        imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["glutine", "lattosio"],
        dietary: ["vegetariano"],
        prepTime: null,
        strength: null,
        servings: "3 pezzi",
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Arancini Siciliani",
        description: "Risotto al ragù, mozzarella, piselli (3 pezzi)",
        price: 800,
        category: "snacks",
        subcategory: "hot",
        imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["glutine", "lattosio"],
        dietary: [],
        prepTime: null,
        strength: null,
        servings: "3 pezzi",
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Caprese DOP",
        description: "Mozzarella di bufala DOP, pomodori cuore di bue, basilico",
        price: 1400,
        category: "snacks",
        subcategory: "fresh",
        imageUrl: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["lattosio"],
        dietary: ["vegetariano"],
        prepTime: null,
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Chips di Patate",
        description: "Patate locali, rosmarino, sale marino",
        price: 600,
        category: "snacks",
        subcategory: "sides",
        imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: [],
        dietary: ["vegetariano", "vegano"],
        prepTime: null,
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
      {
        name: "Olive e Noccioline",
        description: "Olive ascolane, noccioline tostate, mandorle",
        price: 500,
        category: "snacks",
        subcategory: "sides",
        imageUrl: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isAvailable: true,
        allergens: ["frutta a guscio"],
        dietary: ["senza glutine"],
        prepTime: null,
        strength: null,
        servings: null,
        alcoholContent: null,
        bottlePrice: null,
      },
    ];

    menuData.forEach(item => {
      const id = randomUUID();
      this.menuItems.set(id, { 
        id,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        subcategory: item.subcategory || null,
        imageUrl: item.imageUrl,
        isAvailable: item.isAvailable ?? true,
        allergens: item.allergens || null,
        dietary: item.dietary || null,
        prepTime: item.prepTime || null,
        strength: item.strength || null,
        servings: item.servings || null,
        alcoholContent: item.alcoholContent || null,
        bottlePrice: item.bottlePrice || null
      });
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllMenuItems(): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values());
  }

  async getMenuItemsByCategory(category: string): Promise<MenuItem[]> {
    return Array.from(this.menuItems.values()).filter(
      item => item.category === category
    );
  }

  async getMenuItem(id: string): Promise<MenuItem | undefined> {
    return this.menuItems.get(id);
  }

  async createMenuItem(insertItem: InsertMenuItem): Promise<MenuItem> {
    const id = randomUUID();
    const item: MenuItem = { 
      id,
      name: insertItem.name,
      description: insertItem.description,
      price: insertItem.price,
      category: insertItem.category,
      subcategory: insertItem.subcategory || null,
      imageUrl: insertItem.imageUrl,
      isAvailable: insertItem.isAvailable ?? true,
      allergens: insertItem.allergens || null,
      dietary: insertItem.dietary || null,
      prepTime: insertItem.prepTime || null,
      strength: insertItem.strength || null,
      servings: insertItem.servings || null,
      alcoholContent: insertItem.alcoholContent || null,
      bottlePrice: insertItem.bottlePrice || null
    };
    this.menuItems.set(id, item);
    return item;
  }

  async searchMenuItems(query: string): Promise<MenuItem[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.menuItems.values()).filter(
      item => 
        item.name.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new MemStorage();
