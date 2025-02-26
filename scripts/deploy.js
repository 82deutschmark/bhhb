// Cloudflare Pages deployment configuration
// This file contains build settings that can be referenced in cloudflare.json
// The actual deployment is handled automatically by Cloudflare Pages

export const config = {
  build: {
    command: "npm run build",
    outputDirectory: "dist/public",
    environment: {
      NODE_VERSION: "20"
    }
  }
};