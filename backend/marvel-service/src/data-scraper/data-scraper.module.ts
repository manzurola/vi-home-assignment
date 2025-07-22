import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataScraperController } from './data-scraper.controller';
import { DataScraperService } from './data-scraper.service';
import { Movie } from '../entities/movie.entity';
import { Actor } from '../entities/actor.entity';
import { Character } from '../entities/character.entity';
import { MovieCast } from '../entities/movie-cast.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie, Actor, Character, MovieCast]),
  ],
  controllers: [DataScraperController],
  providers: [DataScraperService],
})
export class DataScraperModule {} 