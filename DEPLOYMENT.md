# Deployment Guide for Smart Life Planner

This guide provides multiple options for deploying the Smart Life Planner to free hosting services.

## Quick Deploy Options

### Option 1: Netlify (Recommended - Easiest)

#### Method A: Drag & Drop (Simplest)
1. Build the app:
   ```bash
   npm run build
   ```

2. Visit [Netlify Drop](https://app.netlify.com/drop)

3. Drag and drop the `dist` folder

4. Your app is live! 🎉

#### Method B: GitHub Integration
1. Push your code to GitHub (already done!)

2. Visit [Netlify](https://app.netlify.com)

3. Click "Add new site" → "Import an existing project"

4. Connect to GitHub and select the `planner` repository

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

6. Click "Deploy site"

7. Your app will be live at `https://random-name-123.netlify.app`

#### Method C: Netlify CLI
```bash
# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### Option 2: Vercel

#### Method A: Vercel CLI (Easiest)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel --prod
```

#### Method B: GitHub Integration
1. Visit [Vercel](https://vercel.com)

2. Click "Add New" → "Project"

3. Import your Git repository

4. Vercel will auto-detect Vite settings

5. Click "Deploy"

6. Your app will be live at `https://your-app.vercel.app`

### Option 3: GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -D gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/planner"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in repository settings

5. Your app will be live at `https://yourusername.github.io/planner`

### Option 4: Surge.sh

```bash
# Install Surge
npm install -g surge

# Build
npm run build

# Deploy
cd dist
surge
```

Follow the prompts to create an account and deploy.

### Option 5: Cloudflare Pages

1. Visit [Cloudflare Pages](https://pages.cloudflare.com)

2. Connect your GitHub repository

3. Configure build:
   - Build command: `npm run build`
   - Build output directory: `dist`

4. Deploy

## Configuration Files Included

- `netlify.toml` - Netlify configuration
- `vercel.json` - Vercel configuration

## Environment Variables

No environment variables are required for the MVP. All data is stored locally in the browser.

## Custom Domain (Optional)

### Netlify
1. Go to Site settings → Domain management
2. Add custom domain
3. Update DNS records as instructed

### Vercel
1. Go to Project settings → Domains
2. Add domain
3. Configure DNS

## Post-Deployment Checklist

- [ ] Test all features work correctly
- [ ] Test on mobile devices
- [ ] Verify local storage persistence
- [ ] Check performance (should load < 2s)
- [ ] Test task selection and scheduling
- [ ] Verify calendar navigation
- [ ] Test task completion tracking

## Troubleshooting

### Build fails on deployment platform
- Ensure Node version is 18+
- Check that all dependencies are in `package.json`
- Verify build command: `npm run build`

### Site loads but app doesn't work
- Check browser console for errors
- Verify all routes redirect to `index.html`
- Ensure JavaScript is enabled

### Local storage not working
- Check browser privacy settings
- Ensure site is served over HTTPS
- Verify browser supports local storage

## Performance Tips

1. **Enable caching** - Static assets are configured to cache for 1 year
2. **Use CDN** - All platforms provide global CDN by default
3. **Compress assets** - Vite automatically minifies and tree-shakes
4. **Monitor performance** - Use Lighthouse or WebPageTest

## Monitoring

Free monitoring options:
- Netlify Analytics (built-in)
- Vercel Analytics (built-in)
- Google Analytics (needs integration)
- Plausible Analytics (privacy-focused)

## Updating the Deployment

### Netlify/Vercel (GitHub Integration)
Just push to your branch - automatic deployment!

### Manual deployment
```bash
npm run build
# Then re-deploy using your chosen method
```

## Estimated Costs

All platforms offer generous free tiers:

- **Netlify Free**: 100GB bandwidth/month, 300 build minutes/month
- **Vercel Free**: 100GB bandwidth/month, unlimited deployments
- **Cloudflare Pages Free**: Unlimited bandwidth, 500 builds/month
- **GitHub Pages Free**: 1GB storage, 100GB bandwidth/month
- **Surge Free**: Unlimited sites, custom domains

For a small-to-medium household app, the free tier is more than sufficient!

## Recommended: Netlify

For the easiest deployment experience with this app, I recommend **Netlify** because:
- Drag-and-drop deployment works immediately
- Excellent free tier
- Automatic HTTPS
- Great performance
- Simple custom domain setup
- Built-in form handling (for future features)

---

Need help? Check the [main README](./README.md) or create an issue on GitHub.
