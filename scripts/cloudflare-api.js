
/**
 * Cloudflare API Integration
 * 
 * This script provides functions to interact with Cloudflare's API to manage DNS records
 * for the bighappyholding.com domain.
 */

// Import the Cloudflare API client
import { createClient } from 'cloudflare';

// Load environment variables for Cloudflare authentication
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const zoneId = process.env.CLOUDFLARE_ZONE_ID;

// Initialize the Cloudflare client with the API token
const cf = createClient({
  token: apiToken,
});

// Function to get the zone information
export async function getZoneInfo() {
  try {
    if (!zoneId) {
      throw new Error('CLOUDFLARE_ZONE_ID environment variable is not set');
    }
    
    const zone = await cf.zones.read(zoneId);
    return zone;
  } catch (error) {
    console.error('Error getting zone info:', error);
    throw error;
  }
}

// Function to list all DNS records for the zone
export async function listDnsRecords() {
  try {
    if (!zoneId) {
      throw new Error('CLOUDFLARE_ZONE_ID environment variable is not set');
    }
    
    const records = await cf.dnsRecords.browse(zoneId);
    return records;
  } catch (error) {
    console.error('Error listing DNS records:', error);
    throw error;
  }
}

// Function to create or update an A record
export async function createOrUpdateARecord(name, content, proxied = true) {
  try {
    if (!zoneId) {
      throw new Error('CLOUDFLARE_ZONE_ID environment variable is not set');
    }
    
    // Check if record already exists
    const records = await cf.dnsRecords.browse(zoneId);
    const existingRecord = records.result.find(
      (r) => r.type === 'A' && r.name === name
    );
    
    if (existingRecord) {
      // Update existing record
      const updated = await cf.dnsRecords.edit(zoneId, existingRecord.id, {
        type: 'A',
        name,
        content,
        ttl: 1, // Auto
        proxied,
      });
      console.log(`Updated A record for ${name}`);
      return updated;
    } else {
      // Create new record
      const created = await cf.dnsRecords.add(zoneId, {
        type: 'A',
        name,
        content,
        ttl: 1, // Auto
        proxied,
      });
      console.log(`Created A record for ${name}`);
      return created;
    }
  } catch (error) {
    console.error('Error creating/updating A record:', error);
    throw error;
  }
}

// Function to create or update a CNAME record
export async function createOrUpdateCnameRecord(name, content, proxied = true) {
  try {
    if (!zoneId) {
      throw new Error('CLOUDFLARE_ZONE_ID environment variable is not set');
    }
    
    // Check if record already exists
    const records = await cf.dnsRecords.browse(zoneId);
    const existingRecord = records.result.find(
      (r) => r.type === 'CNAME' && r.name === name
    );
    
    if (existingRecord) {
      // Update existing record
      const updated = await cf.dnsRecords.edit(zoneId, existingRecord.id, {
        type: 'CNAME',
        name,
        content,
        ttl: 1, // Auto
        proxied,
      });
      console.log(`Updated CNAME record for ${name}`);
      return updated;
    } else {
      // Create new record
      const created = await cf.dnsRecords.add(zoneId, {
        type: 'CNAME',
        name,
        content,
        ttl: 1, // Auto
        proxied,
      });
      console.log(`Created CNAME record for ${name}`);
      return created;
    }
  } catch (error) {
    console.error('Error creating/updating CNAME record:', error);
    throw error;
  }
}

// Function to delete a DNS record
export async function deleteDnsRecord(name, type) {
  try {
    if (!zoneId) {
      throw new Error('CLOUDFLARE_ZONE_ID environment variable is not set');
    }
    
    // Find the record to delete
    const records = await cf.dnsRecords.browse(zoneId);
    const recordToDelete = records.result.find(
      (r) => r.type === type && r.name === name
    );
    
    if (recordToDelete) {
      await cf.dnsRecords.del(zoneId, recordToDelete.id);
      console.log(`Deleted ${type} record for ${name}`);
      return true;
    } else {
      console.log(`No ${type} record found for ${name}`);
      return false;
    }
  } catch (error) {
    console.error(`Error deleting ${type} record:`, error);
    throw error;
  }
}

// Main function to set up the DNS records according to the configuration
export async function setupDnsRecords(config) {
  try {
    if (!config) {
      throw new Error('DNS configuration is required');
    }
    
    console.log('Setting up DNS records...');
    
    // Root domain A record
    if (config.rootDomain && config.rootDomain.type === 'A') {
      await createOrUpdateARecord('@', config.rootDomain.content, config.rootDomain.proxied);
    }
    
    // WWW subdomain CNAME record
    if (config.wwwSubdomain && config.wwwSubdomain.type === 'CNAME') {
      await createOrUpdateCnameRecord('www', config.wwwSubdomain.content, config.wwwSubdomain.proxied);
    }
    
    console.log('DNS setup completed successfully');
    return true;
  } catch (error) {
    console.error('Error setting up DNS records:', error);
    throw error;
  }
}

// Example usage:
// import { dnsConfig } from './dns-setup.js';
// setupDnsRecords(dnsConfig).catch(console.error);
