# Marvel Data Explorer

A full-stack application to explore Marvel movies, actors, and characters using TMDB API.

## 🗄️ Database Schema

### Core Tables

- **`movies`** - Marvel movie information from TMDB
- **`actors`** - Actor information from TMDB  
- **`characters`** - Normalized Marvel character names
- **`movie_cast`** - Core relationship table linking movies, actors, and characters

### Key Relationships

Each `movie_cast` entry represents: **"Actor X played Character Y in Movie Z"**

This design enables efficient queries for:
- Movies per actor
- Actors with multiple characters
- Characters with multiple actors

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL)

### Database Setup
```bash
# 1. Start PostgreSQL containers and run migrations
./scripts/setup-db.sh

# 2. Start the backend server
cd backend/marvel-service
npm run start:dev
```

### Frontend Setup
```bash
# Start the React frontend
cd frontend/marvel-webapp
npm install
npm start
```

## 📋 Available Commands

### Database Management
```bash
# Backend directory: backend/marvel-service
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
npm run start:dev          # Start backend server
npm run build              # Build for production
npm run test               # Run tests
```

### Docker Commands
```bash
# Root directory
docker-compose up -d postgres-dev    # Start dev database
docker-compose up -d postgres-test   # Start test database  
docker-compose down                  # Stop all containers
docker-compose logs -f postgres-dev  # View database logs
```

### Database Access
```bash
# Connect to development database
docker exec -it marvel-postgres-dev psql -U marvel_user -d marvel_db

# Connect to test database  
docker exec -it marvel-postgres-test psql -U marvel_user -d marvel_test_db
```

## 🏗️ Project Structure

```
├── backend/marvel-service/           # NestJS API server
│   ├── src/
│   │   ├── entities/                # Database entities
│   │   ├── config/                  # Database & app configuration
│   │   ├── database/migrations/     # Database migrations
│   │   └── app.module.ts           # Main application module
│   ├── docker-compose.yml          # PostgreSQL setup
│   └── scripts/setup-db.sh         # Database setup script
├── frontend/marvel-webapp/          # React web application
└── DATABASE.md                     # Detailed database documentation
```

## 🎯 API Endpoints (Planned)

- `GET /moviesPerActor` - Movies each actor appeared in
- `GET /actorsWithMultipleCharacters` - Actors who played multiple characters  
- `GET /charactersWithMultipleActors` - Characters played by multiple actors

## 🛠️ Technology Stack

- **Backend**: NestJS 11, TypeORM, PostgreSQL
- **Frontend**: React 19
- **Database**: PostgreSQL (development & testing)
- **API**: TMDB (The Movie Database)
- **Containerization**: Docker

## 📖 Environment Variables

Create `.env` file in `backend/marvel-service/`:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=marvel_user
DB_PASSWORD=marvel_password
DB_NAME=marvel_db

# TMDB API
TMDB_API_KEY=your_tmdb_api_key
TMDB_BASE_URL=https://api.themoviedb.org/3

# Application
NODE_ENV=development
PORT=3000
```

## ✅ Current Implementation Status

- [x] Database schema design
- [x] Docker PostgreSQL setup (dev & test)
- [x] NestJS backend with TypeORM
- [x] Database migrations
- [x] Entity relationships
- [x] UUID primary keys for security
- [x] Backend build & compilation
- [ ] TMDB API integration
- [ ] Data seeding pipeline
- [ ] API endpoints implementation
- [ ] Frontend components
- [ ] Data visualization

## 📚 Next Steps

1. **TMDB API Service** - Integrate with The Movie Database API
2. **Data Pipeline** - Seed database with Marvel movie data
3. **API Endpoints** - Implement the three required endpoints
4. **Frontend UI** - Build React components for data visualization
5. **Testing** - Add comprehensive test coverage

## 🤝 Development Workflow

1. **Start databases**: `./scripts/setup-db.sh`
2. **Backend development**: `cd backend/marvel-service && npm run start:dev`
3. **Frontend development**: `cd frontend/marvel-webapp && npm start`
4. **Database changes**: Create migrations with `npm run migration:generate`
5. **Testing**: `npm run test` (backend) and `npm test` (frontend)

This project demonstrates a complete full-stack architecture with proper database design, containerization, and modern development practices!

## �� **Recent Updates**

### Single Migration Approach
- **Merged migrations**: Simplified from two separate migrations to one clean UUID schema migration
- **Development-friendly**: Perfect for development phase - single migration creates UUID schema from start
- **Clean database setup**: No unnecessary complexity of converting from integers to UUIDs

