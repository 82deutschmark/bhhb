import express from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add CORS headers for Worker environment
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  next();
});

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start dev server in development mode
if (process.env.NODE_ENV === 'development') {
  (async () => {
    const server = await registerRoutes(app);
    await setupVite(app, server);

    server.listen(5000, '0.0.0.0', () => {
      log('Development server running on port 5000');
    });
  })();
}

// Export Cloudflare Worker handler
export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }): Promise<Response> {
    const url = new URL(request.url);

    // Serve static assets
    if (!url.pathname.startsWith('/api')) {
      return env.ASSETS.fetch(request);
    }

    // Handle API requests
    if (url.pathname === '/api/health') {
      return new Response(
        JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Add other API handlers here

    return new Response('Not Found', { status: 404 });
  }
};

// Type definition for Cloudflare Worker execution context
interface ExecutionContext {}