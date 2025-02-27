import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Function to handle API requests in the Worker environment
export async function handleApiRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  try {
    // Add your API routes here
    // Return Response objects directly for the Worker environment

    return new Response(
      JSON.stringify({ error: 'Not Found' }),
      { status: 404, headers }
    );
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers }
    );
  }
}

// Express routes for development environment
export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}