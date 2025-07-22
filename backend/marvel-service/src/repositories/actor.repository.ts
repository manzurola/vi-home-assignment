import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Actor } from '../entities/actor.entity';

@Injectable()
export class ActorRepository {
  constructor(
    @InjectRepository(Actor)
    private readonly repo: Repository<Actor>,
  ) {}

  async findAll(): Promise<Actor[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Actor | null> {
    return this.repo.findOneBy({ id });
  }

  async create(actor: Partial<Actor>): Promise<Actor> {
    const entity = this.repo.create(actor);
    return this.repo.save(entity);
  }

  async update(id: string, update: Partial<Actor>): Promise<Actor | null> {
    await this.repo.update(id, update);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
} 