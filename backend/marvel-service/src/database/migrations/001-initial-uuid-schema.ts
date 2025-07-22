import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialUuidSchema1704000000000 implements MigrationInterface {
  name = 'InitialUuidSchema1704000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Enable UUID extension
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create movies table with UUID primary key
    await queryRunner.query(`
      CREATE TABLE "movies" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tmdb_id" integer NOT NULL,
        "title" character varying NOT NULL,
        "release_date" date,
        "overview" text,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_movies_tmdb_id" UNIQUE ("tmdb_id"),
        CONSTRAINT "PK_movies" PRIMARY KEY ("id")
      )
    `);

    // Create actors table with UUID primary key
    await queryRunner.query(`
      CREATE TABLE "actors" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "tmdb_id" integer NOT NULL,
        "name" character varying NOT NULL,
        "profile_path" character varying,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_actors_tmdb_id" UNIQUE ("tmdb_id"),
        CONSTRAINT "PK_actors" PRIMARY KEY ("id")
      )
    `);

    // Create characters table with UUID primary key
    await queryRunner.query(`
      CREATE TABLE "characters" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_characters" PRIMARY KEY ("id")
      )
    `);

    // Create movie_cast table with UUID primary key and foreign keys
    await queryRunner.query(`
      CREATE TABLE "movie_cast" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "character_name" character varying,
        "cast_order" integer,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "movie_id" uuid,
        "actor_id" uuid,
        "character_id" uuid,
        CONSTRAINT "PK_movie_cast" PRIMARY KEY ("id")
      )
    `);

    // Create indexes for performance
    await queryRunner.query(`CREATE INDEX "IDX_movie_cast_movie_id" ON "movie_cast" ("movie_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_movie_cast_actor_id" ON "movie_cast" ("actor_id")`);
    await queryRunner.query(`CREATE INDEX "IDX_movie_cast_character_id" ON "movie_cast" ("character_id")`);

    // Create unique constraint to prevent duplicate cast entries
    await queryRunner.query(`
      CREATE UNIQUE INDEX "IDX_movie_cast_unique" ON "movie_cast" ("movie_id", "actor_id", "character_id")
    `);

    // Create foreign key constraints
    await queryRunner.query(`
      ALTER TABLE "movie_cast" 
      ADD CONSTRAINT "FK_movie_cast_movie" 
      FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "movie_cast" 
      ADD CONSTRAINT "FK_movie_cast_actor" 
      FOREIGN KEY ("actor_id") REFERENCES "actors"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
      ALTER TABLE "movie_cast" 
      ADD CONSTRAINT "FK_movie_cast_character" 
      FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign key constraints
    await queryRunner.query(`ALTER TABLE "movie_cast" DROP CONSTRAINT "FK_movie_cast_character"`);
    await queryRunner.query(`ALTER TABLE "movie_cast" DROP CONSTRAINT "FK_movie_cast_actor"`);
    await queryRunner.query(`ALTER TABLE "movie_cast" DROP CONSTRAINT "FK_movie_cast_movie"`);
    
    // Drop indexes
    await queryRunner.query(`DROP INDEX "IDX_movie_cast_unique"`);
    await queryRunner.query(`DROP INDEX "IDX_movie_cast_character_id"`);
    await queryRunner.query(`DROP INDEX "IDX_movie_cast_actor_id"`);
    await queryRunner.query(`DROP INDEX "IDX_movie_cast_movie_id"`);
    
    // Drop tables in reverse order
    await queryRunner.query(`DROP TABLE "movie_cast"`);
    await queryRunner.query(`DROP TABLE "characters"`);
    await queryRunner.query(`DROP TABLE "actors"`);
    await queryRunner.query(`DROP TABLE "movies"`);
    
    // Note: We don't drop the uuid-ossp extension as it might be used by other parts of the database
  }
}
