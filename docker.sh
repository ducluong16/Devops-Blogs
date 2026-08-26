#!/bin/bash

# DevOps Portfolio Docker Management Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Print colored output
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to build production image
build_production() {
    print_info "Building production Docker image..."
    docker build -t devops-portfolio:latest .
    print_success "Production image built successfully!"
}

# Function to run production container
run_production() {
    print_info "Running production container..."
    docker run -d \
        --name devops-portfolio \
        --restart unless-stopped \
        -p 80:80 \
        devops-portfolio:latest
    print_success "Production container is running at http://localhost"
}

# Function to run development environment
run_development() {
    print_info "Starting development environment..."
    docker-compose --profile dev up --build portfolio-dev
}

# Function to stop containers
stop_containers() {
    print_info "Stopping containers..."
    docker-compose down
    docker stop devops-portfolio 2>/dev/null || true
    docker rm devops-portfolio 2>/dev/null || true
    print_success "Containers stopped!"
}

# Function to clean up
cleanup() {
    print_info "Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker rmi devops-portfolio:latest 2>/dev/null || true
    docker system prune -f
    print_success "Cleanup completed!"
}

# Function to show logs
show_logs() {
    if [ "$1" = "dev" ]; then
        docker-compose logs -f portfolio-dev
    else
        docker logs -f devops-portfolio
    fi
}

# Function to show help
show_help() {
    echo "DevOps Portfolio Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build       Build production Docker image"
    echo "  run         Run production container"
    echo "  dev         Start development environment"
    echo "  stop        Stop all containers"
    echo "  cleanup     Clean up Docker resources"
    echo "  logs        Show production container logs"
    echo "  logs-dev    Show development container logs"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 build && $0 run    # Build and run production"
    echo "  $0 dev                # Start development environment"
    echo "  $0 stop               # Stop all containers"
}

# Main script logic
case "$1" in
    "build")
        build_production
        ;;
    "run")
        run_production
        ;;
    "dev")
        run_development
        ;;
    "stop")
        stop_containers
        ;;
    "cleanup")
        cleanup
        ;;
    "logs")
        show_logs
        ;;
    "logs-dev")
        show_logs "dev"
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac