import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MovieCast } from './movie-cast.entity';

@Entity('actors')
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tmdb_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  profile_path: string;

  @OneToMany(() => MovieCast, (movieCast) => movieCast.actor)
  movie_roles: MovieCast[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
