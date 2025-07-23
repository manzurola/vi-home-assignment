import { Actor, Character, Movie, MovieCast } from '../movie-explorer/entities';

export const databaseOptions = () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'marvel_user',
  password: process.env.DB_PASSWORD || 'marvel_password',
  database: process.env.DB_NAME || 'marvel_db',
  entities: [Movie, Actor, Character, MovieCast],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  logging: process.env.LOG_TYPEORM === 'true',
});
