
/**
 * DNS Verification Script
 * 
 * This script helps to check if your DNS records are properly configured
 * and have propagated across the internet.
 */

const dns = require('dns');
const { promisify } = require('util');
const { listDnsRecords, getZoneInfo } = require('./cloudflare-api');

const lookup = promisify(dns.lookup);
const resolve4 = promisify(dns.resolve4);
const resolveCname = promisify(dns.resolveCname);

const domainRoot = 'bighappyholding.com';
const domainWww = 'www.bighappyholding.com';

async function verifyDns() {
  console.log('Verifying DNS configuration...');
  
  try {
    // First, verify using Cloudflare API
    console.log('\nChecking DNS records in Cloudflare...');
    try {
      const records = await listDnsRecords();
      console.log('✓ Successfully connected to Cloudflare API');
      
      const rootRecord = records.result.find(r => r.type === 'A' && (r.name === domainRoot || r.name === '@'));
      const wwwRecord = records.result.find(r => (r.type === 'CNAME' || r.type === 'A') && r.name === domainWww);
      
      if (rootRecord) {
        console.log('✓ Root domain record found in Cloudflare:');
        console.log(`  Type: ${rootRecord.type}`);
        console.log(`  Content: ${rootRecord.content}`);
        console.log(`  Proxied: ${rootRecord.proxied}`);
      } else {
        console.log('✗ Root domain record not found in Cloudflare');
      }
      
      if (wwwRecord) {
        console.log('✓ WWW subdomain record found in Cloudflare:');
        console.log(`  Type: ${wwwRecord.type}`);
        console.log(`  Content: ${wwwRecord.content}`);
        console.log(`  Proxied: ${wwwRecord.proxied}`);
      } else {
        console.log('✗ WWW subdomain record not found in Cloudflare');
      }
      
    } catch (cloudflareError) {
      console.error('✗ Could not verify via Cloudflare API:', cloudflareError.message);
      console.log('Falling back to DNS queries...');
    }
    
    // Then, verify through public DNS
    console.log('\nVerifying through public DNS queries...');
    
    // Check root domain (A record)
    console.log(`\nChecking A record for ${domainRoot}`);
    const rootResult = await resolve4(domainRoot);
    console.log('✓ Success! A record found:');
    console.log(rootResult);
    
    // Check www subdomain (CNAME record)
    console.log(`\nChecking CNAME record for ${domainWww}`);
    try {
      const wwwResult = await resolveCname(domainWww);
      console.log('✓ Success! CNAME record found:');
      console.log(wwwResult);
    } catch (cnameError) {
      // If CNAME lookup fails, try A record (some setups use A instead of CNAME)
      console.log('CNAME not found, checking if www has an A record instead');
      const wwwAResult = await resolve4(domainWww);
      console.log('✓ Success! A record found for www subdomain:');
      console.log(wwwAResult);
    }
    
    console.log('\nDNS verification complete! Your domains appear to be properly configured.');
  } catch (error) {
    console.error('\n✗ DNS verification failed:');
    console.error(error.message);
    console.log('\nPossible reasons:');
    console.log('1. DNS records have not been set up correctly');
    console.log('2. DNS changes have not propagated yet (can take 24-48 hours)');
    console.log('3. The domain is not registered or active');
    console.log('\nRecommendation:');
    console.log('- Check your DNS configuration in Cloudflare');
    console.log('- Use a tool like https://whatsmydns.net/ to check propagation');
  }
}

// Run the verification if this script is executed directly
if (require.main === module) {
  verifyDns().catch(console.error);
}

module.exports = { verifyDns };
