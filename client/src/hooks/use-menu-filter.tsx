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
      } else {
        filtered = filtered.filter(item => item.category === activeCategory);
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
    }

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
