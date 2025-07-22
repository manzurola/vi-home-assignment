import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { Character } from '../entities/character.entity';
import { MovieCast } from '../entities/movie-cast.entity';

export default registerAs('database', (): TypeOrmModuleOptions => {
  const isTest = process.env.NODE_ENV === 'test';
  
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: isTest ? 5433 : (parseInt(process.env.DB_PORT || '5432')),
    username: process.env.DB_USERNAME || 'marvel_user',
    password: process.env.DB_PASSWORD || 'marvel_password',
    database: isTest ? 'marvel_test_db' : (process.env.DB_NAME || 'marvel_db'),
    entities: [Movie, Actor, Character, MovieCast],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    migrationsRun: !isTest, // Don't run migrations in tests, use synchronize instead
    synchronize: isTest, // Only sync schema in tests for clean slate
    dropSchema: isTest,  // Drop and recreate schema for each test run
    logging: process.env.NODE_ENV === 'development' && !isTest,
  };
}); 