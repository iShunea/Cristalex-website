# Vercel Deployment Guide - Cristalexdent

## Prerequisites
- Vercel account
- GitHub repository (push this code to GitHub)
- MongoDB Atlas account (for database)

## Step 1: Prepare MongoDB Database

1. Create a MongoDB Atlas cluster (free tier available)
2. Get your connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/dbname`)
3. Whitelist all IP addresses (0.0.0.0/0) in Network Access for serverless functions

## Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Prepare for Vercel deployment"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist/public` (auto-detected from vercel.json)
   - **Install Command**: `npm install` (auto-detected)

5. Add Environment Variable:
   - Key: `MONGODB_URI`
   - Value: Your MongoDB connection string
   - (Example: `mongodb+srv://user:pass@cluster.mongodb.net/cristalexdent`)

6. Click "Deploy"

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Add environment variable
vercel env add MONGODB_URI

# Deploy to production
vercel --prod
```

## Step 4: Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

- **MONGODB_URI**: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/cristalexdent`
  - Make sure to URL-encode special characters in password

## Step 5: Verify Deployment

After deployment completes:

1. Visit your deployment URL (e.g., `https://your-project.vercel.app`)
2. Check that the website loads correctly
3. Test API endpoints:
   - `https://your-project.vercel.app/api/services` - should return services data
   - `https://your-project.vercel.app/api/team-members` - should return team data

## Project Structure for Vercel

```
.
├── api/
│   └── index.js          # Serverless API handler
├── client/               # React frontend
├── dist/
│   └── public/          # Build output (auto-generated)
├── vercel.json          # Vercel configuration
└── package.json
```

## How It Works

1. **Frontend**: Vite builds the React app into `dist/public/`
2. **Backend**: `api/index.js` runs as a Vercel serverless function
3. **Routing**:
   - `/api/*` → Serverless function handles API requests
   - `/*` → Serves static files from `dist/public/`
4. **Database**: MongoDB with connection pooling for serverless

## Troubleshooting

### "Cannot find module" errors
- Make sure all dependencies are in `dependencies`, not `devDependencies`
- Vercel only installs `dependencies` in production

### API routes returning 404
- Check that API routes start with `/api/`
- Verify `vercel.json` rewrites are correct

### Database connection fails
- Verify `MONGODB_URI` is set in Vercel environment variables
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Ensure connection string is URL-encoded

### Build fails
- Check build logs in Vercel dashboard
- Ensure `npm run build` works locally
- Verify all imports are correct

## Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Settings → Domains
3. Add your custom domain (e.g., `cristalexdent.md`)
4. Follow DNS configuration instructions

## Important Notes

- **Serverless Functions**: API runs on serverless - cold starts may occur
- **Connection Pooling**: MongoDB connections are pooled to handle serverless nature
- **No Sessions**: Serverless doesn't support sessions - uses stateless architecture
- **Environment Variables**: Always set `MONGODB_URI` before first deployment

## Support

For issues specific to:
- Vercel deployment: [Vercel Documentation](https://vercel.com/docs)
- MongoDB: [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
