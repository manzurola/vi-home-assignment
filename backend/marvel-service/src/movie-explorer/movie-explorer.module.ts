import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataScraperModule } from '../data-scraper/data-scraper.module';
import databaseConfig from '../config/database.config';
import { MovieExplorerController } from './movie-explorer.controller';
import { MovieExplorerService } from './movie-explorer.service';
import { MovieExplorerRepository } from './movie-explorer.repository';

@Module({
  controllers: [MovieExplorerController],
  providers: [MovieExplorerService, MovieExplorerRepository],
})
export class MovieExplorerModule {}
