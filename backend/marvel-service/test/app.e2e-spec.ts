import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';

describe('MovieExplorerController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // Ensure the database is seeded with movie/actor/character data before tests
    // This will fetch data from TMDB and populate the DB (may take a few minutes)
    await request(app.getHttpServer())
      .post('/data-scraper/scrape-movies')
      .expect(200);
  }, 60000);

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/moviesPerActor (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/movie-explorer/moviesPerActor')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('pageSize');
    expect(res.body).toHaveProperty('totalCount');
    expect(typeof res.body.items).toBe('object');
    const actorNames = Object.keys(res.body.items);
    expect(actorNames.length).toBeGreaterThan(0);
    const firstMovies = res.body.items[actorNames[0]];
    expect(Array.isArray(firstMovies)).toBe(true);
    expect(firstMovies.length).toBeGreaterThan(0);
  });

  it('/api/v1/actorsWithMultipleCharacters (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/movie-explorer/actorsWithMultipleCharacters')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('pageSize');
    expect(res.body).toHaveProperty('totalCount');
    expect(typeof res.body.items).toBe('object');
    const actorNames = Object.keys(res.body.items);
    expect(actorNames.length).toBeGreaterThan(0);
    const firstRoles = res.body.items[actorNames[0]];
    expect(Array.isArray(firstRoles)).toBe(true);
    expect(firstRoles.length).toBeGreaterThan(0);
  });

  it('/api/v1/charactersWithMultipleActors (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/movie-explorer/charactersWithMultipleActors')
      .expect(200);
    expect(res.body).toHaveProperty('items');
    expect(res.body).toHaveProperty('page');
    expect(res.body).toHaveProperty('pageSize');
    expect(res.body).toHaveProperty('totalCount');
    expect(typeof res.body.items).toBe('object');
    const characterNames = Object.keys(res.body.items);
    expect(characterNames.length).toBeGreaterThan(0);
    const firstRoles = res.body.items[characterNames[0]];
    expect(Array.isArray(firstRoles)).toBe(true);
    expect(firstRoles.length).toBeGreaterThan(0);
  });
});
