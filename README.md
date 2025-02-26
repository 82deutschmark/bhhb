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

The production build will be in the `dist` directory.

## Deploying to Squarespace

To deploy to Squarespace (bighappyhc.com):

1. Build the project using `npm run build`
2. The production files will be in the `dist` directory
3. In your Squarespace dashboard:
   - Go to Settings > Domains
   - Connect your domain (bighappyhc.com)
   - Under Advanced Settings, enable Developer Mode
   - Upload the contents of the `dist` directory

## Assets

- Company logos and images are stored in `client/public/assets/`
- Ensure all assets are properly optimized before deployment

## Contact

For any questions or issues, contact: info@bighappyhc.com
