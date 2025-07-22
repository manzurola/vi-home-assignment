import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataScraperController } from './data-scraper.controller';
import { DataScraperService } from './data-scraper.service';
import { Movie } from '../movie-explorer/entities/movie.entity';
import { Actor } from '../movie-explorer/entities/actor.entity';
import { Character } from '../movie-explorer/entities/character.entity';
import { MovieCast } from '../movie-explorer/entities/movie-cast.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Actor, Character, MovieCast])],
  controllers: [DataScraperController],
  providers: [DataScraperService],
})
export class DataScraperModule {}
