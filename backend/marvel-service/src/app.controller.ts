import { Controller, Get } from '@nestjs/common';
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
  getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    return this.appService.getMoviesPerActor();
  }

  /**
   * Returns a mapping of actor name to an array of roles (with movie and character IDs and names) for actors with multiple characters.
   */
  @Get('/actorsWithMultipleCharacters')
  getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    return this.appService.getActorsWithMultipleCharacters();
  }

  /**
   * Returns a mapping of character name to an array of roles (with movie and actor IDs and names) for characters with multiple actors.
   */
  @Get('/charactersWithMultipleActors')
  getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    return this.appService.getCharactersWithMultipleActors();
  }
} 