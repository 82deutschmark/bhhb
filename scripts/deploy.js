import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const SQUARESPACE_API_URL = `https://api.squarespace.com/api/v1/websites/${process.env.SQUARESPACE_WEBSITE_ID}`;
const APP_PASSWORD = process.env.SQUARESPACE_APP_PASSWORD;

async function deployToSquarespace() {
  try {
    console.log('Starting deployment to Squarespace...');

    // Verify the dist/public directory exists
    const distPath = path.resolve(process.cwd(), 'dist', 'public');
    if (!fs.existsSync(distPath)) {
      throw new Error('Build directory not found. Run npm run build first.');
    }

    // Configure authentication
    const config = {
      headers: {
        'Authorization': `Basic ${Buffer.from(APP_PASSWORD).toString('base64')}`,
        'User-Agent': 'BHHC-Deployment/1.0',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    // First verify we can access the site
    console.log('Attempting to authenticate with Squarespace...');
    const siteResponse = await axios.get(SQUARESPACE_API_URL, config);
    console.log('Successfully authenticated with Squarespace');

    // Create or update the page content
    const pageData = {
      itemType: 'PAGE',
      title: 'Big Happy Holding Company',
      navigationTitle: 'Home',
      urlSlug: '/',
      contentType: 'html',
      content: {
        html: fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8')
      }
    };

    console.log('Creating page...');
    const pageResponse = await axios.post(`${SQUARESPACE_API_URL}/pages`, pageData, config);
    console.log('Page created successfully');

    // Upload assets
    const assetFiles = fs.readdirSync(distPath).filter(file => file !== 'index.html');
    console.log(`Uploading ${assetFiles.length} assets...`);

    for (const file of assetFiles) {
      const filePath = path.join(distPath, file);
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));

      await axios.post(
        `${SQUARESPACE_API_URL}/pages/${pageResponse.data.id}/assets`,
        formData,
        {
          ...config,
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data',
            ...formData.getHeaders()
          }
        }
      );
      console.log(`Uploaded ${file}`);
    }

    console.log('Deployment complete! Your site should be live at:', `https://${process.env.SQUARESPACE_WEBSITE_ID}.squarespace.com`);
  } catch (error) {
    console.error('Deployment failed:', error.message);
    if (error.response) {
      console.error('API Response:', error.response.data);
    }
    process.exit(1);
  }
}

deployToSquarespace();