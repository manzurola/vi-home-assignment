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

  getMoviesPerActor(): Promise<MoviesPerActorResponse> {
    return this.aggregateRepo.getMoviesPerActor();
  }

  getActorsWithMultipleCharacters(): Promise<ActorsWithMultipleCharactersResponse> {
    return this.aggregateRepo.getActorsWithMultipleCharacters();
  }

  getCharactersWithMultipleActors(): Promise<CharactersWithMultipleActorsResponse> {
    return this.aggregateRepo.getCharactersWithMultipleActors();
  }
}
