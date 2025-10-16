import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import path from "path";
import fs from "fs";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // PDF download route
  app.get('/api/download/red-flags-checklist', (req, res) => {
    try {
      const filePath = path.join(process.cwd(), 'public', 'downloads', 'DWD_Property_Red_Flags_Checklist.html');
      
      if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Content-Disposition', 'inline; filename="DWD_Property_Red_Flags_Checklist.html"');
        res.sendFile(filePath);
      } else {
        res.status(404).json({ error: 'File not found' });
      }
    } catch (error) {
      console.error('Error serving PDF file:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
