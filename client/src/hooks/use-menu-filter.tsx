import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { type MenuItem } from "@shared/schema";

export function useMenuFilter() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: menuItems = [], isLoading, error } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu"],
  });

  const filteredItems = useMemo(() => {
    console.log("🔍 Filtering items:", { activeCategory, searchQuery, totalItems: menuItems.length });
    let filtered = menuItems;

    // Filter by category
    if (activeCategory !== "all") {
      if (activeCategory === "drinks") {
        // "drinks" category includes all beverages
        filtered = filtered.filter(item => 
          item.category === "cocktails" || 
          item.category === "wines" || 
          item.category === "beers" || 
          item.category === "non-alcoholic"
        );
        console.log("🍹 Drinks filter applied, found:", filtered.length, "items");
      } else {
        filtered = filtered.filter(item => item.category === activeCategory);
        console.log(`📂 Category ${activeCategory} filter applied, found:`, filtered.length, "items");
      }
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
      console.log("🔎 Search filter applied, found:", filtered.length, "items");
    }

    console.log("✅ Final filtered items:", filtered.length);
    return filtered;
  }, [menuItems, activeCategory, searchQuery]);

  return {
    menuItems,
    filteredItems,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    isLoading,
    error,
  };
}
