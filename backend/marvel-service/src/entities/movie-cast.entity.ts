import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, Index } from 'typeorm';
import { Movie } from './movie.entity';
import { Actor } from './actor.entity';
import { Character } from './character.entity';

@Entity('movie_cast')
@Index(['movie', 'actor', 'character'], { unique: true })
export class MovieCast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, movie => movie.cast, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(() => Actor, actor => actor.movie_roles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'actor_id' })
  actor: Actor;

  @ManyToOne(() => Character, character => character.portrayals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'character_id' })
  character: Character;

  @Column({ nullable: true })
  character_name: string; // Raw character name from TMDB

  @Column({ nullable: true })
  cast_order: number;

  @CreateDateColumn()
  created_at: Date;
}
