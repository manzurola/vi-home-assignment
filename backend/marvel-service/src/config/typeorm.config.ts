import { DataSource, DataSourceOptions } from 'typeorm';
import { databaseOptions } from './database-options';

export const AppDataSource = new DataSource(<DataSourceOptions>{
  ...databaseOptions(),
  synchronize: false,
});
