import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { MovieCast } from './movie-cast.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  tmdb_id: number;

  @Column()
  title: string;

  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @Column('text', { nullable: true })
  overview: string;

  @OneToMany(() => MovieCast, movieCast => movieCast.movie)
  cast: MovieCast[];

  @CreateDateColumn()
  created_at: Date;
}
