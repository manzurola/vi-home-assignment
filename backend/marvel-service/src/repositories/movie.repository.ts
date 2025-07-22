import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../entities/movie.entity';

@Injectable()
export class MovieRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly repo: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Movie | null> {
    return this.repo.findOneBy({ id });
  }

  async create(movie: Partial<Movie>): Promise<Movie> {
    const entity = this.repo.create(movie);
    return this.repo.save(entity);
  }

  async update(id: string, update: Partial<Movie>): Promise<Movie | null> {
    await this.repo.update(id, update);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
} 