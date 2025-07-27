# Documenso Docker Production Deployment

This directory contains the Docker Compose setup for running Documenso in production.

## Prerequisites

- Docker and Docker Compose installed
- Certificate files already generated (in `certs/` directory)

## Configuration

1. **Update `.env` file** with your specific settings:
   - `NEXT_PUBLIC_WEBAPP_URL`: Your actual domain (e.g., `https://docs.matchbookrentals.com`)
   - SMTP settings for your email provider
   - Database passwords (already set to secure values)

## Local Testing

```bash
# From the project root directory
cd docker/production

# Copy certificate to this directory
cp -r ../../certs .

# Start the services
docker compose up -d

# Check logs
docker compose logs -f

# First time only - run database migrations
docker compose exec documenso npx prisma migrate deploy
```

## Production Deployment

### Option 1: Deploy to VPS (DigitalOcean, AWS EC2, etc.)

1. **On your VPS:**
```bash
# Install Docker
sudo apt update
sudo apt install docker.io docker-compose-v2

# Clone your repository
git clone https://github.com/Matchbook-Rentals/documenso-MatchBook-Rentals.git
cd documenso-MatchBook-Rentals/docker/production

# Copy certificate files
# You'll need to upload your certs directory to the server

# Update .env with production values
nano .env

# Start services
docker compose up -d

# Run migrations (first time only)
docker compose exec documenso npx prisma migrate deploy
```

2. **Configure firewall:**
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

3. **Set up HTTPS with Nginx (recommended):**
```bash
# Install Nginx
sudo apt install nginx certbot python3-certbot-nginx

# Create Nginx config
sudo nano /etc/nginx/sites-available/documenso

# Add proxy configuration (see nginx.conf.example)

# Enable site
sudo ln -s /etc/nginx/sites-available/documenso /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

### Option 2: Deploy to Cloud Platform

- **Railway**: Use the template at https://railway.app/template/bG6D4p
- **Render**: Deploy from GitHub with environment variables
- **Vercel**: Not recommended for this setup (use their deployment guide instead)

## Maintenance

### Update Documenso
```bash
docker compose pull
docker compose up -d
```

### Backup Database
```bash
docker compose exec database pg_dump -U documenso documenso > backup.sql
```

### View Logs
```bash
docker compose logs -f documenso
```

## Troubleshooting

- **Email not sending**: Check SMTP configuration in `.env`
- **Certificate errors**: Ensure cert.p12 is mounted correctly
- **Database connection**: Check if database service is healthy
- **Port conflicts**: Change PORT in `.env` if 3000 is in use

## Security Notes

- Never commit `.env` file to git
- Use strong passwords for database
- Always use HTTPS in production
- Regularly update Docker images
- Enable firewall and limit access