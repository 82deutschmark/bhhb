
/**
 * DNS Configuration and Setup for bighappyholding.com
 * 
 * This script provides both configuration instructions and automated setup
 * for DNS records using the Cloudflare API.
 */

import { setupDnsRecords, listDnsRecords } from './cloudflare-api.js';

// DNS Configuration for Cloudflare
const dnsConfig = {
  // Root domain configuration - A record
  rootDomain: {
    type: "A",
    name: "@", // @ represents the root domain
    content: "192.0.2.1", // This should be replaced with the actual IP from Cloudflare
    ttl: "Auto",
    proxied: true
  },
  
  // www subdomain configuration - CNAME record
  wwwSubdomain: {
    type: "CNAME",
    name: "www",
    content: "bighappyholding.com", // Points to the root domain
    ttl: "Auto",
    proxied: true
  }
};

/**
 * Steps to configure in Cloudflare manually:
 * 
 * 1. Log in to your Cloudflare account
 * 2. Select the bighappyholding.com domain
 * 3. Go to the DNS management section
 * 4. Add Record with the following configuration for the root domain:
 *    - Type: A
 *    - Name: @ (or leave empty)
 *    - Target: 192.0.2.1 (Use actual Cloudflare IP)
 *    - Proxy status: Proxied
 * 
 * 5. Add Record with the following configuration for www subdomain:
 *    - Type: CNAME
 *    - Name: www
 *    - Target: bighappyholding.com
 *    - Proxy status: Proxied
 * 
 * Or simply run this script with CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID set
 * to automatically configure the DNS records.
 */

// Export the configuration for reference
export const config = dnsConfig;

// Display the configuration
function displayConfig() {
  console.log("DNS Configuration Guide:");
  console.log("------------------------");
  console.log("For Root Domain (bighappyholding.com):");
  console.log(`Type: ${dnsConfig.rootDomain.type}`);
  console.log(`Name: ${dnsConfig.rootDomain.name}`);
  console.log(`Content: ${dnsConfig.rootDomain.content}`);
  console.log(`Proxied: ${dnsConfig.rootDomain.proxied}`);
  console.log("\nFor WWW Subdomain (www.bighappyholding.com):");
  console.log(`Type: ${dnsConfig.wwwSubdomain.type}`);
  console.log(`Name: ${dnsConfig.wwwSubdomain.name}`);
  console.log(`Content: ${dnsConfig.wwwSubdomain.content}`);
  console.log(`Proxied: ${dnsConfig.wwwSubdomain.proxied}`);
}

// Main function to run the script
async function main() {
  displayConfig();
  
  // Check if we have API credentials to proceed with automated setup
  if (process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ZONE_ID) {
    console.log("\nDetected Cloudflare API credentials. Attempting automated setup...");
    try {
      await setupDnsRecords(dnsConfig);
      console.log("\nVerifying DNS records in Cloudflare...");
      const records = await listDnsRecords();
      console.log("Current DNS records in Cloudflare:");
      records.result.forEach(record => {
        console.log(`- ${record.name} (${record.type}): ${record.content}`);
      });
    } catch (error) {
      console.error("\nError during DNS setup:", error.message);
      console.log("Please set up DNS records manually according to the guide above.");
    }
  } else {
    console.log("\nNo Cloudflare API credentials found. Please either:");
    console.log("1. Set CLOUDFLARE_API_TOKEN and CLOUDFLARE_ZONE_ID environment variables to use automated setup");
    console.log("2. Follow the manual setup instructions above");
  }
}

// Run the script if it's called directly
if (typeof require !== 'undefined' && require.main === module) {
  main().catch(console.error);
}
