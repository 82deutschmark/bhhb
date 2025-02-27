
#!/usr/bin/env node
/**
 * Cloudflare Management CLI
 * 
 * This script provides a command-line interface for managing Cloudflare DNS
 * and deployment settings for the bighappyholding.com domain.
 */

import { createClient } from 'cloudflare';
import { config as dnsConfig } from './dns-setup.js';
import { setupDnsRecords, listDnsRecords, getZoneInfo } from './cloudflare-api.js';
import { verifyDns } from './verify-dns.js';

// Check for required environment variables
if (!process.env.CLOUDFLARE_API_TOKEN) {
  console.error('Error: CLOUDFLARE_API_TOKEN environment variable is not set');
  console.log('Please set the CLOUDFLARE_API_TOKEN environment variable and try again');
  process.exit(1);
}

if (!process.env.CLOUDFLARE_ZONE_ID) {
  console.error('Error: CLOUDFLARE_ZONE_ID environment variable is not set');
  console.log('Please set the CLOUDFLARE_ZONE_ID environment variable and try again');
  process.exit(1);
}

// Process command-line arguments
const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

async function main() {
  switch (command) {
    case 'setup':
    case 'setup-dns':
      console.log('Setting up DNS records...');
      await setupDnsRecords(dnsConfig);
      break;
      
    case 'verify':
    case 'verify-dns':
      console.log('Verifying DNS configuration...');
      await verifyDns();
      break;
      
    case 'list':
    case 'list-dns':
      console.log('Listing DNS records...');
      const records = await listDnsRecords();
      console.log('\nCurrent DNS records:');
      records.result.forEach(record => {
        console.log(`- ${record.name} (${record.type}): ${record.content} ${record.proxied ? '[Proxied]' : ''}`);
      });
      break;
      
    case 'zone-info':
      console.log('Getting zone information...');
      const zone = await getZoneInfo();
      console.log('\nZone information:');
      console.log(JSON.stringify(zone, null, 2));
      break;
      
    case 'help':
    default:
      console.log(`
Cloudflare Management CLI

Usage:
  node scripts/manage-cloudflare.js [command]

Commands:
  setup, setup-dns     Configure DNS records according to configuration
  verify, verify-dns   Verify DNS configuration
  list, list-dns       List all DNS records
  zone-info            Display zone information
  help                 Show this help message

Environment Variables:
  CLOUDFLARE_API_TOKEN  Cloudflare API token with Zone:DNS permissions
  CLOUDFLARE_ZONE_ID    Zone ID for the domain (bighappyholding.com)
`);
      break;
  }
}

main().catch(error => {
  console.error('Error:', error.message);
  process.exit(1);
});
