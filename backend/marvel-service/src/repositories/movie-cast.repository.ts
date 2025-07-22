import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieCast } from '../entities/movie-cast.entity';

@Injectable()
export class MovieCastRepository {
  constructor(
    @InjectRepository(MovieCast)
    private readonly repo: Repository<MovieCast>,
  ) {}

  async findAll(): Promise<MovieCast[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<MovieCast | null> {
    return this.repo.findOneBy({ id });
  }

  async create(movieCast: Partial<MovieCast>): Promise<MovieCast> {
    const entity = this.repo.create(movieCast);
    return this.repo.save(entity);
  }

  async update(id: string, update: Partial<MovieCast>): Promise<MovieCast | null> {
    await this.repo.update(id, update);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
} 