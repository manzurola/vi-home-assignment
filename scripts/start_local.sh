#!/bin/bash
set -e

# Start the backend service (marvel-service)
echo "Starting backend (marvel-service) on port 3000..."
(
  set -e
  cd ../backend/marvel-service || exit 1
  export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  if [ -f .env.test ] && [ ! -f .env ]; then
    echo "Copying .env.test to .env (please ensure TMDB token is set in .env)"
    cp .env.test .env
  fi
  nvm use
  npm install
  npm run db:clean
  npm run start &
)

# Start the frontend service (marvel-webapp)
echo "Starting frontend (marvel-webapp) on port 3001..."
(
  set -e
  cd ../frontend/marvel-webapp || exit 1
  export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  if [ -f .env.test ] && [ ! -f .env ]; then
      echo "Copying .env.test to .env"
      cp .env.test .env
    fi
  nvm use
  npm run install:legacy
  npm run start &
)

echo "Waiting for backend to be available on http://localhost:3000..."
# Wait for backend to be up (max 30s)
for i in {1..30}; do
  if curl -s http://localhost:3000 > /dev/null; then
    echo "Backend is up!"
    break
  fi
  sleep 1
done

if ! curl -s http://localhost:3000 > /dev/null; then
  echo "Backend did not start within 30 seconds. Exiting."
  exit 1
fi

echo "Populating the database via POST to /data-scraper/scrape-movies..."
RESPONSE=$(curl -s -X POST http://localhost:3000/data-scraper/scrape-movies -H "Content-Type: application/json")
echo "Response: $RESPONSE"

echo "Both services are starting. Backend: http://localhost:3000, Frontend: http://localhost:3001"
