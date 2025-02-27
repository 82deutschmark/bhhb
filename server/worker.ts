import { handleApiRequest } from './routes';

export default {
  async fetch(request: Request, env: { ASSETS: { fetch: typeof fetch } }): Promise<Response> {
    try {
      const url = new URL(request.url);

      // Handle OPTIONS requests for CORS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        });
      }

      // Serve static assets from the bucket
      if (!url.pathname.startsWith('/api')) {
        console.log(`[Worker] Serving static asset: ${url.pathname}`);
        return env.ASSETS.fetch(request);
      }

      // Health check endpoint
      if (url.pathname === '/api/health') {
        return new Response(
          JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }),
          { 
            headers: { 
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            } 
          }
        );
      }

      // Handle other API routes
      return await handleApiRequest(request);

    } catch (error) {
      console.error('[Worker] Error:', error);
      return new Response(
        JSON.stringify({ error: 'Internal Server Error' }), 
        { 
          status: 500,
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          } 
        }
      );
    }
  }
};