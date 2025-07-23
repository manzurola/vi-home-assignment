import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { join } from 'path';
import { readFileSync } from 'fs';

import { Movie } from '../movie-explorer/entities/movie.entity';
import { Actor } from '../movie-explorer/entities/actor.entity';
import { Character } from '../movie-explorer/entities/character.entity';
import { MovieCast } from '../movie-explorer/entities/movie-cast.entity';
import { MoviesData, ScrapingResult } from './interfaces/tmdb.interface';
import { TmdbDataFetcher } from './tmdb-data-fetcher';

@Injectable()
export class DataScraperService {
  private readonly logger = new Logger(DataScraperService.name);
  private readonly tmdbDataFetcher: TmdbDataFetcher;

  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Actor)
    private actorRepository: Repository<Actor>,
    @InjectRepository(Character)
    private characterRepository: Repository<Character>,
    @InjectRepository(MovieCast)
    private movieCastRepository: Repository<MovieCast>,
  ) {
    this.tmdbDataFetcher = new TmdbDataFetcher(
      process.env.TMDB_API_KEY || 'your-tmdb-api-key',
    );
  }

  async scrapeAllMovies(): Promise<ScrapingResult> {
    this.logger.log('Starting movie scraping process...');

    const moviesData = this.loadMoviesFromFile();
    const scrapingResults: ScrapingResult = {
      moviesProcessed: 0,
      actorsProcessed: 0,
      charactersProcessed: 0,
      castRelationsProcessed: 0,
      errors: [],
    };

    for (const [movieTitle, tmdbId] of Object.entries(moviesData.movies)) {
      try {
        this.logger.log(`Scraping movie: ${movieTitle} (TMDB ID: ${tmdbId})`);
        await this.scrapeMovie(Number(tmdbId), movieTitle);
        scrapingResults.moviesProcessed++;
      } catch (error: any) {
        this.logger.error(`Error scraping movie ${movieTitle}:`, error.message);
        scrapingResults.errors.push({
          movie: movieTitle,
          tmdbId: Number(tmdbId),
          error: error.message,
        });
      }
    }

    this.logger.log('Movie scraping process completed');
    return scrapingResults;
  }

  private async scrapeMovie(tmdbId: number, movieTitle: string) {
    // Fetch movie details and credits from TMDB
    const movieData = await this.fetchMovieFromTMDB(tmdbId);
    const creditsData = await this.fetchMovieCredits(tmdbId);

    // Save or update movie
    const movie = await this.saveOrUpdateMovie(movieData);

    // Process cast members
    if (creditsData.cast && creditsData.cast.length > 0) {
      for (const castMember of creditsData.cast) {
        try {
          // Save or update actor
          const actor = await this.saveOrUpdateActor(castMember);

          // Save or update character
          const character = await this.saveOrUpdateCharacter(
            castMember.character,
          );

          // Save or update movie cast relation
          await this.saveOrUpdateMovieCast(movie, actor, character, castMember);
        } catch (error) {
          this.logger.error(
            `Error processing cast member ${castMember.name}:`,
            error.message,
          );
        }
      }
    }
  }

  private loadMoviesFromFile(): MoviesData {
    try {
      const filePath = join(process.cwd(), 'movies-and-actors.json');
      const fileContent = readFileSync(filePath, 'utf-8');
      return JSON.parse(fileContent) as MoviesData;
    } catch (error: any) {
      this.logger.error('Error loading movies from file:', error.message);
      throw new Error('Failed to load movies data from file');
    }
  }

  private async fetchMovieFromTMDB(tmdbId: number) {
    try {
      const movieDetails = await this.tmdbDataFetcher.fetchMovieDetails(tmdbId);
      return movieDetails;
    } catch (error: any) {
      this.logger.error(
        `Error fetching movie from TMDB (ID: ${tmdbId}):`,
        error.message,
      );
      throw error;
    }
  }

  private async fetchMovieCredits(tmdbId: number) {
    try {
      const credits = await this.tmdbDataFetcher.fetchMovieCredits(tmdbId);
      return credits;
    } catch (error: any) {
      this.logger.error(
        `Error fetching movie credits from TMDB (ID: ${tmdbId}):`,
        error.message,
      );
      throw error;
    }
  }

  private async saveOrUpdateMovie(movieData: any): Promise<Movie> {
    let movie = await this.movieRepository.findOne({
      where: { tmdb_id: movieData.id },
    });

    const releaseDate = movieData.release_date
      ? new Date(movieData.release_date)
      : null;

    if (movie) {
      // Update existing movie
      movie.title = movieData.title;
      movie.release_date = releaseDate;
      movie.overview = movieData.overview;
    } else {
      // Create new movie
      movie = this.movieRepository.create({
        tmdb_id: movieData.id,
        title: movieData.title,
        release_date: releaseDate,
        overview: movieData.overview,
      });
    }

    return await this.movieRepository.save(movie);
  }

  private async saveOrUpdateActor(castMember: any): Promise<Actor> {
    let actor = await this.actorRepository.findOne({
      where: { tmdb_id: castMember.id },
    });

    if (actor) {
      // Update existing actor
      actor.name = castMember.name;
      actor.profile_path = castMember.profile_path || undefined;
    } else {
      // Create new actor
      actor = this.actorRepository.create({
        tmdb_id: castMember.id,
        name: castMember.name,
        profile_path: castMember.profile_path || undefined,
      });
    }

    return await this.actorRepository.save(actor);
  }

  private async saveOrUpdateCharacter(
    characterName: string,
  ): Promise<Character> {
    if (!characterName || characterName.trim() === '') {
      characterName = 'Unknown Character';
    }

    // Finding by name is a best effort for now. It's possible more sophisticated heuristics will be needed someday
    let character = await this.characterRepository.findOne({
      where: { name: characterName },
    });

    if (!character) {
      character = this.characterRepository.create({
        name: characterName,
      });
      character = await this.characterRepository.save(character);
    }

    return character;
  }

  private async saveOrUpdateMovieCast(
    movie: Movie,
    actor: Actor,
    character: Character,
    castMember: any,
  ): Promise<MovieCast> {
    let movieCast = await this.movieCastRepository.findOne({
      where: {
        movie: { id: movie.id },
        actor: { id: actor.id },
        character: { id: character.id },
      },
    });

    if (movieCast) {
      // Update existing movie cast
      movieCast.character_name = castMember.character;
      movieCast.cast_order = castMember.order;
    } else {
      // Create new movie cast
      movieCast = this.movieCastRepository.create({
        movie,
        actor,
        character,
        character_name: castMember.character,
        cast_order: castMember.order,
      });
    }

    return await this.movieCastRepository.save(movieCast);
  }
}
