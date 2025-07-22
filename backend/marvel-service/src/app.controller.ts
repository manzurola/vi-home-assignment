import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
} from './app.controller.types';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Returns a mapping of actor name to an array of movies (with IDs and titles) they appeared in.
   */
  @Get('/moviesPerActor')
  getMoviesPerActor(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<MoviesPerActorResponse> {
    return this.appService.getMoviesPerActor(page, pageSize);
  }

  /**
   * Returns a mapping of actor name to an array of roles (with movie and character IDs and names) for actors with multiple characters.
   */
  @Get('/actorsWithMultipleCharacters')
  getActorsWithMultipleCharacters(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<ActorsWithMultipleCharactersResponse> {
    return this.appService.getActorsWithMultipleCharacters(page, pageSize);
  }

  /**
   * Returns a mapping of character name to an array of roles (with movie and actor IDs and names) for characters with multiple actors.
   */
  @Get('/charactersWithMultipleActors')
  getCharactersWithMultipleActors(
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ): Promise<CharactersWithMultipleActorsResponse> {
    return this.appService.getCharactersWithMultipleActors(page, pageSize);
  }
} 