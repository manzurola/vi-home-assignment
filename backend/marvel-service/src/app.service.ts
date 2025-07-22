import { Injectable } from '@nestjs/common';
import { AggregateRepository } from './aggregate.repository';
import {
  MoviesPerActorResponse,
  ActorsWithMultipleCharactersResponse,
  CharactersWithMultipleActorsResponse,
} from './app.controller.types';

@Injectable()
export class AppService {
  constructor(private readonly aggregateRepo: AggregateRepository) {}

  /**
   * Returns a mapping of actor name to an array of movies (with IDs and titles) they appeared in.
   */
  getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    return this.aggregateRepo.getMoviesPerActor();
  }

  /**
   * Returns a mapping of actor name to an array of roles (with movie and character IDs and names) for actors with multiple characters.
   */
  getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    return this.aggregateRepo.getActorsWithMultipleCharacters();
  }

  /**
   * Returns a mapping of character name to an array of roles (with movie and actor IDs and names) for characters with multiple actors.
   */
  getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    return this.aggregateRepo.getCharactersWithMultipleActors();
  }
}
