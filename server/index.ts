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

  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Development server setup
async function startDevServer() {
  const server = await registerRoutes(app);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  if (process.env.NODE_ENV === 'development') {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  server.listen({
    port: 5000,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port 5000`);
  });
}

// Start dev server if not in Cloudflare Worker environment
if (process.env.NODE_ENV === 'development') {
  startDevServer();
}

// Export Cloudflare Worker handler as default
export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }, _ctx: ExecutionContext): Promise<Response> {
    try {
      const url = new URL(request.url);

      // Handle static files from the bucket
      if (!url.pathname.startsWith('/api')) {
        return env.ASSETS.fetch(request);
      }

      // Handle API requests
      const expressRequest = {
        method: request.method,
        url: url.pathname + url.search,
        headers: Object.fromEntries(request.headers.entries()),
        body: request.method !== 'GET' && request.method !== 'HEAD' ? 
          await request.json().catch(() => ({})) : undefined
      };

      return await new Promise((resolve, reject) => {
        const expressResponse: any = {
          statusCode: 200,
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: '',
          status(code: number) {
            this.statusCode = code;
            return this;
          },
          set(key: string, value: string) {
            this.headers.set(key, value);
            return this;
          },
          json(data: any) {
            this.body = JSON.stringify(data);
            resolve(new Response(this.body, {
              status: this.statusCode,
              headers: this.headers,
            }));
          },
          send(data: string) {
            this.body = data;
            resolve(new Response(this.body, {
              status: this.statusCode,
              headers: this.headers,
            }));
          }
        };

        app(expressRequest, expressResponse, (error: any) => {
          if (error) {
            reject(new Response(
              JSON.stringify({ error: error.message || 'Internal Server Error' }), 
              {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
              }
            ));
          }
        });
      });
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }
};

// Type definition for Cloudflare Worker execution context
interface ExecutionContext {}