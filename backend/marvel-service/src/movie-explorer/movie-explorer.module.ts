import { Module } from '@nestjs/common';
import { MovieExplorerController } from './movie-explorer.controller';
import { MovieExplorerService } from './movie-explorer.service';
import { MovieExplorerRepository } from './movie-explorer.repository';

@Module({
  controllers: [MovieExplorerController],
  providers: [MovieExplorerService, MovieExplorerRepository],
})
export class MovieExplorerModule {}
