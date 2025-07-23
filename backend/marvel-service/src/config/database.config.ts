import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { databaseOptions } from './database-options';

export default registerAs('database', (): TypeOrmModuleOptions => {
  return databaseOptions() as TypeOrmModuleOptions;
});
