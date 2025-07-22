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

  @Get('/moviesPerActor')
  getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    return this.appService.getMoviesPerActor();
  }

  @Get('/actorsWithMultipleCharacters')
  getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    return this.appService.getActorsWithMultipleCharacters();
  }

  @Get('/charactersWithMultipleActors')
  getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    return this.appService.getCharactersWithMultipleActors();
  }
} 