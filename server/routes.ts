import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all menu items
  app.get("/api/menu", async (req, res) => {
    try {
      const items = await storage.getAllMenuItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  });

  // Get menu items by category
  app.get("/api/menu/category/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const items = await storage.getMenuItemsByCategory(category);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items by category" });
    }
  });

  // Search menu items
  app.get("/api/menu/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }
      const items = await storage.searchMenuItems(q);
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to search menu items" });
    }
  });

  // Get single menu item
  app.get("/api/menu/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const item = await storage.getMenuItem(id);
      if (!item) {
        return res.status(404).json({ error: "Menu item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu item" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
