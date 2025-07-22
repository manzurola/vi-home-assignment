import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Movie } from '../movie-explorer/entities/movie.entity';
import { Actor } from '../movie-explorer/entities/actor.entity';
import { Character } from '../movie-explorer/entities/character.entity';
import { MovieCast } from '../movie-explorer/entities/movie-cast.entity';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'marvel_user',
    password: process.env.DB_PASSWORD || 'marvel_password',
    database: process.env.DB_NAME || 'marvel_db',
    entities: [Movie, Actor, Character, MovieCast],
    migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
    logging: process.env.LOG_TYPEORM === 'true',
  };
});
