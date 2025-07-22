import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { MovieExplorerModule } from '../src/movie-explorer/movie-explorer.module';

describe('MovieExplorerController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MovieExplorerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeAll(async () => {
    // Ensure the database is seeded with movie/actor/character data before tests
    // This will fetch data from TMDB and populate the DB (may take a few minutes)
    await request(app.getHttpServer())
      .post('/data-scraper/scrape-movies')
      .expect(200);
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
