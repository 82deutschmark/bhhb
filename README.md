# Big Happy Holding Company Website

A modern, static corporate website for Big Happy Holding Company built with React and modern web technologies.

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Building for Production

To create a production build:

```bash
# Create production build
npm run build
```

The production build will be in the `dist/public` directory.

## Deploying to Squarespace

To deploy to your Squarespace site (bighappyhc.com):

1. Build the project:
```bash
npm run build
```

2. In your Squarespace dashboard:
   - Go to Settings > Advanced > Developer Mode
   - Enable Developer Mode
   - Upload the contents of the `dist/public` directory
   - Your custom code will override the default Squarespace template

**Important Notes:**
- Make sure to keep your Squarespace account active
- Backup any existing content before enabling Developer Mode
- Test the site thoroughly after deployment

## Project Structure

- `client/src/` - React frontend code
- `server/` - Express backend setup
- `shared/` - Shared types and schemas
- `scripts/` - Build and utility scripts

## Contact

For any questions or issues, contact: info@bighappyhc.com