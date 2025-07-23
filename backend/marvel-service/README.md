## Description

Backend for the marvel-explorer app.

## Project setup

```bash
$ nvm use
$ npm install
```

1. cd into the appropriate component folder
2. `cp .env.test .env` and fill the missing tmdb token
3. `nvm use`
4. `npm i`
5. `npm run db:clean` - will set up local db via docker compose + migrations
6. `npm run start`
7. now running at port 3000
8. issue a POST request to `localhost:3000/data-scraper/scrape-movies` - will populate the database from tmdb

## Compile and run the project

* Fill missing tmdb token in .env.test. Then ->
```bash
$ cp .env.test .env
$ nvm use
$ npm i
$ npm run db:clean
```

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migrations

To keep your database schema in sync with your TypeORM entity models, use the following workflow:

1. **Change your entity models** (add, remove, or modify fields, tables, or relations).
2. Run the following command to generate a new migration file based on your changes:

```bash
npm run migration:generate -- -n MigrationName
```
Replace `MigrationName` with a descriptive name for your migration.

3. To apply all pending migrations to your database, run:

```bash
npm run migration:run
```

- You only need to run `migration:generate` if you have made changes to your entities and want to create a new migration file.
- If you already have migration files and just want to apply them, use `migration:run`.
