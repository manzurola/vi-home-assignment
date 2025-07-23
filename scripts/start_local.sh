#!/bin/bash
set -e

# Clean up any running containers and networks from previous runs

echo "Stopping and removing existing containers..."
docker-compose -f backend/marvel-service/docker-compose.yml down --remove-orphans -v

echo "Stopping and removing frontend containers..."
docker-compose -f frontend/marvel-webapp/docker-compose.yml down --remove-orphans -v

# Start backend (and db) in detached mode
docker-compose -f backend/marvel-service/docker-compose.yml up -d

# Start frontend in detached mode
docker-compose -f frontend/marvel-webapp/docker-compose.yml up -d

# Populate the database
echo "Populating the database via POST to /data-scraper/scrape-movies..."
curl -X POST http://localhost:3000/data-scraper/scrape-movies

echo "All services are running!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:3001"
