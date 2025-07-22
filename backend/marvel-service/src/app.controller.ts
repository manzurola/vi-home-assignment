import { Controller, Get } from '@nestjs/common';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
} from './app.controller.types';

@Controller()
export class AppController {
  @Get('/moviesPerActor')
  getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    // Implementation will be added later
    return null as any;
  }

  @Get('/actorsWithMultipleCharacters')
  getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    // Implementation will be added later
    return null as any;
  }

  @Get('/charactersWithMultipleActors')
  getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    // Implementation will be added later
    return null as any;
  }
}
