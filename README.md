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

To deploy to Squarespace (bighappyhc.com), you'll need:

1. Squarespace App Password
2. Your Squarespace Website ID

These should be set as environment variables:
- `SQUARESPACE_APP_PASSWORD`
- `SQUARESPACE_WEBSITE_ID`

Then run:

```bash
# Build and deploy to Squarespace
npm run build
node scripts/deploy.js
```

The script will:
1. Verify the build exists
2. Upload all static assets to Squarespace
3. Configure the necessary page settings

## Assets

- Company logos and images are stored in `client/public/assets/`
- Ensure all assets are properly optimized before deployment

## Contact

For any questions or issues, contact: info@bighappyhc.com