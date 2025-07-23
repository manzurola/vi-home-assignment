#!/bin/bash
set -e

# Clean up any running containers and networks from previous runs

echo "Stopping and removing existing containers..."
docker-compose -f backend/marvel-service/docker-compose.yml down --remove-orphans -v

echo "Stopping and removing frontend containers..."
docker-compose -f frontend/marvel-webapp/docker-compose.yml down --remove-orphans -v

# Copy .env.test to .env if needed (backend)
if [ -f backend/marvel-service/.env.test ]; then
  cp backend/marvel-service/.env.test backend/marvel-service/.env
  echo "Copied backend .env.test to .env"
fi

# Start backend (and db) in detached mode
docker-compose -f backend/marvel-service/docker-compose.yml up -d

# Start frontend in detached mode
docker-compose -f frontend/marvel-webapp/docker-compose.yml up -d

echo "All services are running!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:3001"
