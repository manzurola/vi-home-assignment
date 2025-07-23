import { Module } from '@nestjs/common';
import { MovieExplorerModule } from './movie-explorer/movie-explorer.module';
import { DataScraperModule } from './data-scraper/data-scraper.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database')!,
      inject: [ConfigService],
    }),
    DataScraperModule,
    MovieExplorerModule,
    DataScraperModule,
    HealthModule,
  ],
})
export class AppModule {}
