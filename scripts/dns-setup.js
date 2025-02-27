
/**
 * DNS Configuration Guide for bighappyholding.com
 * 
 * This script provides instructions on how to set up DNS records for
 * bighappyholding.com and www.bighappyholding.com
 */

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
 * Steps to configure in Cloudflare:
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
 */

// Export the configuration for reference
export const config = dnsConfig;

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
