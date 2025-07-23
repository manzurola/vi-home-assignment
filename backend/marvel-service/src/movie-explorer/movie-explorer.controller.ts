import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MovieExplorerService } from './movie-explorer.service';
import {
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
  MoviesPerActorResponse,
} from './movie-explorer.controller.types';

@Controller('api/v1/movie-explorer')
export class MovieExplorerController {
  constructor(private readonly appService: MovieExplorerService) {}

  /**
   * Returns a mapping of actor name to an array of movies (with IDs and titles) they appeared in.
   */
  @Get('moviesPerActor')
  getMoviesPerActor(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(50), ParseIntPipe) pageSize: number,
  ): Promise<MoviesPerActorResponse> {
    return this.appService.getMoviesPerActor(page, pageSize);
  }

  /**
   * Returns a mapping of actor name to an array of roles (with movie and character IDs and names) for actors with multiple characters.
   */
  @Get('actorsWithMultipleCharacters')
  getActorsWithMultipleCharacters(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(50), ParseIntPipe) pageSize: number,
  ): Promise<ActorsWithMultipleCharactersResponse> {
    return this.appService.getActorsWithMultipleCharacters(page, pageSize);
  }

  /**
   * Returns a mapping of character name to an array of roles (with movie and actor IDs and names) for characters with multiple actors.
   */
  @Get('charactersWithMultipleActors')
  getCharactersWithMultipleActors(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('pageSize', new DefaultValuePipe(50), ParseIntPipe) pageSize: number,
  ): Promise<CharactersWithMultipleActorsResponse> {
    return this.appService.getCharactersWithMultipleActors(page, pageSize);
  }
}
