
#!/usr/bin/env node
/**
 * Cloudflare Workers Deployment Script
 * 
 * This script handles the deployment process to Cloudflare Workers
 */

import { execSync } from 'child_process';

// Build the application
console.log('Building application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Copy wrangler.toml to dist directory
console.log('\nCopying wrangler.toml to dist directory...');
try {
  execSync('cp wrangler.toml dist/', { stdio: 'inherit' });
  console.log('✅ Configuration copied successfully');
} catch (error) {
  console.error('❌ Failed to copy configuration:', error.message);
  process.exit(1);
}

// Deploy to Cloudflare Workers
console.log('\nDeploying to Cloudflare Workers...');
try {
  execSync('cd dist && npx wrangler deploy index.js --config wrangler.toml', { stdio: 'inherit' });
  console.log('✅ Deployment completed successfully');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  
  // Check for specific errors
  if (error.message.includes('Missing entry-point')) {
    console.log('\nTroubleshooting:');
    console.log('- Make sure wrangler.toml exists with a valid "main" field');
    console.log('- The "main" field should point to your built server file (dist/index.js)');
  } else if (error.message.includes('Authentication error')) {
    console.log('\nAuthentication Error:');
    console.log('- Run "npx wrangler login" to authenticate with Cloudflare');
  }
  
  process.exit(1);
}
