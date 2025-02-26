import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';

const SQUARESPACE_API_URL = `https://api.squarespace.com/1.0/sites/${process.env.SQUARESPACE_WEBSITE_ID}/pages`;
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
        'Authorization': `Bearer ${APP_PASSWORD}`,
        'User-Agent': 'BHHC-Deployment/1.0',
        'Content-Type': 'application/json'
      }
    };

    // First, create or update the page
    const pageData = {
      type: 'page',
      title: 'Big Happy Holding Company',
      urlSlug: '/',
      navigationTitle: 'Home'
    };

    const pageResponse = await axios.post(SQUARESPACE_API_URL, pageData, config);
    console.log('Page created/updated successfully');

    // Upload the static assets
    const formData = new FormData();
    const files = fs.readdirSync(distPath);

    for (const file of files) {
      const filePath = path.join(distPath, file);
      const stats = fs.statSync(filePath);

      if (stats.isFile()) {
        formData.append('files', fs.createReadStream(filePath), {
          filename: file,
          contentType: 'application/octet-stream'
        });
      }
    }

    const uploadResponse = await axios.post(
      `${SQUARESPACE_API_URL}/${pageResponse.data.id}/assets`,
      formData,
      {
        ...config,
        headers: {
          ...config.headers,
          ...formData.getHeaders()
        }
      }
    );

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