import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';

@Injectable()
export class CharacterRepository {
  constructor(
    @InjectRepository(Character)
    private readonly repo: Repository<Character>,
  ) {}

  async findAll(): Promise<Character[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Character | null> {
    return this.repo.findOneBy({ id });
  }

  async create(character: Partial<Character>): Promise<Character> {
    const entity = this.repo.create(character);
    return this.repo.save(entity);
  }

  async update(id: string, update: Partial<Character>): Promise<Character | null> {
    await this.repo.update(id, update);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
} 