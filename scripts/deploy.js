// Cloudflare Workers deployment configuration
// This file contains build settings for Cloudflare Workers deployment

export const config = {
  build: {
    command: "npm run build",
    outputDirectory: "dist/public",
    environment: {
      NODE_VERSION: "20"
    }
  },
  deploy: {
    command: "npx wrangler deploy --config wrangler.toml"
  }
};