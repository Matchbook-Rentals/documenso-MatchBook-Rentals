# Deploying Documenso to Render.com

This guide explains how to deploy your customized Documenso fork to Render.com.

## Prerequisites

- GitHub account with your forked repository
- Render.com account (free tier works)
- Certificate files already generated in `certs/` directory

## Deployment Steps

### 1. Connect GitHub to Render

1. Log in to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub account if not already connected
4. Select your repository: `Matchbook-Rentals/documenso-MatchBook-Rentals`
5. Choose the `matchbook-modifications` branch

### 2. Configure Service Settings

Render will automatically detect the `render.yaml` file and configure:
- **Service Name**: documenso-app
- **Database**: PostgreSQL (free tier)
- **Build Command**: `npm i && npm run build`
- **Start Command**: Database migrations + app start

### 3. Environment Variables

The `render.yaml` file already includes:
- ✅ Database connection (auto-configured)
- ✅ Authentication secrets (auto-generated)
- ✅ Encryption keys (auto-generated)
- ✅ Certificate configuration
- ✅ Disabled email settings
- ✅ Upload storage (database)

### 4. Deploy

1. Click "Create Web Service"
2. Render will:
   - Create a PostgreSQL database
   - Build your application
   - Run database migrations
   - Start the service

### 5. Access Your Application

Once deployed, your app will be available at:
- `https://documenso-app.onrender.com` (or your custom subdomain)

### 6. First Login

1. Navigate to `https://your-app.onrender.com/signup`
2. Create your admin account
3. Start using Documenso!

## Important Notes

### Certificate Files
The signing certificate is configured to use:
- Path: `/opt/render/project/src/certs/cert.p12`
- Passphrase: `matchbook-secure-2024`

Make sure your certificate files are committed to the repository.

### Email Functionality
Emails are disabled in this configuration. Users will need to:
- Share document links manually
- Remember passwords (no reset capability)
- Access documents directly through the interface

### Custom Domain (Optional)

To use a custom domain:
1. Go to your service settings in Render
2. Click "Add Custom Domain"
3. Follow the DNS configuration instructions
4. Update `NEXT_PUBLIC_WEBAPP_URL` in environment variables

### Scaling

The free tier includes:
- 512 MB RAM
- Shared CPU
- Spins down after 15 minutes of inactivity

For production use, consider upgrading to:
- **Starter**: $7/month (always on, 512 MB RAM)
- **Standard**: $25/month (1 GB RAM, better performance)

### Monitoring

- Check logs: Dashboard → "Logs" tab
- Monitor metrics: Dashboard → "Metrics" tab
- Set up health checks: Already configured at `/api/health`

## Troubleshooting

### Build Failures
- Check Node version (should be 20.9.0)
- Verify all dependencies in package.json
- Check build logs for specific errors

### Certificate Errors
- Ensure cert.p12 is in the repository
- Verify the certificate path is correct
- Check passphrase matches

### Database Issues
- Migrations run automatically on deploy
- Check database logs in Render dashboard
- Ensure connection string is correct

### Performance Issues
- Free tier spins down after inactivity
- First request after spin-down is slow
- Consider upgrading for production use

## Updates

To update your deployment:
1. Push changes to your GitHub repository
2. Render will automatically rebuild and redeploy
3. Database migrations run automatically

**Important**: Your database persists across deployments. All data (documents, users, API keys) remains safe when updating the application.

## Database Backups (Recommended)

For production use, enable automatic backups:
1. Go to your database in Render dashboard
2. Click "Backups" tab
3. Enable daily backups (available on paid plans)

Manual backup command:
```bash
# From Render dashboard, get your database connection string
pg_dump "your-connection-string" > backup-$(date +%Y%m%d).sql
```

## Support

- Render Documentation: https://docs.render.com
- Documenso Documentation: https://docs.documenso.com
- Your Fork: https://github.com/Matchbook-Rentals/documenso-MatchBook-Rentals