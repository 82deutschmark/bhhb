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

## Deployment

This project is deployed via GitHub and Cloudflare Pages. The production build is automatically deployed when changes are pushed to the main branch.

To deploy:

1. Ensure your changes are committed
2. Push to the main branch
3. Cloudflare Pages will automatically build and deploy your site from the `dist/public` directory

## DNS Configuration

For the domain configuration in Cloudflare:

1. For www.bighappyholding.com:
   - Type: CNAME
   - Name: www
   - Target: bighappyholding.com
   - Proxy status: Proxied

2. For bighappyholding.com (root domain):
   - Type: A
   - Name: @ (or empty)
   - Target: 192.0.2.1 (Cloudflare managed)
   - Proxy status: Proxied

## Project Structure

- `client/src/` - React frontend code
- `server/` - Express backend setup
- `shared/` - Shared types and schemas

## Contact

For any questions or issues, contact: info@bighappyhc.com