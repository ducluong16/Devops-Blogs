# DevOps Portfolio - Docker Setup

This repository contains a professional DevOps Engineer portfolio built with React, Vite, and Tailwind CSS, fully containerized with Docker.

## 🐳 Docker Configuration

### Files Overview

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Orchestration configuration
- `nginx.conf` - Optimized Nginx configuration
- `.dockerignore` - Build context optimization
- `docker.sh` - Management script

## 🚀 Quick Start

### Production Deployment

```bash
# Build and run production container
./docker.sh build
./docker.sh run

# Or use docker-compose
docker-compose up -d
```

### Development Environment

```bash
# Start development environment with hot reload
./docker.sh dev

# Or manually
docker-compose --profile dev up --build
```

## 📋 Available Commands

### Using Management Script

```bash
# Build production image
./docker.sh build

# Run production container
./docker.sh run

# Start development environment
./docker.sh dev

# Stop all containers
./docker.sh stop

# View logs
./docker.sh logs        # Production logs
./docker.sh logs-dev    # Development logs

# Clean up resources
./docker.sh cleanup

# Show help
./docker.sh help
```

### Manual Docker Commands

```bash
# Build production image
docker build -t devops-portfolio:latest .

# Run production container
docker run -d --name devops-portfolio -p 80:80 devops-portfolio:latest

# Build development image
docker build -f Dockerfile.dev -t devops-portfolio:dev .

# Run development container
docker run -d --name devops-portfolio-dev -p 5173:5173 -v $(pwd):/app devops-portfolio:dev
```

## 🔧 Configuration Details

### Production Features

- **Multi-stage build** for optimized image size
- **Nginx** web server with compression and caching
- **Security headers** implementation
- **Health check** endpoint at `/health`
- **SPA routing** support
- **Static asset optimization**

### Development Features

- **Hot reload** with Vite dev server
- **Volume mounting** for live code changes
- **Port 5173** exposed for development
- **Full development dependencies**

### Nginx Optimizations

- Gzip compression for assets
- Long-term caching for static files
- Security headers
- SPA routing fallback
- Health check endpoint

## 📊 Image Sizes

- **Production image**: ~25MB (Alpine + Nginx)
- **Development image**: ~200MB (Node.js + dependencies)

## 🌐 Access Points

- **Production**: http://localhost
- **Development**: http://localhost:5173
- **Health Check**: http://localhost/health

## 🔍 Monitoring

### Health Checks

The production container includes health checks:

```bash
# Check container health
docker ps

# Manual health check
curl http://localhost/health
```

### Logs

```bash
# View production logs
docker logs devops-portfolio

# Follow logs in real-time
docker logs -f devops-portfolio

# View development logs
docker-compose logs portfolio-dev
```

## 🚀 Deployment Options

### Docker Hub

```bash
# Tag for Docker Hub
docker tag devops-portfolio:latest username/devops-portfolio:latest

# Push to Docker Hub
docker push username/devops-portfolio:latest
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: devops-portfolio
spec:
  replicas: 3
  selector:
    matchLabels:
      app: devops-portfolio
  template:
    metadata:
      labels:
        app: devops-portfolio
    spec:
      containers:
      - name: portfolio
        image: devops-portfolio:latest
        ports:
        - containerPort: 80
        resources:
          requests:
            memory: "64Mi"
            cpu: "50m"
          limits:
            memory: "128Mi"
            cpu: "100m"
```

## 🛠️ Troubleshooting

### Common Issues

1. **Port conflicts**: Change port mapping in docker-compose.yml
2. **Permission issues**: Ensure docker.sh is executable (`chmod +x docker.sh`)
3. **Build failures**: Check .dockerignore and ensure all dependencies are in package.json

### Debug Commands

```bash
# Enter running container
docker exec -it devops-portfolio /bin/sh

# Check nginx configuration
docker exec devops-portfolio nginx -t

# View container resource usage
docker stats devops-portfolio
```

## 📝 Environment Variables

```bash
# Production
NODE_ENV=production

# Development
NODE_ENV=development
VITE_DEV_PORT=5173
```

## 🔐 Security Considerations

- No sensitive data in images
- Security headers enabled
- Non-root user in containers
- Regular base image updates
- Minimal attack surface

---

**Built with DevOps best practices in mind! 🚀**